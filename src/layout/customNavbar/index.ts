import { getSystemInfoCache } from "@/utils/rewriteUni";
import type { CSSProperties } from "vue";
import { unitPx } from "@/utils/tools/css";

/**全局自定义导航栏布局样式 */
export const customNavbarInfoStyle = computed<CSSProperties>(() => {
  const result: CSSProperties = {
    paddingTop: unitPx(customNavbarInfo.paddingTop),
    paddingRight: unitPx(customNavbarInfo.paddingRight),
    paddingBottom: unitPx(customNavbarInfo.paddingBottom),
    height: unitPx(customNavbarInfo.height),
  };

  return result;
});
export const customNavbarInfo = reactive({
  paddingTop: 0,
  paddingBottom: 0,
  height: 0,
  paddingRight: 0,
  paddingleft: 0,
});

export function computedDefaultStyle() {
  const { screenWidth } = getSystemInfoCache();
  //#ifndef APP || H5 || MP-LARK
  const info = uni.getMenuButtonBoundingClientRect();
  customNavbarInfo.paddingTop = info.top / 2;
  customNavbarInfo.paddingBottom = 8;
  customNavbarInfo.height =
    info.height + customNavbarInfo.paddingTop + customNavbarInfo.paddingBottom;

  if (screenWidth) customNavbarInfo.paddingRight = screenWidth - info.left;
  else customNavbarInfo.paddingRight = info.width;
  //#endif
  //#ifdef H5 || APP
  customNavbarInfo.height = 44;
  //#endif
}
computedDefaultStyle();
