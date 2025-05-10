import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../../../components';
import { Category, UpdatePlant } from '../../../types';
import { FormHandlers } from './propTypes';

interface BasicInfoTabProps {
  formData: UpdatePlant;
  errors: Record<string, string>;
  formHandlers: FormHandlers;
  categories: Category[];
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  formData,
  errors,
  formHandlers,
  categories
}) => {
  const {
    handleChange,
    handleCheckboxChange,
    handleArrayItemChange,
    addArrayItem,
    removeArrayItem
  } = formHandlers;

  return (
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
            <p className="mt-1 text-sm text-red-600">{errors.plant_name}</p>
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
              errors.scientific_name ? 'border-red-500' : 'border-gray-300'
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
                  handleArrayItemChange('overview', index, e.target.value)
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
      <div className="flex justify-center gap-8">
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
            value={formData.category_id || formData.Category?.id || 0}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
          >
            {categories.map(item => (
              <option key={item.id} value={item.id}>
                {item.category_name}
              </option>
            ))}
            <option key={Math.random()} value={0}></option>
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
  );
};

export default BasicInfoTab;
