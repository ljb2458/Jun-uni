# jun-uni

## 项目介绍

> ⭐`jun-uni` 是一个由个人开发者 `Juncoder` 积累四年开发经验打造的适用中小型公司一般开发情况的 uniapp 开箱即用高效开发框架。

> ⭐`jun-uni` 的诞生是为了解决 `Uniapp` 多端兼容麻烦、使用 `HBuilder X` 开发体验一般、对 `TypeScript` 支持不好的问题，旨在优化开发体验、减少兼容代码。

> ⭐ 该框架使用 `Uniapp` `Vue3` `TypeScript` `Pinia` `luchRequest` `Vite` `uv-view` 打造。
> 因此在使用此框架前，我推荐你先学习或了解 `Uniapp` `Vue3` `TypeScript` `Pinia` `Axios(luchRequest)`

> 该框架使用的 `node` 版本为 `v22.13.1` 为了减少运行时所带来的错误，请尽可能使用与 `v22.13.1` 相近的版本。

[TOC]

### 框架解决了以下开发痛点

- ⭐`pages.json` 配置麻烦、不便查阅？

  - 使用 `/generatePagesConfig` 文件夹下的 `generate` 命令 自动生成 `pages.json` 配置文件。
  - 配置项直接写在当前 `vue` 文件中，一目了然。
  - 文件目录就是小程序分包方式，非常好理解。

- ⭐ 实现 `tabs` 选项卡，高度总是问题？

  - 使用组件 `CoTabsFor` 传入一个数组，定义一个插槽可以轻松实现自动高度的 tabs 选项卡。

- ⭐ 分页列表处理麻烦，总是涉及数组操作？

  - 使用组件 `CoRequestList` ，仅需传入一个使用适配器包装后的 `api` 方法 加上一个 `item` 插槽，即可加载分页数据。

- ⭐ 自定义导航栏注册麻烦，担心与原生导航栏冲突，计算页面高度时还需要考虑有没有开启自定义导航？

  - 在组件 `CoPageView` 中根据 `pages.json` 对应配置，`自动注册` 自定义导航栏。
  - 在组件 `CoPageView` 为您计算好导航栏高度和页面可用高度,生成 css 样式 `--layout-navbar-height` 和 `--layout-page-height`。

- ⭐ 写在底部的固定按钮，忘记计算底部安全区、忘记写占位符，导致页面最底部元素被按钮遮盖，无法完整的查看？

  - 在组件 `CoPageView` 中提供了 `fixedBottom` 插槽，计算安全区并在页面生成占位元素的同时，将你的元素定位到页面最底部。

- ⭐`uni.request` 不够好用？

  - `/utils/HttpRequest` 基于 `luchRequest` 进行二次封装，神似 `Axios` 有请求拦截器、响应拦截器、自动提示等。

- ⭐ 路由跳转、路由传参需要自己拼接字符串？

  - `/utils/router` 二次封装路由跳转，自动拼接 `Query` 参数。

- ⭐ 找不到对 `TypeScript` 支持良好的 `uniapp` 框架？

  - `jun-uni` 框架中的所有 方法、组件、示例代码、包括 `uniapp` 的原生组件，均有良好的 `TypeScript` 支持

- ⭐ 微信小程序组件总是多渲染一层组件盒，影响样式编写？

  - 每个公共组件都不会有多余的组件盒，减少平台差异。

- `jun-uni` 框架中的所有 方法、组件、示例代码、包括 `uniapp` 的原生组件，均有良好的 `TypeScript` 支持

- 开启了过多相同的循环定时器，造成性能浪费、忘记关闭循环定时器？

  - 使用 `/hooks/toolsHooks` 中的 `useInterval` 同样间隔时间的循环定时器只会被开启一次。

- 全局状态管理 `store(pinia、vuex)` 数据持久化麻烦？

  - `pinia + mp-storage + pinia-plugin-persistedstate` 简单而优雅的解决问题。

