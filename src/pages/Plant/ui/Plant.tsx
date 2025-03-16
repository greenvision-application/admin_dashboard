import { useState, useEffect } from 'react';
import { Table } from '../../../components';
import type { ActionColumn } from '../../../components';
import { plantService } from '../../../services/plantService';
import { Plant, Category } from '../../../types/Model';
import {categoryService} from '../../../services/categoryService';

interface PlantTable {
  id: string; // UUID của cây trồng
  created_at: string; // Thời gian tạo
  plant_name: string; // Tên cây trồng
  scientific_name: string; // Tên khoa học của cây trồng
  image_url: string[]; // Danh sách URL hình ảnh
  overview: string[]; // Mô tả tổng quan
  characteristic: string[]; // Đặc điểm của cây
  function: string[]; // Chức năng của cây
  meaning: string[]; // Ý nghĩa của cây
  difficulty_level: 'EASY' | 'MEDIUM' | 'HARD' | 'VERY_HARD' | 'EXTREME'; // Mức độ khó theo ENUM DIFFICULTY_LEVEL
  soil_type: 'SANDY' | 'CLAY' | 'SILT' | 'PEAT' | 'CHALK' | 'LOAM'; // Loại đất theo ENUM SOIL_TYPE
  category_id: string; // ID của danh mục
  habitatLocation:
    | 'INDOOR'
    | 'OUTDOOR'
    | 'BALCONY'
    | 'GARDEN'
    | 'GREENHOUSE'
    | 'WINDOW_SILL'
    | 'KITCHEN'
    | 'BATHROOM'
    | 'TERRACE'
    | 'OFFICE'
    | 'HYDROPONICS'
    | 'WALL_PLANTER'; // Vị trí sinh trưởng theo ENUM PLANT_SITE
    minTemperature: number; // Nhiệt độ tối thiểu
    maxTemperature: number; // Nhiệt độ tối đa
    minMatureSize: number; // Kích thước trưởng thành tối thiểu
    maxMatureSize: number; // Kích thước trưởng thành tối đa
    humidityRange: 'NONE' | 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'; // Độ ẩm theo ENUM LEVEL
    lightRequirement:
    | 'NONE'
    | 'VERY_LOW'
    | 'LOW'
    | 'MEDIUM'
    | 'HIGH'
    | 'VERY_HIGH'; // Mức độ ánh sáng theo ENUM LEVEL
    approved_content: boolean; // Xác nhận nội dung
    Category:{
      category_name: string;
    }
}

interface PlantColumn {
  key: keyof Omit<PlantTable, 'id'>;
  title: string;
  render?: (plant: PlantTable) => JSX.Element;
}

