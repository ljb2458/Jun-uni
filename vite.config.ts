import { defineConfig, loadEnv, UserConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";
import Components from "@uni-helper/vite-plugin-uni-components";
import { WotResolver } from "@uni-helper/vite-plugin-uni-components/resolvers";
import commonjs from "@rollup/plugin-commonjs";
import path from "path";
import { generatePagesJson } from "./vite-plugins/generatePagesJson/index";
import Optimization from "@uni-ku/bundle-optimizer";
import ViteRestart from "vite-plugin-restart";

export default defineConfig(async (config) => {
  const UnoCSS = (await import("unocss/vite")).default;
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
      minify: "esbuild",
    },
    esbuild: {
      drop: config.mode === "production" ? ["console", "debugger"] : [],
    },
    plugins: [
      uni(),
      commonjs(),
      ViteRestart({
        // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
        restart: ["vite.config.js"],
      }),
      generatePagesJson({
        outFile: "./src/pages.json",
        firstPage: "./src/pages/tabbar/home/home.vue",
        mainPackageDir: "./src/pages/tabbar/",
        pagesDir: "./src/pages/",
      }),
      UnoCSS(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "uni-app", "pinia"],
        dts: "./types/dts/auto-import/imports.d.ts",
      }),
      Components({
        exclude: ["RouterLink", "RouterView"],
        dirs: ["src/components"],
        deep: true,
        extensions: ["vue"],
        dts: "./types/dts/auto-import/components.d.ts",
        //(wd-ui 自动引入)
        resolvers: [WotResolver()],
      }),
      Optimization({
        enable: {
          optimization: true,
          "async-import": true,
          "async-component": true,
        },
        dts: {
          base: "./types/dts/auto-import",
        },
      }),
    ],
    //@ts-ignore
    transpileDependencies: ["uview-plus", "luch-request"],
  };

  return option;
});