- `picker` 用户体验不好，市面上又缺少好用的级联选择器？

  - `CoCascader 级联选择器组件` 动画流畅，使用简单。

- 分栏编写样式麻烦、样式名难想、`tailwindcss` 体积太大，且对小程序支持不好？

  - 组件有自己的 `原子化 css` 提升开发效率，降低开发成本，方便做颜色主题与老年模式等相似业务。

## 首次启动

安装依赖

```shell
pnpm i
```

启动

```shell
//网页
pnpm run dev:h5
//微信小程序
pnpm run dev:mp-weixin
```

或在 `HBuilder X` 中启动项目。

## 习惯配置

**使用该框架，我推荐你添加以下代码片段**

编译器左下角小齿轮=>代码片段=>选择 `vue3`

```json
{
  //其他代码片段...
  "uniapp页面": {
    "prefix": "uni-page",
    "body": [
      "<cfg lang=\"json\">",
      "{",
      "  \"navigationBarTitleText\": \"$1\",",
      "  \"enablePullDownRefresh\": false,",
      "  \"navigationStyle\": \"custom\",",
      "  \"navigationBarTextStyle\": \"white\"",
      "}",
      "</cfg>",
      "",
      "<script setup lang=\"ts\">",
      "import { onPageScroll } from \"@dcloudio/uni-app\";",
      "</script>",
      "",
      "<template>",
      "  <CoPageView class=\"B-B2 PB-md\" :onPageScroll=\"onPageScroll\">",
      "$2",
      "  </CoPageView>",
      "</template>",
      "",
      "<style lang=\"scss\" scoped>",
      "</style>",
      ""
    ],
    "description": "uniapp 页面"
  }
}
```

编译器左下角小齿轮=>代码片段=>选择 `ts`

```json
{
  //其他代码片段...
  "pinia仓库": {
    "prefix": "pinia-store",
    "body": [
      "import { defineStore } from \"pinia\";",
      "import { localStorage } from \"mp-storage\";",
      "",
      "export default defineStore(\"$1Store\", {",
      "  //*全局仓库",
      "  state: initState,",
      "  //*全局函数",
      "  actions: {},",
      "  //*计算属性",
      "  getters: {},",
      "  //*仓库数据缓存",
      "  persist: [",
      "    {",
      "      key: \"$1Store\",",
      "      storage: localStorage, //指定储存位置",
      "    },",
      "  ],",
      "});",
      "/**state类型定义 */",
      "export namespace $1Store {",
      "  export interface Store {}",
      "}",
      "/**初始化pinia */",
      "function initState(): $1Store.Store {",
      "  return {",
      "  };",
      "}",
      ""
    ],
    "description": "pinia仓库"
  }
}
```

## 文件目录

```
generatePagesConfig |-index.ts    //用于生成pages.json配置文件；在vscode资源管理器中的npm脚本中选择generatePagesConfig\package.json中的generate命令执行。
                    |-pages.json  //pages.json除页面路由以外的配置，修改后需要重新生成pages.json文件。

src |-layout    | //存放自定义的navbar等其他每个页面都需要的组件。
    |-style     | //存放预设、公共、scss文件。
    |-components|-common  //存放公用组件，一般为新组件。
                |-group   //存放组合组件，一般为多个组件的纯粹组合，非新组件。
                |-rewrite //存放二次封装的组件，在原有组件上添加新的方法。
                |-native  //存放一般只有这个项目才能用到的公共业务组件。
    |-init.ts   //项目加载、App.vue 初始化、登录完成 时干的事。

types |-dts   | //全局配置、组件、等ts存放目录
              |-modult.d.ts //全局模块声明
              |-typeFunction.d.ts //自定义ts类型生成与转换方法
              |-components.d.ts   //全局组件ts声明目录
              |-auto-import | //自动生成ts类型存放目录
```

## 快速对接后端接口

