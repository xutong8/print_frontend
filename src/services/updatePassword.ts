import { httpRequest } from "@/services";
import { IUpdatePassword } from "@/components/AuthorityManagement/AddMember/EditForm";
import { AxiosResponse } from "axios";
import { IUpdateResponse } from "./updateMemberInfo";

const updatePassword = async (updateInfo: IUpdatePassword) => {
  const res = await httpRequest.put("/User/updatePassword", updateInfo) as AxiosResponse<IUpdateResponse>;
  if(res.data.code === 201 )
    throw res.data.msg;
  return res;
};

export { updatePassword };