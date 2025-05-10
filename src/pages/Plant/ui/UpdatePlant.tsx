import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getPlantDetail, updatePlant } from '../../../services';
import { useFetchData } from '../../../hooks';
import { Loading } from '../../../components';
import PlantUpdateContainer from './PlantUpdateContainer';
import type { UpdatePlant } from '../../../types/plant';

const UpdatePlantUI = () => {
  const { plantId } = useParams();
  // const navigate = useNavigate();
  const callGetDetail = useCallback(async () => {
    return await getPlantDetail(plantId!);
  }, [plantId]);
  const { data, error, isLoading } = useFetchData({
    fetchFn: callGetDetail
  });

  if (isLoading) return <Loading label="Getting plant content..." />;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!data) return null;

  const handleSubmit = async (data: UpdatePlant) => {
    await updatePlant(
      data,
      () => {
        alert('Plant updated successfully');
      },
      () => {
        alert('Failed to update plant');
      }
    );
  };

  return (
    <PlantUpdateContainer
      plantData={data}
      onSubmit={handleSubmit}
      onCancel={() => {}}
    />
  );
};

export default UpdatePlantUI;
