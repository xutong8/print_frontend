import axios, { AxiosRequestConfig } from "axios";

// export const BASE_URL = "http://172.18.192.1:8080/";
export const BASE_URL = "http://10.162.109.94:8080/";
// export const BASE_URL = "http://10.196.55.11:8080/";

const instance = axios.create({
  baseURL: BASE_URL,
});

const httpRequest = {
  get(url: string, config?: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, config ?? {headers: { 'Content-Type': 'application/x-www-form-urlencoded' },})
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  },
  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, data, config ?? {headers: { 'Content-Type': 'application/json' },})
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  },
  delete(url: string, config?: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      instance
        .delete(url, config ?? {headers: { 'Content-Type': 'application/x-www-form-urlencoded' },})
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  },
  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      instance
        .put(url, data, config ?? {headers: { 'Content-Type': 'application/json' },})
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export { httpRequest };
