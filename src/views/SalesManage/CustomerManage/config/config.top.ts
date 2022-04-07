import { IForm } from "@/base-ui/form";
export const topConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "顾客名称",
      placeholder: "请输入顾客名称"
    },
    {
      field: "contactPerson",
      type: "input",
      label: "接洽人",
      placeholder: "请输入接洽人姓名"
    },
    {
      field: "phone",
      type: "input",
      label: "电话",
      placeholder: "请输入电话号码"
    }
  ]
};
