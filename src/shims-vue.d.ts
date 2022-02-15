/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
// 缺少类型的变量就直接在这里声明
// declare const VUE_APP_MY_NAME:string;
// declare const BASE_URL :string;

