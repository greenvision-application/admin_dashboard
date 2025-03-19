import React from 'react';
import { PlantTable } from '../../../pages/Plant/ui/Plant'; // Import kiểu dữ liệu từ component chính

interface PlantDetailsPopupProps {
  plant: PlantTable | null;
  onClose: () => void;
}

const PlantDetailsPopup: React.FC<PlantDetailsPopupProps> = ({ plant, onClose }) => {
  if (!plant) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Chi tiết cây trồng: {plant.plant_name}</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Tên khoa học:</strong> {plant.scientific_name}</p>
            <p><strong>Danh mục:</strong> {plant.Category?.category_name || 'Chưa xác định'}</p>
            <p><strong>Mức độ khó:</strong> {plant.difficulty_level}</p>
            <p><strong>Loại đất:</strong> {plant.soil_type}</p>
            <p><strong>Vị trí sinh trưởng:</strong> {plant.habitatLocation}</p>
          </div>
          <div>
            <p><strong>Nhiệt độ tối thiểu:</strong> {plant.minTemperature}°C</p>
            <p><strong>Nhiệt độ tối đa:</strong> {plant.maxTemperature}°C</p>
            <p><strong>Kích thước trưởng thành tối thiểu:</strong> {plant.minMatureSize}cm</p>
            <p><strong>Kích thước trưởng thành tối đa:</strong> {plant.maxMatureSize}cm</p>
            <p><strong>Độ ẩm:</strong> {plant.humidityRange}</p>
            <p><strong>Yêu cầu ánh sáng:</strong> {plant.lightRequirement}</p>
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
          <div className="flex gap-2">
            {plant.image_url.map((url, index) => (
              <img key={index} src={url} alt={`Hình ảnh ${index + 1}`} className="h-20 w-20 object-cover rounded" />
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default PlantDetailsPopup;