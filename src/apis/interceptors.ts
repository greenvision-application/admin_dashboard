import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import constants from '../constants';

// 1. Tạo instance axios
const AXIOS: AxiosInstance = axios.create({
  baseURL: constants.apiUrl,
  timeout: 20000,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json;charset=utf-8'
  }
});

// 2. Interceptor logic tách riêng
const onRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  console.info(`[request] [${config.method?.toUpperCase()} ${config.url}]`);
  //   const token = await helper.getToken();
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  return config;
};

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = async (response: AxiosResponse): Promise<AxiosResponse> => {
  console.info(`[response] [${response.status}] [${response.config.url}]`);
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error]`, error);

  //   if (error.response?.status === 401) {
  //     await helper.removeToken();
  //   }

  return Promise.reject(error);
};

// 3. Gắn interceptor vào instance
export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

// 4. Gắn vào instance chính
setupInterceptorsTo(AXIOS);

// 5. Hàm dùng gọi API
interface RequestOptions {
  method: AxiosRequestConfig['method'];
  headers?: Record<string, string>;
  url: string;
  data?: unknown;
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
}

const request = async ({
  method,
  headers = {},
  url,
  data,
  onSuccess,
  onError
}: RequestOptions) => {
  try {
    const response = await AXIOS({
      method,
      headers,
      url,
      data
    });

    onSuccess?.(response.data);
    return response.data;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data || 'Unknown Axios error'
      : error instanceof Error
        ? error.message
        : 'Unknown error';

    onError?.(errorMessage);
    throw new Error(errorMessage);
  }
};

export { AXIOS, request };
