import { useState, useEffect } from 'react';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

import { Table, PlantDetailsPopup } from '../../../components';
import type { ActionColumn  } from '../../../components';
import type { Plant, Category } from '../../../types';
import { plantService, categoryService } from '../../../api';
import { CircleCheckBig, CircleX } from 'lucide-react';

export interface PlantTable {
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
  Category: {
    category_name: string;
  };
}

interface PlantColumn {
  key: keyof Omit<PlantTable, 'id'>;
  title: string;
  render?: (plant: PlantTable) => JSX.Element;
}

const PlantsManagement: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEdit, setIsEdit] = useState(false); // Mặc định là false (thêm mới)
  const [Categories, setCategories] = useState<Category[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState<PlantTable | null>(null);

  const [newPlant, setNewPlant] = useState<
    Omit<PlantTable, 'id' | 'created_at' | 'Category'>
  >({
    plant_name: '',
    scientific_name: '',
    image_url: [],
    overview: [],
    characteristic: [],
    function: [],
    meaning: [],
    difficulty_level: 'EASY',
    soil_type: 'LOAM',
    category_id: '',
    habitatLocation: 'INDOOR',
    minTemperature: 0,
    maxTemperature: 0,
    minMatureSize: 0,
    maxMatureSize: 0,
    humidityRange: 'MEDIUM',
    lightRequirement: 'MEDIUM',
    approved_content: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plants, categories] = await Promise.all([
          plantService.getPlants(),
          categoryService.getAllCategories()
        ]);
        // Sắp xếp dữ liệu theo approved_content (true hiện trước)
        const sortedPlants = plants.sort((a, b) => {
          if (a.approved_content === b.approved_content) return 0; // Giữ nguyên thứ tự nếu bằng nhau
          return a.approved_content ? -1 : 1; // approved_content = true sẽ được đưa lên đầu
        });

        setPlants(sortedPlants);
        setCategories(categories);
        setLoading(false);

        console.log('data cây trồng: ', plants);
        console.log('data danh mục: ', categories);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hàm kiểm tra URL hợp lệ
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const validateField = (field: string, value: any) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'plant_name':
        if (!value.trim()) {
          newErrors.plant_name = 'Tên cây trồng là bắt buộc';
        } else {
          delete newErrors.plant_name;
        }
        break;

      case 'scientific_name':
        if (!value.trim()) {
          newErrors.scientific_name = 'Tên khoa học là bắt buộc';
        } else {
          delete newErrors.scientific_name;
        }
        break;

      case 'image_url':
        if (value.length === 0) {
          newErrors.image_url = 'Hình ảnh là bắt buộc';
        } else if (value.some((url: string) => !isValidUrl(url))) {
          newErrors.image_url = 'Một hoặc nhiều URL không hợp lệ';
        } else {
          delete newErrors.image_url;
        }
        break;

      case 'overview':
        if (value.length === 0) {
          newErrors.overview = 'Mô tả tổng quan là bắt buộc';
        } else {
          delete newErrors.overview;
        }
        break;
      case 'characteristic':
        if (value.length === 0) {
          newErrors.characteristic = 'Đặc điểm là bắt buộc';
        } else {
          delete newErrors.characteristic;
        }
        break;

      case 'function':
        if (value.length === 0) {
          newErrors.function = 'Công dụng là bắt buộc';
        } else {
          delete newErrors.function;
        }
        break;

      case 'meaning':
        if (value.length === 0) {
          newErrors.meaning = 'Ý nghĩa là bắt buộc';
        } else {
          delete newErrors.meaning;
        }
        break;

      case 'category_id':
        if (!value) {
          newErrors.category_id = 'Danh mục là bắt buộc';
        } else {
          delete newErrors.category_id;
        }
        break;

      case 'minTemperature':
        if (value < 0 || value > 100) {
          newErrors.minTemperature = 'Nhiệt độ tối thiểu phải từ 0 đến 100°C';
        } else {
          delete newErrors.minTemperature;
        }
        break;

      case 'maxTemperature':
        if (value < 0 || value > 100) {
          newErrors.maxTemperature = 'Nhiệt độ tối đa phải từ 0 đến 100°C';
        } else {
          delete newErrors.maxTemperature;
        }
        break;
      case 'minMatureSize':
        if (value < 1 || value > 100) {
          newErrors.minMatureSize =
            'Kích thước trưởng thành tối thiểu phải từ 1 đến 100 cm';
        } else {
          delete newErrors.minMatureSize;
        }
        break;
      case 'maxMatureSize':
        if (value < 1 || value > 20000) {
          newErrors.maxMatureSize =
            'Kích thước trưởng thành tối đa phải từ 1 đến 200 m';
        } else {
          delete newErrors.maxMatureSize;
        }
        break;

      // Thêm các trường khác tương tự
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleInputChange = (field: string, value: any) => {
    let newValue = value;

    // Xử lý đặc biệt cho các trường là mảng
    if (
      field === 'image_url' ||
      field === 'overview' ||
      field === 'characteristic' ||
      field === 'function' ||
      field === 'meaning'
    ) {
      // Tách chuỗi nhập vào thành mảng các phần tử
      newValue = value.split(',').map((item: string) => item.trim());
      // Loại bỏ các phần tử rỗng
      newValue = newValue.filter((item: string) => item.trim() !== '');
    }
    // Xử lý đặc biệt cho trường approved_content
    if (field === 'approved_content') {
      newValue = value === 'true'; // Chuyển đổi chuỗi 'true' hoặc 'false' thành boolean
    }

    setNewPlant(prev => ({
      ...prev,
      [field]: newValue
    }));

    // Validate real-time
    validateField(field, newValue);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Kiểm tra từng trường
    if (!newPlant.plant_name.trim()) {
      newErrors.plant_name = 'Tên cây trồng là bắt buộc';
    }
    if (!newPlant.scientific_name.trim()) {
      newErrors.scientific_name = 'Tên khoa học là bắt buộc';
    }
    if (newPlant.image_url.length === 0) {
      newErrors.image_url = 'Hình ảnh là bắt buộc';
    }
    if (newPlant.overview.length === 0) {
      newErrors.overview = 'Mô tả tổng quan là bắt buộc';
    }
    if (newPlant.characteristic.length === 0) {
      newErrors.characteristic = 'Đặc điểm là bắt buộc';
    }
    if (newPlant.function.length === 0) {
      newErrors.function = 'Công dụng là bắt buộc';
    }
    if (newPlant.meaning.length === 0) {
      newErrors.meaning = 'Ý nghĩa là bắt buộc';
    }
    if (!newPlant.category_id) {
      newErrors.category_id = 'Danh mục là bắt buộc';
    }
    if (newPlant.minTemperature < 0 || newPlant.minTemperature > 100) {
      newErrors.minTemperature = 'Nhiệt độ tối thiểu phải từ 0 đến 100°C';
    }
    if (newPlant.maxTemperature < 0 || newPlant.maxTemperature > 100) {
      newErrors.maxTemperature = 'Nhiệt độ tối đa phải từ 0 đến 100°C';
    }
    if (newPlant.minMatureSize < 1 || newPlant.minMatureSize > 100) {
      newErrors.minMatureSize =
        'Kích thước trưởng thành tối thiểu phải từ 0 đến 100 cm';
    }
    if (newPlant.maxMatureSize < 1 || newPlant.maxMatureSize > 20000) {
      newErrors.maxMatureSize =
        'Kích thước trưởng thành tối đa phải từ 0 đến 200 m';
    }

    setErrors(newErrors);

    // Trả về true nếu không có lỗi
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (id: string) => {
    // set màn hinh kéo lên đầu trang
    window.scrollTo(0, 0);
    setIsEdit(true);

    const plantToEdit = plants.find(plant => plant.id === id);
    if (plantToEdit) {
      const category = Categories.find(
        category => category.id === plantToEdit.category_id
      );
      setNewPlant({
        ...plantToEdit, // Sao chép tất cả thông tin của cây trồng
        category_name: category?.category_name || ''
      });
      // Đặt trạng thái chỉnh sửa
      setShowForm(true); // Hiển thị form
    }
  };

  const handleAddPlant = async () => {
    try {

      console.log('Before API call:', newPlant);
      const createdPlant = await plantService.createPlant(newPlant);
      console.log('After API call:', createdPlant);

      // Tìm danh mục từ danh sách Categories
      const category = Categories.find(
        cat => cat.id === createdPlant.category_id
      );

      // Thêm thông tin danh mục vào cây trồng mới
      const plantWithCategory = {
        ...createdPlant,
        Category: category || { category_name: 'Chưa xác định' } // Nếu không tìm thấy danh mục
      };

      // Cập nhật state `plants` để hiển thị cây trồng mới trong bảng
      setPlants(prevPlants => [plantWithCategory, ...prevPlants]);

      // Đóng form và reset form
      resetForm();

      toast.success('Cây trồng đã được thêm thành công!');
    } catch (error) {
      console.error('Error creating plant:', error);
      toast.error('Có lỗi xảy ra khi thêm cây trồng. Vui lòng thử lại!');
    }
  };

  const handleUpdatePlant = async () => {
    try {
      // Tạo một đối tượng mới chỉ chứa các trường hợp lệ
      const updateData = {
        plant_name: newPlant.plant_name,
        scientific_name: newPlant.scientific_name,
        overview: newPlant.overview,
        characteristic: newPlant.characteristic,
        function: newPlant.function,
        meaning: newPlant.meaning,
        image_url: newPlant.image_url,
        difficulty_level: newPlant.difficulty_level,
        soil_type: newPlant.soil_type,
        category_id: newPlant.category_id, // Chỉ gửi category_id, không gửi Category hoặc category_name
        habitatLocation: newPlant.habitatLocation,
        minTemperature: newPlant.minTemperature,
        maxTemperature: newPlant.maxTemperature,
        minMatureSize: newPlant.minMatureSize,
        maxMatureSize: newPlant.maxMatureSize,
        humidityRange: newPlant.humidityRange,
        lightRequirement: newPlant.lightRequirement,
        approved_content: newPlant.approved_content
      };

      console.log('Dữ liệu được gửi lên API để cập nhật:', updateData);

      const updatedPlant = await plantService.updatePlant(
        newPlant.id,
        updateData
      );
      console.log('Phản hồi từ API sau khi cập nhật:', updatedPlant);

      // Cập nhật state `plants` để hiển thị cây trồng đã cập nhật
      const updatedPlants = plants.map(plant =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      );
      // Sắp xếp lại dữ liệu
      const sortedPlants = updatedPlants.sort((a, b) =>
        a.approved_content === b.approved_content
          ? 0
          : a.approved_content
            ? -1
            : 1
      );

      setPlants(sortedPlants);

      // Đóng form và reset form
      resetForm();

      toast.success('Cây trồng đã được cập nhật thành công!');
    } catch (error: any) {
      console.error('Error updating plant:', error);

      if (error.response) {
        console.error('Phản hồi lỗi từ API:', error.response.data);
        toast.error(
          `Lỗi từ API: ${error.response.data.message || 'Vui lòng thử lại!'}`
        );
      } else {
        toast.error('Có lỗi xảy ra khi cập nhật cây trồng. Vui lòng thử lại!');
      }
    }
  };

  const resetForm = () => {
    setNewPlant({
      plant_name: '',
      scientific_name: '',
      image_url: [],
      overview: [],
      characteristic: [],
      function: [],
      meaning: [],
      difficulty_level: 'EASY',
      soil_type: 'LOAM',
      category_id: '',
      habitatLocation: 'INDOOR',
      minTemperature: 0,
      maxTemperature: 0,
      minMatureSize: 0,
      maxMatureSize: 0,
      humidityRange: 'MEDIUM',
      lightRequirement: 'MEDIUM',
      approved_content: false
    });
    setIsEdit(false); // Đặt lại trạng thái chỉnh sửa
    setShowForm(false); // Đóng form
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra form trước khi submit
    if (!validateForm()) {
      console.log('Validation failed');
      return;
    }

    // Kiểm tra lại dữ liệu trước khi gửi
    console.log('Data to be sent:', newPlant);

    if (isEdit) {
      await handleUpdatePlant(); // Cập nhật nếu đang ở chế độ chỉnh sửa
    } else {
      await handleAddPlant(); // Thêm mới nếu không phải chỉnh sửa
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Xác nhận xóa cây trồng',
      text: 'Bạn có chắc muốn xóa cây trồng này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Xác nhận xóa',
      cancelButtonText: 'Hủy'
    });
    if (result.isConfirmed) {
      try {
        // Gọi API xóa cây trồng
        await plantService.deletePlant(id);

        // Cập nhật lại danh sách cây trồng sau khi xóa
        setPlants(prevPlants => prevPlants.filter(plant => plant.id !== id));

        toast.success('Cây trồng đã được xóa thành công!');
      } catch (error) {
        console.error('Error deleting plant:', error);
        toast.error('Có lỗi xảy ra khi xóa cây trồng. Vui lòng thử lại!');
      }
    }
  };

  const handleShowDetails = (id: string) => {
    const plant = plants.find(plant => plant.id === id);
    if (plant) {
      setSelectedPlant(plant);
    }
  };

  const handleClosePopup = () => {
    setSelectedPlant(null);
  };

  const plantColumns: PlantColumn[] = [
    {
      key: 'image_url',
      title: 'Hình ảnh',
      render: (plant: PlantTable) => (
        <img
          src={plant.image_url?.[0] || '/defaultPlant.png'}
          alt={plant.plant_name}
          className="h-48 w-44 rounded-2xl object-cover"
        />
      )
    },
    { key: 'plant_name', title: 'Tên cây trồng' },
    { key: 'scientific_name', title: 'Tên khoa học' },
    {
      key: 'overview',
      title: 'Tổng quan',
      render: (plant: PlantTable) => (
        <span>
          {plant.overview.map((item, index) => (
            <React.Fragment key={index}>
              {item}
              <br />
            </React.Fragment>
          ))}
        </span>
      )
    },
    {
      key: 'characteristic',
      title: 'Đặc điểm',
      render: (plant: PlantTable) => (
        <span>
          {plant.characteristic.map((item, index) => (
            <React.Fragment key={index}>
              {item}
              <br />
            </React.Fragment>
          ))}
        </span>
      )
    },
    {
      key: 'function',
      title: 'Công dụng',
      render: (plant: PlantTable) => (
        <span>
          {plant.function.map((item, index) => (
            <React.Fragment key={index}>
              {item}
              <br />
            </React.Fragment>
          ))}
        </span>
      )
    },
    {
      key: 'meaning',
      title: 'Ý nghĩa',
      render: (plant: PlantTable) => (
        <span>
          {plant.meaning.map((item, index) => (
            <React.Fragment key={index}>
              <p className="pb-1">{item}</p>
            </React.Fragment>
          ))}
        </span>
      )
    },
    {
      key: 'category_id',
      title: 'Danh mục',
      render: (plant: PlantTable) => (
        <span>
          {plant.category_id ? plant.Category?.category_name : 'Chưa xác định'}
        </span>
      )
    },
    {
      key: 'approved_content',
      title: 'Duyệt nội dung',
      render: (plant: PlantTable) => (
        <span
          className={`flex justify-center rounded px-2 py-1 ${
            plant.approved_content
              ? 'font-semibold text-green-700'
              : 'font-semibold text-red-500'
          }`}
        >
          {plant.approved_content ? (
            <CircleCheckBig size={32} />
          ) : (
            <CircleX size={32} />
          )}
        </span>
      )
    }
  ];

  const actionColumn: ActionColumn<PlantTable> = {
    title: 'Hành động',
    actions: [
      {
        label: 'Sửa',
        onClick: plant => handleEdit(plant.id), // Gọi hàm handleEdit
        className: 'bg-blue-400 hover:bg-blue-600 ',
        id: plant => `update-btn-${plant.id}`
      },
      {
        label: 'Xóa',
        onClick: plant => handleDelete(plant.id),
        className: 'bg-red-400 hover:bg-red-700',
        id: plant => `delete-btn-${plant.id}`
      },
      {
        label: 'Chi tiết',
        onClick: plant => handleShowDetails(plant.id),
        className: 'bg-gray-300 hover:bg-gray-500',
        id: plant => `detail-btn-${plant.id}`
      }
    ]
  };

  return (
    <>
      <div className="flex justify-end pt-5 pr-2 pb-0.5">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setErrors({});
            if (isEdit) resetForm();
          }}
          className={`rounded px-4 py-2 text-white ${!showForm ? 'bg-green-500 hover:bg-green-900' : 'bg-red-500 hover:bg-red-400'}`}
        >
          {showForm ? 'X' : 'Thêm cây trồng'}
        </button>
      </div>
      {showForm && (
        <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold">
            {isEdit ? 'Chỉnh sửa cây trồng' : 'Thêm cây mới'}
          </h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            {/* Tên cây trồng */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Tên cây trồng <span className="text-red-500">*</span>
              </label>
              <input
                id="input-plant_name"
                type="text"
                value={newPlant.plant_name}
                onChange={e => handleInputChange('plant_name', e.target.value)}
                className="w-full rounded border p-2"
              />
              {errors.plant_name && (
                <p className="mt-1 text-sm text-red-500">{errors.plant_name}</p>
              )}
            </div>

            {/* Tên khoa học */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Tên khoa học <span className="text-red-500">*</span>
              </label>
              <input
                id="input-scientific_name"
                type="text"
                value={newPlant.scientific_name}
                onChange={e =>
                  handleInputChange('scientific_name', e.target.value)
                }
                className="w-full rounded border p-2"
              />
              {errors.scientific_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.scientific_name}
                </p>
              )}
            </div>

            {/* URL hình ảnh */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                URL hình ảnh
                <span className="text-red-500">*</span>
              </label>
              <input
                id="input-image_url"
                type="text"
                value={newPlant.image_url.join(', ')}
                onChange={e => handleInputChange('image_url', e.target.value)}
                className="w-full rounded border p-2"
              />
              {errors.image_url && (
                <p className="mt-1 text-sm text-red-500">{errors.image_url}</p>
              )}
            </div>

            {/* Mô tả tổng quan */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Mô tả tổng quan
                <span className="text-red-500">*</span>
              </label>
              <input
                id="input-overview"
                type="text"
                value={newPlant.overview.join(', ')}
                onChange={e => handleInputChange('overview', e.target.value)}
                className="w-full rounded border p-2"
              />
              {errors.overview && (
                <p className="mt-1 text-sm text-red-500">{errors.overview}</p>
              )}
            </div>

            {/* Đặc điểm */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Đặc điểm 
                <span className="text-red-500">*</span>
              </label>
              <input
                id="input-characteristic"
                type="text"
                value={newPlant.characteristic.join(', ')}
                onChange={e =>
                  handleInputChange('characteristic', e.target.value)
                }
                className="w-full rounded border p-2"
              />
              {errors.characteristic && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.characteristic}
                </p>
              )}
            </div>

            {/* Công dụng */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Công dụng
                <span className="text-red-500">*</span>
              </label>
              <input
                id="input-function"
                type="text"
                value={newPlant.function.join(', ')}
                onChange={e => handleInputChange('function', e.target.value)}
                className="w-full rounded border p-2"
              />
              {errors.function && (
                <p className="mt-1 text-sm text-red-500">{errors.function}</p>
              )}
            </div>

            {/* Ý nghĩa */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Ý nghĩa
                <span className="text-red-500">*</span>
              </label>
              <input
                id="input-meaning"
                type="text"
                value={newPlant.meaning.join(', ')}
                onChange={e => handleInputChange('meaning', e.target.value)}
                className="w-full rounded border p-2"
              />
              {errors.meaning && (
                <p className="mt-1 text-sm text-red-500">{errors.meaning}</p>
              )}
            </div>

            {/* Mức độ khó */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Mức độ khó <span className="text-red-500">*</span>
              </label>
              <select
                id="input-difficulty_level"
                value={newPlant.difficulty_level}
                onChange={e => {
                  setNewPlant(prev => ({
                    ...prev,
                    difficulty_level: e.target.value as
                      | 'EASY'
                      | 'MEDIUM'
                      | 'HARD'
                      | 'VERY_HARD'
                      | 'EXTREME'
                  }));
                  validateField('difficulty_level', e.target.value);
                }}
                className="w-full rounded border p-2"
              >
                <option value="EASY">Dễ</option>
                <option value="MEDIUM">Trung bình</option>
                <option value="HARD">Khó</option>
                <option value="VERY_HARD">Rất khó</option>
                <option value="EXTREME">Cực kỳ khó</option>
              </select>
              {errors.difficulty_level && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.difficulty_level}
                </p>
              )}
            </div>

            {/* Loại đất */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Loại đất <span className="text-red-500">*</span>
              </label>
              <select
                id="input-soil_type"
                value={newPlant.soil_type}
                onChange={e => {
                  setNewPlant(prev => ({
                    ...prev,
                    soil_type: e.target.value as
                      | 'SANDY'
                      | 'CLAY'
                      | 'SILT'
                      | 'PEAT'
                      | 'CHALK'
                      | 'LOAM'
                  }));
                  validateField('soil_type', e.target.value);
                }}
                className="w-full rounded border p-2"
              >
                <option value="SANDY">Đất cát</option>
                <option value="CLAY">Đất sét</option>
                <option value="SILT">Đất bùn</option>
                <option value="PEAT">Đất than bùn</option>
                <option value="CHALK">Đất phấn</option>
                <option value="LOAM">Đất thịt</option>
              </select>
              {errors.soil_type && (
                <p className="mt-1 text-sm text-red-500">{errors.soil_type}</p>
              )}
            </div>

            {/* Danh mục */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <select
                id="input-category_id"
                value={newPlant.category_id}
                onChange={e => {
                  setNewPlant(prev => ({
                    ...prev,
                    category_id: e.target.value
                  }));
                  validateField('category_id', e.target.value);
                }}
                className="w-full rounded border p-2"
              >
                <option value="">Chọn danh mục</option>
                {Categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.category_id}
                </p>
              )}
            </div>

            {/* Vị trí sinh trưởng */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Vị trí sinh trưởng <span className="text-red-500">*</span>
              </label>
              <select
                id="input-habitatLocation"
                value={newPlant.habitatLocation}
                onChange={e => {
                  setNewPlant(prev => ({
                    ...prev,
                    habitatLocation: e.target.value as
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
                      | 'WALL_PLANTER'
                  }));
                  validateField('habitatLocation', e.target.value);
                }}
                className="w-full rounded border p-2"
              >
                <option value="INDOOR">Trong nhà</option>
                <option value="OUTDOOR">Ngoài trời</option>
                <option value="BALCONY">Ban công</option>
                <option value="GARDEN">Vườn</option>
                <option value="GREENHOUSE">Nhà kính</option>
                <option value="WINDOW_SILL">Bệ cửa sổ</option>
                <option value="KITCHEN">Nhà bếp</option>
                <option value="BATHROOM">Phòng tắm</option>
                <option value="TERRACE">Sân thượng</option>
                <option value="OFFICE">Văn phòng</option>
                <option value="HYDROPONICS">Thủy canh</option>
                <option value="WALL_PLANTER">Chậu treo tường</option>
              </select>
              {errors.habitatLocation && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.habitatLocation}
                </p>
              )}
            </div>

            {/* Nhiệt độ tối thiểu và tối đa */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Nhiệt độ (°C) <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  id="input-minTemperature"
                  type="number"
                  value={newPlant.minTemperature}
                  onChange={e => {
                    let value = Number(e.target.value);
                    //kiểm tra giá trị nhập vào
                    if (value < 0 || value > 100) {
                      if (!value) value = 0;
                      return value; // Dừng lại nếu giá trị không hợp lệ
                    }
                    setNewPlant(prev => ({
                      ...prev,
                      minTemperature: value
                    }));
                    validateField('minTemperature', value); // Gọi validation
                  }}
                  className="w-1/2 rounded border p-2"
                  placeholder="Tối thiểu"
                />
                {errors.minTemperature && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.minTemperature}
                  </p>
                )}

                <input
                  id="input-maxTemperature"
                  type="number"
                  value={newPlant.maxTemperature}
                  onChange={e => {
                    let value = Number(e.target.value);
                    // Kiểm tra giá trị nhập vào
                    if (value < 0 || value > 100) {
                      if (!value) value = 0;
                      return value ; // Dừng lại nếu giá trị không hợp lệ
                    }
                    setNewPlant(prev => ({
                      ...prev,
                      maxTemperature: value
                    }));
                    validateField('maxTemperature', value); // Gọi validation
                  }}
                  className="w-1/2 rounded border p-2"
                  placeholder="Tối đa"
                />
                {errors.maxTemperature && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.maxTemperature}
                  </p>
                )}
              </div>
            </div>

            {/* Kích thước trưởng thành tối thiểu và tối đa */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Kích thước trưởng thành (cm){' '}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  id="input-minMatureSize"
                  type="number"
                  value={newPlant.minMatureSize}
                  onChange={e => {
                    let value = Number(e.target.value);
                    // Kiểm tra giá trị nhập vào
                    if (value < 0 || value > 100) {
                      if (!value) value = 0;                      
                      return value; // Dừng lại nếu giá trị không hợp lệ
                    }
                    setNewPlant(prev => ({
                      ...prev,
                      minMatureSize: value
                    }));
                    validateField('minMatureSize', value); // Gọi validation
                  }}
                  className="w-1/2 rounded border p-2"
                  placeholder="Tối thiểu"
                />
                {errors.minMatureSize && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.minMatureSize}
                  </p>
                )}
                <input
                  id="input-maxMatureSize"
                  type="number"
                  value={newPlant.maxMatureSize}
                  onChange={e => {
                    let value = Number(e.target.value);
                    // Kiểm tra giá trị nhập vào
                    if (value < 0 || value > 20000) {
                      if (!value) value = 0;
                      
                      return value; // Dừng lại nếu giá trị không hợp lệ
                    }
                    setNewPlant(prev => ({
                      ...prev,
                      maxMatureSize: value
                    }));
                    validateField('maxMatureSize', value); // Gọi validation
                  }}
                  className="w-1/2 rounded border p-2"
                  placeholder="Tối đa"
                />
                {errors.maxMatureSize && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.maxMatureSize}
                  </p>
                )}
              </div>
            </div>

            {/* Độ ẩm */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Độ ẩm <span className="text-red-500">*</span>
              </label>
              <select
                id="input-humidityRange"
                value={newPlant.humidityRange}
                onChange={e => {
                  setNewPlant(prev => ({
                    ...prev,
                    humidityRange: e.target.value as
                      | 'NONE'
                      | 'VERY_LOW'
                      | 'LOW'
                      | 'MEDIUM'
                      | 'HIGH'
                      | 'VERY_HIGH'
                  }));
                  validateField('humidityRange', e.target.value);
                }}
                className="w-full rounded border p-2"
              >
                <option value="NONE">Không</option>
                <option value="VERY_LOW">Rất thấp</option>
                <option value="LOW">Thấp</option>
                <option value="MEDIUM">Trung bình</option>
                <option value="HIGH">Cao</option>
                <option value="VERY_HIGH">Rất cao</option>
              </select>
              {errors.humidityRange && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.humidityRange}
                </p>
              )}
            </div>

            {/* Yêu cầu ánh sáng */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Yêu cầu ánh sáng <span className="text-red-500">*</span>
              </label>
              <select
                id="input-lightRequirement"
                value={newPlant.lightRequirement}
                onChange={e => {
                  setNewPlant(prev => ({
                    ...prev,
                    lightRequirement: e.target.value as
                      | 'NONE'
                      | 'VERY_LOW'
                      | 'LOW'
                      | 'MEDIUM'
                      | 'HIGH'
                      | 'VERY_HIGH'
                  }));
                  validateField('lightRequirement', e.target.value);
                }}
                className="w-full rounded border p-2"
              >
                <option value="NONE">Không</option>
                <option value="VERY_LOW">Rất thấp</option>
                <option value="LOW">Thấp</option>
                <option value="MEDIUM">Trung bình</option>
                <option value="HIGH">Cao</option>
                <option value="VERY_HIGH">Rất cao</option>
              </select>
              {errors.lightRequirement && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lightRequirement}
                </p>
              )}
            </div>

            {/* Duyệt nội dung */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Duyệt nội dung <span className="text-red-500">*</span>
              </label>
              <select
                id="input-approvedContent"
                value={newPlant.approved_content ? 'true' : 'false'}
                onChange={e =>
                  handleInputChange('approved_content', e.target.value)
                }
                className="w-full rounded border p-2"
              >
                <option value="true">Đã duyệt</option>
                <option value="false">Chưa duyệt</option>
              </select>
              {errors.approved_content && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.approved_content}
                </p>
              )}
            </div>

            {/* Nút lưu và hủy */}
            <div className="flex gap-2">
              <button
                id="btn-save"
                type="submit"
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                {isEdit ? 'Cập nhật' : 'Lưu'}
              </button>
              <button
                id="btn-cancel"
                type="button"
                onClick={resetForm} // Gọi resetForm khi nhấn hủy
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Hiển thị popup khi có cây trồng được chọn */}
      {selectedPlant && (
        <PlantDetailsPopup plant={selectedPlant} onClose={handleClosePopup} />
      )}

      {loading? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <Table data={plants} columns={plantColumns} actionColumn={actionColumn} />
        
      )}
    </>
  );
};
export default PlantsManagement;
