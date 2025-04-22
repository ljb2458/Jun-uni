import Fs from "fs";
import Path from "path";
import type { Plugin } from "vite";

interface Page {
  path: string;
  style: any;
}

interface SubPackage {
  root: string;
  pages: Page[];
}
export interface Options {
  /**pages目录地址 */
  pagesDir: string;
  /**结果输出位置 */
  outFile: string;
  /**位于主包首位的页面 */
  firstPage: string;
  /**要打包为主包的文件夹 */
  mainPackageDir: string;
  /**
   * 黑名单
   * 默认：["**\/components\/**"]
   */
  blacklist?: string[];
  /**
   * 包含的文件后缀
   * 默认：[.vue,.nvue]
   */
  includedExtensions?: string[];
}
function globToRegex(glob: string) {
  // 特殊字符需要转义
  const escapeRegExp = (string: string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  let regexStr = "^";

  for (let i = 0; i < glob.length; i++) {
    const char = glob[i];
    if (char === "*") {
      // 处理 ** 的情况
      if (glob[i + 1] === "*") {
        regexStr += ".*";
        i++; // 跳过下一个 *
      } else {
        regexStr += "[^/]*";
      }
    } else if (char === "?") {
      regexStr += "[^/]";
    } else if (char === "/") {
      regexStr += "\\/";
    } else {
      regexStr += escapeRegExp(char);
    }
  }
  // 确保匹配到字符串末尾
  regexStr += "$";

  return new RegExp(regexStr);
}
/**生成 pages.json 文件 */
export function generatePagesJson(config: Options): Plugin {
  const {
    pagesDir,
    outFile,
    firstPage,
    mainPackageDir,
    blacklist: _blacklist = ["**/components/**"],
    includedExtensions = [".vue", ".nvue"],
  } = config;
  const blacklist = _blacklist.map((v) => globToRegex(v));
  /**
   * 主函数：生成 pages.json 文件
   */
  function generatePagesJson() {
    const pages = traversePagesDir(pagesDir);
    pagesSort(pages); // 对数组进行排序
    const { subPackagesPageCfg, mainPagesCfg } = pagesSubpackages(pages); // 对页面进行分包处理
    let pagesJson: any;
    try {
      pagesJson = JSON.parse(Fs.readFileSync(outFile, "utf-8") || "{}");
    } catch (error) {
      throw {
        message: "源 pages.json 格式错误。",
        path: Path.resolve(outFile),
      };
    }

    pagesJson.pages = mainPagesCfg;
    pagesJson.subPackages = subPackagesPageCfg;

    Fs.writeFileSync(outFile, JSON.stringify(pagesJson, null, 2));
    console.info("🎉 生成文件 pages.json");
  }

  /**
   * 遍历 pages 目录并生成页面配置
   * @param dirPath 目录路径
   * @returns 页面配置数组
   */
  function traversePagesDir(dirPath: string): Page[] {
    const pages: Page[] = [];

    const files = Fs.readdirSync(dirPath);

    for (const file of files) {
      const filePath = Path.join(dirPath, file);
      if (isBlacklisted(filePath)) continue;

      if (Fs.statSync(filePath).isDirectory()) {
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
  function pagesSort(pages: Page[]) {
    // 将 FIRST_PAGE 移动到数组顶部
    const firstPageIndex = pages.findIndex((p) => p.path === firstPage);
    if (firstPageIndex !== -1) {
      const [firstPage] = pages.splice(firstPageIndex, 1);
      pages.unshift(firstPage);
    }
  }

  interface PagesSubpackagesRes {
    mainPagesCfg: Page[];
    subPackagesPageCfg: SubPackage[];
  }

  /**
   * 对页面进行分包处理
   * @param pages 页面配置数组
   * @returns 分包配置数组
   */
  function pagesSubpackages(pages: Page[]): PagesSubpackagesRes {
    /**分组 */
    const subPackagesMap: Record<string, Page[]> = {};
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
    const subPackagesPageCfg: SubPackage[] = [];
    /**主包配置 */
    const mainPagesCfg: Page[] = [];
    for (const [root, pages] of Object.entries(subPackagesMap)) {
      const mainPackagePath = getPagePath(Path.join(mainPackageDir)).slice(
        0,
        -1
      );

      if (root === mainPackagePath) {
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
  function handleSubpackagesCfg(pages: Page[], root: string): Page[] {
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
    return blacklist.some((reg) => reg.test(filePath.replace(/\\/g, "/")));
  }

  /**
   * 检查文件是否为有效的页面文件
   * @param filePath 文件路径
   * @returns 是否有效
   */
  function isValidPageFile(filePath: string): boolean {
    const extname = Path.extname(filePath);
    return includedExtensions.includes(extname);
  }

  /**
   * 生成页面配置
   * @param filePath 文件路径
   * @returns 页面配置对象
   */
  function generatePageConfig(filePath: string): Page | null {
    const pagePath = getPagePath(filePath);
    const pageContent = Fs.readFileSync(filePath, "utf-8");
    try {
      const style = parsePageConfig(pageContent);
      return {
        path: pagePath,
        style,
      };
    } catch (error) {
      throw {
        message: "配置文件解析错误",
        path: Path.resolve(filePath),
        code: pageContent,
      };
    }
  }
  const routeRegExp = /<route([\s\S]*)?>([\s\S]*?)<\/route>/;
  /**
   * 解析页面配置
   * @param content 文件内容
   * @returns 页面配置对象
   */
  function parsePageConfig(content: string): any | null {
    const match = content.match(routeRegExp);
    if (!match) return null;
    return JSON.parse(match[2].trim());
  }

  /**
   * 获取页面路径
   * @param filePath 文件路径
   * @returns 页面路径
   */
  function getPagePath(filePath: string): string {
    const endLength = Path.extname(filePath).length;
    const startLength =
      Path.join(pagesDir).length - Path.basename(pagesDir).length - 1;
    filePath = filePath.replace(/\\/g, "/");
    return filePath.slice(startLength, filePath.length - endLength);
  }
  generatePagesJson();
  console.info(`🎉 开始监听 ${Path.join(pagesDir)}`);
  Fs.watch(pagesDir, { recursive: true }, () => {
    generatePagesJson();
  });

  return {
    name: "generatePagesJson",
  };
}
