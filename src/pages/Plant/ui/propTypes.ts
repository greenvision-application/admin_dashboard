import {
  DifficultyLevel,
  LevelType,
  PlantLocation,
  SoilType
} from '../../../constants';
import { Phase, UpdatePlant, Plant } from '../../../types';

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

export interface FormHandlers {
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleArrayItemChange: (
    arrayName: keyof Plant,
    index: number,
    value: string
  ) => void;
  addArrayItem: (arrayName: keyof Plant) => void;
  removeArrayItem: (arrayName: keyof Plant, index: number) => void;
}

export interface ErrorSummaryProps {
  errors: Record<string, string>;
}
