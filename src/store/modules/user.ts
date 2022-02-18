import { defineStore } from "pinia";
interface stateType {
  name: string;
}
export const useUserStore = defineStore("mian", {
  state: (): stateType => {
    return {
      name: "tyz"
    };
  },
  getters: {
    nameEdit: (state) => {
      return state.name.replace("tyz", "cy");
    }
  },
  actions: {
    changeName() {
      this.name = "cy";
    }
  }
});
