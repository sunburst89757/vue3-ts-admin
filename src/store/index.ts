import { useUserStore } from "./modules/user";
import { useTabs } from "./modules/tabs";
const userStore = useUserStore();
const tabsStore = useTabs();
export { userStore, tabsStore };
