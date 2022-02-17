import type { ElForm } from "element-plus";
export interface ILoginType {
  username: string;
  password: string;
}
export type FormInstance = InstanceType<typeof ElForm>;
