/*
 * @Date: 2023-02-18 20:06:36
 * @LastEditTime: 2023-04-21 17:09:09
 * @FilePath: /music-client/vite.config.ts
 * 介绍:
 */
import { defineConfig, loadEnv, UserConfig, ConfigEnv } from "vite";
import viteDevConfig from "./vite.dev.config";
import viteProdConfig from "./vite.prod.config";
import viteBaseConfig from "./vite.base.config";

const envResolver = {
  production: (v: ConfigEnv) => ({
    ...viteBaseConfig(v),
    ...viteProdConfig(v),
  }), //生产环境
  development: (v: ConfigEnv) => ({
    ...viteBaseConfig(v),
    ...viteDevConfig(v),
  }), //开发环境
};
type EnvResolverKey = keyof typeof envResolver;
// https://vitejs.dev/config/
export default defineConfig((config) => {
  console.log(config);
  const option: UserConfig = {
    ...envResolver[config.mode as EnvResolverKey](config),
  };
  return option;
});
