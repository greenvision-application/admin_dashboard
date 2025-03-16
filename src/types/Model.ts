//Here we will define all the types we will use in the project
// types/Modal.ts
export interface Category {
  id: string;
  created_at: string;
  category_name: string;
}
export interface Plant {
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
}

export interface Users {
  id: string;
  created_at: string;
  username: string | null;
  email: string;
  preferences: string | null;
  is_active: boolean;
  address: {
    ward: string;
    district: string;
    province: string;
  } | null;
  role_id: string;
  Role: {
    id: string;
    role_name: string;
  };
  password: string
}

export interface Role {
  id: string;
  role_name: string;
}

// Province dictric ward
export interface Ward {
  code: number;
  name: string;
}

export interface District {
  code: number;
  name: string;
  wards: Ward[];
}

export interface Province {
  code: number;
  name: string;
  districts: District[];
}

  