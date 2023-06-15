<!--
 * @Date: 2023-02-28 21:36:43
 * @LastEditTime: 2023-06-15 17:38:18
 * @FilePath: /music-client/src/components/common/CtabsFor/CtabsFor.vue
 * 介绍:
-->
<script lang="ts" setup generic="Item extends CtabsForOptionsItem">
import { unitPercent, unitPx } from "@@/utils/tools/css";
import { getRect, GetRectRes } from "@@/hooks/rewriteUni";
import { CSSProperties } from "vue";
import dayjs from "dayjs";
import { CtabsForOptionsItem } from "./index";
import { generateUUID } from "@@/utils/tools/generate";
import type { StyleValue } from "vue";

const props = withDefaults(
  defineProps<{
    /**间距 */
    gap?: string;
    options: Item[];
    /**开启粘性布局 */
    sticky?: Boolean;
    /**粘性组件tyle */
    stickyStyle?: StyleValue;
    /**单位px，内部需要对它进行计算 */
    offsetTop?: number;
    /**懒加载 */
    lazy?: boolean;
    //----tabs组件开始---
    /**标题options中的标题键名 */
    titleKeyName?: keyof TabsListItem;
    /**滑块颜色 */
    titleLineColor?: string;
    titleLineWidth?: StrNumber;
    titleLineHeight?: StrNumber;
    /**滑块背景size */
    titleLineBgSize?: "cover" | "contain" | "percentage" | string;
    /**菜单item的样式 */
    titleItemStyle?: StyleValue;
    /**菜单选中样式 */
    titleActiveStyle?: StyleValue;
    /**菜单非选中样式 */
    titleInactiveStyle?: StyleValue;
    /**菜单是否可滚动 */
    titleScrollable?: boolean;
    //----tabs组件结束---
  }>(),
  {
    offsetTop: 0,
    gap: "var(--gap-md)",
    lazy: true,
  }
);

type TabsListItem = Item & { load: boolean; key: StrNumber; index: number };
const tabsList = computed<Array<TabsListItem>>(() =>
  props.options.map((v, key) => ({
    ...v,
    key: v.key || key,
    index: key,
    load: !props.lazy,
  }))
);

const currentSwiper = computed(() => tabsList.value[currentIndex.value]);
const currentIndex = ref(0);
watch(
  currentIndex,
  (newValue) => {
    tabsList.value[newValue].load = true;
  },
  {
    immediate: true,
  }
);
const contentSwiperItemStyle = reactive<CSSProperties>({
  "--CtabsFor-x": "0%",
});
const contentItemClass = reactive({
  CtabsFor_item__transit: false,
});
const state = reactive({
  /**是否静止中 */
  isStatic: true,
});
/**起始x */
let startX = 0;
let startY = 0;
/**拖动偏移 */
let skewingX = 0;
let skewingY = 0;
/**开始时间戳 */
let startTime = 0;
/**取消本次滑动? */
let abandon = false;
let CtabsForId = `CtabsFor${generateUUID()}`;
/**swiper节点信息 */
let nodeInfo: GetRectRes;
/**更新CtabsFor节点信息 */
function updateNodeInfo() {
  getRect(`#${CtabsForId}`).then((res) => {
    nodeInfo = res;
  });
}
/**节点宽度 */
function nodeWidth() {
  return nodeInfo.width || uni.upx2px(750);
}
onMounted(() => updateNodeInfo());
/**触摸开始 */
function onTouchstart(e: TouchEvent) {
  startTime = dayjs().valueOf();
  /**最后一根手指的信息 */
  const touchPosition = e.changedTouches[0];
  startX = touchPosition.clientX;
  startY = touchPosition.clientY;
}
/**触摸移动 */
function onTouchmove(e: TouchEvent) {
  /**最后一根手指的信息 */
  const touchPosition = e.changedTouches[0];
  skewingX = touchPosition.clientX - startX;
  skewingY = touchPosition.clientY - startY;
  const currTime = getTouchTime();
  if (!(Math.abs(skewingY) < Math.abs(skewingX)) && currTime < 100) {
    abandon = true;
    swiperToByIndex(currentIndex.value);
    return;
  }
  if (abandon) return;
  const percent = skewingX / nodeWidth() - currentIndex.value;
  //*左滑边界限制
  if (skewingX > 0 && currentIndex.value == 0) return;
  //*右滑边界限制
  if (isRightTo() && !(currentIndex.value + 1 < props.options.length)) return;
  state.isStatic = false;
  contentSwiperItemStyle["--CtabsFor-x"] = unitPercent(percent);
}
/**触摸中断 */
function onTouchcancel(e: TouchEvent) {
  if (abandon) return (abandon = false);
  /**最后一根手指的信息 */
  // const touchPosition = e.changedTouches[0];
  abandon = false;
  swiperToByIndex(currentIndex.value);
}
/**触摸结束 */
function onTouchend(e: TouchEvent) {
  if (abandon) return (abandon = false);
  /**最后一根手指的信息 */
  // const touchPosition = e.changedTouches[0];
  //*左滑边界限制
  if (skewingX > 0 && currentIndex.value == 0)
    return swiperToByIndex(currentIndex.value);
  //*右滑边界限制
  if (isRightTo() && !(currentIndex.value + 1 < props.options.length)) {
    abandon = false;
    return swiperToByIndex(currentIndex.value);
  }
  if (
    (getTouchTime() < 500 && isRightTo() && skewingX < -nodeWidth() * 0.15) ||
    (isRightTo() && skewingX < -nodeWidth() * 0.4)
  ) {
    //* 右滑满足
    abandon = false;
    swiperToByIndex(++currentIndex.value);
  } else if (
    (getTouchTime() < 200 && isLeftTo() && skewingX > nodeWidth() * 0.15) ||
    (isLeftTo() && skewingX > nodeWidth() * 0.4)
  ) {
    //*左滑满足
    abandon = false;
    swiperToByIndex(--currentIndex.value);
  } else {
    abandon = false;
    swiperToByIndex(currentIndex.value);
  }
}
/**给出滑动时间 */
function getTouchTime() {
  return dayjs().valueOf() - startTime;
}
/**是左滑 */
function isRightTo() {
  return skewingX < 0;
}
/**是右滑 */
function isLeftTo() {
  return skewingX > 0;
}
let transitTimeout: NodeJS.Timeout;
/**
 * * 前往swiper页
 * @param key 当前key
 */
