import { defineStore } from "pinia";
import { getProuductList } from "@/api/salesManage";
export const useSaleStore = defineStore({
  id: "sales",
  state: (): any => {
    return {
      queryProductList: {
        pageNum: 1,
        pageSize: 5,
        uuid: "",
        productName: ""
      }
    };
  },
  actions: {
    async getProductList() {
      const data = await getProuductList(this.queryProductList);
      console.log(data, "产品查询");
    }
  }
});
