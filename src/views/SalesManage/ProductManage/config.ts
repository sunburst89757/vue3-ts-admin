import { IForm } from "@/base-ui/form";
export const formConfig: IForm = {
  labelWidth: "120px",
  colLayout: {
    lg: 10
  },
  formItems: [
    {
      type: "input",
      label: "搜索",
      placeholder: "请输入用户名"
    },
    {
      type: "select",
      label: "多选框",
      placeholder: "不同的多选项",
      options: [
        {
          label: "早餐",
          value: 1
        },
        {
          label: "午餐",
          value: 2
        }
      ]
    },
    {
      type: "datePicker",
      label: "时间选择器",
      placeholder: "选择当前月份",
      otherOptions: {
        type: "daterange"
      }
    },
    {
      type: "datePicker",
      label: "时间选择器",
      placeholder: "选择当前月份",
      otherOptions: {
        type: "date"
      }
    }
  ]
};
