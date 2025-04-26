import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Link, Loader2 } from 'lucide-react';
import { Plant } from '../../../types';
import { useToast } from '../../../components/toast/ui/ToastContext';
import Meaning from '../../Plant/ui/Meaning';
import Functions from '../../Plant/ui/Functions';
import ClimateRequirements from '../../Plant/ui/ClimateRequirements';
import GrowingConditions from '../../Plant/ui/GrowingConditions';
import Overview from '../../Plant/ui/Overview';
import HeaderWithActions from '../../Plant/ui/HeaderWithActions';
import Characteristics from '../../Plant/ui/Characteristics';
import BasicInformation from '../../Plant/ui/BasicInformation';
import ImageGallery from '../../Plant/ui/ImageGallery';
import { Button } from '../../../components';
import { scanFilePlant, urlScanPlant } from '../../../services';
import { resizeImageToFormData } from '../../../services/imageService';

const Scan = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [plantData, setPlantData] = useState<Plant | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { addToast } = useToast();

  // Mock function to simulate plant recognition API call
  const recognizePlant = async (imageSource: string | FormData) => {
    setIsScanning(true);

    if (typeof imageSource === 'string') {
      await urlScanPlant(
        imageSource,
        res => {
          setPlantData(res);
          setIsScanning(false);
        },
        err => {
          setIsScanning(false);
          addToast(
            err instanceof Error ? err.message : 'Failed to recognize plant',
            'error'
          );
        }
      );
    } else {
      await scanFilePlant(
        imageSource,
        res => {
          setPlantData(res);
          setIsScanning(false);
        },
        err => {
          setIsScanning(false);
          addToast(
            err instanceof Error ? err.message : 'Failed to recognize plant',
            'error'
          );
        }
      );
    }
  };

  // Handle camera scanning
  const startCamera = async () => {
    try {
      if (streamRef.current) {
        stopCamera();
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : 'Failed to access camera',
        'error'
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const captureImage = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');

      try {
        await recognizePlant(imageData);
        stopCamera();
      } catch (err) {
        addToast(
          err instanceof Error ? err.message : 'Failed to recognize plant',
          'error'
        );
      }
    }
  };

  // Handle file upload
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const resizeImage = await resizeImageToFormData(file);
      await recognizePlant(resizeImage);
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : 'Failed to recognize plant',
        'error'
      );
    }
  };

  // Handle URL input
  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    try {
      await recognizePlant(urlInput);
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : 'Failed to recognize plant',
        'error'
      );
    }
  };

  // Reset the scan process
  const resetScan = () => {
    setPlantData(null);
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle tab change
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    resetScan();

    if (index === 0) {
      startCamera();
    } else {
      stopCamera();
    }
  };

  // Initialize camera when component mounts and activeTab is 0
  useEffect(() => {
    if (activeTab === 2 && !plantData) {
      startCamera();
    }

    // Cleanup function to stop camera when component unmounts
    return () => {
      stopCamera();
    };
  }, [activeTab]);

  // Render plant information
  const renderPlantInfo = () => {
    if (!plantData) return null;

    return (
      <div className="mx-auto rounded-lg bg-white p-2 shadow-xl">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
          {/* Left column - Images */}
          <div className="space-y-4 lg:col-span-1">
            <ImageGallery
              images={plantData.image_url}
              plantName={plantData.plant_name}
            />
            <BasicInformation
              plantName={plantData.plant_name}
              scientificName={plantData.scientific_name}
              difficultyLevel={plantData.difficulty_level}
              plantType={plantData.Category?.category_name}
            />
            {plantData.characteristic &&
              plantData.characteristic.length > 0 && (
                <Characteristics characteristics={plantData.characteristic} />
              )}
          </div>

          {/* Right column - Details */}
          <div className="space-y-2 lg:col-span-2">
            <div className="rounded-lg bg-gray-100 p-4">
              <HeaderWithActions
                plantName={plantData.plant_name}
                scientificName={plantData.scientific_name}
              />

              {plantData.overview && plantData.overview.length > 0 && (
                <Overview paragraphs={plantData.overview} />
              )}

              <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2">
                <GrowingConditions
                  soilType={plantData.soil_type}
                  habitatLocation={plantData.habitatLocation}
                  minMatureSize={plantData.minMatureSize}
                  maxMatureSize={plantData.maxMatureSize}
                />
                <ClimateRequirements
                  minTemperature={plantData.minTemperature}
                  maxTemperature={plantData.maxTemperature}
                  humidityRange={plantData.humidityRange}
                  lightRequirement={plantData.lightRequirement}
                />
              </div>
            </div>

            {plantData.function && plantData.function.length > 0 && (
              <Functions functions={plantData.function} />
            )}

            {plantData.meaning && plantData.meaning.length > 0 && (
              <Meaning meanings={plantData.meaning} />
            )}
          </div>
        </div>
      </div>
    );
  };

  // Custom tab component
  const TabButton = ({
    index,
    active,
    onClick,
    icon,
    label
  }: {
    index: number;
    active: boolean;
    onClick: (index: number) => void;
    icon: React.ReactNode;
    label: string;
  }) => {
    return (
      <Button
        onClick={() => onClick(index)}
        className={`flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm leading-5 font-medium ${active ? 'bg-white text-green-700 shadow' : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-700'}`}
      >
        {icon}
        <span>{label}</span>
      </Button>
    );
  };

  return (
    <>
      {!plantData && (
        <>
          {/* Custom tab implementation */}
          <div className="mx-auto max-w-4xl p-4">
            <div className="mb-6">
              <div className="flex rounded-xl bg-gray-100 p-1">
                <TabButton
                  index={0}
                  active={activeTab === 0}
                  onClick={handleTabChange}
                  icon={<Link size={18} />}
                  label="URL"
                />
                <TabButton
                  index={1}
                  active={activeTab === 1}
                  onClick={handleTabChange}
                  icon={<Upload size={18} />}
                  label="Upload image"
                />

                <TabButton
                  index={2}
                  active={activeTab === 2}
                  onClick={handleTabChange}
                  icon={<Camera size={18} />}
                  label="Camera"
                />
              </div>
            </div>
          </div>

          {/* Tab content */}
          <div className="mx-auto max-w-4xl p-4">
            {/* Camera Panel */}
            {activeTab === 2 && (
              <div className="rounded-lg bg-white p-4 shadow-md">
                <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-gray-100">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Loader2 className="h-10 w-10 animate-spin text-white" />
                    </div>
                  )}
                </div>
                <button
                  onClick={captureImage}
                  disabled={isScanning}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-medium text-white hover:bg-green-700 disabled:bg-gray-400"
                >
                  <Camera size={18} />
                  <span>Chụp và nhận diện</span>
                </button>
              </div>
            )}

            {/* Upload Panel */}
            {activeTab === 1 && (
              <div className="rounded-lg bg-white p-4 shadow-md">
                <div
                  className="mb-4 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-green-500"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, JPEG (max 5MB)
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                    disabled={isScanning}
                  />
                </div>
                {isScanning && (
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Đang nhận diện...</span>
                  </div>
                )}
              </div>
            )}

            {/* URL Panel */}
            {activeTab === 0 && (
              <div className="rounded-lg bg-white p-4 shadow-md">
                <form onSubmit={handleUrlSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="url-input"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      URL hình ảnh
                    </label>
                    <input
                      id="url-input"
                      type="url"
                      value={urlInput}
                      onChange={e => setUrlInput(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                      disabled={isScanning}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isScanning || !urlInput.trim()}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-medium text-white hover:bg-green-700 disabled:bg-gray-400"
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Scanning...</span>
                      </>
                    ) : (
                      <>
                        <Link size={18} />
                        <span>Scan</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </>
      )}

      {renderPlantInfo()}
    </>
  );
};

export default Scan;
