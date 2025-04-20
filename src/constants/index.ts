//Here are all the constants used in the app
const apiUrl = import.meta.env.VITE_API_URL;
const methods = {
  post: 'POST',
  get: 'GET',
  put: 'PUT',
  delete: 'DELETE',
  patch: 'PATCH'
};

const urls = {
  plants: '/plants',
  plantDetail: (id: string) => `/plants/${id}`,
  deletePlant: (id: string) => `/plants/${id}`
};

enum PlantDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  VERY_HARD = 'VERY_HARD',
  EXTREME = 'EXTREME'
}
type DifficultyLevel = keyof typeof PlantDifficulty;
const getDifficultyColor = (level: DifficultyLevel) => {
  switch (level) {
    case PlantDifficulty.EASY:
      return 'bg-green-100 text-green-800';
    case PlantDifficulty.MEDIUM:
      return 'bg-yellow-100 text-yellow-800';
    case PlantDifficulty.HARD:
      return 'bg-orange-100 text-orange-800';
    case PlantDifficulty.VERY_HARD:
      return 'bg-red-100 text-red-800';
    case PlantDifficulty.EXTREME:
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

enum Soil {
  SANDY = 'SANDY',
  LOAM = 'LOAM',
  CLAY = 'CLAY',
  SILT = 'SILT',
  PEAT = 'PEAT',
  CHALK = 'CHALK'
}
type SoilType = keyof typeof Soil;
const getSoilType = (soil: SoilType) => {
  switch (soil) {
    case Soil.SANDY:
      return 'Sandy';
    case Soil.LOAM:
      return 'Loam';
    case Soil.CLAY:
      return 'Clay';
    case Soil.SILT:
      return 'Silt';
    case Soil.PEAT:
      return 'Peat';
    case Soil.CHALK:
      return 'Chalk';
    default:
      return 'Unknown';
  }
};

enum PlantCategory {
  INDOOR = 'INDOOR',
  OUTDOOR = 'OUTDOOR',
  BALCONY = 'BALCONY',
  GARDEN = 'GARDEN',
  GREENHOUSE = 'GREENHOUSE',
  WINDOW_SILL = 'WINDOW_SILL',
  KITCHEN = 'KITCHEN',
  BATHROOM = 'BATHROOM',
  TERRACE = 'TERRACE',
  OFFICE = 'OFFICE',
  HYDROPONICS = 'HYDROPONICS',
  WALL_PLANTER = 'WALL_PLANTER'
}
type PlantCategoryType = keyof typeof PlantCategory;
const getPlantCategory = (category: PlantCategoryType) => {
  switch (category) {
    case PlantCategory.INDOOR:
      return 'Indoor';
    case PlantCategory.OUTDOOR:
      return 'Outdoor';
    case PlantCategory.BALCONY:
      return 'Balcony';
    case PlantCategory.GARDEN:
      return 'Garden';
    case PlantCategory.GREENHOUSE:
      return 'Greenhouse';
    case PlantCategory.WINDOW_SILL:
      return 'Window Sill';
    case PlantCategory.KITCHEN:
      return 'Kitchen';
    case PlantCategory.BATHROOM:
      return 'Bathroom';
    case PlantCategory.TERRACE:
      return 'Terrace';
    case PlantCategory.OFFICE:
      return 'Office';
    case PlantCategory.HYDROPONICS:
      return 'Hydroponics';
    case PlantCategory.WALL_PLANTER:
      return 'Wall Planter';
    default:
      return 'Unknown';
  }
};

enum Level {
  NONE = 'NONE',
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH'
}
type LevelType = keyof typeof Level;
const getPercent = (level: LevelType) => {
  switch (level) {
    case Level.NONE:
      return 0;
    case Level.VERY_LOW:
      return 10;
    case Level.LOW:
      return 25;
    case Level.MEDIUM:
      return 50;
    case Level.HIGH:
      return 75;
    case Level.VERY_HIGH:
      return 100;
    default:
      return 50;
  }
};

enum TaskStatus {
  DO = 'DO',
  DONE = 'DONE',
  NOT_YET = 'NOT_YET'
}
type TaskStatusType = keyof typeof TaskStatus;
const getTaskStatus = (status: TaskStatusType) => {
  switch (status) {
    case TaskStatus.DO:
      return 'Do';
    case TaskStatus.DONE:
      return 'Done';
    case TaskStatus.NOT_YET:
      return 'Not Yet';
    default:
      return 'Unknown';
  }
};

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}
type GenderType = keyof typeof Gender;
const getGender = (gender: GenderType) => {
  switch (gender) {
    case Gender.MALE:
      return 'Male';
    case Gender.FEMALE:
      return 'Female';
    case Gender.OTHER:
      return 'Other';
    default:
      return 'Unknown';
  }
};

export type {
  DifficultyLevel,
  SoilType,
  PlantCategoryType,
  LevelType,
  TaskStatusType,
  GenderType
};

export default {
  apiUrl,
  methods,
  urls,
  PlantDifficulty,
  PlantCategory,
  Soil,
  Level,
  TaskStatus,
  Gender,
  getSoilType,
  getDifficultyColor,
  getPlantCategory,
  getTaskStatus,
  getGender,
  getPercent
};
