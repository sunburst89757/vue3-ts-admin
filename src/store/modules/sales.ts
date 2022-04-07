import { defineStore } from "pinia";
import { getProuductList } from "@/api/salesManage";
interface IqueryTypes {
  pageNum: number;
  pageSize: number;
  uuid?: string;
  productName?: string;
}
interface IstateType {
  queryParams: IqueryTypes;
  originQueryParmas: IqueryTypes;
  list: any[];
}
export const useSaleStore = defineStore({
  id: "sales",
  state: (): IstateType => {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        uuid: "",
        productName: ""
      },
      originQueryParmas: {
        pageNum: 1,
        pageSize: 5,
        uuid: "",
        productName: ""
      },
      list: []
    };
  },
  actions: {
    async getProductList() {
      const { data } = await getProuductList(this.queryParams);
      this.list = data.list;
    }
  }
});
