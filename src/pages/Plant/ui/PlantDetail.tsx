import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { useFetchData } from '../../../hooks';
import { deletePlant, getPlantDetail } from '../../../services';
import { Loading } from '../../../components';
import ImageGallery from './ImageGallery';
import BasicInformation from './BasicInformation';
import Characteristics from './Characteristics';
import HeaderWithActions from './HeaderWithActions';
import Overview from './Overview';
import GrowingConditions from './GrowingConditions';
import ClimateRequirements from './ClimateRequirements';
import Functions from './Functions';
import Meaning from './Meaning';
import GrowthPhases from './GrowthPhases';

const PlantDetail = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const callGetDetail = useCallback(async () => {
    return await getPlantDetail(plantId!);
  }, [plantId]);
  const { data, error, isLoading } = useFetchData({
    fetchFn: callGetDetail
  });

  if (isLoading) return <Loading label="Getting plant content..." />;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!data) return null;

  const handleEdit = () => {
    console.log('Edit button clicked');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      deletePlant(
        data.id,
        () => {
          alert('Plant deleted successfully');
          navigate('/plants');
        },
        () => {
          alert('Failed to delete plant');
        }
      );
    }
  };

  return (
    <div className="mx-auto rounded-lg bg-white p-2 shadow-xl">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        {/* Left column - Images */}
        <div className="space-y-4 lg:col-span-1">
          <ImageGallery images={data.image_url} plantName={data.plant_name} />
          <BasicInformation
            plantName={data.plant_name}
            scientificName={data.scientific_name}
            difficultyLevel={data.difficulty_level}
          />
          {data.characteristic && data.characteristic.length > 0 && (
            <Characteristics characteristics={data.characteristic} />
          )}
        </div>

        {/* Right column - Details */}
        <div className="space-y-2 lg:col-span-2">
          <div className="rounded-lg bg-gray-100 p-4">
            <HeaderWithActions
              plantName={data.plant_name}
              scientificName={data.scientific_name}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            {data.overview && data.overview.length > 0 && (
              <Overview paragraphs={data.overview} />
            )}

            <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2">
              <GrowingConditions
                soilType={data.soil_type}
                habitatLocation={data.habitatLocation}
                minMatureSize={data.minMatureSize}
                maxMatureSize={data.maxMatureSize}
              />
              <ClimateRequirements
                minTemperature={data.minTemperature}
                maxTemperature={data.maxTemperature}
                humidityRange={data.humidityRange}
                lightRequirement={data.lightRequirement}
              />
            </div>
          </div>

          {data.function && data.function.length > 0 && (
            <Functions functions={data.function} />
          )}

          {data.meaning && data.meaning.length > 0 && (
            <Meaning meanings={data.meaning} />
          )}

          {data.Phase && data.Phase.length > 0 && (
            <GrowthPhases phases={data.Phase} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
