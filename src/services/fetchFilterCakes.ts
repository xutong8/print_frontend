import { httpRequest } from '@/services';
import { AxiosResponse } from 'axios';

export interface IFilterCake {
  filterCakeId: number;
  filterCakeName: string;
}

const fetchAllFilterCakes = async () => {
  const res = await httpRequest.get('/filterCake/findAllFilterCakeName') as AxiosResponse<IFilterCake[]>;
  const filterCakes = (res?.data ?? []) as IFilterCake[];
  return filterCakes;
};

export {
  fetchAllFilterCakes
};