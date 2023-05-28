import { httpRequest } from "@/services";
import { AxiosResponse } from "axios";
export interface IUserLogin {
    userName: string;
    password: string;
  };
  
export interface IUserRes {
    code: number;
    data: {
      authority: number;
      status: number;
      userName: string;
      userType: string;
    }
    msg: string;
}

const login = async (user: IUserLogin) => {
  const res =await httpRequest.post("/User/login", user) as AxiosResponse<IUserRes>;
  if(res.data.code === 301 ){
    throw res.data.msg;
  }
  return res;
};

export { login };