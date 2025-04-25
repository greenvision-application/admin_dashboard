import {
  DifficultyLevel,
  LevelType,
  PlantLocation,
  SoilType
} from '../../../constants';
import { Phase, UpdatePlant } from '../../../types';

export interface ImageGalleryProps {
  images?: string[];
  plantName: string;
}

export interface BasicInformationProps {
  plantName: string;
  scientificName: string;
  difficultyLevel: DifficultyLevel;
  plantType?: string;
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
  habitatLocation: PlantLocation;
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

export interface PlantUpdateFormProps {
  plantData: UpdatePlant;
  onSubmit: (data: UpdatePlant) => void;
}

export interface PlantUpdateContainerProps {
  plantData: UpdatePlant;
  onSubmit: (data: UpdatePlant) => Promise<void>;
  onCancel: () => void;
}
