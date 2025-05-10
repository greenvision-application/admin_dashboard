import React, { useState, useEffect } from 'react';
import { Category, Plant, UpdatePlant } from '../../../types';
import { FormHandlers, PlantUpdateFormProps } from './propTypes';
import { getPlantType } from '../../../services';
import { useFetchData } from '../../../hooks';
// Import all the tab components
import BasicInfoTab from './BasicInfoTabForm';
import CharacteristicsTab from './CharacteristicsTab';
import UsesTab from './UsesTab';
import MeaningsTab from './MeaningsTab';
import EnvironmentTab from './EnvironmentTab';
import ImagesTab from './ImagesTab';
import Sidebar from './SidebarPlant';
import ErrorSummary from './ErrorSummary';

const PlantUpdateForm: React.FC<PlantUpdateFormProps> = ({
  plantData,
  onSubmit
}) => {
  const { data } = useFetchData<Category[]>({
    fetchFn: getPlantType
  });
  const [formData, setFormData] = useState<UpdatePlant>(plantData);
  const [activeTab, setActiveTab] = useState<string>('basic');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(plantData);
  }, [plantData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? 0 : Number(value)
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleArrayItemChange = (
    arrayName: keyof Plant,
    index: number,
    value: string
  ) => {
    setFormData(prev => {
      // Ensure the array exists
      const currentArray = (prev[arrayName] as string[]) || [];
      const newArray = [...currentArray];
      newArray[index] = value;
      return {
        ...prev,
        [arrayName]: newArray
      };
    });
  };

  const addArrayItem = (arrayName: keyof Plant) => {
    setFormData(prev => {
      const currentArray = (prev[arrayName] as string[]) || [];
      return {
        ...prev,
        [arrayName]: [...currentArray, '']
      };
    });
  };

  const removeArrayItem = (arrayName: keyof Plant, index: number) => {
    setFormData(prev => {
      const currentArray = (prev[arrayName] as string[]) || [];
      const newArray = [...currentArray];
      newArray.splice(index, 1);
      return {
        ...prev,
        [arrayName]: newArray
      };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    if (!formData.plant_name?.trim()) {
      newErrors.plant_name = 'Plant name is required';
    }

    if (!formData.scientific_name?.trim()) {
      newErrors.scientific_name = 'Scientific name is required';
    }

    // Validate number ranges if needed
    if (formData.minTemperature! > formData.maxTemperature!) {
      newErrors.minTemperature =
        'Minimum temperature cannot be greater than maximum';
      newErrors.maxTemperature =
        'Maximum temperature cannot be less than minimum';
    }

    if (formData.minMatureSize! > formData.maxMatureSize!) {
      newErrors.minMatureSize = 'Minimum size cannot be greater than maximum';
      newErrors.maxMatureSize = 'Maximum size cannot be less than minimum';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // If there are validation errors, show them and return
      return;
    }

    // Clean up array data by filtering out empty strings
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { Category, Phase, ...omitData } = formData;
    const cleanedData = omitData;

    // Handle each array field individually for better type safety
    if (cleanedData.overview) {
      cleanedData.overview = cleanedData.overview.filter(
        item => item.trim() !== ''
      );
    }

    if (cleanedData.characteristic) {
      cleanedData.characteristic = cleanedData.characteristic.filter(
        item => item.trim() !== ''
      );
    }

    if (cleanedData.function) {
      cleanedData.function = cleanedData.function.filter(
        item => item.trim() !== ''
      );
    }

    if (cleanedData.meaning) {
      cleanedData.meaning = cleanedData.meaning.filter(
        item => item.trim() !== ''
      );
    }

    if (cleanedData.image_url) {
      cleanedData.image_url = cleanedData.image_url.filter(
        item => item.trim() !== ''
      );
    }

    // Submit the cleaned data
    onSubmit(cleanedData);
  };

  // All form handling functions are passed down to child components
  const formHandlers: FormHandlers = {
    handleChange,
    handleNumberChange,
    handleCheckboxChange,
    handleArrayItemChange,
    addArrayItem,
    removeArrayItem
  };

  return (
    <form onSubmit={handleSubmit} className="h-full">
      <div className="flex h-full">
        {/* Sidebar Component */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main content */}
        <div className="flex-1 overflow-auto p-4">
          {/* Basic Information */}
          {activeTab === 'basic' && (
            <BasicInfoTab
              formData={formData}
              errors={errors}
              formHandlers={formHandlers}
              categories={data || []}
            />
          )}

          {/* Characteristics */}
          {activeTab === 'details' && (
            <CharacteristicsTab
              formData={formData}
              formHandlers={formHandlers}
            />
          )}

          {/* Functions */}
          {activeTab === 'functions' && (
            <UsesTab formData={formData} formHandlers={formHandlers} />
          )}

          {/* Meanings */}
          {activeTab === 'meanings' && (
            <MeaningsTab formData={formData} formHandlers={formHandlers} />
          )}

          {/* Environment */}
          {activeTab === 'environment' && (
            <EnvironmentTab
              formData={formData}
              errors={errors}
              formHandlers={formHandlers}
            />
          )}

          {/* Images */}
          {activeTab === 'images' && (
            <ImagesTab formData={formData} formHandlers={formHandlers} />
          )}
        </div>
      </div>

      {/* Error Summary */}
      {Object.keys(errors).length > 0 && <ErrorSummary errors={errors} />}
    </form>
  );
};

export default PlantUpdateForm;
