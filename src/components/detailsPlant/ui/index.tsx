import React, { useState } from 'react';
import { PlantTable } from '../../../pages/Plant/ui/Plant'; // Import kiểu dữ liệu từ component chính

interface PlantDetailsPopupProps {
  plant: PlantTable | null;
  onClose: () => void;
}

const PlantDetailsPopup: React.FC<PlantDetailsPopupProps> = ({
  plant,
  onClose
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  if (!plant) return null;

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const translateEnum = {
    difficulty_level: {
      EASY: 'Dễ',
      MEDIUM: 'Trung bình',
      HARD: 'Khó',
      VERY_HARD: 'Rất khó',
      EXTREME: 'Cực kỳ khó'
    },
    soil_type: {
      SANDY: 'Đất cát',
      CLAY: 'Đất sét',
      SILT: 'Đất phù sa',
      PEAT: 'Đất than bùn',
      CHALK: 'Đất đá vôi',
      LOAM: 'Đất thịt'
    },
    habitatLocation: {
      INDOOR: 'Trong nhà',
      OUTDOOR: 'Ngoài trời',
      BALCONY: 'Ban công',
      GARDEN: 'Vườn',
      GREENHOUSE: 'Nhà kính',
      WINDOW_SILL: 'Bệ cửa sổ',
      KITCHEN: 'Nhà bếp',
      BATHROOM: 'Phòng tắm',
      TERRACE: 'Sân thượng',
      OFFICE: 'Văn phòng',
      HYDROPONICS: 'Thủy canh',
      WALL_PLANTER: 'Chậu treo tường'
    },
    humidityRange: {
      NONE: 'Không xác định',
      VERY_LOW: 'Rất thấp',
      LOW: 'Thấp',
      MEDIUM: 'Trung bình',
      HIGH: 'Cao',
      VERY_HIGH: 'Rất cao'
    },
    lightRequirement: {
      NONE: 'Không xác định',
      VERY_LOW: 'Rất ít',
      LOW: 'Ít',
      MEDIUM: 'Trung bình',
      HIGH: 'Nhiều',
      VERY_HIGH: 'Rất nhiều'
    }
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black p-44">
      <div className="max-h-[90vh] w-full max-w-7xl overflow-y-auto rounded-lg bg-white px-6 pb-6 shadow-lg">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Đóng
          </button>
        </div>

        <h2 className="mb-4 text-xl font-bold">
          Chi tiết cây trồng:{' '}
          <span className="text-2xl text-green-600"> {plant.plant_name}</span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="flex gap-2">
              <strong className="w-36">Tên khoa học:</strong>{' '}
              {plant.scientific_name}
            </p>
            <p className="flex gap-2">
              <strong className="w-36">Danh mục:</strong>{' '}
              {plant.Category?.category_name || 'Chưa xác định'}
            </p>
            <p className="flex gap-2">
              <strong className="w-36">Mức độ khó:</strong>{' '}
              {translateEnum.difficulty_level[plant.difficulty_level]}
            </p>
            <p className="flex gap-2">
              <strong className="w-36">Loại đất:</strong>{' '}
              {translateEnum.soil_type[plant.soil_type]}
            </p>
            <p className="flex gap-2">
              <strong className="w-36">Vị trí sinh trưởng:</strong>{' '}
              {translateEnum.habitatLocation[plant.habitatLocation]}
            </p>
          </div>
          <div>
            <p>
              <strong>Nhiệt độ tối thiểu:</strong> {plant.minTemperature}°C
            </p>
            <p>
              <strong>Nhiệt độ tối đa:</strong> {plant.maxTemperature}°C
            </p>
            <p>
              <strong>Kích thước trưởng thành tối thiểu:</strong>{' '}
              {plant.minMatureSize}cm
            </p>
            <p>
              <strong>Kích thước trưởng thành tối đa:</strong>{' '}
              {plant.maxMatureSize}cm
            </p>
            <p>
              <strong>Độ ẩm:</strong>{' '}
              {translateEnum.humidityRange[plant.humidityRange]}
            </p>
            <p>
              <strong>Yêu cầu ánh sáng:</strong>{' '}
              {translateEnum.lightRequirement[plant.lightRequirement]}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-bold">Tổng quan:</h3>
          <ul>
            {plant.overview.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-bold">Đặc điểm:</h3>
          <ul>
            {plant.characteristic.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-bold">Công dụng:</h3>
          <ul>
            {plant.function.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-bold">Ý nghĩa:</h3>
          <ul>
            {plant.meaning.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-bold">Hình ảnh:</h3>
          <div className="flex flex-wrap gap-2">
            {plant.image_url.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Hình ảnh ${index + 1}`}
                className="h-20 w-20 rounded object-cover"
                onClick={() => handleImageClick(url)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* phóng to ảnh */}
      {selectedImage && (
        <div
          className="bg-opacity-80 fixed inset-0 flex items-center justify-center bg-black p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-lg bg-white p-2 shadow-lg">
            <button
              onClick={closeImageModal}
              className="absolute top-2 right-2 rounded-full bg-red-500 px-3 py-1 text-white"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Ảnh phóng to"
              className="max-h-[80vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantDetailsPopup;
