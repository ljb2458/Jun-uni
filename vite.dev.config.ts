/*
 * @FilePath: /my-vue3-project/vite.dev.config.ts
 * 介绍:开发环境配置项
 */

import { defineConfig, loadEnv, ConfigEnv } from "vite";
import path from "path";
export default (config: ConfigEnv) => {
  const env = loadEnv(config.mode, process.cwd(), "VITE_");
  return defineConfig({
    server: {
      host: true,
      port: 5173,
      proxy: {
        [env.VITE_API_PREFIX]: {
          changeOrigin: env.VITE_PROXY == "1", //改变源头开关
          target: env.VITE_BASE_URL,
        },
      },
    },
  });
};
