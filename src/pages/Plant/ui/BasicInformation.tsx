import { Info } from 'lucide-react';
import constants from '../../../constants';
import { BasicInformationProps } from './propTypes';

const BasicInformation = ({
  plantName,
  scientificName,
  difficultyLevel,
  plantType
}: BasicInformationProps) => {
  return (
    <div className="mt-4 rounded-lg bg-gray-100 p-4">
      <h2 className="mb-3 flex items-center text-lg font-semibold">
        <Info size={20} className="mr-2 text-gray-500" />
        Basic information
      </h2>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Plant name</p>
          <p className="font-medium">{plantName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Scientific name</p>
          <p className="font-medium italic">{scientificName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Plant type</p>
          <p className="font-medium italic">
            {plantType ? plantType : 'Not yet update'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Difficulty level</p>
          <span
            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${constants.getDifficultyColor(difficultyLevel)}`}
          >
            {difficultyLevel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
