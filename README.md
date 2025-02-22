# JunUni

## 首次启动

安装依赖

```shell
pnpm i
```

启动

```shell
pnpm run dev:h5
```

或在 HBuilder X 中启动项目，除 h5 以外都建议在 HBuilder X 中启动项目

## 配置

编译器左下角小齿轮=>代码片段=>选择 vue3

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

编译器左下角小齿轮=>代码片段=>选择 ts

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

## 特殊文件目录

```
generatePagesConfig |-index.ts    //用于生成pages.json配置文件；在vscode资源管理器中的npm脚本中选择generatePagesConfig\package.json中的generate命令执行
                    |-pages.json  //pages.json除页面路由以外的配置，修改后需要重新生成pages.json文件

src |-layout  | //存放自定义的navbar等其他每个页面都需要的组件
    |-style   | //存放预设、公共、scss文件
    
types |-dts   | //全局配置、组件、等ts存放目录
              |-modult.d.ts //全局模块声明
              |-typeFunction.d.ts //自定义ts类型生成与转换方法
              |-components.d.ts   //全局组件ts声明目录
              |-auto-import | //自动生成ts类型存放目录
```
