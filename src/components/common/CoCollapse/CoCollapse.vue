<script lang="ts" setup>
import type { StyleValue } from "vue";
type ModuleName = "header" | "content";

interface Props
  extends Partial<Record<`${ModuleName}Class`, string>>,
    Partial<Record<`${ModuleName}-class`, string>>,
    Partial<Record<`${ModuleName}Style`, StyleValue>>,
    Partial<Record<`${ModuleName}-style`, StyleValue>> {
  value: any | any[];
  name: any;
  title?: StrNumber;
  message?: StrNumber;
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
const collapse__active = computed(() => {
  if (Array.isArray(props.value))
    return props.value.some((v) => Object.is(v, props.name));
  return props.name == props.value;
});
</script>

<template>
  <view :class="{ collapse__active }" class="collapse">
    <view
      :style="([props.headerStyle, props['header-style']] as any)"
      :class="[props.headerClass, props['header-class']]"
      @tap="collapse(name)"
      class="collapse_header flex-J-SB flex-A-C gap-sm active"
    >
      <view class="flex-1 collapse_title">
        <slot name="title">
          <view class="flex-J-SB flex-A-C gap-sm">
            <view>{{ title }}</view>
            <view>{{ message }}</view>
          </view>
        </slot>
      </view>
      <view class="collapse_icon">
        <slot name="icon">
          <up-icon
            name="play-right-fill"
            color="inherit"
            size="inherit"
          ></up-icon>
        </slot>
      </view>
    </view>
    <view
      :style="([props.contentStyle,props['content-style']] as any)"
      :class="[props.contentClass, props['content-class']]"
      :scroll-y="scrollY"
      class="collapse_content"
    >
      <slot></slot>
    </view>
  </view>
</template>

<style scoped lang="scss">
.collapse {
  overflow: hidden;
  > .collapse_content {
    overflow: auto;
    transition: all 300ms;
    transition-timing-function: ease-out;
    max-height: 0;
  }

  > .collapse_header {
    .collapse_icon {
      transition: all 300ms linear;
    }
  }
}

.collapse__active {
  > .collapse_header {
    .collapse_icon {
      transform: rotate(90deg);
    }
  }

  > .collapse_content {
    transition-timing-function: ease-in;
    max-height: 200vh !important;
  }
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
