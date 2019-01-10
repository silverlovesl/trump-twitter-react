import axios, { AxiosRequestConfig } from 'axios';
import { Serializable } from '@/models/serializable';
import { cookieService } from '../cookie.service';
import { PagingData } from '@/models/paging-data';

type errorHandlerFunc = (error: any) => any;

const baseURL = process.env.REACT_APP_API_ENDPOINT;
const isUseMock = Boolean(process.env.REACT_APP_IS_USE_MOCK);
let apiErrorHandler: errorHandlerFunc;

export const API = axios.create({
  baseURL: baseURL + '/api/v1/twitter',
  withCredentials: true,
  timeout: 60000,
});

export function setApiErrorHandler(handler: errorHandlerFunc) {
  apiErrorHandler = handler;
}

API.interceptors.request.use(
  config => {
    config.headers['AUTH-TOKEN'] = cookieService.authToken || undefined;
    config.params = config.params || {};
    // config.params['lang'] = cookieService.language;

    return config;
  },
  error => Promise.reject(error)
);

API.interceptors.response.use(undefined, err => {
  if (apiErrorHandler) {
    apiErrorHandler(err);
  }
  if (err.response) {
    return Promise.reject(err.response.data);
  } else {
    return Promise.reject(err);
  }
});

export class ApiService {
  public readonly isUseMock = isUseMock;

  public get<T extends Serializable<T>>(type: { new (): T }, path: string, params: any): Promise<T> {
    return API.get<T>(path, { params }).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public getDynamic<D>(path: string, params: any): Promise<D> {
    return API.get<D>(path, { params }).then(value => {
      return value.data;
    });
  }

  public getList<T extends Serializable<T>>(type: { new (): T }, path: string, params: any): Promise<T[]> {
    interface ListData {
      data: T[];
    }
    return API.get<ListData>(path, { params }).then(value => {
      return value.data.data.map(d => new type().deserialize(d));
    });
  }

  public getPagingData<T extends Serializable<T>>(
    type: { new (): T },
    path: string,
    params: any
  ): Promise<PagingData<T>> {
    return API.get<PagingData<T>>(path, { params }).then(value => {
      let result = new PagingData<T>();
      result.data = value.data.data.map((v: any) => new type().deserialize(v));
      result.totalRecords = value.data.totalRecords;
      return result;
    });
  }

  public delete(path: string, params: any): Promise<any> {
    return API.delete(path, { params }).then(value => value.data);
  }

  public head(path: string, params: any): Promise<any> {
    return API.head(path, { params }).then(value => value.data);
  }

  public post<T extends Serializable<T>>(type: { new (): T }, path: string, data?: any): Promise<T> {
    return API.post<T>(path, data).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public put<T extends Serializable<T>>(type: { new (): T }, path: string, data?: any): Promise<T> {
    return API.put<T>(path, data).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public putJSON<T extends Serializable<T>>(type: { new (): T }, path: string, data?: any): Promise<T> {
    return API.put<T>(path, data).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public patch<T extends Serializable<T>>(type: { new (): T }, path: string, data?: any): Promise<T> {
    return API.patch<T>(path, data).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public postJson<T extends Serializable<T>>(type: { new (): T }, path: string, data?: any): Promise<T> {
    return API.post<T>(path, data).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public postFile<T extends Serializable<T>>(type: { new (): T }, path: string, formData: FormData): Promise<T> {
    return API.post<T>(path, formData).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public putFile<T extends Serializable<T>>(type: { new (): T }, path: string, formData: FormData): Promise<T> {
    return API.put<T>(path, formData).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public downloadFile(fullPath: string, params: any): Promise<Blob> {
    return API.get(fullPath, {
      params: params,
      responseType: 'blob',
    } as AxiosRequestConfig).then(res => new Blob([res.data]));
  }
}
