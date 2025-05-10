import { Leaf, LandPlot, MapPinCheck, Ruler } from 'lucide-react';
import constants from '../../../constants';
import { GrowingConditionsProps } from './propTypes';

const GrowingConditions = ({
  soilType,
  habitatLocation,
  minMatureSize,
  maxMatureSize
}: GrowingConditionsProps) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <h3 className="mb-3 flex items-center font-semibold">
        <Leaf size={20} className="mr-2 text-green-500" />
        Growing conditions
      </h3>
      <div className="space-y-2">
        <div className="flex items-start">
          <LandPlot size={20} className="text-brown-500 mt-0.5 mr-2" />
          <div>
            <p className="text-sm font-medium">Soil type</p>
            <p className="text-sm text-gray-600">
              {constants.getSoilType(soilType)}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <MapPinCheck size={20} className="mt-0.5 mr-2 text-black" />
          <div>
            <p className="text-sm font-medium">Habitat location</p>
            <p className="text-sm text-gray-600">
              {constants.getPlantCategory(habitatLocation)}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <Ruler size={20} className="mt-0.5 mr-2 text-black" />
          <div>
            <p className="text-sm font-medium">Average size</p>
            <p className="text-sm text-gray-600">
              {minMatureSize} - {maxMatureSize} cm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowingConditions;
