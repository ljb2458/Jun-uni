/*
 * @FilePath: /hash-guess-game/vite.dev.config.ts
 * 介绍:开发环境配置项
 */

import { defineConfig, loadEnv } from "vite";
import path from "path";
const mode = "development";
const env = loadEnv(mode, process.cwd(), "VITE_");
export default defineConfig({});
