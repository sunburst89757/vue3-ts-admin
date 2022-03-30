import { IForm } from "@/base-ui/form";
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
    },
    {
      field: "sport",
      type: "select",
      label: "运动类型",
      placeholder: "请输入运动类型",
      options: [
        {
          label: "足球",
          value: 1
        },
        {
          label: "篮球",
          value: 2
        }
      ]
    },
    {
      field: "timeRange",
      type: "datePicker",
      label: "时间范围",
      placeholder: "选择当前月份",
      otherOptions: {
        type: "daterange"
      }
    },
    {
      field: "time",
      type: "datePicker",
      label: "时间点",
      placeholder: "选择当前月份",
      otherOptions: {
        type: "date"
      }
    }
  ]
};
