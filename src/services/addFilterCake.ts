import { httpRequest } from "@/services";
import { IFilterCake } from "./fetchFilterCakeById";

const addFilterCake = async (filterCake: IFilterCake) => {
  return httpRequest.post("/filterCake/addFilterCake", filterCake);
};

export { addFilterCake };
