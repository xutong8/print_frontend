import store from "@/store";
import { message } from "antd";

export let nowDate = new Date();

export function unitPriceFormat(price: number) {
  return '¥' + Number(price).toFixed(2);
}

export function checkPermission(authority: number) {
  if(store.getState().authority < authority){
    message.error("您没有权限进行此操作");
    return false;
  }
  return true;
}
