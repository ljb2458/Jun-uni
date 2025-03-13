<script setup lang="ts">
import { VideoProps } from "@uni-helper/uni-app-types";
const props = defineProps<{
  src?: string;
  videoProps?: VideoProps;
}>();

const env = import.meta.env;
const regexp = new RegExp(env.VITE_HELMET_API_URL);
const autoplay = regexp.test(props.src || "");
const load = ref(!autoplay);
</script>

<template>
  <CoAutoSquare>
    <CoVideo
      v-if="load"
      :video-props="{ ...videoProps, src, autoplay }"
      height="100%"
    />
    <view v-else class="fakeVideo B-black size-fill flex-A-C flex-J-C">
      <uv-icon
        class="fakeVideo_play"
        @tap="load = true"
        name="play-right-fill"
        size="72px"
        color="#ffffff88"
      />
    </view>
  </CoAutoSquare>
</template>

<style lang="scss" scoped>
.fakeVideo {
  position: relative;
  .fakeVideo_play {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
import { _import } from "@/utils/tools/import";
export default {
  mixins: [mpMixin],
};
</script>
