/*
 * @Date: 2023-02-18 20:06:36
 * @LastEditTime: 2023-02-19 13:09:33
 * @FilePath: /my-vue3-project/src/main.ts
 * 介绍:
 */
import { createSSRApp } from "vue";
import App from "./App.vue";
import * as Pinia from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import uviewPlus from "uview-plus";
import "@@/hooks/initApp";

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