1. 设置接口地址及后缀

   1. 在 `/.env、/.env.development、/.env.production` 中分别修改 `VITE_API_PREFIX 接口请求后缀`、`VITE_API_URL 接口请求地址`，**⚠ 注 ❗ 如果为空请将该行注释。没有值的 `env` 配置文件 将会造成 `h5` 无法正常启动的诡异问题**

      ```env
      # 请求后缀
      VITE_API_PREFIX=/api
      # 请求接口地址
      VITE_API_URL=https://xxxx
      # 其它配置...
      ```

   2. 重启项目。

2. 修改示例 `token` 的传递方式

   1. 在 `/src/api/index.ts` 中找到 `defHttp.interceptors.request.use` 修改其中的请求配置。

      ```ts
      //请求拦截器，在这里设置 token
      defHttp.interceptors.request.use((config) => {
        const sysStore = useSysStore();
        config.header = {
          ...config.header,
          token: sysStore.token,
        };
        return config;
      });
      ```

3. 修改返回结果的类型

   1. 在 `/src/api/index.ts` 中找到 `export namespace Api` 修改其中的类型定义。

      ```ts
      /**请求res类型 */
      export namespace Api {
        export interface SuccessRes<T> {
          code: 200;
          message: string;
          time: Date;
          type: string;
          isSuccess: true;
          result: T;
        }
        export interface FailRes<T> {
          code: number;
          message: string;
          time: Date;
          type: string;
          isSuccess: false;
          result?: T;
        }
        export type Res<T> = SuccessRes<T> | FailRes<T>;
      }
      ```

4. 修改示例 `isSuccess`、`giveMsg`、`giveErrMsg` 方法

   1. 在 `/src/api/index.ts` 中找到 `export const defHttp = createHttpRequest` 方法，修改传入的三个函数为实际数据。

      ```ts
      export const defHttp = createHttpRequest(
        {
          isSuccess(res) {
            conosole.log("res", res);
            return res?.data?.code === 200;
          },
          giveMsg(res) {
            return res?.data?.message;
          },
          giveErrMsg(error) {
            return error?.errMsg;
          },
        },
        {
          baseURL,
        }
      );
      ```

5. 在 `/src/api/userinfo` 中复制粘贴或直接修改一个接口并调用。

## 自动生成 pages.json（generatePagesConfig）

1. 全局安装或在 `/generatePagesConfig/` 目录下安装 `ts-node`
   ```shellinstall
   pnpm  ts-node -g
   ```
2. 在 `/generatePagesConfig/pages.json` 配置 `tabBar` 以及其它默认配置。

   ```json
   {
     //请在这里配置 tabbar，在 /src/pages.json 配置将会在下次自动生成时被覆盖。
     "tabBar": {},
     "globalStyle": {},
     "easycom": {
       "custom": {}
     }
   }
   ```

3. 在 `/generatePagesConfig/index.ts` 配置 主包、首页、黑名单正则等。
   ```ts
   /**项目文件地址 */
   const SRC_DIR = path.join(__dirname, "../src");
   /**pages目录地址 */
   const PAGES_DIR = path.join(SRC_DIR, "pages");
   /**结果输出位置 */
   const OUTPUT_FILE = path.join(SRC_DIR, "pages.json");
   /**位于主包首位的页面 */
   const FIRST_PAGE = "pages/tabbar/home/home";
   /**要打包为主包的文件夹 */
   const MAIN_PACKAGE_DIR = "pages/tabbar"; // 主包文件夹
   /**黑名单 */
   const BLACKLIST = [/.?\/components/];
   /**包含的文件后缀 */
   const INCLUDED_EXTENSIONS = [".vue", ".nvue"];
   ```
4. 运行 `/generatePagesConfig` 目录下的命令 `generate`
   ```shell
   pnpm run generate
   ```

### 页面生成规则

`generatePagesConfig` 会自动将 `/src/pages` 下的每一个目录当作一个分包生成，而`MAIN_PACKAGE_DIR` 所指向的文件夹将会被放到主包配置内。
