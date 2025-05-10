import { Sun, ThermometerSnowflake, Droplets } from 'lucide-react';
import constants from '../../../constants';
import { ClimateRequirementsProps } from './propTypes';

const ClimateRequirements = ({
  minTemperature,
  maxTemperature,
  humidityRange,
  lightRequirement
}: ClimateRequirementsProps) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <h3 className="mb-3 flex items-center font-semibold">
        <Sun size={20} className="mr-2 text-yellow-500" />
        Climate requirements
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ThermometerSnowflake size={20} className="mr-2 text-blue-500" />
              <span className="text-sm font-medium">Temperature range</span>
            </div>
            <span className="text-sm text-gray-600">
              {minTemperature}°C - {maxTemperature}°C
            </span>
          </div>
          <div className="relative mt-2">
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="absolute h-2 rounded-l-full bg-blue-500"
                style={{
                  left: '0',
                  width: `${(minTemperature / 100) * 100}%`
                }}
              ></div>
              <div
                className="absolute h-2 rounded-r-full bg-orange-500"
                style={{
                  left: `${(minTemperature / 100) * 100}%`,
                  width: `${((maxTemperature - minTemperature) / 100) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Droplets size={20} className="mr-2 text-blue-500" />
              <span className="text-sm font-medium">Humidity range</span>
            </div>
            <span className="text-sm text-gray-600">{humidityRange}</span>
          </div>
          <div className="mt-2">
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{
                  width: `${constants.getPercent(humidityRange)}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sun size={20} className="mr-2 text-yellow-500" />
              <span className="text-sm font-medium">Light requirement</span>
            </div>
            <span className="text-sm text-gray-600">{lightRequirement}</span>
          </div>
          <div className="mt-2">
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-yellow-500"
                style={{
                  width: `${constants.getPercent(lightRequirement)}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateRequirements;
