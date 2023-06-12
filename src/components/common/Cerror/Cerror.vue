<!--
 * @Date: 2023-06-12 12:17:13
 * @LastEditTime: 2023-06-12 15:24:41
 * @FilePath: /music-client/src/components/common/Cerror/Cerror.vue
 * 介绍:
-->
<script lang="ts" setup>
import { _require } from "@@/utils/tools";

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
    <Rimage :src="_require('src/static/components/images/error.svg')"></Rimage>
    <slot>
      <div class="C-T5 MT-xs">{{ props.message }}</div>
    </slot>
    <slot name="button">
      <view class="MT-md">
        <Rbutton :size="'mini'" @click="clickButton"> 重新加载 </Rbutton>
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
