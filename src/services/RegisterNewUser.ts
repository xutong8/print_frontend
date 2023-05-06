import { httpRequest } from "@/services";
import { IRegisterInfo } from "@/components/Register";

const registerNewUser = async (registerInfo: IRegisterInfo) => {
  return httpRequest.post("/User/register", registerInfo);
};

export { registerNewUser };
