<!--
 * @Date: 2023-06-12 12:17:13
 * @LastEditTime: 2023-09-28 22:50:46
 * 介绍:
-->
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
  <view class="Cerror" :style="{ marginTop }">
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
.Cerror {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
