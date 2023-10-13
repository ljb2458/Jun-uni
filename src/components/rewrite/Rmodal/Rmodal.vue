<!--
 * @Date: 2023-06-14 21:09:05
 * @LastEditTime: 2023-07-06 15:34:26
 * 介绍:弹出框
-->
<script lang="ts" setup>
import { filterObject } from "@/utils/tools/object";
const props = withDefaults(
  defineProps<{
    show?: boolean;
    title?: string;
    content?: string;
    /**确认按钮的文字 */
    confirmText?: string;
    /**取消按钮的文字 */
    cancelText?: string;
    /**是否显示确认按钮 */
    showConfirmButton?: boolean;
    /**是否显示取消按钮 */
    showCancelButton?: boolean;
    /**确认按钮的颜色 */
    confirmColor?: string;
    /**取消按钮的颜色 */
    cancelColor?: string;
    /**对调确认和取消的位置 */
    buttonReverse?: boolean;
    /**是否开启缩放模式 */
    zoom?: boolean;
    /**是否异步关闭，只对确定按钮有效，见上方说明 */
    asyncClose?: boolean;
    /**是否允许点击遮罩关闭Modal（注意：关闭事件需要自行处理，只会在开启closeOnClickOverlay后点击遮罩层执行close回调） */
    closeOnClickOverlay?: boolean;
    /**	往上偏移的值，给一个负的margin-top，往上偏移，避免和键盘重合的情况，单位任意，数值则默认为rpx单位 */
    negativeTop?: StrNumber;
    width?: StrNumber;
    /**确认按钮的样式,如设置，将不会显示取消按钮 circle(圆形) | square(方形)*/
    confirmButtonShape?: "circle" | "square";
  }>(),
  {
    showCancelButton: true,
    showConfirmButton: true,
  }
);
const $props = computed(() => filterObject(props));
const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
  /**点击遮罩关闭出发，closeOnClickOverlay为true有效 */
  (e: "close"): void;
  (e: "update:show", v: boolean): void;
}>();
const show = computed({
  get() {
    return props.show;
  },
  set(v) {
    emit("update:show", v);
  },
});
</script>
<template>
  <u-modal
    :="$props"
    v-model:show="show"
    @confirm="emit('confirm')"
    @cancel="emit('cancel')"
    @close="emit('close')"
  >
    <slot>{{ props.content }}</slot>
    <!-- <template #confirmButton v-if="$slots.confirmButton">
      <slot name="confirmButton"></slot>
    </template> -->
  </u-modal>
</template>
<style lang="scss" scoped></style>
