import { httpRequest } from "@/services";
import { ISubmitInfo } from "@/components/AuthorityManagement/AddMember/EditForm";
import { AxiosResponse } from "axios";

export interface IUpdateResponse {
  code: number;
  data: {};
  msg: string;
}

const updateMemberInfo = async (userInfo: ISubmitInfo) => {
  const res =await httpRequest.put("/User/manageUser", userInfo) as AxiosResponse<IUpdateResponse>;
  if(res.data.code === 301 )
    throw res.data.msg;
  return res;
};

export { updateMemberInfo };