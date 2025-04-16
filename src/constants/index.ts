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
  plantDetail: (id: string | string[]) => `/plants/${id}`
};

enum PlantDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  VERY_HARD = 'VERY_HARD',
  EXTREME = 'EXTREME'
}
type DifficultyLevel = keyof typeof PlantDifficulty;

enum Soil {
  SANDY = 'SANDY',
  LOAM = 'LOAM',
  CLAY = 'CLAY',
  SILT = 'SILT',
  PEAT = 'PEAT',
  CHALK = 'CHALK'
}
type SoilType = keyof typeof Soil;

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

enum Level {
  NONE = 'NONE',
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH'
}
type LevelType = keyof typeof Level;

enum TaskStatus {
  DO = 'DO',
  DONE = 'DONE',
  NOT_YET = 'NOT_YET'
}
type TaskStatusType = keyof typeof TaskStatus;

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}
type GenderType = keyof typeof Gender;

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
  Gender
};
