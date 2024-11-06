<script lang="ts">
import mpMixin from '@/components/libs/mixin/mpMixin';
export default {
  mixins: [mpMixin],
}
</script>
<script lang="ts" setup>
import { _require } from "@/utils/tools";

const props = withDefaults(
  defineProps<{
    message?: string;
    showButton?: boolean;
    marginTop?: string;
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
  <view class="CError" :style="{ marginTop }">
    <Rimage
      width="100%"
      :mode="'aspectFit'"
      :src="_require('src/static/components/images/error.svg')"
    ></Rimage>
    <slot>
      <view class="C-T5 MT-xs">{{ props.message }}</view>
    </slot>
    <slot name="button">
      <view class="MT-md">
        <Rbutton :size="'mini'" @click="clickButton" text="重新加载"> </Rbutton>
      </view>
    </slot>
  </view>
</template>
<style lang="scss" scoped>
.CError {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
