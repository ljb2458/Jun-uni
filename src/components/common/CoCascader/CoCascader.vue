<!-- 级联选择器 -->
<script setup lang="ts">
import { useVModel } from "@/hooks/toolsHooks";
import { PopupRef } from "@ttou/uv-typings/types/popup";
import mpMixin from "@/components/libs/mixin/mpMixin";
defineOptions(mpMixin);

export interface CoCascaderOptionsItem extends AnyObject {
  value: StrNumber;
  label: any;
  disabled?: boolean;
  /**子选项，如果为null则表示没有下一项了 */
  children?: CoCascaderOptionsItem[] | undefined | null;
}
export interface CoCascaderLoadChildrenEnvet {
  item: CoCascaderOptionsItem | undefined;
  level: number;
}

const props = withDefaults(
  defineProps<{
    /**是否可取消选择；默认为：true */
    deselectable?: boolean;
    /**绑定的级联value数组，数组索引与嵌套层数挂钩 */
    modelValue?: CoCascaderOptionsItem["value"][];
    /**级联选项；children为子选项，没有请传null */
    options?: CoCascaderOptionsItem[] | null;
    /**选择器 scroll-view 高度； */
    height?: string;
    /**是否显示选择器 */
    show?: boolean;
    /**加载子数据；event=CoCascaderLoadChildrenEnvet */
    loadChildren?: Fun<
      [event: CoCascaderLoadChildrenEnvet],
      | (CoCascaderOptionsItem[] | undefined | null)
      | Promise<CoCascaderOptionsItem[] | undefined | null>
    >;
    /**是否展示加载图标，传入 loadChildren 时将自动控制 */
    loading?: boolean;
    showEmpty?: boolean;
  }>(),
  {
    deselectable: true,
    modelValue: [] as any,
    height: "50vh",
    showEmpty: true,
  }
);

const emit = defineEmits<{
  "update:options": [v: CoCascaderOptionsItem[]];
  "update:modelValue": [v: CoCascaderOptionsItem["value"][]];
  "update:show": [v: boolean];
  "update:loading": [v: boolean];
  selectItem: [v: CoCascaderOptionsItem | undefined, index: number];
  changeSelectedOptions: [v: CoCascaderOptionsItem[]];
  submit: [v: CoCascaderOptionsItem[]];
}>();

const options = useVModel(props, "options", emit);
const modelValue = useVModel(props, "modelValue", emit);
const loading = useVModel(props, "loading", emit);

const show = useVModel(props, "show", emit);

