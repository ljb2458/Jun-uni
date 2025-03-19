import { createSSRApp } from "vue";
import App from "./App.vue";
import * as Pinia from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "@/init";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = Pinia.createPinia();
  pinia.use(piniaPluginPersistedstate);

  return {
    app,
    Pinia,
  };
}
