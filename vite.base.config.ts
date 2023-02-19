/*
 * @FilePath: /my-vue3-project/vite.base.config.ts
 * 介绍:无论哪个环境都会执行的配置项
 */

import uni from "@dcloudio/vite-plugin-uni";
import commonjs from "@rollup/plugin-commonjs";
import { defineConfig } from "vite";
import path from "path";
export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@@": path.join(__dirname, "src"),
    },
  },
  plugins: [uni(), commonjs()],
  //@ts-ignore
  transpileDependencies: ["uview-plus"],
});
