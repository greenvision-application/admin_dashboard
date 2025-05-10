import React from 'react';
import { Button } from '../../../components';
import { Plus, X } from 'lucide-react';
import constants from '../../../constants';
import { UpdatePlant } from '../../../types';
import { FormHandlers } from './propTypes';

interface ImagesTabProps {
  formData: UpdatePlant;
  formHandlers: FormHandlers;
}

const ImagesTab: React.FC<ImagesTabProps> = ({ formData, formHandlers }) => {
  const { handleArrayItemChange, addArrayItem, removeArrayItem } = formHandlers;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Images</label>
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
                  handleArrayItemChange('image_url', index, e.target.value)
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
  );
};

export default ImagesTab;
