<!-- 下拉选择 -->
<script setup lang="ts" generic="O extends CoSelectionsItem">
import { CoDropdownProps } from "@/components/common/CoDropdown/CoDropdown.vue";
import { useVModel } from "@/hooks/toolsHooks";

export type CoSelections = CoSelectionsItem[];
export interface CoSelectionsItem extends AnyObject {
  label?: StrNumber;
  value?: any;
}
interface CoSelectProps extends CoDropdownProps {
  modelValue?: any;
  /**选项集合 */
  selections?: O[];
  /**selections 中，要作为label的字段名；默认为label */
  labelName?: keyof O;
  /**selections 中，要作为value的字段名；默认为value */
  valueName?: keyof O;
  /**下拉选择弹出框的最大高度 */
  maxHeight?: string;
}
const props = withDefaults(defineProps<CoSelectProps>(), {
  maxHeight: "50vh",
});
const emit = defineEmits<{
  "update:modelValue": [v: any];
  "update:show": [v: boolean];
  selected: [v: O];
}>();
const show = useVModel(props, "show", emit);
async function select(selection: O) {
  emit("update:modelValue", selection[valueName.value]);
  await nextTick();
  emit("selected", selectedOption.value!);
  show.value = false;
}
const labelName = computed(() => props.labelName || "label");
const valueName = computed(() => props.valueName || "value");
const selectedOption = computed(() =>
  props.selections?.find((v) => Object.is(props.modelValue, v[valueName.value]))
);
</script>

<template>
  <CoDropdown
    class="CoSelect border-all flex-J-SB flex-A-C _flex R-sm PD-sm"
    :="{ ...props }"
    v-model:show="show"
  >
    <template #text>
      <slot name="value" :selection="selectedOption && { ...selectedOption }">
        {{ selectedOption?.[labelName] || "请选择" }}
      </slot>
    </template>
    <scroll-view :style="{ maxHeight }" scroll-y>
      <view class="MG-sm">
        <view
          @tap="select(selection)"
          class="selection gap-sm PD-col-xs border-B PD-row-sm flex-A-C flex-J-SB active"
          :class="{
            selection__selected: Object.is(selection[valueName], modelValue),
          }"
          v-for="(selection, index) in props.selections"
          :key="selection[valueName]"
        >
          <view class="flex-1">
            <slot name="selection" :index="index" :selection="selection">
              <view>{{ selection[labelName] }}</view>
            </slot>
          </view>
          <view
            class="selection_icon C-M1"
            :class="{
              selection_icon__active: Object.is(
                selection[valueName],
                modelValue
              ),
            }"
          >
            <uv-icon name="checkmark" color="inherit" size="inherit" />
          </view>
        </view>
        <slot name="extraSelection">
          <uv-loading-icon v-if="!props.selections?.length"></uv-loading-icon>
        </slot>
      </view>
    </scroll-view>
  </CoDropdown>
</template>

<style lang="scss" scoped>
.CoSelect {
  .selection {
    background-color: var(--C-B1);
    .selection_icon {
      opacity: 0;
    }
    .selection_icon__active {
      opacity: 1;
    }
  }
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
