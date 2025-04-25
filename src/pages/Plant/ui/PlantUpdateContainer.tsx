import type React from 'react';
import { useState } from 'react';
import PlantUpdateForm from './PlantUpdateForm';
import { UpdatePlant } from '../../../types';
import { PlantUpdateContainerProps } from './propTypes';

const PlantUpdateContainer: React.FC<PlantUpdateContainerProps> = ({
  plantData,
  onSubmit
  //   onCancel
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: UpdatePlant) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while updating the plant'
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <PlantUpdateForm plantData={plantData} onSubmit={handleSubmit} />

      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="rounded-lg bg-white p-4 shadow-lg">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-green-500"></div>
            <p className="mt-2 text-sm text-gray-600">Updating plant...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantUpdateContainer;
