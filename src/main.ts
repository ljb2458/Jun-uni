import { createSSRApp } from "vue";
import App from "./App.vue";
import * as Pinia from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import $uv from "@climblee/uv-ui";
import '@/init'

declare global {
  interface Uni {
    $uv: AnyObject;
  }
}

export function createApp() {
  const app = createSSRApp(App);
  const pinia = Pinia.createPinia();
  pinia.use(piniaPluginPersistedstate);

  app.use(pinia).use($uv);
  return {
    app,
    Pinia,
  };
}
