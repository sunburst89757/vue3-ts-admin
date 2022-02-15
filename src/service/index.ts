// axios的封装
// 传递不同的配置是为了避免有多个不同域名的网络请求发送，增强可扩展性
// 不同的域名的网络请求有不同的拦截器钩子，相同的拦截器钩子，单一的网络请求有特殊的钩子
import Request from "./request/request";
import type { interceptorsType } from "./request/request";
const config = {
  baseURL: "https://bgt.d9lab.net/trade",
  timeout: 10000
};
const interceptorsHooks: interceptorsType = {
  requestSuccess(config) {
    console.log("请求拦截器成功");
    return config;
  },
  requestError(err) {
    console.log(err);
    return Promise.reject(err);
  },
  responseSuccess(res) {
    console.log("响应拦截器成功");
    return res.data;
  },
  responseError(err) {
    console.log("响应拦截失败");
    return Promise.reject(err);
  }
};
export default new Request(config, interceptorsHooks);
