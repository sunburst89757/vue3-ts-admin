import { ITableConfigType } from "@/base-ui/table";
export const bottomConfig: ITableConfigType[] = [
  {
    label: "名称",
    property: "name",
    minwidth: "400"
  },
  {
    label: "装载方式",
    property: "pack",
    minwidth: "100"
  },
  {
    label: "规格",
    property: "specificationModel",
    minwidth: "250"
  },
  {
    label: "时间",
    property: "createTime",
    minwidth: "250",
    slotName: "time"
  },
  {
    label: "状态",
    property: "deleted",
    minwidth: "300",
    slotName: "status"
  },
  { label: "操作", slotName: "handle", minwidth: "400" }
];
