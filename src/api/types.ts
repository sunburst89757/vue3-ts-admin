// 对接口通用的类型声明，具体的data的值是不确定的，所以使用泛型替代真正使用的时候传递过来即可
// 不传默认就是any
export interface IDataType<T = any> {
  code: string;
  message: string;
  success: boolean;
  data: T;
}
