<!-- icon 组件 搭配 iconfont 使用 -->
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    size?: StrNumber;
    color?: string;
    name?: string;
  }>(),
  {
    size: "inherit",
    color: "inherit",
  }
);
</script>

<template>
  <view
    class="CIcon"
    :class="name"
    :style="{ fontSize: props.size, color: props.color }"
  >
  </view>
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
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
