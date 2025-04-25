import { request } from '../apis';
import constants from '../constants';
import { Category, Plant, UpdatePlant } from '../types';

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

export const deletePlant = async (
  id: string,
  onSuccess?: (data: Plant) => void,
  onError?: (error: unknown) => void
) => {
  return request({
    method: constants.methods.delete,
    url: constants.urls.deletePlant(id),
    onSuccess,
    onError
  });
};

export const updatePlant = async (
  data: UpdatePlant,
  onSuccess?: (data: Plant) => void,
  onError?: (error: unknown) => void
) => {
  return request({
    method: constants.methods.patch,
    url: constants.urls.updatePlant(data.id),
    data,
    onSuccess,
    onError
  });
};

export const getPlantType = async (
  onSuccess?: (data: Category[]) => void,
  onError?: (error: unknown) => void
) => {
  return request<Category[]>({
    method: constants.methods.get,
    url: constants.urls.plantType,
    onSuccess,
    onError
  });
};
