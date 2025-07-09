// https://www.npmjs.com/package/@uni-helper/unocss-preset-uni
import { presetUni } from "@uni-helper/unocss-preset-uni";
import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [presetUni()],
  transformers: [
    // 启用指令功能：主要用于支持 @apply、@screen 和 theme() 等 CSS 指令
    transformerDirectives(),
    // 启用 () 分组功能
    // 支持css class组合，`<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
    transformerVariantGroup(),
  ],
  theme: {
    fontSize: {
      /** 提供更小号的字体，用法如：text-2xs */
      "2xs": ["20rpx", "28rpx"],
      "3xs": ["18rpx", "26rpx"],
    },
  },
});
