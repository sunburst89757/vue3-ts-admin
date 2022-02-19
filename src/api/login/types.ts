export type userType = {
  username: string;
  password: string;
};
export enum LoginAPI {
  login = "/login/login",
  menus = "/system/user/getUserMenus"
}

export interface ILoginResult {
  token: string;
  userId: number;
  nickName: string;
}
