/*
 * @FilePath: /music-client/vite.base.config.ts
 * 介绍:无论哪个环境都会执行的配置项
 */

import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";
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
  plugins: [
    uni(),
    commonjs(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", "uni-app"],
      dts: "./types/dts/auto-importsVue.d.ts",
    }),
  ],
  //@ts-ignore
  transpileDependencies: ["uview-plus", "luch-request"],
});
