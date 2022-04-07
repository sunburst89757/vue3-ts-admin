import { IForm } from "@/base-ui/form";
import { ITableConfigType } from "@/base-ui/table";
export const formConfig: IForm = {
  // labelWidth: "120px",
  // colLayout: {
  //   lg: 10
  // },
  formItems: [
    {
      field: "productName",
      type: "input",
      label: "商品名称",
      placeholder: "请输入商品名称"
    }
    // {
    //   field: "sport",
    //   type: "select",
    //   label: "运动类型",
    //   placeholder: "请输入运动类型",
    //   options: [
    //     {
    //       label: "足球",
    //       value: 1
    //     },
    //     {
    //       label: "篮球",
    //       value: 2
    //     }
    //   ]
    // },
    // {
    //   field: "timeRange",
    //   type: "datePicker",
    //   label: "时间范围",
    //   placeholder: "选择当前月份",
    //   otherOptions: {
    //     type: "daterange"
    //   }
    // }
    // {
    //   field: "time",
    //   type: "datePicker",
    //   label: "时间点",
    //   placeholder: "选择当前月份",
    //   otherOptions: {
    //     type: "date"
    //   }
    // }
  ]
};
export const tableConfig: ITableConfigType[] = [
  {
    label: "名称",
    property: "name"
  },
  {
    label: "规格",
    property: "specificationModel"
  },
  {
    label: "类别",
    property: "productType"
  },
  {
    label: "购买价格",
    property: "purchasePrice"
  },
  { label: "操作", slotName: "handle" }
];
