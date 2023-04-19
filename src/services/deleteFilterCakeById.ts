import { httpRequest } from "@/services";

const deleteFilterCakeById = (filterCakeId: string) => {
  return httpRequest.delete("/filterCake/deleteByfilterCakeId", {
    params: {
      filterCakeId,
    },
  });
};

export { deleteFilterCakeById };
