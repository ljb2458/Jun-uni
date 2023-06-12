/*
 * @Date: 2023-06-12 20:31:38
 * @LastEditTime: 2023-06-12 21:11:39
 * @FilePath: /music-client/generatePagesConfig/index.ts
 * 介绍:
 */
import fs from "fs";
import path from "path";
import defaultConfig from "./pages.json";

const src = path.join(__dirname, "../src");
const pagesPath = path.join(src, "/pages");
const outDir = path.join(src, "/pages.json");

/**将页面配置转换为uniapp配置 */
function getpageConfig(cfg: PageCfg) {
  return {
    style: {
      navigationBarTitleText: cfg.title,
    },
  };
}
/**页面文件类型 */
interface PageCfg {
  title?: string;
}
/**配置项类型 */
interface Page {
  path: string;
  style: {
    navigationBarTitleText?: string;
  };
}

const pageNames = fs
  .readdirSync(pagesPath, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const pages: Page[] = pageNames.map((name) => {
  const pagePath = `pages/${name}/${name}`;
  const pageFilePath = path.join(pagesPath, name, `${name}.vue`);
  const pageContent = fs.readFileSync(pageFilePath, "utf-8");
  const cfg = findPageCfg(pageContent);
  return {
    path: pagePath,
    ...getpageConfig(cfg),
  };
});

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
  if (match) {
    const jsonStr = match[1].trim();
    try {
      return JSON.parse(jsonStr);
    } catch (err) {
      console.error(`解析JSON字符串失败：${jsonStr}`);
      return {};
    }
  }
  return {};
}
