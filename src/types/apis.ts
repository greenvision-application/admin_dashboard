import { AxiosRequestConfig } from 'axios';

export interface RequestOptions {
  method: AxiosRequestConfig['method'];
  headers?: Record<string, string>;
  url: string;
  data?: unknown;
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
}
