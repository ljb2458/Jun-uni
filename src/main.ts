/*
 * @Date: 2023-02-18 20:06:36
 * @LastEditTime: 2023-06-15 19:58:16
 * 介绍:
 */
import { createSSRApp } from "vue";
import App from "./App.vue";
import * as Pinia from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import uviewPlus from "uview-plus";
import "@/common/js/initApp";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = Pinia.createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia).use(uviewPlus);
  return {
    app,
    Pinia,
  };
}
