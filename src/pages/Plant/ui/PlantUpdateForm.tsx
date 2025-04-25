import type React from 'react';
import { useState, useEffect } from 'react';
import {
  Save,
  Trash2,
  Plus,
  Sparkles,
  Mountain,
  Info,
  FileText,
  Heart,
  ImageIcon,
  X
} from 'lucide-react';
import { Category, Plant, UpdatePlant } from '../../../types';
import { PlantUpdateFormProps } from './propTypes';
import constants from '../../../constants';
import { Button } from '../../../components';
import { getPlantType } from '../../../services';
import { useFetchData } from '../../../hooks';

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

  const tabs = [
    { id: 'basic', label: 'Basic information', icon: <Info size={20} /> },
    { id: 'details', label: 'Characteristics', icon: <FileText size={20} /> },
    { id: 'functions', label: 'Uses', icon: <Sparkles size={20} /> },
    { id: 'meanings', label: 'Meanings', icon: <Heart size={20} /> },
    { id: 'environment', label: 'Environments', icon: <Mountain size={20} /> },
    { id: 'images', label: 'Images', icon: <ImageIcon size={20} /> }
  ];

  return (
    <form onSubmit={handleSubmit} className="h-full">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="flex w-56 flex-col gap-7 border-r border-gray-200 bg-gray-50 p-4">
          <nav className="space-y-1">
            {/* Tabs */}
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`text-md flex w-full items-center rounded-md px-3 py-2 font-medium ${
                  activeTab === tab.id
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Save button */}
          <Button
            type="submit"
            variant="icon"
            className="text-md inline-flex items-center border border-transparent bg-green-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
          >
            <Save size={18} className="mr-2" />
            Save new info
          </Button>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto p-4">
          {/* Basic Information */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="plant_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Plant name
                  </label>
                  <input
                    type="text"
                    id="plant_name"
                    name="plant_name"
                    value={formData.plant_name || ''}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${
                      errors.plant_name ? 'border-red-500' : 'border-gray-300'
                    } px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm`}
                  />
                  {errors.plant_name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.plant_name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="scientific_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Scientific name
                  </label>
                  <input
                    type="text"
                    id="scientific_name"
                    name="scientific_name"
                    value={formData.scientific_name || ''}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${
                      errors.scientific_name
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm`}
                  />
                  {errors.scientific_name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.scientific_name}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Overview
                </label>
                <div className="mt-1 space-y-3">
                  {(formData.overview || []).map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <textarea
                        value={item}
                        onChange={e =>
                          handleArrayItemChange(
                            'overview',
                            index,
                            e.target.value
                          )
                        }
                        rows={3}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                      />
                      <Button
                        type="button"
                        variant="icon"
                        onClick={() => removeArrayItem('overview', index)}
                      >
                        <Trash2 size={18} color="red" />
                      </Button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('overview')}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    <Plus size={18} className="mr-2" />
                    Add item
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-1/4 items-center rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-shadow duration-200 hover:shadow-md">
                  <label
                    htmlFor="category_id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Plant type
                  </label>
                  <select
                    id="category_id"
                    name="category_id"
                    value={formData.category_id || plantData.Category?.id || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                  >
                    {data?.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex w-1/4 items-center justify-center rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-shadow duration-200 hover:shadow-md">
                  <input
                    type="checkbox"
                    id="approved_content"
                    name="approved_content"
                    checked={!!formData.approved_content}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 cursor-pointer rounded border-gray-300 text-green-500 transition-colors duration-200 ease-in-out focus:ring-green-400"
                  />
                  <label
                    htmlFor="approved_content"
                    className="ml-3 block cursor-pointer text-sm font-medium text-gray-700 transition-colors duration-200 select-none hover:text-green-600"
                  >
                    Approved content
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Characteristics */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Characteristics
                </label>
                <div className="mt-1 space-y-3">
                  {(formData.characteristic || []).map((item, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={item}
                        onChange={e =>
                          handleArrayItemChange(
                            'characteristic',
                            index,
                            e.target.value
                          )
                        }
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('characteristic', index)}
                        className="ml-2 rounded p-1 text-red-500 hover:bg-red-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('characteristic')}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    <Plus size={18} className="mr-2" />
                    Add item
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="difficulty_level"
                  className="block text-sm font-medium text-gray-700"
                >
                  Difficulty level
                </label>
                <select
                  id="difficulty_level"
                  name="difficulty_level"
                  value={
                    formData.difficulty_level ||
                    constants.PlantDifficulty.MEDIUM
                  }
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                >
                  <option value={constants.PlantDifficulty.EASY}>EASY</option>
                  <option value={constants.PlantDifficulty.MEDIUM}>
                    MEDIUM
                  </option>
                  <option value={constants.PlantDifficulty.HARD}>HARD</option>
                  <option value={constants.PlantDifficulty.VERY_HARD}>
                    VERY_HARD
                  </option>
                  <option value={constants.PlantDifficulty.EXTREME}>
                    EXTREME
                  </option>
                </select>
              </div>
            </div>
          )}

          {/* Functions */}
          {activeTab === 'functions' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Uses
              </label>
              <div className="mt-1 space-y-3">
                {(formData.function || []).map((item, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={item}
                      onChange={e =>
                        handleArrayItemChange('function', index, e.target.value)
                      }
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('function', index)}
                      className="ml-2 rounded p-1 text-red-500 hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('function')}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <Plus size={18} className="mr-2" />
                  Add item
                </button>
              </div>
            </div>
          )}

          {/* Meanings */}
          {activeTab === 'meanings' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meanings
              </label>
              <div className="mt-1 space-y-3">
                {(formData.meaning || []).map((item, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={item}
                      onChange={e =>
                        handleArrayItemChange('meaning', index, e.target.value)
                      }
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('meaning', index)}
                      className="ml-2 rounded p-1 text-red-500 hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('meaning')}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <Plus size={18} className="mr-2" />
                  Add item
                </button>
              </div>
            </div>
          )}

          {/* Environment */}
          {activeTab === 'environment' && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="soil_type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Soil type
                </label>
                <select
                  id="soil_type"
                  name="soil_type"
                  value={formData.soil_type || constants.Soil.LOAM}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                >
                  <option value={constants.Soil.CHALK}>CHALK</option>
                  <option value={constants.Soil.CLAY}>CLAY</option>
                  <option value={constants.Soil.LOAM}>LOAM</option>
                  <option value={constants.Soil.PEAT}>PEAT</option>
                  <option value={constants.Soil.SANDY}>SANDY</option>
                  <option value={constants.Soil.SILT}>SILT</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="habitatLocation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Habitat location
                </label>
                <select
                  id="habitatLocation"
                  name="habitatLocation"
                  value={
                    formData.habitatLocation || constants.PlantCategory.INDOOR
                  }
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                >
                  <option value={constants.PlantCategory.BALCONY}>
                    BALCONY
                  </option>
                  <option value={constants.PlantCategory.BATHROOM}>
                    BATHROOM
                  </option>
                  <option value={constants.PlantCategory.GARDEN}>GARDEN</option>
                  <option value={constants.PlantCategory.GREENHOUSE}>
                    GREENHOUSE
                  </option>
                  <option value={constants.PlantCategory.HYDROPONICS}>
                    HYDROPONICS
                  </option>
                  <option value={constants.PlantCategory.INDOOR}>INDOOR</option>
                  <option value={constants.PlantCategory.KITCHEN}>
                    KITCHEN
                  </option>
                  <option value={constants.PlantCategory.OFFICE}>OFFICE</option>
                  <option value={constants.PlantCategory.OUTDOOR}>
                    OUTDOOR
                  </option>
                  <option value={constants.PlantCategory.TERRACE}>
                    TERRACE
                  </option>
                  <option value={constants.PlantCategory.WALL_PLANTER}>
                    WALL_PLANTER
                  </option>
                  <option value={constants.PlantCategory.WINDOW_SILL}>
                    WINDOW_SILL
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Temperature (°C)
                </label>
                <div className="mt-1 grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="minTemperature"
                      className="block text-xs text-gray-500"
                    >
                      Minimum
                    </label>
                    <input
                      type="number"
                      id="minTemperature"
                      name="minTemperature"
                      value={formData.minTemperature ?? 0}
                      onChange={handleNumberChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.minTemperature
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm`}
                    />
                    {errors.minTemperature && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.minTemperature}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="maxTemperature"
                      className="block text-xs text-gray-500"
                    >
                      Maximum
                    </label>
                    <input
                      type="number"
                      id="maxTemperature"
                      name="maxTemperature"
                      value={formData.maxTemperature ?? 0}
                      onChange={handleNumberChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.maxTemperature
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm`}
                    />
                    {errors.maxTemperature && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.maxTemperature}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dimensions (cm)
                </label>
                <div className="mt-1 grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="minMatureSize"
                      className="block text-xs text-gray-500"
                    >
                      Minimum
                    </label>
                    <input
                      type="number"
                      id="minMatureSize"
                      name="minMatureSize"
                      value={formData.minMatureSize ?? 0}
                      onChange={handleNumberChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.minMatureSize
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm`}
                    />
                    {errors.minMatureSize && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.minMatureSize}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="maxMatureSize"
                      className="block text-xs text-gray-500"
                    >
                      Maximum
                    </label>
                    <input
                      type="number"
                      id="maxMatureSize"
                      name="maxMatureSize"
                      value={formData.maxMatureSize ?? 0}
                      onChange={handleNumberChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.maxMatureSize
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm`}
                    />
                    {errors.maxMatureSize && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.maxMatureSize}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="humidityRange"
                  className="block text-sm font-medium text-gray-700"
                >
                  Humidity Range
                </label>
                <select
                  id="humidityRange"
                  name="humidityRange"
                  value={formData.humidityRange || constants.Level.MEDIUM}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                >
                  <option value={constants.Level.NONE}>NONE</option>
                  <option value={constants.Level.VERY_LOW}>VERY_LOW</option>
                  <option value={constants.Level.LOW}>LOW</option>
                  <option value={constants.Level.MEDIUM}>MEDIUM</option>
                  <option value={constants.Level.HIGH}>HIGH</option>
                  <option value={constants.Level.VERY_HIGH}>VERY_HIGH</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="lightRequirement"
                  className="block text-sm font-medium text-gray-700"
                >
                  Light Requirement
                </label>
                <select
                  id="lightRequirement"
                  name="lightRequirement"
                  value={formData.lightRequirement || constants.Level.MEDIUM}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                >
                  <option value={constants.Level.NONE}>NONE</option>
                  <option value={constants.Level.VERY_LOW}>VERY_LOW</option>
                  <option value={constants.Level.LOW}>LOW</option>
                  <option value={constants.Level.MEDIUM}>MEDIUM</option>
                  <option value={constants.Level.HIGH}>HIGH</option>
                  <option value={constants.Level.VERY_HIGH}>VERY_HIGH</option>
                </select>
              </div>
            </div>
          )}

          {/* Images */}
          {activeTab === 'images' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Images
              </label>
              <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {(formData.image_url || []).map((url, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                  >
                    <div
                      className="relative overflow-hidden rounded-lg"
                      style={{ paddingTop: '56.25%' }}
                    >
                      <Button
                        type="button"
                        variant="icon"
                        onClick={() => removeArrayItem('image_url', index)}
                        className="absolute top-2 right-2 z-10 rounded-full p-2 text-red-500 transition-colors duration-200 hover:bg-red-100"
                      >
                        <X size={18} />
                      </Button>
                      <img
                        src={url || constants.placeholderImage}
                        alt={`Plant ${index + 1}`}
                        className="absolute top-0 left-0 h-full w-full transform object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="mt-3">
                      <input
                        type="text"
                        value={url}
                        onChange={e =>
                          handleArrayItemChange(
                            'image_url',
                            index,
                            e.target.value
                          )
                        }
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm transition-colors duration-200 focus:border-green-500 focus:ring-green-500 focus:outline-none"
                        placeholder="Enter image URL"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => addArrayItem('image_url')}
                  className="group flex h-full min-h-[120px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-all duration-300 hover:border-green-500 hover:bg-green-50"
                >
                  <Plus
                    size={28}
                    className="mb-3 text-gray-400 transition-colors duration-300 group-hover:text-green-500"
                  />
                  <span className="text-sm font-medium text-gray-600 transition-colors duration-300 group-hover:text-green-600">
                    Add New Image
                  </span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Summary - Show at bottom if there are any errors */}
      {Object.keys(errors).length > 0 && (
        <div className="mt-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Please correct the following errors:
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc space-y-1 pl-5">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default PlantUpdateForm;
