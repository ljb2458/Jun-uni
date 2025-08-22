<script setup lang="ts" generic="S extends CoSelectionsItem,K extends keyof S">
import wdPopup from "wot-design-uni/components/wd-popup/wd-popup.vue";
import type { SearchProps } from "@ttou/uv-typings/types/search";
import type { CoDropdownProps as DropdownProps } from "@/components/common/CoDropdown/CoDropdown.vue";
import { useVModel } from "@/hooks/toolsHooks";
import customNavbarPlaceholder from "@/layout/customNavbar/customNavbarPlaceholder.vue";
import { CoSelectionsItem } from "@/components/common/CoSelect/CoSelect.vue";
import mpMixin from "@/components/libs/mixin/mpMixin";
import type { ComponentProps } from "vue-component-type-helpers";

defineOptions(mpMixin);

const props = withDefaults(
  defineProps<{
    selectValue?: S[K];
    modelValue?: any;
    labelKey?: K;
    valueKey?: K;
    selections?: S[];
    showPopup?: boolean;
    popupProps?: ComponentProps<typeof wdPopup>;
    searchProps?: Partial<SearchProps>;
    popupWidth?: string;
    dropdownProps?: DropdownProps;
    bg?: string;
  }>(),
  { popupWidth: "100vw", showPopup: undefined }
);

const emit = defineEmits<{
  change: [v: string];
  /**
   * 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发
   */
  search: [v: string];
  /**
   * 用户点击右侧控件时触发
   */
  custom: [v: string];
  blur: [v: string];
  focus: [v: string];
  selected: [v: S];
  "update:showPopup": [v: boolean];
  "popup:tapSubmit": [v: Event];
  "popup:tapReset": [v: Event];
  "update:selectValue": [v: S[K]];
  "update:modelValue": [v: string];
}>();
const showPopup = useVModel(props, "showPopup", emit, {
  defaultValue: false,
});
const modelValue = computed({
  get() {
    return props.modelValue || "";
  },
  set(v) {
    emit("update:modelValue", v);
  },
});
const selectValue = computed({
  get() {
    return props.selectValue;
  },
  set(v) {
    emit("update:selectValue", v as any);
  },
});

function onTapSubmit(e: any) {
  showPopup.value = false;
  emit("popup:tapSubmit", e);
}
function onTapReset(e: any) {
  showPopup.value = false;

  emit("popup:tapReset", e);
}
</script>

<template>
  <view class="GrFilterSearch bg-jun-bg">
    <view class="flex items-center gap-xs">
      <slot name="selections">
        <view class="self-stretch" v-if="selections">
          <CoSelect
            @selected="(v:any) => emit('selected',v)"
            v-model="selectValue"
            :selections="selections"
            width="150px"
            class="!bg-jun-bg rd-sm !py-0 !px-2.2 h-full bg-jun-bg !b-none"
          >
          </CoSelect>
        </view>
      </slot>
      <view class="flex-1 bg-jun-bg rd-sm">
        <uv-search
          @blur="(e:string) => emit('blur', e)"
          @custom="(e:string) => emit('custom', e)"
          @search="(e:string) => emit('search', e)"
          @change="(e:string) => emit('change', e)"
          @focus="(e:string) => emit('focus', e)"
          v-model="modelValue"
          shape="square"
          input-align="left"
          :show-action="false"
          :="searchProps"
          :bg-color="'none'"
        />
      </view>
      <block v-if="$slots.popup">
        <view
          @tap="showPopup = false"
          class="text-sm c-jun-c-1 flex items-center gap-xxs active"
        >
          <CoIcon size="1.7em" name="cicon-shaixuan" />
          <view style="width: 1em" class="T-H-9em">筛选</view>
        </view>
        <wd-popup :="popupProps" position="right" v-model="showPopup">
          <view
            class="p-2.2 PT-0 flex flex-col h-full"
            :style="{ width: popupWidth }"
          >
            <customNavbarPlaceholder class="!pl-0">
              <view class="flex items-center w-full">
                <slot name="popup-navbar">
                  <view class="font-bold c-jun-primary">高级筛选</view>
                </slot>
                <wd-icon
                  class="ml-auto"
                  name="close"
                  size="18px"
                  @tap="showPopup = false"
                />
              </view>
            </customNavbarPlaceholder>
            <slot name="popup"> </slot>
            <slot name="popup-bottom">
              <view class="flex gap-md mt-auto">
                <view class="flex flex-1">
                  <wd-button
                    class="w-full"
                    @tap="onTapReset"
                    :type="'primary'"
                    plain
                  >
                    重置
                  </wd-button>
                </view>
                <view class="flex flex-1">
                  <wd-button
                    class="w-full"
                    @tap="onTapSubmit"
                    :type="'primary'"
                  >
                    确定
                  </wd-button>
                </view>
              </view>
            </slot>
          </view>
        </wd-popup>
      </block>
    </view>
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped></style>
