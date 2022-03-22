export type userType = {
  username: string;
  password: string;
};
export enum LoginAPI {
  login = "/login/login",
  userRole = "/system/role/getRoleList"
}

export interface ILoginResult {
  token: string;
  userId: number;
  nickName: string;
}

export interface IUserRoleType {
  pageNum: number;
  pageSize: number;
}
