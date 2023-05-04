import { httpRequest } from "@/services";
import { ISubmitInfo } from "@/components/AuthorityManagement/AddMember/RegisterForm";

const updateMemberInfo = async (userInfo: ISubmitInfo) => {
  return httpRequest.put("/User/manageUser", userInfo);
};

export { updateMemberInfo };