<!--
 * @Date: 2023-02-28 21:36:43
 * @LastEditTime: 2023-04-21 17:58:54
 * @FilePath: /music-client/src/components/common/Cswiper/Cswiper.vue
 * 介绍:
-->
<script lang="ts" setup>
import { unitPercent } from "@@/utils/tools/css";
import { getRect, GetRectRes } from "@@/hooks/rewriteUni";
import { CSSProperties } from "vue";
import dayjs from "dayjs";
import { CswiperOptions } from "./index";
import { generateUUID } from "@@/utils/tools/generate";

const props = withDefaults(
  defineProps<{
    /**间距 */
    gap?: string;
    options: CswiperOptions;
  }>(),
  {
    gap: "var(--gap-md)",
  }
);
const swiperList = computed<CswiperOptions>(() =>
  props.options.map((v, key) => ({ ...v, key: v.key || key }))
);
function setTab(tab: typeof swiperList.value[0], index: number) {
  swiperToByIndex(index);
}
const currentSwiper = computed(() => swiperList.value[currentIndex.value]);
const currentIndex = ref(0);

const contentSwiperItemStyle = reactive<CSSProperties>({
  "--Cswiper-x": "0%",
});
const contentItemClass = reactive({
  Cswiper_content_item__transit: false,
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
let CswiperId = `Cswiper${generateUUID()}`;
/**swiper节点信息 */
let nodeInfo: GetRectRes;
function updateNodeInfo() {
  getRect(`#${CswiperId}`).then((res) => {
    nodeInfo = res;
  });
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
  if (!nodeInfo.width)
    return console.error("Cswiper未能获取到节点宽度", nodeInfo);
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
  const percent = skewingX / nodeInfo.width - currentIndex.value;
  //*左滑边界限制
  if (skewingX > 0 && currentIndex.value == 0) return;
  //*右滑边界限制
  if (isRightTo() && !(currentIndex.value + 1 < props.options.length)) return;
  state.isStatic = false;
  contentSwiperItemStyle["--Cswiper-x"] = unitPercent(percent);
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
  if (!nodeInfo.width)
    return console.error("Cswiper未能获取到节点宽度", nodeInfo);
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
    (getTouchTime() < 500 &&
      isRightTo() &&
      skewingX < -nodeInfo.width * 0.15) ||
    (isRightTo() && skewingX < -nodeInfo.width * 0.4)
  ) {
    //* 右滑满足
    abandon = false;
    swiperToByIndex(++currentIndex.value);
  } else if (
    (getTouchTime() < 200 && isLeftTo() && skewingX > nodeInfo.width * 0.15) ||
    (isLeftTo() && skewingX > nodeInfo.width * 0.4)
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
 * @param index 当前key
 */
function swiperTo(index: number = currentIndex.value) {
  if (transitTimeout) clearTimeout(transitTimeout);
  for (let key in swiperList.value) {
    if (swiperList.value[key].key === index) {
      swiperToByIndex(key as unknown as number);
      break;
    }
  }
}
function swiperToByIndex(index: number) {
  currentIndex.value = index;
  contentItemClass.Cswiper_content_item__transit = true;
  skewingX = 0;
  skewingY = 0;
  startX = 0;
  startY = 0;
  contentSwiperItemStyle["--Cswiper-x"] = unitPercent(0 - index);
  //*定时清除过渡
  transitTimeout = setTimeout(() => {
    contentItemClass.Cswiper_content_item__transit = false;
    state.isStatic = true;
  }, 200);
}
defineExpose({ swiperTo });
</script>

<template>
  <view :style="{ '--gap': props.gap }" :id="CswiperId" class="Cswiper">
    <!-- swiper内容部分 -->
    <view
      @touchmove="onTouchmove"
      @touchcancel="onTouchcancel"
      @touchend="onTouchend"
      @touchstart="onTouchstart"
      class="Cswiper_item-wrap"
    >
      <view
        :class="{
          ...contentItemClass,
          Cswiper_item__hiddle: currentSwiper !== tab && state.isStatic,
        }"
        :style="{ ...contentSwiperItemStyle }"
        v-for="tab in swiperList"
        :key="tab.key"
        class="Cswiper_item"
      >
        <view class="Cswiper_item_content">
          <slot :option="tab" :active="currentSwiper === tab"> </slot>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.Cswiper {
  margin: 0 calc(0px - var(--gap));
  .Cswiper_item-wrap {
    overflow-x: hidden;
    display: flex;
    width: 100%;
    .Cswiper_item {
      transform: translateX(var(--Cswiper-x));
      flex: 0 0 100%;
      width: 100%;
      .Cswiper_item_content {
        margin: 0 var(--gap);
      }
    }
  }
  .Cswiper_content_item__transit {
    transition: all 200ms linear;
    overflow: hidden;
  }
  .Cswiper_item__hiddle {
    height: 0;
  }
}
</style>
