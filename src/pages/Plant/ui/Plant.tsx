import { getAllPlant } from '../../../services';
import { useFetchData } from '../../../hooks/useFetchData';
import type { Plant } from '../../../types';
import { Loading } from '../../../components/Loading';

const Plant = () => {
  const { data, isLoading, error } = useFetchData<Plant[]>({
    fetchFn: getAllPlant
  });

  if (isLoading) return <Loading label="Getting plants data..." />;
  if (error) return <div>Error</div>;

  console.log(data);

  return <div>Plant</div>;
};
export default Plant;
