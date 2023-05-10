import { httpRequest } from "@/services";
import { IFilterCake } from "./fetchFilterCakeById";

const updateFilterCake = async (filterCake: IFilterCake) => {
  return httpRequest.put("/filterCake/updateFilterCake", filterCake);
};

export { updateFilterCake };