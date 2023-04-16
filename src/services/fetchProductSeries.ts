import { httpRequest } from '@/services';
import { AxiosResponse } from 'axios';

export interface IProductSeries {
  productSeriesId: number;
  productSeriesName: string;
}

const fetchAllProductSeries = async () => {
  const res = await httpRequest.get('/productSeries/findAllProductSeriesName') as AxiosResponse<IProductSeries[]>;
  const productSeries = (res?.data ?? []) as IProductSeries[];
  return productSeries;
};

export {
  fetchAllProductSeries
};