import axios, { AxiosPromise } from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElLoading } from "element-plus";
interface interceptorsType {
  requestSuccess?: (config: AxiosRequestConfig) => void;
  requestError?: (err: any) => any;
  responseSuccess?: (res: AxiosResponse) => AxiosResponse;
  responseError?: (err: any) => any;
}
interface axiosConfig extends AxiosRequestConfig {
  isShowLoading?: boolean;
}
class Request {
  service: AxiosInstance;
  isShowLoading: boolean;
  loading: any;
  constructor(config: axiosConfig, interceptorsHooks?: interceptorsType) {
    this.service = axios.create(config);
    this.isShowLoading = config.isShowLoading ?? true;
    // 实例的请求拦截器，该实例特有的拦截器钩子(拦截器钩子是不同实例传的，所以是不同实例特有的)
    this.service.interceptors.request.use(
      interceptorsHooks?.requestSuccess,
      interceptorsHooks?.requestError
    );
    this.service.interceptors.response.use(
      interceptorsHooks?.responseSuccess,
      interceptorsHooks?.responseError
    );
    // 所有实例共有的拦截器钩子：这里的钩子是写死的，所以，每次调这个对象都会执行，因此这是共有的
    this.service.interceptors.request.use(
      (config) => {
        if (this.isShowLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据....",
            background: "rgba(0, 0, 0, 0.5)"
          });
        }
        console.log("共有的请求拦截成功");
        return config;
      },
      (err) => {
        console.log("共有的请求拦截失败");
        return Promise.reject(err);
      }
    );
    this.service.interceptors.response.use(
      (res) => {
        console.log("共有的响应拦截成功");
        setTimeout(() => {
          this.loading.close();
        }, 3000);
        return res;
      },
      (err) => {
        console.log("共有的响应拦截失败");
        return Promise.reject(err);
      }
    );
  }
  // 对单个请求的封装实现：单个请求有对应的钩子
  // request(
  //   config: AxiosRequestConfig,
  //   interceptorHooks?: interceptorsType
  // ): AxiosPromise {
  //   return this.service(config);
  // }
}

export default Request;
export { interceptorsType };
