import {
  DifficultyLevel,
  SoilType,
  PlantCategoryType,
  LevelType
} from '../constants';

export interface Category {
  id: string;
  created_at: Date;
  category_name: string;
  Plant: Plant[];
}

export interface Phase {
  id?: string;
  created_at?: Date;
  phase_name: string;
  desc?: string;
  duration?: number;
  size?: number;
  plant_id: string;
  // Care_instruction?: Care_instruction;
  Plant?: Plant;
}

export interface Plant {
  id: string;
  plant_name: string;
  scientific_name: string;
  overview: string[];
  characteristic: string[];
  function: string[];
  meaning: string[];
  image_url: string[];
  difficulty_level: DifficultyLevel;
  soil_type: SoilType;
  category_id: string | null;
  habitatLocation: PlantCategoryType;
  minTemperature: number;
  maxTemperature: number;
  minMatureSize: number;
  maxMatureSize: number;
  humidityRange: LevelType;
  lightRequirement: LevelType;
  approved_content: boolean;
  Category: Category | null;
  Phase?: Phase[];
  searchQuery?: string;
}