const selectedOptions = computed<CoCascaderOptionsItem[]>(() => {
  const result: CoCascaderOptionsItem[] = [];
  const valueArray = modelValue.value;
  if (!valueArray?.length) {
    emit("changeSelectedOptions", result);
    return result;
  }
  valueArray.forEach((value, index) => {
    let parentLevel = options.value;
    if (!parentLevel?.length) return;
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

async function init() {
  for (let level in modelValue.value) {
    const item = selectedOptions.value[level];
    const preItem = selectedOptions.value[+level - 1];
    if (!item) await loadChildren({ item: preItem, level: +level });
  }
}
init();
defineExpose({ init });

const optionsArray = computed(() => {
  const result = [options.value];
  selectedOptions.value.forEach((item) => {
    if (!props.showEmpty && !item.children?.length) return;
    result.push(item.children || []);
  });
  return result;
});

function selectItem(option: CoCascaderOptionsItem, level: number) {
  if (option.disabled) return;
  const oldOption = modelValue.value.slice(0, level + 1) || [];
  const isCancel =
    props.deselectable &&
    Object.is(oldOption[level], option.value) &&
    Object.is(oldOption.length, modelValue.value.length);

  if (isCancel) {
    //点击相同的最后一项取消选择
    oldOption.pop();
    emit("selectItem", undefined, level);
  } else {
    oldOption[level] = option.value;
    emit("selectItem", option, level);
    const { children } = option;
    if (!children?.length && !Object.is(children, null)) {
      loadChildren({ level, item: option });
    }
  }
  modelValue.value = oldOption;
}
function submit() {
  emit("submit", selectedOptions.value);
  show.value = false;
}

async function loadChildren(event: CoCascaderLoadChildrenEnvet) {
  if (!props.loadChildren) return;
  loading.value = true;
  let result = await props.loadChildren(event);
  loading.value = false;

  if (!event.item) {
    return (options.value = result || null);
  }
  if (!result?.length) {
    event.item.children = null;
    return;
  }
  event.item.children = result;
}
</script>

<template>
  <view @tap="show = true" class="CoCascader">
    <view class="CoCascader_value">
      <slot
        name="value"
        :options="[...selectedOptions]"
        :values="[...modelValue]"
      >
        {{ selectedOptions[selectedOptions.length - 1]?.label || "请选择" }}
      </slot>
    </view>
    <view class="CoCascader_icon" :class="{ CoCascader_icon__show: show }">
      <slot name="icon">
        <wd-icon name="arrow-down" size="1.2em" color="inherit" />
      </slot>
    </view>
    <wd-popup @tap.stop v-model="show" position="bottom">
      <view class="CoCascaderPopup_content" @tap.stop>
        <view class="CoCascaderPopup_selected m-2.2">
          <slot name="selected" :options="selectedOptions">
            <block v-if="selectedOptions.length">
              <view
                class="CoCascaderPopup_selectedItem"
                v-for="(item, index) in selectedOptions"
                :key="index"
                @tap="selectItem(item, index)"
              >
                <text>
                  <slot name="test" :option="item" :level="index">
                    {{ item.label }}
                  </slot>
                </text>
              </view>
            </block>
            <view class="CoCascaderPopup_selectedItem" v-else>
              <text>{{ "请选择" }}</text>
            </view>
          </slot>
        </view>
        <view
          class="CoCascader_content bg-jun-bg-1 p-2 flex"
          :style="{ height }"
        >
          <scroll-view
            class="CoCascader_options h-full bg-jun-bg rd-md"
            scroll-y
            v-for="(options, level) in optionsArray"
            :key="modelValue[level - 1] || `i-${level}`"
            :scroll-into-view="`item-${modelValue[level]}`"
          >
            <view
              @tap="selectItem(option, level)"
              v-for="(option, index) in options"
              :key="option.value"
              :id="`item-${option.value}`"
              class="CoCascader_option py-2 my-1 px-2.2 flex items-center justify-between"
              :class="{
                CoCascader_option__disabled: option.disabled,
                'c-jun-primary bg-jun-primary bg-op-10 CoCascader_option__active':
                  Object.is(modelValue[level], option.value),
              }"
            >
              <view class="CoCascader_option_label flex-1">
                <slot
                  name="option"
                  :option="option"
                  :index="index"
                  :level="level"
                >
                  {{ option.label }}
                </slot>
              </view>
              <view
                class="CoCascader_option_selectedIcon"
                v-show="Object.is(modelValue[level], option.value)"
              >
                <slot
                  name="optionIcon"
                  :option="option"
                  :index="index"
                  :level="level"
                  :selected="Object.is(modelValue[level], option.value)"
                >
                  <wd-icon size="1em" color="inherit" name="check" />
                </slot>
              </view>
            </view>
            <CoListStatus
              class="mt-lg"
              v-if="!options?.length"
              :type="loading ? 'loading' : 'null'"
              :message="loading ? '加载中...' : '没有更多选项了！'"
            />
          </scroll-view>
        </view>
        <slot name="bottom">
          <view class="p-2.2">
            <wd-button class="w-full" @tap="submit" :type="'primary'"
              >确定</wd-button
            >
          </view>
        </slot>
      </view>
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
.CoCascader {
  > .CoCascader_text {
    display: inline-block;
    @apply mr-1;
  }
  > .CoCascader_value {
    @apply flex-1;
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
      display: inline;
      text {
        @apply c-jun-primary;
        text-decoration: underline;
      }
      &::after {
        display: inline;
        content: "/";
        @apply mx-2;
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
      .CoCascader_option__disabled {
        opacity: 0.5;
        pointer-events: none;
      }
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
        @apply mr-1;
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
