<script setup lang="ts" generic="S extends CoSelectionsItem,K extends keyof S">
import type { PopupRef, PopupProps } from "@ttou/uv-typings/types/popup";
import type { SearchProps } from "@ttou/uv-typings/types/search";
import type { CoDropdownProps as DropdownProps } from "@/components/common/CoDropdown/CoDropdown.vue";
import { useVModel } from "@/hooks/toolsHooks";
import customNavbarPlaceholder from "@/layout/customNavbarPlaceholder.vue";
import { CoSelectionsItem } from "@/components/common/CoSelect/CoSelect.vue";

const uvPopupRef = ref<PopupRef>();

const props = withDefaults(
  defineProps<{
    selectValue?: S[K];
    modelValue?: any;
    labelKey?: K;
    valueKey?: K;
    selections?: S[];
    showPopup?: boolean;
    popupProps?: PopupProps;
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
const showPopup = useVModel(props, "showPopup", emit as any, {
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
watch(showPopup, (newValue) => {
  if (newValue) return uvPopupRef.value?.open();
  uvPopupRef.value?.close();
});

function onTapSubmit(e: any) {
  if (Object.is(props.showPopup, undefined)) uvPopupRef.value?.close();
  emit("popup:tapSubmit", e);
}
function onTapReset(e: any) {
  if (Object.is(props.showPopup, undefined)) uvPopupRef.value?.close();
  emit("popup:tapReset", e);
}
</script>

<template>
  <view class="GrFilterSearch B-B1 PD-col-xs PD-row-sm">
    <view class="flex-A-C gap-xs">
      <slot name="selections">
        <view class="self-A-STR">
          <CoSelect
            @selected="(v:any) => emit('selected',v)"
            v-model="selectValue"
            :selections="selections"
            width="150px"
            class="flex-A-C B-B2 R-xs _PD-col-0 _PD-row-sm _flex H-fill"
            :style="{ background: bg, border: 'none' }"
          >
          </CoSelect>
        </view>
      </slot>
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
        :bg-color="bg"
      />
      <block v-if="$slots.popup">
        <view
          @tap="uvPopupRef?.open"
          class="F-S-sm C-T2 flex-A-C gap-xxs active"
        >
          <CoIcon size="1.7em" name="cicon-shaixuan" />
          <view style="width: 1em" class="T-H-9em">筛选</view>
        </view>
        <uv-popup ref="uvPopupRef" mode="right" :="popupProps">
          <view
            class="PD-sm PT-0 flex-col H-fill"
            :style="{ width: popupWidth }"
          >
            <customNavbarPlaceholder class="_PL-0">
              <view class="flex-A-C W-fill">
                <slot name="popup-navbar">
                  <view class="T-strong C-M1">高级筛选</view>
                </slot>
                <uv-icon
                  class="ML-auto"
                  name="close"
                  size="18px"
                  @tap="uvPopupRef?.close"
                />
              </view>
            </customNavbarPlaceholder>
            <slot name="popup"> </slot>
            <slot name="popup-bottom">
              <view class="flex gap-md MT-auto">
                <view class="flex-1">
                  <uv-button @tap="onTapReset" :type="'primary'" plain>
                    重置
                  </uv-button>
                </view>
                <view class="flex-1">
                  <uv-button @tap="onTapSubmit" :type="'primary'">
                    确定
                  </uv-button>
                </view>
              </view>
            </slot>
          </view>
        </uv-popup>
      </block>
    </view>
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped></style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
