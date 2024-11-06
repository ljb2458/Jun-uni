<script setup lang="ts">
import { useVModel } from "@/hooks/toolsHooks";
export interface Props {
  show?: boolean;
  text?: string;
  width?: string;
  height?: string;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  "update:show": [v: boolean];
}>();
const show = useVModel(props, "show", emit);
</script>

<template>
  <view
    @tap="show = !show"
    class="CoDropdown"
    :class="{ CoDropdown__show: show }"
  >
    <view class="CoDropdown_text">
      <slot name="text">{{ text }}</slot>
    </view>
    <view class="CoDropdown_icon">
      <slot name="icon">
        <uv-icon name="arrow-down" size="1.2em" color="inherit" />
      </slot>
    </view>
    <view @tap.stop="show = false" class="CoDropdown_masking"></view>
    <view class="CoDropdown_content" @tap.stop :style="{ width, height }">
      <view class="CoDropdown_indicate"></view>
      <slot>
        <view style="height: 58px"></view>
      </slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.CoDropdown {
  position: relative;
  display: inline-block;
  $indicate-size: 12px;
  > .CoDropdown_text {
    display: inline-block;
    margin-right: var(--gap-xxs);
  }
  > .CoDropdown_icon {
    display: inline-block;
    transition: all linear 150ms;
    transform: rotate(0);
  }
  > .CoDropdown_content {
    position: absolute;
    top: calc(100% + $indicate-size);
    left: 0;
    right: 0;
    z-index: 2;

    background-color: #fff;
    visibility: hidden;
    transition: all ease-out 150ms;
    max-height: 0;

    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.2));

    .CoDropdown_indicate {
      position: absolute;
      left: 1em;
      top: 0;
      height: $indicate-size;
      width: $indicate-size;
      background-color: #fff;
      transform: rotate(45deg) translateY(-50%);
      z-index: -1;
    }
  }
  > .CoDropdown_masking {
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    z-index: 2;
  }
}
.CoDropdown__show {
  > .CoDropdown_icon {
    transform: rotate(180deg);
  }
  > .CoDropdown_content {
    transition-timing-function: ease-in;
    visibility: initial;
    max-height: 200vh;
  }
  > .CoDropdown_masking {
    display: block;
  }
}
</style>
<style lang="scss" scoped>
.CoDivider {
  border-radius: var(--R-max);
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
