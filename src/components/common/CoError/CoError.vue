<!-- 错误展示 -->
<script lang="ts" setup>
import { _import } from "@/utils/tools/import";
import mpMixin from "@/components/libs/mixin/mpMixin";
defineOptions(mpMixin);

const props = withDefaults(
  defineProps<{
    message?: string;
    /**错误时，是否展示重试按钮 */
    showButton?: boolean;
  }>(),
  {
    showButton: true,
  }
);
const emit = defineEmits<{
  (e: "click-button", v: MouseEvent): void;
}>();
function clickButton(e: MouseEvent) {
  emit("click-button", e);
}
</script>
<template>
  <view class="CoError">
    <image
      width="100%"
      :mode="'aspectFit'"
      :src="_import('src/static/components/imgs/error.svg')"
    ></image>
    <slot>
      <view class="c-jun-c-3 mt-2">{{ props.message }}</view>
    </slot>
    <slot name="button">
      <view class="mt-lg">
        <wd-button :size="'small'" @click="clickButton"> 重新加载 </wd-button>
      </view>
    </slot>
  </view>
</template>
<style lang="scss" scoped>
.CoError {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
