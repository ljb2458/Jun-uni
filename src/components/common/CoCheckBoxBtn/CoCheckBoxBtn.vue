<!-- 按钮形式的 checkbox（多选） 或 radio（单选） -->
<script setup lang="ts">
import type { StyleValue } from "vue";
type StateKey = "normal" | "active";

interface Props {
  "active-class"?: any;
  activeClass?: any;
  activeStyle?: StyleValue;
  "active-style"?: StyleValue;
  "normal-class"?: any;
  normalClass?: any;
  normalStyle?: StyleValue;
  "normal-style": StyleValue;
  modelValue: any;
  value: any;
  disabled?: boolean;
  /**是否为radio(单选模式) */
  isRadio?: boolean;
  /**是否可取消 */
  disabledCancel?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  activeClass: "B-M1 C-white",
  normalClass: "B-B2",
});
const stateKey = computed<StateKey>(() => {
  if (props.isRadio)
    return Object.is(props.modelValue, props.value) ? "active" : "normal";
  return !props.modelValue?.some((v: any) => Object.is(v, props.value))
    ? "active"
    : "normal";
});
const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();
function tapItem() {
  if (props.disabled) return;
  if (props.isRadio) return updateRadio();
  updateCheck();
}
function updateRadio() {
  let modelValue = props.modelValue;
  const isEqual = Object.is(modelValue, props.value);
  if (isEqual) {
    if (props.disabledCancel === true) return;
    modelValue = undefined;
  } else {
    modelValue = props.value;
  }
  emit("update:modelValue", modelValue);
}
function updateCheck() {
  let modelValue = Array.from(props.modelValue || []);
  const index = modelValue.findIndex((item) => Object.is(item, props.value));
  if (index !== -1) {
    if (props.disabledCancel === true) return;
    modelValue.splice(index, 1);
  } else {
    modelValue.push(props.value);
  }
  emit("update:modelValue", modelValue);
}
</script>

<template>
  <view
    @tap="tapItem"
    class="CoCheckBoxBtn"
    :class="[
      props[`${stateKey}Class`],
      props[`${stateKey}-class`],
      `CoCheckBoxBtn__${stateKey}`,
      {
        CoCheckBoxBtn__disabled: props.disabled,
      },
    ]"
    :style="([props[`${stateKey}Style`],props[`${stateKey}-style`]] as any)"
  >
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.CoCheckBoxBtn__disabled {
  opacity: 0.5;
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
