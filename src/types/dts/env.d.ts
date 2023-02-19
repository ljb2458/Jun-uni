/*
 * @Date: 2023-02-18 20:06:36
 * @LastEditTime: 2023-02-19 11:59:45
 * @FilePath: /my-vue3-project/src/types/dts/env.d.ts
 * 介绍:
 */
/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "mp-storage" {
  export type localStorage = Storage;
  export type sessionStorage = Storage;
}
