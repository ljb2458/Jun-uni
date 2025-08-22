<!-- cell单元格 -->
<script lang="ts" setup>
import mpMixin from "@/components/libs/mixin/mpMixin";
defineOptions(mpMixin);

const props = withDefaults(
  defineProps<{
    leftIcon?: string;
    leftText?: StrNumber;
    rightIcon?: string | boolean;
    rightText?: StrNumber;
    borderColor?: string;
  }>(),
  {
    rightIcon: true,
    active: true,
  }
);
const emit = defineEmits<{
  (e: "click", v: MouseEvent): void;
}>();
</script>

<template>
  <view @click="(e:any) => emit('click', e)" class="CoCell bg-jun-bg py-2 px-xs rd-md active">
    <view class="flex flex-1">
      <slot name="left">
        <view class="flex items-center">
          <CoIcon v-if="leftIcon" :name="leftIcon" />
          <view>{{ leftText }}</view>
        </view>
      </slot>
    </view>
    <slot name="right">
      <view class="text-sm">{{ rightText }}</view>
    </slot>
    <view class="CoCell_right_icon">
      <slot v-if="rightIcon !== false" name="right-icon">
        <wd-icon v-if="rightIcon === true" name="arrow-right"></wd-icon>
        <CoIcon v-else-if="rightIcon" :name="rightIcon" />
      </slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.CoCell {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>