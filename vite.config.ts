/*
 * @Date: 2023-02-18 20:06:36
 * @LastEditTime: 2023-02-19 12:28:03
 * @FilePath: /my-vue3-project/vite.config.ts
 * 介绍:
 */
import { defineConfig, loadEnv } from "vite";
import viteDevConfig from "./vite.dev.config";
import viteProdConfig from "./vite.prod.config";
import viteBaseConfig from "./vite.base.config";

const envResolver = {
  production: () => ({ ...viteBaseConfig, ...viteProdConfig }), //生产环境
  development: () => ({ ...viteBaseConfig, ...viteDevConfig }), //开发环境
};
// https://vitejs.dev/config/
export default defineConfig((config) => {
  console.log(config)
  return {
    ...envResolver[config.mode as keyof typeof envResolver](),
  };
});
