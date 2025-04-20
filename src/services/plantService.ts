import { request } from '../apis';
import constants from '../constants';
import { Plant } from '../types/plant';

export const getAllPlant = async (
  onSuccess?: (data: Plant[]) => void,
  onError?: (error: unknown) => void
) => {
  return request<Plant[]>({
    method: constants.methods.get,
    url: constants.urls.plants,
    onSuccess,
    onError
  });
};

export const getPlantDetail = async (
  id: string,
  onSuccess?: (data: Plant) => void,
  onError?: (error: unknown) => void
) => {
  return request<Plant>({
    method: constants.methods.get,
    url: constants.urls.plantDetail(id),
    onSuccess,
    onError
  });
};
