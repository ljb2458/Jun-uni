<!-- 折叠面板 -->
<script lang="ts" setup>
import type { StyleValue } from "vue";
interface Props {
  "header-class": any;
  headerClass: any;
  headerStyle: StyleValue;
  "header-style": StyleValue;
  "content-class": any;
  contentClass: any;
  contentStyle: StyleValue;
  "content-style": StyleValue;
  /**当前打开组件的 name 或 name 集合；传入数组则可以多开（非手风琴模式）， */
  value: any | any[];
  /**标识符 */
  name: any;
  title?: StrNumber;
  message?: StrNumber;
  /**当内容高度超过200vh时是否允许翻页；默认true */
  scrollY?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  scrollY: true,
});
const emit = defineEmits<{
  (e: "update:value", value: typeof props.value): void;
}>();
function collapse(name: typeof props.name) {
  if (Array.isArray(props.value)) {
    const index = props.value.findIndex((v) => Object.is(v, name));
    let value = [...props.value];
    if (index == -1) value.push(name);
    else value.splice(index, 1);
    return emit("update:value", value);
  }
  if (Object.is(props.value, name)) name = undefined;
  emit("update:value", name);
}
const CoCollapse__active = computed(() => {
  if (Array.isArray(props.value))
    return props.value.some((v) => Object.is(v, props.name));
  return props.name == props.value;
});
</script>

<template>
  <view :class="{ CoCollapse__active }" class="CoCollapse">
    <view
      :style="([props.headerStyle, props['header-style']] as any)"
      :class="[props.headerClass, props['header-class']]"
      @tap="collapse(name)"
      class="CoCollapse_header flex-J-SB flex-A-C gap-sm active"
    >
      <view class="flex-1 CoCollapse_title">
        <slot name="title">
          <view class="flex-J-SB flex-A-C gap-sm">
            <view>{{ title }}</view>
            <view>{{ message }}</view>
          </view>
        </slot>
      </view>
      <view class="CoCollapse_icon">
        <slot name="icon">
          <uv-icon
            name="play-right-fill"
            color="inherit"
            size="inherit"
          ></uv-icon>
        </slot>
      </view>
    </view>
    <view
      :style="([props.contentStyle,props['content-style']] as any)"
      :class="[props.contentClass, props['content-class']]"
      :scroll-y="scrollY"
      class="CoCollapse_content"
    >
      <slot></slot>
    </view>
  </view>
</template>

<style scoped lang="scss">
.CoCollapse {
  overflow: hidden;
  > .CoCollapse_content {
    overflow: auto;
    transition: all 300ms;
    transition-timing-function: ease-out;
    max-height: 0;
  }

  > .CoCollapse_header {
    .CoCollapse_icon {
      transition: all 300ms linear;
    }
  }
}

.CoCollapse__active {
  > .CoCollapse_header {
    .CoCollapse_icon {
      transform: rotate(90deg);
    }
  }

  > .CoCollapse_content {
    transition-timing-function: ease-in;
    max-height: 150vh !important;
  }
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
