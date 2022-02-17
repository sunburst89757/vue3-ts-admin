import { createStore } from "vuex";
interface IRootState {
  name?: string;
  age?: number;
}
export default createStore<IRootState>({
  state: () => {
    return {
      name: "cy",
      age: 24
    };
  },
  mutations: {},
  actions: {},
  modules: {}
});
