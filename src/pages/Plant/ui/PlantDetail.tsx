import { useParams } from 'react-router-dom';
import { useFetchData } from '../../../hooks';
import { Plant } from '../../../types';
import { getPlantDetail } from '../../../services';
import { Loading } from '../../../components';
import { useCallback, useState } from 'react';
import {
  Info,
  Sprout,
  ThermometerSnowflake,
  Droplets,
  Sun,
  Ruler,
  Sparkles,
  Heart,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  MapPinCheck,
  LandPlot,
  Leaf,
  Pencil,
  Trash2
} from 'lucide-react';
import constants from '../../../constants';

const PlantDetail = () => {
  const { plantId } = useParams();
  const callGetDetail = useCallback(async () => {
    return await getPlantDetail(plantId!);
  }, [plantId]);
  const { data, error, isLoading } = useFetchData<Plant>({
    fetchFn: callGetDetail
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (isLoading) return <Loading label="Getting plant content..." />;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!data) return null;

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % data.image_url.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      prev => (prev - 1 + data.image_url.length) % data.image_url.length
    );
  };

  const handleEdit = () => {
    console.log('Edit button clicked');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      try {
        console.log('Deleting plant with ID:', plantId);
      } catch (error) {
        console.error('Error deleting plant:', error);
        alert('Failed to delete plant. Please try again.');
      }
    }
  };

  return (
    <div className="mx-auto rounded-lg bg-white p-2 shadow-xl">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        {/* Left column - Images */}
        <div className="space-y-4 lg:col-span-1">
          <div className="relative mb-2 aspect-square overflow-hidden rounded-lg bg-gray-50">
            {data.image_url.length > 0 && (
              <img
                src={
                  data.image_url[currentImageIndex] ||
                  'https://peicannabiscorp.com/wp-content/uploads/2022/08/woocommerce-placeholder-1200x1200-1-510x510.jpg'
                }
                alt={data.plant_name}
                className="h-full w-full object-cover"
              />
            )}

            {data.image_url.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 -translate-y-1/2 transform rounded-full bg-white/70 p-2 transition-colors hover:bg-white/90"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full bg-white/70 p-2 transition-colors hover:bg-white/90"
                >
                  <ChevronRight size={20} />
                </button>
                <div className="absolute right-0 bottom-2 left-0 flex justify-center gap-1">
                  {data.image_url.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {data.image_url.length > 1 && (
            <div className="flex gap-2 overflow-x-auto p-1">
              {data.image_url.map((url, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square w-24 flex-none cursor-pointer overflow-hidden rounded-md ${
                    index === currentImageIndex ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  <img
                    src={
                      url ||
                      'https://peicannabiscorp.com/wp-content/uploads/2022/08/woocommerce-placeholder-1200x1200-1-510x510.jpg'
                    }
                    alt={`${data.plant_name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 rounded-lg bg-gray-100 p-4">
            <h2 className="mb-3 flex items-center text-lg font-semibold">
              <Info size={20} className="mr-2 text-gray-500" />
              Basic information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Plant name</p>
                <p className="font-medium">{data.plant_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Scientific name</p>
                <p className="font-medium italic">{data.scientific_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Difficulty level</p>
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${constants.getDifficultyColor(data.difficulty_level)}`}
                >
                  {data.difficulty_level}
                </span>
              </div>
            </div>
          </div>

          {/* Characteristics */}
          {data.characteristic && data.characteristic.length > 0 && (
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-3 flex items-center text-lg font-semibold">
                <CheckCircle2 size={20} className="mr-2 text-green-500" />
                Characteristics
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                {data.characteristic.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right column - Details */}
        <div className="space-y-2 lg:col-span-2">
          <div className="rounded-lg bg-gray-100 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{data.plant_name}</h2>
                <p className="text-gray-500 italic">{data.scientific_name}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-1 rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1 rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>

            {data.overview && data.overview.length > 0 && (
              <div className="mb-6 space-y-2">
                {data.overview.map((paragraph, index) => (
                  <p key={index} className="text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2">
              {/* Growing conditions */}
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 flex items-center font-semibold">
                  <Leaf size={20} className="mr-2 text-green-500" />
                  Growing conditions
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <LandPlot
                      size={20}
                      className="text-brown-500 mt-0.5 mr-2"
                    />
                    <div>
                      <p className="text-sm font-medium">Soil type</p>
                      <p className="text-sm text-gray-600">
                        {constants.getSoilType(data.soil_type)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPinCheck size={20} className="mt-0.5 mr-2 text-black" />
                    <div>
                      <p className="text-sm font-medium">Habitat location</p>
                      <p className="text-sm text-gray-600">
                        {constants.getPlantCategory(data.habitatLocation)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Ruler size={20} className="mt-0.5 mr-2 text-black" />
                    <div>
                      <p className="text-sm font-medium">Average size</p>
                      <p className="text-sm text-gray-600">
                        {data.minMatureSize} - {data.maxMatureSize} cm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Climate requirements */}
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 flex items-center font-semibold">
                  <Sun size={20} className="mr-2 text-yellow-500" />
                  Climate requirements
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ThermometerSnowflake
                          size={20}
                          className="mr-2 text-blue-500"
                        />
                        <span className="text-sm font-medium">
                          Temperature range
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {data.minTemperature}°C - {data.maxTemperature}°C
                      </span>
                    </div>
                    <div className="relative mt-2">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="absolute h-2 rounded-l-full bg-blue-500"
                          style={{
                            left: '0',
                            width: `${(data.minTemperature / 100) * 100}%`
                          }}
                        ></div>
                        <div
                          className="absolute h-2 rounded-r-full bg-orange-500"
                          style={{
                            left: `${(data.minTemperature / 100) * 100}%`,
                            width: `${((data.maxTemperature - data.minTemperature) / 100) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Droplets size={20} className="mr-2 text-blue-500" />
                        <span className="text-sm font-medium">
                          Humidity range
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {data.humidityRange}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{
                            width: `${constants.getPercent(data.humidityRange)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Sun size={20} className="mr-2 text-yellow-500" />
                        <span className="text-sm font-medium">
                          Light requirement
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {data.lightRequirement}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-yellow-500"
                          style={{
                            width: `${constants.getPercent(data.lightRequirement)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Functions */}
          {data.function && data.function.length > 0 && (
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-3 flex items-center text-lg font-semibold">
                <Sparkles size={20} className="mr-2 text-purple-500" />
                Uses
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                {data.function.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Meaning */}
          {data.meaning && data.meaning.length > 0 && (
            <div className="rounded-lg bg-gray-100 p-6 shadow-sm">
              <h3 className="mb-3 flex items-center text-lg font-semibold">
                <Heart size={20} className="mr-2 text-red-500" />
                Meaning
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                {data.meaning.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Growth phases */}
          {data.Phase && data.Phase.length > 0 && (
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center text-lg font-semibold">
                <Sprout size={20} className="mr-2 text-green-500" />
                Growth phases
              </h3>
              <div className="relative mt-8">
                {/* Horizontal connecting line */}
                <div className="absolute top-4 left-0 -z-10 h-0.5 w-full bg-gray-200"></div>

                <div className="flex flex-wrap justify-between">
                  {data.Phase.map((phase, index) => (
                    <div
                      key={phase.id}
                      className="relative mb-6 flex flex-col items-center px-2"
                      style={{ minWidth: '120px' }}
                    >
                      {/* Circle indicator */}
                      <div className="absolute top-4 left-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white bg-green-500"></div>

                      {/* Phase number above the line */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 transform">
                        <span className="text-md inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 font-medium text-green-800">
                          {index + 1}
                        </span>
                      </div>

                      {/* Content below the line */}
                      <div className="mt-8 w-full rounded-lg bg-gray-50 p-3 text-center">
                        <h4 className="font-medium">{phase.phase_name}</h4>
                        <p className="text-xs text-gray-500">
                          Phase {index + 1}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
