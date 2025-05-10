// File: components/Plant/Form/Tabs/EnvironmentTab.tsx
import React from 'react';
import { UpdatePlant } from '../../../types';
import constants from '../../../constants';
import { FormHandlers } from './propTypes';

interface EnvironmentTabProps {
  formData: UpdatePlant;
  errors: Record<string, string>;
  formHandlers: FormHandlers;
}

const EnvironmentTab: React.FC<EnvironmentTabProps> = ({
  formData,
  errors,
  formHandlers
}) => {
  const { handleChange, handleNumberChange } = formHandlers;

  return (
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
          <option value={constants.Soil.CHALK}>{constants.Soil.CHALK}</option>
          <option value={constants.Soil.CLAY}>{constants.Soil.CLAY}</option>
          <option value={constants.Soil.LOAM}>{constants.Soil.LOAM}</option>
          <option value={constants.Soil.PEAT}>{constants.Soil.PEAT}</option>
          <option value={constants.Soil.SANDY}>{constants.Soil.SANDY}</option>
          <option value={constants.Soil.SILT}>{constants.Soil.SILT}</option>
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
          value={formData.habitatLocation || constants.PlantCategory.INDOOR}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
        >
          <option value={constants.PlantCategory.BALCONY}>
            {constants.PlantCategory.BALCONY}
          </option>
          <option value={constants.PlantCategory.BATHROOM}>
            {constants.PlantCategory.BATHROOM}
          </option>
          <option value={constants.PlantCategory.GARDEN}>
            {constants.PlantCategory.GARDEN}
          </option>
          <option value={constants.PlantCategory.GREENHOUSE}>
            {constants.PlantCategory.GREENHOUSE}
          </option>
          <option value={constants.PlantCategory.HYDROPONICS}>
            {constants.PlantCategory.HYDROPONICS}
          </option>
          <option value={constants.PlantCategory.INDOOR}>
            {constants.PlantCategory.INDOOR}
          </option>
          <option value={constants.PlantCategory.KITCHEN}>
            {constants.PlantCategory.KITCHEN}
          </option>
          <option value={constants.PlantCategory.OFFICE}>
            {constants.PlantCategory.OFFICE}
          </option>
          <option value={constants.PlantCategory.OUTDOOR}>
            {constants.PlantCategory.OUTDOOR}
          </option>
          <option value={constants.PlantCategory.TERRACE}>
            {constants.PlantCategory.TERRACE}
          </option>
          <option value={constants.PlantCategory.WALL_PLANTER}>
            {constants.PlantCategory.WALL_PLANTER}
          </option>
          <option value={constants.PlantCategory.WINDOW_SILL}>
            {constants.PlantCategory.WINDOW_SILL}
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
                errors.minTemperature ? 'border-red-500' : 'border-gray-300'
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
                errors.maxTemperature ? 'border-red-500' : 'border-gray-300'
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
                errors.minMatureSize ? 'border-red-500' : 'border-gray-300'
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
                errors.maxMatureSize ? 'border-red-500' : 'border-gray-300'
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
  );
};

export default EnvironmentTab;
