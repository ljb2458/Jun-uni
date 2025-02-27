<script setup lang="ts" generic="S extends AnyObject,K extends keyof S">
import type { PopupRef, PopupProps } from "@ttou/uv-typings/types/popup";
import type { SearchProps } from "@ttou/uv-typings/types/search";
import type { Props as DropdownProps } from "@/components/common/CoDropdown/CoDropdown.vue";
import { useVModel } from "@/hooks/toolsHooks";
import customNavbarPlaceholder from "@/layout/customNavbarPlaceholder.vue";
const uvPopupRef = ref<PopupRef>();

const props = withDefaults(
  defineProps<{
    selectValue?: S[K];
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
  { popupWidth: "100vw", labelKey: "label" as any, valueKey: "value" as any }
);

const emit = defineEmits<{
  "update:showPopup": [v: boolean];
  "popup:tapSubmit": [v: Event];
  "popup:tapReset": [v: Event];
  "update:selectValue": [v: S[K]];
}>();
const showPopup = useVModel(props, "showPopup", emit as any);

watch(showPopup, (newValue) => {
  if (newValue) return uvPopupRef.value?.open();
  uvPopupRef.value?.close();
});

const selectionItem = computed(() =>
  props.selections?.find((v) => v[props.valueKey] === props.selectValue)
);
const showCoDropdown = ref(false);
function tapSelection(selection: S) {
  emit("update:selectValue", selection[props.valueKey]);
  showCoDropdown.value = false;
}
</script>

<template>
  <view class="GrFilterSearch flex-A-C gap-xs B-B1 P-col-xs P-row-sm">
    <slot name="selections">
      <CoDropdown
        v-model:show="showCoDropdown"
        v-if="selections?.length"
        width="150px"
        class="flex-A-C B-B2 R-xs P-row-sm self-A-STR _flex"
        :style="{ background: bg }"
      >
        <template #text>{{
          selectionItem?.[props.labelKey] || "请选择"
        }}</template>
        <view class="MG-sm">
          <view
            @tap="tapSelection(selection)"
            class="border-B PB-xxs MB-xxs flex-A-C flex-J-SB active"
            v-for="selection in selections"
            :key="selection.value"
          >
            <view>{{ selection[props.labelKey] }}</view>
            <view v-show="Object.is(selection[props.valueKey], selectValue)">
              <uv-icon name="checkmark" />
            </view>
          </view>
        </view>
      </CoDropdown>
    </slot>
    <uv-search
      shape="square"
      input-align="left"
      :show-action="false"
      :="searchProps"
      :bg-color="bg"
    />
    <block v-if="$slots.popup">
      <view @tap="uvPopupRef?.open" class="F-S-sm C-T2 flex-A-C gap-xxs active">
        <CoIcon size="1.7em" name="cicon-shaixuan" />
        <view style="width: 1em" class="T-H-9em">筛选</view>
      </view>
      <uv-popup ref="uvPopupRef" mode="right" :="popupProps">
        <view class="PD-sm PT-0 flex-col H-fill" :style="{ width: popupWidth }">
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
                <uv-button
                  @tap="(e:any) => emit('popup:tapReset', e)"
                  :type="'primary'"
                  plain
                >
                  重置
                </uv-button>
              </view>
              <view class="flex-1">
                <uv-button
                  @tap="(e:any) => emit('popup:tapSubmit', e)"
                  :type="'primary'"
                >
                  确定
                </uv-button>
              </view>
            </view>
          </slot>
        </view>
      </uv-popup>
    </block>
  </view>
</template>

<style lang="scss" scoped></style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
