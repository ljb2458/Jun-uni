<!-- icon 组件 搭配 iconfont 使用 -->
<script lang="ts" setup>
import mpMixin from "@/components/libs/mixin/mpMixin";
import { CSSProperties } from "vue";
defineOptions(mpMixin);
const props = defineProps<{
  size?: StrNumber;
  color?: string;
  name?: string;
}>();
const style = computed(() => {
  const result: CSSProperties = {};
  if (props.color) result.color = props.color;
  if (props.size) result.fontSize = props.size;

  return result;
});
</script>

<template>
  <view class="CIcon" :class="name" :style="[style]"> </view>
</template>

<style lang="scss" scoped>
.CIcon {
  display: inline-block;
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
