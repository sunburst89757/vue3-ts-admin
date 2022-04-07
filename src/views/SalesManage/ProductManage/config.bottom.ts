import { ITableConfigType } from "@/base-ui/table";
export const bottomConfig: ITableConfigType[] = [
  {
    label: "名称",
    property: "name",
    minwidth: "400"
  },
  {
    label: "类别",
    property: "productType",
    minwidth: "100"
  },
  {
    label: "规格",
    property: "specificationModel",
    minwidth: "250"
  },
  {
    label: "购买价格",
    property: "purchasePrice",
    minwidth: "100"
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
