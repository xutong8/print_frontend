import { httpRequest } from "@/services";
import { IUpdatePassword } from "@/components/AuthorityManagement/AddMember/RegisterForm";

const updatePassword = async (updateInfo: IUpdatePassword) => {
  return httpRequest.put("/User/updatePassword", updateInfo);
};

export { updatePassword };