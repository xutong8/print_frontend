import { httpRequest } from "@/services";
import { AxiosResponse } from "axios";

export interface IMemberInfo {
    userName: string;
    password: string;
    userType: string;
    authority: number;
};

const fetchAllMember = async () => {
    const res = (await httpRequest.get("/User/findAllUserName")) as AxiosResponse<IMemberInfo[]>;
    const memberInfo = (res?.data ?? []) as IMemberInfo[];
    return memberInfo;
}

export {fetchAllMember};
