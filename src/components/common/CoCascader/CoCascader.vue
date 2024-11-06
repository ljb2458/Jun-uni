<script setup lang="ts">
import { useVModel } from "@/hooks/toolsHooks";
import cnRegionsTree from "./cnRegionsTree.json";
import { PopupRef } from "@ttou/uv-typings/types/popup";

export interface CoCascaderOptionsItem {
  value: StrNumber | symbol;
  label: any;
  children?: CoCascaderOptionsItem[];
}

const props = withDefaults(
  defineProps<{
    modelValue?: CoCascaderOptionsItem["value"][];
    options?: CoCascaderOptionsItem[];
    height?: string;
    show?: boolean;
  }>(),
  {
    modelValue: [] as any,
    options: cnRegionsTree as any,
    height: "50vh",
  }
);
const emit = defineEmits<{
  "update:modelValue": [v: CoCascaderOptionsItem["value"][]];
  "update:show": [v: boolean];
  selectItem: [v: CoCascaderOptionsItem, index: number];
  changeSelectedOptions: [v: CoCascaderOptionsItem[]];
  submit: [v: CoCascaderOptionsItem[]];
}>();
const popupRef = ref<PopupRef & { showPopup: boolean }>();
const showPopup = computed({
  get() {
    return props.show;
  },
  async set(v) {
    emit("update:show", v);
    if (!popupRef.value) await nextTick();
    if (v) popupRef.value!.open();
    else popupRef.value!.close();
  },
});
watch(
  () => popupRef.value?.showPopup,
  (newValue, oldValue) => {
    if (Object.is(newValue, oldValue)) return;
    showPopup.value = Boolean(newValue);
  }
);

const modelValue = useVModel(props, "modelValue", emit);

const selectedOptions = computed<CoCascaderOptionsItem[]>(() => {
  const result: CoCascaderOptionsItem[] = [];
  const valueArray = modelValue.value;
  if (!valueArray?.length) {
    emit("changeSelectedOptions", result);
    return result;
  }
  valueArray.forEach((value, index) => {
    let parentLevel = props.options;
    if (index !== 0) {
      parentLevel = result[index - 1]?.children || [];
    }
    const item = parentLevel.find((item) => Object.is(item.value, value));
    if (!item) return;
    result.push(item);
  });
  emit("changeSelectedOptions", result);
  return result;
});

const optionsArray = computed(() => {
  const result = [props.options];
  selectedOptions.value.forEach((item) => {
    if (!item.children) return;
    result.push(item.children);
  });
  return result;
});

function selectItem(option: CoCascaderOptionsItem, index: number) {
  const oldOption = modelValue.value.slice(0, index) || [];
  oldOption[index] = option.value;
  modelValue.value = oldOption;
  emit("selectItem", option, index);
}

function submit() {
  emit("submit", selectedOptions.value);
  showPopup.value = false;
}
</script>

<template>
  <view class="CoCascader" @tap="showPopup = true">
    <view class="CoCascader_text">
      <slot name="text">{{ selectedOptions.at(-1)?.label || "请选择" }}</slot>
    </view>
    <view
      class="CoCascader_icon"
      :class="{ CoCascader_icon__show: popupRef?.showPopup }"
    >
      <slot name="icon">
        <uv-icon name="arrow-down" size="1.2em" color="inherit" />
      </slot>
    </view>
    <uv-popup @tap.stop ref="popupRef" mode="bottom">
      <view class="CoCascaderPopup_selected MG-sm">
        <block v-if="selectedOptions.length">
          <text
            class="CoCascaderPopup_selectedItem"
            v-for="(item, index) in selectedOptions"
            :key="index"
            @tap="selectItem(item, index)"
          >
            <text>{{ item.label }}</text>
          </text>
        </block>
        <text class="CoCascaderPopup_selectedItem" v-else>
          <text>{{ "请选择" }}</text>
        </text>
      </view>
      <view class="CoCascader_content B-B2 PD-xs flex" :style="{ height }">
        <scroll-view
          class="CoCascader_options H-fill B-B1 R-sm"
          scroll-y
          v-for="(options, index) in optionsArray"
          :key="modelValue[index - 1] || `i-${index}`"
        >
          <view
            @tap="selectItem(option, index)"
            v-for="option in options"
            :key="option.value"
            class="CoCascader_option P-col-xs M-col-xxs P-row-sm flex-A-C flex-J-SB"
            :class="{
              'C-M1 B-M1-O1': Object.is(modelValue[index], option.value),
            }"
          >
            <view class="CoCascader_option_label">{{ option.label }}</view>
            <view
              class="CoCascader_option_selectedIcon"
              v-show="Object.is(modelValue[index], option.value)"
            >
              <uv-icon size="1em" color="inherit" name="checkmark" />
            </view>
          </view>
        </scroll-view>
      </view>
      <slot name="bottom">
        <view class="PD-sm">
          <uv-button @tap="submit" :type="'primary'">确定</uv-button>
        </view>
      </slot>
    </uv-popup>
  </view>
</template>

<style lang="scss" scoped>
.CoCascader {
  > .CoCascader_text {
    display: inline-block;
    margin-right: var(--gap-xxs);
  }
  > .CoCascader_icon {
    display: inline-block;
    transition: all linear 150ms;
    transform: rotate(0);
  }
  > .CoCascader_icon__show {
    transform: rotate(180deg);
  }
  .CoCascaderPopup_selected {
    > .CoCascaderPopup_selectedItem {
      text {
        color: var(--C-M1);
        text-decoration: underline;
      }
      &::after {
        display: inline;
        content: "/";
        margin: 0 var(--gap-xs);
      }
      &:last-of-type {
        &::after {
          display: none;
        }
      }
    }
  }
  .CoCascader_content {
    > .CoCascader_options {
      visibility: hidden;
      opacity: 0;

      width: 0px;
      flex: 0;
      transition: all 300ms linear;

      animation: rightToLeft 300ms linear;

      &:nth-last-of-type(2) {
        visibility: initial;
        opacity: 1;
        flex: 0 92px;
        margin-right: var(--gap-xs);
      }
      &:nth-last-of-type(1) {
        visibility: initial;
        opacity: 1;
        flex: 1;
      }
    }
  }
}
</style>
