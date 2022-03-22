import request from "@/service";
import type { IDataType } from "../types";
// 枚举类型不能在import的时候声明type声明
import { userType, LoginAPI, ILoginResult, IUserRoleType } from "./types";
// 具体的promise内是啥的类型是 Promise<T> ----具体是啥就用这个 login<T>():Promise<T>
function login(data: userType): Promise<IDataType<ILoginResult>> {
  return request.service.request({
    url: LoginAPI.login,
    method: "post",
    params: data
  });
}
// url要改，这随便写的
function getUserRole(data: IUserRoleType): any {
  return request.service.request({
    url: LoginAPI.userRole,
    method: "get",
    params: data
  });
}
export { login, getUserRole };
