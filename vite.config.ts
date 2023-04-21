/*
 * @Date: 2023-02-18 20:06:36
 * @LastEditTime: 2023-04-21 17:09:09
 * @FilePath: /music-client/vite.config.ts
 * 介绍:
 */
import { defineConfig, loadEnv, UserConfig } from "vite";
import viteDevConfig from "./vite.dev.config";
import viteProdConfig from "./vite.prod.config";
import viteBaseConfig from "./vite.base.config";
import Components from "unplugin-vue-components/vite";

const envResolver = {
  production: () => ({
    ...viteBaseConfig,
    ...viteProdConfig,
  }), //生产环境
  development: () => ({
    ...viteBaseConfig,
    ...viteDevConfig,
  }), //开发环境
};
// https://vitejs.dev/config/
export default defineConfig((config) => {
  console.log(config);
  const option: UserConfig = {
    ...envResolver[config.mode as keyof typeof envResolver](),
  };
  //*只有serve时使用vite的自动引入，其它情况使用uniapp的easycom模式
  if (config.command === "serve") {
    option.plugins = option.plugins || [];
    option.plugins.push(
      Components({
        dirs: ["src/components"],
        deep: true,
        extensions: ["vue"],
        dts: "./types/dts/auto-importsComponents.d.ts",
      })
    );
  }

  return option;
});
