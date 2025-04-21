import {
  DifficultyLevel,
  LevelType,
  PlantCategoryType,
  SoilType
} from '../../../constants';
import { Phase } from '../../../types/plant';

export interface ImageGalleryProps {
  images?: string[];
  plantName: string;
}

export interface BasicInformationProps {
  plantName: string;
  scientificName: string;
  difficultyLevel: DifficultyLevel;
}

export interface CharacteristicsProps {
  characteristics: string[];
}

export interface HeaderWithActionsProps {
  plantName: string;
  scientificName: string;
  onEdit: () => void;
  onDelete: () => void;
}

export interface OverviewProps {
  paragraphs: string[];
}

export interface GrowingConditionsProps {
  soilType: SoilType;
  habitatLocation: PlantCategoryType;
  minMatureSize: number;
  maxMatureSize: number;
}

export interface ClimateRequirementsProps {
  minTemperature: number;
  maxTemperature: number;
  humidityRange: LevelType;
  lightRequirement: LevelType;
}
export interface FunctionsProps {
  functions: string[];
}

export interface MeaningProps {
  meanings: string[];
}

export interface GrowthPhasesProps {
  phases: Phase[];
}
