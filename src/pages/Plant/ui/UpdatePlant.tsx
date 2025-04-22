import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getPlantDetail } from '../../../services';
import { useFetchData } from '../../../hooks';
import { Loading } from '../../../components';
import PlantUpdateContainer from './PlantUpdateContainer';

const UpdatePlant = () => {
  const { plantId } = useParams();
  const callGetDetail = useCallback(async () => {
    return await getPlantDetail(plantId!);
  }, [plantId]);
  const { data, error, isLoading } = useFetchData({
    fetchFn: callGetDetail
  });

  if (isLoading) return <Loading label="Getting plant content..." />;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!data) return null;

  const handleSubmit = async (data: unknown) => {
    console.log('Submitted data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Cập nhật thành công!');
  };

  return (
    <PlantUpdateContainer
      plantData={data}
      onSubmit={handleSubmit}
      onCancel={() => {}}
    />
  );
};

export default UpdatePlant;
