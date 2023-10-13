<!--
 * @Date: 2023-06-13 16:47:13
 * @LastEditTime: 2023-07-03 17:26:30
 * 介绍:选择器
-->
<script lang="ts" setup generic="D">
import { Column, ConfirmParam, ChangeParam } from "./index";
import { filterObject } from "@/utils/tools/object";
const props = defineProps<{
  show?: boolean;
  /**是否显示顶部的操作栏 */
  showToolbar?: boolean;
  title?: string;
  columns?: Column<D>[];
  loading?: boolean;
  itemHeight?: StrNumber;
  cancelText?: string;
  confirmText?: string;
  cancelColor?: string;
  confirmColor?: string;
  /**每列中可见选项的数量 */
  visibleItemCount?: StrNumber;
  keyName?: keyof D;
  closeOnClickOverlay?: boolean;
  /**[1, 3]表示第一列默认选中第2个，第二列默认选中第4个 */
  defaultIndex?: number[];
  /**是否在手指松开时立即触发change事件。若不开启则会在滚动动画结束后触发change事件，只在微信2.21.1及以上有效 */
  immediateChange?: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "cancel"): void;
  (e: "confirm", v: ConfirmParam): void;
  (e: "change", v: ChangeParam): void;
}>();
const pickerRef = ref<AnyObject | undefined>();
function setIndexs(index: number, setLastIndex: number) {
  pickerRef.value?.setIndexs(index, setLastIndex);
}
function setColumnValues<_D = D>(columnIndex: number, values: Column<D>) {
  pickerRef.value?.setColumnValues(columnIndex, values);
}
defineExpose({ setIndexs, setColumnValues });
</script>
<template>
  <u-picker
    ref="pickerRef"
    :="filterObject(props as any)"
    @close="(e:any) => emit('close')"
    @cancel="(e:any) => emit('cancel')"
    @confirm="(e:any) => emit('confirm',e)"
    @change="(e:any) => emit('change',e)"
  ></u-picker>
</template>
<style lang="less" scoped></style>
