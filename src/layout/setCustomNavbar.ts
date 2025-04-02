import { getSystemInfoCache } from "@/utils/rewriteUni";
import type { CSSProperties } from "vue";
import { unitPx } from "@/utils/tools/css";

/**全局自定义导航栏布局样式 */
export const defaultStyle = reactive<CSSProperties>({});

export function computedDefaultStyle() {
  const { screenWidth } = getSystemInfoCache();
  //#ifndef APP || H5 || MP-LARK
  const info = uni.getMenuButtonBoundingClientRect();
  const top = info.top / 2;
  defaultStyle.paddingTop = unitPx(top);
  defaultStyle.height = `calc(${unitPx(info.height + top)} + var(--gap-xs))`;
  if (screenWidth) defaultStyle.paddingRight = unitPx(screenWidth - info.left);
  else defaultStyle.paddingRight = unitPx(info.width);

  //#endif
  //#ifdef H5 || APP
  defaultStyle.height = "44px";
  //#endif
}
computedDefaultStyle();
