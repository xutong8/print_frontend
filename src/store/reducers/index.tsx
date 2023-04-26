import { ModifyAction } from "../action";
import { ADDUSER } from "../const";
import { StoreState } from "../type";

export default (state: StoreState = { userName: "游客", authority: 0 }, action: ModifyAction): StoreState => {
  switch (action.type) {
    case ADDUSER:
      return { ...action.user };
    default:
      return state;
  }
}
