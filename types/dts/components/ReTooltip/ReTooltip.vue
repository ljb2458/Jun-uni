<script lang="ts" setup>
// import { filterObject } from "@/utils/tools/object";
export type RtooltipButton = string;

const props = withDefaults(
  defineProps<{
    text: StrNumber;
    /**点击复制按钮时，复制的文本，为空则使用text值 */
    copyText: StrNumber;
    /**文本大小 */
    size: StrNumber;
    color: string;
    bgColor: string;
    /**弹出提示的方向 */
    direction: "top" | "bottom";
    zIndex: StrNumber;
    /**是否显示复制按钮 */
    showCopy: boolean;
    /**扩展的按钮组 */
    buttons: RtooltipButton[];
    /**是否显示透明遮罩以防止触摸穿透 */
    overlay: boolean;
    /**是否显示复制成功或者失败的toast */
    showToast: boolean;
  }>(),
  {
    showCopy: true,
    overlay: true,
    showToast: true,
  }
);
const emit = defineEmits<{
  (e: "click", index: number): void;
}>();

</script>
<template>
  <!-- <u-tooltip
    :="filterObject(props)"
    @click="(e:any)=>emit('click',e) "
  ></u-tooltip> -->
</template>
<style lang="scss" scoped></style>
