import request from "@/service";
import { IQueryProductList } from "./types";
export function getProuductList(params: IQueryProductList) {
  return request.service.request({
    method: "get",
    url: "/sales/getProductList",
    params
  });
}
