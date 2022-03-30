type IformType = "input" | "select" | "datePicker";
interface selectOption {
  label: string;
  value: number;
}
interface datePickerOption {
  type: "date" | "daterange" | "datetime-local";
}
export interface IFormItem {
  field: string;
  type: IformType;
  label: string;
  placeholder: string;
  options?: selectOption[];
  otherOptions?: datePickerOption;
}

export interface IForm {
  formItems: IFormItem[];
  colLayout?: any;
  labelWidth?: string;
}
