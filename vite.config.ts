import { defineConfig, loadEnv, UserConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";
import commonjs from "@rollup/plugin-commonjs";
import path from "path";
import Components from "unplugin-vue-components/vite";

export default defineConfig((config) => {
  const env = loadEnv(config.mode, process.cwd(), "VITE_");
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
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境移除console
          drop_debugger: true, // 生产环境移除debugger
        },
      },
      rollupOptions: {
        output: {
          format: "es",
          sourcemap: true, // 生成 sourcemap，方便调试
        },
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // 修改api调用方式
        },
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