function swiperTo(key: StrNumber = currentIndex.value) {
  if (transitTimeout) clearTimeout(transitTimeout);
  for (let k in tabsList.value) {
    if (tabsList.value[k].key === key) {
      swiperToByIndex(k as unknown as number);
      break;
    }
  }
}
function swiperToByIndex(index: number) {
  currentIndex.value = index;
  contentItemClass.CtabsFor_item__transit = true;
  skewingX = 0;
  skewingY = 0;
  startX = 0;
  startY = 0;
  contentSwiperItemStyle["--CtabsFor-x"] = unitPercent(0 - index);
  //*定时清除过渡
  transitTimeout = setTimeout(() => {
    contentItemClass.CtabsFor_item__transit = false;
    state.isStatic = true;
  }, 200);
}
defineExpose({ swiperTo, updateNodeInfo, currentIndex });
const platformOffsetTop = computed(() => {
  let offsetTop = Number(props.offsetTop);
  if (isNaN(offsetTop)) offsetTop = 0;
  let res = unitPx(offsetTop);
  // #ifdef H5
  res = unitPx(offsetTop + 44);
  // #endif
  return res;
});
</script>

<template>
  <view :style="{ '--gap': gap }" :id="CtabsForId" class="CtabsFor">
    <Rsticky
      bg-color="var(--C-B1)"
      :style="stickyStyle"
      class="CtabsFor_title"
      :disabled="!sticky"
      :offset-top="offsetTop"
      :customNavHeight="platformOffsetTop"
    >
      <view class="CtabsFor_title-top">
        <slot name="title-top"></slot>
      </view>
      <Rtabs
        class="CtabsFor_title-content"
        :current="currentIndex"
        :list="(tabsList as any)"
        :key-name="(titleKeyName as any)"
        :lineColor="titleLineColor"
        :lineWidth="titleLineWidth"
        :lineHeight="titleLineHeight"
        :lineBgSize="titleLineBgSize"
        :itemStyle="titleItemStyle"
        :activeStyle="titleActiveStyle"
        :inactiveStyle="titleInactiveStyle"
        :scrollable="titleScrollable"
        @change="(e) => swiperToByIndex(e.index)"
      >
        <template #right>
          <slot name="title-right"></slot>
        </template>
      </Rtabs>
      <view class="CtabsFor_title-bottom">
        <slot name="title-bottom"> </slot
      ></view>
    </Rsticky>
    <!-- 内容部分 -->
    <view
      @touchmove="onTouchmove"
      @touchcancel="onTouchcancel"
      @touchend="onTouchend"
      @touchstart="onTouchstart"
      class="CtabsFor_item-wrap"
    >
      <view
        :class="{
          ...contentItemClass,
          CtabsFor_item__hiddle: currentSwiper !== tab && state.isStatic,
        }"
        :style="{ ...contentSwiperItemStyle }"
        v-for="tab in tabsList"
        :key="tab.key"
        class="CtabsFor_item"
      >
        <view class="CtabsFor_item_content">
          <slot
            v-if="tab.load"
            name="default"
            :option="tab"
            :active="currentSwiper === tab"
          >
          </slot>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.CtabsFor {
  margin: 0 calc(0px - var(--gap));
  .CtabsFor_title {
    padding-left: var(--gap);
    padding-right: var(--gap);
    // .CtabsFor_title-top,
    // .CtabsFor_title-bottom {
    // }
  }

  .CtabsFor_item-wrap {
    overflow-x: hidden;
    display: flex;
    width: 100%;
    .CtabsFor_item {
      transform: translateX(var(--CtabsFor-x));
      flex: 0 0 100%;
      width: 100%;
      .CtabsFor_item_content {
        margin: 0 var(--gap);
      }
    }
  }
  .CtabsFor_item__transit {
    transition: all 200ms linear;
    overflow: hidden;
  }
  .CtabsFor_item__hiddle {
    height: 0;
  }
}
</style>
