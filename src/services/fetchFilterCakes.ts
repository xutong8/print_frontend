import { httpRequest } from "@/services";
import { AxiosResponse } from "axios";

export interface IFilterCakeName {
  id: number;
  name: string;
}

const fetchAllFilterCakes = async () => {
  const res = (await httpRequest.get(
    "/filterCake/findAllFilterCakeName"
  )) as AxiosResponse<IFilterCakeName[]>;
  const filterCakes = (res?.data ?? []) as IFilterCakeName[];
  return filterCakes;
};

export { fetchAllFilterCakes };
