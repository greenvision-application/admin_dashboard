// File: components/Plant/Form/Tabs/CharacteristicsTab.tsx
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { UpdatePlant } from '../../../types';
import constants from '../../../constants';
import { FormHandlers } from './propTypes';

interface CharacteristicsTabProps {
  formData: UpdatePlant;
  formHandlers: FormHandlers;
}

const CharacteristicsTab: React.FC<CharacteristicsTabProps> = ({
  formData,
  formHandlers
}) => {
  const { handleChange, handleArrayItemChange, addArrayItem, removeArrayItem } =
    formHandlers;

  return (
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
                  handleArrayItemChange('characteristic', index, e.target.value)
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
          value={formData.difficulty_level || constants.PlantDifficulty.MEDIUM}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
        >
          <option value={constants.PlantDifficulty.EASY}>EASY</option>
          <option value={constants.PlantDifficulty.MEDIUM}>MEDIUM</option>
          <option value={constants.PlantDifficulty.HARD}>HARD</option>
          <option value={constants.PlantDifficulty.VERY_HARD}>VERY_HARD</option>
          <option value={constants.PlantDifficulty.EXTREME}>EXTREME</option>
        </select>
      </div>
    </div>
  );
};

export default CharacteristicsTab;
