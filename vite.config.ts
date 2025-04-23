import { defineConfig, loadEnv, UserConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";
import commonjs from "@rollup/plugin-commonjs";
import path from "path";
import Components from "unplugin-vue-components/vite";
import { generatePagesJson } from "./vite-plugins/generatePagesJson/index";

export default defineConfig((config) => {
  const env = loadEnv(config.mode, process.cwd(), "VITE_");
  console.log("config", config);
  console.log("env", env);
  const option: UserConfig = {
    base: "/",
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
        "#": path.join(__dirname, "types"),
      },
    },

    server: {
      host: true,
      port: 5173,
      proxy: {
        [env.VITE_API_PREFIX]: {
          changeOrigin: env.VITE_PROXY == "1", //改变源头开关
          target: env.VITE_API_URL,
        },
      },
    },

    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: config.mode === "production", // 生产环境移除console
          drop_debugger: config.mode === "production", // 生产环境移除debugger
        },
        format: {
          comments: config.mode === "production" ? false : "all",
        },
      },
      //不生成代码映射，减少编译时常
      sourcemap: false,
    },

    plugins: [
      uni(),
      commonjs(),
      generatePagesJson({
        outFile: "./src/pages.json",
        firstPage: "./src/pages/tabbar/home/home.vue",
        mainPackageDir: "./src/pages/tabbar/",
        pagesDir: "./src/pages/",
      }),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "uni-app"],
        dts: "./types/dts/auto-import/auto-importsVue.d.ts",
      }),
    ],
    //@ts-ignore
    transpileDependencies: ["uview-plus", "luch-request"],
  };

  //*只有serve时使用vite的自动引入生成全局ts类型支持，其它情况使用uniapp的easycom模式
  if (config.command === "serve") {
    option.plugins!.push(
      Components({
        exclude: ["RouterLink", "RouterView"],
        dirs: ["src/components"],
        deep: true,
        extensions: ["vue"],
        dts: "./types/dts/auto-import/auto-importsComponents.d.ts",
      })
    );
  }

  return option;
});
