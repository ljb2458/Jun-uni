/*
 * @Date: 2023-06-12 20:31:38
 * @LastEditTime: 2023-07-03 15:51:22
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
const blacklist = ["/components"];
/**后缀 */
const extname = ".vue";

/**将页面配置转换为uniapp配置 */
function getPageConfig(cfg: PageCfg) {
  return {
    style: {
      navigationBarTitleText: cfg.title,
      enablePullDownRefresh: cfg.enablePullDownRefresh,
    },
  };
}
/**页面文件类型 */
interface PageCfg {
  title?: string;
  enablePullDownRefresh?: boolean;
}
/**配置项类型 */
interface Page {
  path: string;
  style: {
    navigationBarTitleText?: string;
    enablePullDownRefresh?: boolean;
  };
}

const pages: Page[] = [];

function traverseDir(dirPath: string) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const name = path.basename(file, extname);
    const pagePath = `pages/${path.relative(pagesPath, dirPath)}/${name}`;
    if (fs.statSync(filePath).isDirectory()) {
      if (!checkBlacklist(pagePath)) {
        traverseDir(filePath);
      }
    } else if (path.extname(filePath) === extname) {
      const pageContent = fs.readFileSync(filePath, "utf-8");
      const cfg = findPageCfg(pageContent);
      const item = {
        path: pagePath,
        ...getPageConfig(cfg),
      };
      //第一个
      if (pagePath === first) pages.unshift(item);
      else pages.push(item);
    }
  });
}
function checkBlacklist(path: string) {
  return blacklist.some((v) => path.indexOf(v) + 1);
}

traverseDir(pagesPath);

/**合成配置对象 */
const pagesJson = {
  pages,
  ...defaultConfig,
};

fs.writeFileSync(outDir, JSON.stringify(pagesJson, null, 2));

console.log("pages.json文件已生成");

/**找到页面中的页面配置 */
function findPageCfg(content: string): PageCfg {
  const match = content.match(/<cfg\s+lang="json">([\s\S]*?)<\/cfg>/);
  if (!match) return {};
  const jsonStr = match[1].trim();
  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error(`解析JSON字符串失败：${jsonStr}`);
    return {};
  }
}
