/*
 * @FilePath: /my-vue3-project/vite.dev.config.ts
 * 介绍:开发环境配置项
 */

import { defineConfig, loadEnv } from "vite";
import path from "path";
const mode = "development";
const env = loadEnv(mode, process.cwd(), "VITE_");
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      [env.VITE_API_PREFIX]: {
        changeOrigin: env.VITE_PROXY == "1", //改变源头开关
        target: env.VITE_BASE_URL,
      },
    },
  },
});
