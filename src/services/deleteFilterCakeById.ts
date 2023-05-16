import { httpRequest } from "@/services";

const deleteFilterCakeById = (filterCakeId: string) => {
  return httpRequest.delete("/filterCake/deleteByFilterCakeId", {
    params: {
      filterCakeId,
    },
  });
};

export { deleteFilterCakeById };