const PlantsManagement: React.FC = () => {
  const [Categories, setCategories] = useState<Category[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [newPlant, setNewPlant] = useState<Omit<PlantTable, "id" | "created_at">>({
    plant_name: "",
    scientific_name: "",
    image_url: [],
    overview: [],
    characteristic: [],
    function: [],
    meaning: [],
    difficulty_level: "EASY",
    soil_type: "LOAM",
    category_id: "",
    habitatLocation: "INDOOR",
    minTemperature: 0,
    maxTemperature: 0,
    minMatureSize: 0,
    maxMatureSize: 0,
    humidityRange: "MEDIUM",
    lightRequirement: "MEDIUM",
    approved_content: false,
    Category: {
      category_name: "",
    }
  });

  useEffect(() => {
    async function fetchPlants() {
      try {
        const data = await plantService.getPlants();
        setPlants(data);
        console.log('data cây trông: ', data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    }
    fetchPlants();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoryData = await categoryService.getAllCategories();
        setCategories(categoryData);
        console.log('data danh mục: ', categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  // const handleEdit = (id: number) => {
  //   const plantToEdit = plantData.find(plant => plant.id === id);
  //   if (plantToEdit) {
  //     setNewPlant({
  //       name: plantToEdit.name,
  //       scientificName: plantToEdit.scientificName,
  //       image: plantToEdit.image,
  //       overview: plantToEdit.overview,
  //       characteristic: plantToEdit.characteristic,
  //       function: plantToEdit.function,
  //       meaning: plantToEdit.meaning,
  //       difficulty_level: plantToEdit.difficulty_level,
  //       soil_type: plantToEdit.soil_type,
  //       category_id: plantToEdit.category_id,
  //       habitatLocation: plantToEdit.habitatLocation,
  //       minTemperature: plantToEdit.minTemperature,
  //       maxTemperature: plantToEdit.maxTemperature,
  //       minMatureSize: plantToEdit.minMatureSize,
  //       maxMatureSize: plantToEdit.maxMatureSize,
  //       humidityRange: plantToEdit.humidityRange,
  //       lightRequirement: plantToEdit.lightRequirement,
  //       approved_content: plantToEdit.approved_content
  //     });
  //     setShowAddForm(true);
  //   }
  // };
  // const handleDelete = (id: number) => {
  //   if (window.confirm('Bạn có chắc muốn xóa không?')) {
  //     setPlantData(prev => prev.filter(plant => plant.id !== id));
  //   }
  // };

  // const isValidUrl = (url: string) => {
  //   try {
  //     new URL(url);
  //     return url.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i) !== null;
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // };

  // const handleAddPlant = () => {
  //   if (!isValidUrl(newPlant.image)) {
  //     alert(
  //       'URL hình ảnh không hợp lệ! Vui lòng nhập URL kết thúc bằng .jpg, .jpeg, .png, .gif, .bmp hoặc .webp'
  //     );
  //     return;
  //   }

  //   const newId = Math.max(...plantData.map(p => p.id)) + 1;
  //   setPlantData(prev => [...prev, { ...newPlant, id: newId }]);
  //   setShowAddForm(false);
  //   setNewPlant({
  //     name: '',
  //     scientificName: '',
  //     image: '',
  //     overview: '',
  //     characteristic: '',
  //     function: '',
  //     meaning: '',
  //     difficulty_level: 'EASY',
  //     soil_type: 'LOAMY',
  //     category_id: '',
  //     habitatLocation: 'INDOOR',
  //     minTemperature: 0,
  //     maxTemperature: 0,
  //     minMatureSize: 0,
  //     maxMatureSize: 0,
  //     humidityRange: 'MEDIUM',
  //     lightRequirement: 'MEDIUM',
  //     approved_content: false
  //   });
  // };

  const plantColumns: PlantColumn[] = [
    {
      key: "image_url",
      title: "Hình ảnh",
      render: (plant: PlantTable) => (
        <img
          src={plant.image_url[0] || "/default-image.jpg"}
          alt={plant.plant_name}
          className="h-20 w-32 rounded-full object-cover"
        />
      ),
    },
    { key: "plant_name", title: "Tên cây trồng" },
    { key: "scientific_name", title: "Tên khoa học" },
    {
      key: "overview",
      title: "Tổng quan",
      render: (plant: PlantTable) => <span>{plant.overview.join(", ")}</span>,
    },
    {
      key: "characteristic",
      title: "Đặc điểm",
      render: (plant: PlantTable) => <span>{plant.characteristic.join(", ")}</span>,
    },
    {
      key: "function",
      title: "Công dụng",
      render: (plant: PlantTable) => <span>{plant.function.join(", ")}</span>,
    },
    {
      key: "meaning",
      title: "Ý nghĩa",
      render: (plant: PlantTable) => <span>{plant.meaning.join(", ")}</span>,
    },
    { key: "difficulty_level", title: "Độ khó" },
    { key: "soil_type", title: "Loại đất" },
    { key: "category_id", title: "ID danh mục" },
    { key: "habitatLocation", title: "Vị trí sinh trưởng" },
    {
      key: "minTemperature",
      title: "Nhiệt độ tối thiểu (°C)",
      render: (plant: PlantTable) => <span>{plant.minTemperature}°C</span>,
    },
    {
      key: "maxTemperature",
      title: "Nhiệt độ tối đa (°C)",
      render: (plant: PlantTable) => <span>{plant.maxTemperature}°C</span>,
    },
    {
      key: "minMatureSize",
      title: "Kích thước tối thiểu (cm)",
      render: (plant: PlantTable) => <span>{plant.minMatureSize} cm</span>,
    },
    {
      key: "maxMatureSize",
      title: "Kích thước tối đa (cm)",
      render: (plant: PlantTable) => <span>{plant.maxMatureSize} cm</span>,
    },
    { key: "humidityRange", title: "Độ ẩm" },
    { key: "lightRequirement", title: "Yêu cầu ánh sáng" },
    {
      key: "approved_content",
      title: "Duyệt nội dung",
      render: (plant: PlantTable) => (
        <span
          className={`px-2 py-1 rounded ${
            plant.approved_content ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {plant.approved_content ? "Đã duyệt" : "Chưa duyệt"}
        </span>
      ),
    },
  ];
  

  const actionColumn: ActionColumn<PlantTable> = {
    title: 'Hành động',
    actions: [
      {
        label: 'Sửa',
        onClick: plant => 
          // handleEdit(plant.id)
          {}
        ,
        className: 'bg-blue-400 hover:bg-blue-600'
      },
      {
        label: 'Xóa',
        onClick: plant => 
          // handleDelete(plant.id)
          {}
        , 
        className: 'bg-red-400 hover:bg-red-700'
      }
    ]
  };

  return (
    <>
      <div className="flex justify-end pt-5 pr-2 pb-0.5">
        <button
          onClick={() => {
            setShowForm(!showForm);
            // if (!showForm) resetUserForm();
          }}
          className={`rounded px-4 py-2 text-white ${!showForm ? 'bg-green-500 hover:bg-green-900' : 'bg-red-500 hover:bg-red-400'}`}
        >
          {showForm ? 'X' : 'Thêm cây trồng'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold">Thêm cây mới</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleAddPlant();
            }}
          >
            {plantColumns.map(column =>
              column.key !== 'image_url' ? (
                <div key={column.key} className="mb-3">
                  <label className="mb-1 block text-sm font-medium">
                    {column.title} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={String(
                      newPlant[column.key as keyof typeof newPlant]
                    )}
                    onChange={e =>
                      setNewPlant(prev => ({
                        ...prev,
                        [column.key]: e.target.value
                      }))
                    }
                    className="w-full rounded border p-2"
                    required
                  />
                </div>
              ) : (
                <div key={column.key} className="mb-3">
                  <label className="mb-1 block text-sm font-medium">
                    {column.title} (URL) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newPlant.image_url}
                    onChange={e =>
                      setNewPlant(prev => ({ ...prev, image: e.target.value }))
                    }
                    className="w-full rounded border p-2"
                    required
                    placeholder="Nhập URL kết thúc bằng .jpg, .jpeg, .png, .gif, .bmp hoặc .webp"
                  />
                </div>
              )
            )}

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Mức độ khó <span className="text-red-500">*</span>
              </label>
              <select
                value={newPlant.difficulty_level}
                onChange={e =>
                  setNewPlant(prev => ({
                    ...prev,
                    difficulty_level: e.target.value as
                      | 'EASY'
                      | 'MEDIUM'
                      | 'HARD'
                  }))
                }
                className="w-full rounded border p-2"
                required
              >
                <option value="">Chọn mức độ khó</option>
                <option value="EASY">Dễ</option>
                <option value="MEDIUM">Trung bình</option>
                <option value="HARD">Khó</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Loại đất <span className="text-red-500">*</span>
              </label>
              <select
                value={newPlant.soil_type}
                onChange={e =>
                  setNewPlant(prev => ({
                    ...prev,
                    soil_type: e.target.value as
                      | 'CLAY'
                      | 'SANDY'
                      | 'SILTY'
                      | 'PEATY'
                      | 'CHALKY'
                      | 'LOAMY'
                  }))
                }
                className="w-full rounded border p-2"
                required
              >
                <option value="">Chọn loại đất</option>
                <option value="LOAMY">Đất thịt</option>
                <option value="SANDY">Đất cát</option>
                <option value="CLAY">Đất sét</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                ID Danh mục <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newPlant.category_id}
                onChange={e =>
                  setNewPlant(prev => ({
                    ...prev,
                    category_id: e.target.value
                  }))
                }
                className="w-full rounded border p-2"
                required
              />
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Vị trí sinh sống <span className="text-red-500">*</span>
              </label>
              <select
                value={newPlant.habitatLocation}
                onChange={e =>
                  setNewPlant(prev => ({
                    ...prev,
                    habitatLocation: e.target.value as
                      | 'INDOOR'
                      | 'OUTDOOR'
                      | 'BOTH'
                  }))
                }
                className="w-full rounded border p-2"
                required
              >
                <option value="">Chọn vị trí</option>
                <option value="INDOOR">Trong nhà</option>
                <option value="OUTDOOR">Ngoài trời</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Nhiệt độ (°C) <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newPlant.minTemperature}
                  onChange={e =>
                    setNewPlant(prev => ({
                      ...prev,
                      minTemperature: Number(e.target.value)
                    }))
                  }
                  className="w-1/2 rounded border p-2"
                  placeholder="Tối thiểu"
                  required
                />
                <input
                  type="number"
                  value={newPlant.maxTemperature}
                  onChange={e =>
                    setNewPlant(prev => ({
                      ...prev,
                      maxTemperature: Number(e.target.value)
                    }))
                  }
                  className="w-1/2 rounded border p-2"
                  placeholder="Tối đa"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Kích thước trưởng thành (m){' '}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newPlant.minMatureSize}
                  onChange={e =>
                    setNewPlant(prev => ({
                      ...prev,
                      minMatureSize: Number(e.target.value)
                    }))
                  }
                  className="w-1/2 rounded border p-2"
                  placeholder="Tối thiểu"
                  required
                />
                <input
                  type="number"
                  value={newPlant.maxMatureSize}
                  onChange={e =>
                    setNewPlant(prev => ({
                      ...prev,
                      maxMatureSize: Number(e.target.value)
                    }))
                  }
                  className="w-1/2 rounded border p-2"
                  placeholder="Tối đa"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Độ ẩm <span className="text-red-500">*</span>
              </label>
              <select
                value={newPlant.humidityRange}
                onChange={e =>
                  setNewPlant(prev => ({
                    ...prev,
                    humidityRange: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH'
                  }))
                }
                className="w-full rounded border p-2"
                required
              >
                <option value="">Chọn độ ẩm</option>
                <option value="LOW">Thấp</option>
                <option value="MEDIUM">Trung bình</option>
                <option value="HIGH">Cao</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Yêu cầu ánh sáng <span className="text-red-500">*</span>
              </label>
              <select
                value={newPlant.lightRequirement}
                onChange={e =>
                  setNewPlant(prev => ({
                    ...prev,
                    lightRequirement: e.target.value as
                      | 'LOW'
                      | 'MEDIUM'
                      | 'HIGH'
                  }))
                }
                className="w-full rounded border p-2"
                required
              >
                <option value="">Chọn yêu cầu ánh sáng</option>
                <option value="LOW">Thấp</option>
                <option value="MEDIUM">Trung bình</option>
                <option value="HIGH">Cao</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                Lưu
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      <Table
        data={plants}
        columns={plantColumns}
        actionColumn={actionColumn}
        
      />
    </>
  );
};
export default PlantsManagement;
