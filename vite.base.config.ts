/*
 * @FilePath: /music-client/vite.base.config.ts
 * 介绍:无论哪个环境都会执行的配置项
 */

import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";
import commonjs from "@rollup/plugin-commonjs";
import { defineConfig, ConfigEnv, UserConfig } from "vite";
import path from "path";
import Components from "unplugin-vue-components/vite";

export default (config: ConfigEnv) => {
  const option = <UserConfig>defineConfig({
    base: "/",
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
    },
    plugins: [
      uni(),
      commonjs(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "uni-app"],
        dts: "./types/dts/auto-import/auto-importsVue.d.ts",
      }),
    ],
    //@ts-ignore
    transpileDependencies: ["uview-plus", "luch-request"],
  });

  //*只有serve时使用vite的自动引入生成全局ts类型支持，其它情况使用uniapp的easycom模式
  if (config.command === "serve") {
    option.plugins!.push(
      Components({
        dirs: ["src/components"],
        deep: true,
        extensions: ["vue"],
        dts: "./types/dts/auto-import/auto-importsComponents.d.ts",
      })
    );
  }

  return option;
};
