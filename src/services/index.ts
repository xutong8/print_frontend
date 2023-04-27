import axios, { AxiosRequestConfig } from "axios";

// const BASE_URL = "http://10.196.225.143:8080/";
// const BASE_URL = "http://10.162.109.94:8080/";
const BASE_URL = "http://10.196.55.11:8080/";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

const httpRequest = {
  get(url: string, config?: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, config ?? {})
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  },
  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, data, config ?? {})
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  },
  delete(url: string, config?: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      instance
        .delete(url, config ?? {})
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export { httpRequest };
