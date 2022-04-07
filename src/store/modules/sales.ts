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
  pageInformation: any;
}
export const useSaleStore = defineStore({
  id: "sales",
  state: (): IstateType => {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        uuid: "",
        productName: ""
      },
      originQueryParmas: {
        pageNum: 1,
        pageSize: 10,
        uuid: "",
        productName: ""
      },
      pageInformation: {
        list: [],
        total: 0
      }
    };
  },
  actions: {
    async getProductList() {
      const { data } = await getProuductList(this.queryParams);
      this.pageInformation.list = data.list;
      this.pageInformation.total = parseInt(data.total);
    }
  }
});
