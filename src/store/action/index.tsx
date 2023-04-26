import { ADDUSER, ADDUSER_TYPE } from "../const";
import { StoreState } from "../type";

export interface IADDUSERAction {
  type: ADDUSER_TYPE;
  user: StoreState;
}

export type ModifyAction = IADDUSERAction;

// export const addUser = (): IADDUSERAction => ({
//   type: ADDUSER,
// })