<!-- 错误展示 -->
<script lang="ts" setup>
import { _import } from "@/utils/tools/import";

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
      <view class="C-T5 MT-xs">{{ props.message }}</view>
    </slot>
    <slot name="button">
      <view class="MT-md">
        <uv-button :size="'mini'" @click="clickButton" text="重新加载"> </uv-button>
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
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>