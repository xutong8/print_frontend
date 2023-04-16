import { httpRequest } from '@/services';
import { AxiosResponse } from 'axios';

export interface IRawMaterial {
  rawMaterialId: number;
  rawMaterialName: string;
}

const fetchAllRawMaterials = async () => {
  const res = await httpRequest.get('/rawMaterial/findAllRawMaterialName') as AxiosResponse<IRawMaterial[]>;
  const rawMaterials = (res?.data ?? []) as IRawMaterial[];
  return rawMaterials;
};

export {
  fetchAllRawMaterials
};