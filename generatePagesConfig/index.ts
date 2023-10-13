/*
 * @Date: 2023-06-12 20:31:38
 * @LastEditTime: 2023-10-13 18:40:04
 * @FilePath: /music-client/generatePagesConfig/index.ts
 * 介绍:
 */

import fs from "fs";
import path from "path";
import defaultConfig from "./pages.json";

const src = path.join(__dirname, "../src");
const pagesPath = path.join(src, "/pages");
const outDir = path.join(src, "/pages.json");
/**第一个页面 */
const first = "pages/home/home";
/**黑名单文件夹 */
const blacklist = [/.?\/components/];
/**后缀 */
const includeExtname = [".vue", ".nvue"];

const pages: PageConfig.Cfg[] = [];

traverseDir(pagesPath);

/**合成配置对象 */
const pagesJson = {
  pages,
  ...defaultConfig,
};
fs.writeFileSync(outDir, JSON.stringify(pagesJson, null, 2));
console.log("pages.json文件已生成");

/**
 * 遍历项目目录
 * @param dirPath
 * @param dirName
 */
function traverseDir(dirPath: string, dirName?: string) {
  const files = fs.readdirSync(dirPath);
  files.forEach((name) => {
    const _filePath = path.join(dirPath, name);
    const filePath = _filePath.replace(/\\/g, "/");
    /**黑名单过滤 */
    if (inBlacklist(filePath)) return;
    //如果是目录
    if (fs.statSync(_filePath).isDirectory()) {
      traverseDir(_filePath, name);
    } else {
      const extname = path.extname(_filePath);
      if (!includeExtname.includes(extname)) return;
      const fileName = path.basename(_filePath, extname);
      const pagePath = filePath.slice(
        src.length + 1,
        filePath.length - extname.length
      );
      try {
        setConfig(_filePath, pagePath);
      } catch (error) {
        console.error(
          "配置文件解析错误",
          { _filePath, filePath, fileName },
          error
        );
      }
    }
  });
}
/**
 * 路径是否在黑名单中
 * @param path 路径
 * @returns
 */
function inBlacklist(path: string) {
  for (const reg of blacklist) {
    if (reg.test(path) === true) return true;
  }
  return false;
}
/**
 * 生成配置对象
 * @param _filePath
 * @param pagePath
 */
function setConfig(_filePath: string, pagePath: string) {
  const pageContent = fs.readFileSync(_filePath, "utf-8");
  const cfg = parsePageCfg(pageContent);
  const item = {
    path: pagePath,
    style: cfg,
  };
  //第一个
  if (pagePath === first) pages.unshift(item);
  else pages.push(item);
}

/**
 * 解析页面配置
 * @param content
 * @returns
 */
function parsePageCfg(content: string): PageConfig.UserCfg {
  const match = content.match(/<cfg([\s\S]*)?>([\s\S]*?)<\/cfg>/);
  if (!match) return {};
  const jsonStr = match[2].trim();
  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    throw {
      error,
      jsonStr,
    };
  }
}
namespace PageConfig {
  export interface UserCfg {
    navigationBarTitleText?: string;
    enablePullDownRefresh?: boolean;
    navigationStyle?: "custom" | "default";
  }
  export interface Cfg {
    path: string;
    style: UserCfg;
  }
}
