import fs from "fs";
import path from "path";
import defaultConfig from "./pages.json";

// 常量配置
const SRC_DIR = path.join(__dirname, "../src");
const PAGES_DIR = path.join(SRC_DIR, "pages");
const OUTPUT_FILE = path.join(SRC_DIR, "pages.json");
const FIRST_PAGE = "pages/tabbar/home/home";
const MAIN_PACKAGE_DIR = "pages/tabbar"; // 主包文件夹
const BLACKLIST = [/.?\/components/];
const INCLUDED_EXTENSIONS = [".vue", ".nvue"];

// 页面配置类型
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

  export interface SubPackage {
    root: string;
    pages: Cfg[];
  }
}

/**
 * 主函数：生成 pages.json 文件
 */
function generatePagesJson() {
  const pages = traversePagesDir(PAGES_DIR);
  pagesSort(pages); // 对数组进行排序
  const { subPackagesPageCfg, mainPagesCfg } = pagesSubpackages(pages); // 对页面进行分包处理

  const pagesJson = {
    pages: mainPagesCfg, // 主包页面
    subPackages: subPackagesPageCfg, // 分包配置
    ...defaultConfig,
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(pagesJson, null, 2));
  console.log("pages.json 文件已生成");
}

/**
 * 遍历 pages 目录并生成页面配置
 * @param dirPath 目录路径
 * @returns 页面配置数组
 */
function traversePagesDir(dirPath: string): PageConfig.Cfg[] {
  const pages: PageConfig.Cfg[] = [];

  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file).replace(/\\/g, "/");

    if (isBlacklisted(filePath)) continue;

    if (fs.statSync(filePath).isDirectory()) {
      pages.push(...traversePagesDir(filePath)); // 递归处理子目录
      continue;
    }
    if (!isValidPageFile(filePath)) continue;
    const pageConfig = generatePageConfig(filePath);
    if (pageConfig) {
      pages.push(pageConfig); // 插入页面配置
    }
  }

  return pages;
}

/**
 * 对页面数组进行排序
 * @param pages 页面配置数组
 */
function pagesSort(pages: PageConfig.Cfg[]) {
  // 将 FIRST_PAGE 移动到数组顶部
  const firstPageIndex = pages.findIndex((p) => p.path === FIRST_PAGE);
  if (firstPageIndex !== -1) {
    const [firstPage] = pages.splice(firstPageIndex, 1);
    pages.unshift(firstPage);
  }
}

interface PagesSubpackagesRes {
  mainPagesCfg: PageConfig.Cfg[];
  subPackagesPageCfg: PageConfig.SubPackage[];
}

/**
 * 对页面进行分包处理
 * @param pages 页面配置数组
 * @returns 分包配置数组
 */
function pagesSubpackages(pages: PageConfig.Cfg[]): PagesSubpackagesRes {
  /**分组 */
  const subPackagesMap: Record<string, PageConfig.Cfg[]> = {};
  // 按文件夹分组
  for (const page of pages) {
    const pathArray = page.path.split("/");
    const root = pathArray.slice(0, 2).join("/"); // 获取文件夹名称（如 "pages/tabbar"）
    if (!subPackagesMap[root]) {
      subPackagesMap[root] = [];
    }
    subPackagesMap[root].push(page);
  }

  /**分包配置 */
  const subPackagesPageCfg: PageConfig.SubPackage[] = [];
  /**主包配置 */
  const mainPagesCfg: PageConfig.Cfg[] = [];
  for (const [root, pages] of Object.entries(subPackagesMap)) {
    if (root === MAIN_PACKAGE_DIR) {
      //主包文件夹
      mainPagesCfg.push(...pages);
      continue;
    }
    subPackagesPageCfg.push({
      root: root,
      pages: handleSubpackagesCfg(pages, root),
    });
  }

  return { mainPagesCfg, subPackagesPageCfg };
}

/**
 * 处理分包配置
 * @param pages 分包数组
 * @param root 分包数组
 * @returns
 */
function handleSubpackagesCfg(
  pages: PageConfig.Cfg[],
  root: string
): PageConfig.Cfg[] {
  const regExp = new RegExp(`${root}/`);
  return pages.map((v) => ({
    ...v,
    path: v.path.replace(regExp, ""),
  }));
}

/**
 * 检查文件路径是否在黑名单中
 * @param filePath 文件路径
 * @returns 是否在黑名单中
 */
function isBlacklisted(filePath: string): boolean {
  return BLACKLIST.some((reg) => reg.test(filePath));
}

/**
 * 检查文件是否为有效的页面文件
 * @param filePath 文件路径
 * @returns 是否有效
 */
function isValidPageFile(filePath: string): boolean {
  const extname = path.extname(filePath);
  return INCLUDED_EXTENSIONS.includes(extname);
}

/**
 * 生成页面配置
 * @param filePath 文件路径
 * @returns 页面配置对象
 */
function generatePageConfig(filePath: string): PageConfig.Cfg | null {
  const pagePath = getPagePath(filePath);
  const pageContent = fs.readFileSync(filePath, "utf-8");
  const style = parsePageConfig(pageContent);

  if (!style) return null;

  return {
    path: pagePath,
    style,
  };
}

/**
 * 解析页面配置
 * @param content 文件内容
 * @returns 页面配置对象
 */
function parsePageConfig(content: string): PageConfig.UserCfg | null {
  const match = content.match(/<cfg([\s\S]*)?>([\s\S]*?)<\/cfg>/);
  if (!match) return null;

  try {
    return JSON.parse(match[2].trim());
  } catch (error) {
    console.error("配置文件解析错误", { error, jsonStr: match[2].trim() });
    return null;
  }
}

/**
 * 获取页面路径
 * @param filePath 文件路径
 * @returns 页面路径
 */
function getPagePath(filePath: string): string {
  const extname = path.extname(filePath);
  return filePath.slice(SRC_DIR.length + 1, filePath.length - extname.length);
}

// 执行主函数
generatePagesJson();
