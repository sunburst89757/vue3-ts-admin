export type userType = {
  username: string;
  password: string;
};
export enum LoginAPI {
  login = "/login/login",
  menus = "/system/menu/getMenuList"
}

export interface ILoginResult {
  token: string;
  userId: number;
  nickName: string;
}
