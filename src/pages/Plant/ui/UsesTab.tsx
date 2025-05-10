// File: components/Plant/Form/Tabs/UsesTab.tsx
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { UpdatePlant } from '../../../types';
import { FormHandlers } from './propTypes';

interface UsesTabProps {
  formData: UpdatePlant;
  formHandlers: FormHandlers;
}

const UsesTab: React.FC<UsesTabProps> = ({ formData, formHandlers }) => {
  const { handleArrayItemChange, addArrayItem, removeArrayItem } = formHandlers;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Uses</label>
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
  );
};

export default UsesTab;
