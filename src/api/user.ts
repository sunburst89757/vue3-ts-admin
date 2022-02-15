import request from "@/service";
type userType = {
  username: string;
  password: string;
};
function login<T>(data: userType): Promise<T> {
  return request.service.request({
    url: "/login/login",
    method: "post",
    params: data
  });
}

export { login };
