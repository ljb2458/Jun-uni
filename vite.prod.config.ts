/*
 * @FilePath: /music-client/vite.prod.config.ts
 * 介绍:生产环境配置项
 */

import { defineConfig, loadEnv, ConfigEnv } from "vite";
import path from "path";
const mode = "production";
const env = loadEnv(mode, process.cwd(), "VITE_");
export default (config: ConfigEnv) => {
  return defineConfig({});
};
