/*
 * @FilePath: /three/vite.prod.config.ts
 * 介绍:生产环境配置项
 */

import { defineConfig, loadEnv } from "vite";
import path from "path";
const mode = "production";
const env = loadEnv(mode, process.cwd(), "VITE_");
export default defineConfig({});
