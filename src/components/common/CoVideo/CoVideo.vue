<!-- 视频播放器；-->
<script setup lang="ts">
import { queryRect } from "@/utils/rewriteUni";
import {
  VideoProps,
  VideoOnFullscreenchangeEvent,
  VideoOnControlstoggleEvent,
} from "@uni-helper/uni-app-types";
import { randomUUID } from "@/utils/tools/generate";
import envCoverView from "../CoMap/envCoverView.vue";
export interface CoVideoProps {
  videoProps?: VideoProps;
  height?: string;
  width?: string;
  src?: string;
}

const VIDEO_ID = `video-${randomUUID().slice(0, 59)}`;

// 定义组件的 props
const props = withDefaults(defineProps<CoVideoProps>(), {
  videoProps: () => ({}),
  height: "300px",
  width: "100%",
});

// 合并 props 并提供默认值
const $videoProps = computed<VideoProps>(() => ({
  src: props.src,
  direction: 90,
  controls: true,
  showProgress: !nodeInfo.width || nodeInfo.width > 240 || videoData.fullscreen,
  showFullscreenBtn: true,
  showPlayBtn: true,
  showCenterPlayBtn: true,
  showLoading: true,
  enableProgressGesture: true,
  pageGesture: false,
  vslideGesture: false,
  showMuteBtn: true,
  objectFit: "contain",
  playBtnPosition: "center",
  mobilenetHintType: 1,
  autoPauseIfNavigate: true,
  autoPauseIfOpenNative: true,
  vslideGestureInFullscreen: true,
  codec: "hardware",
  httpCache: true,
  ...props.videoProps, // 覆盖传入的 props
}));
const nodeInfo = reactive<UniNamespace.NodeInfo>({});
const videoData = reactive({
  controls: false,
  electSpeed: 1,
  fullscreen: false,
  videoCtx: defineType<UniNamespace.VideoContext>()!,
});

onMounted(async () => {
  videoData.videoCtx = uni.createVideoContext(VIDEO_ID, getCurrentInstance());

  const res = await queryRect(`#${VIDEO_ID}`, getCurrentInstance());
  Object.assign(nodeInfo, res);
});

function onControlstoggle(e: VideoOnControlstoggleEvent) {
  if (typeof $videoProps.value?.onControlstoggle === "function")
    $videoProps.value.onControlstoggle(e);
  videoData.controls = e.detail.show;
}
function onFullscreenchange(e: VideoOnFullscreenchangeEvent) {
  if (typeof $videoProps.value?.onFullscreenchange === "function")
    $videoProps.value.onFullscreenchange(e);
  videoData.fullscreen = e.detail.fullScreen;
}

const selectSpeed = [
  {
    label: "0.5",
  },
  {
    label: "0.8",
  },
  {
    label: "1.0",
  },
  {
    label: "1.25",
  },
  {
    label: "1.5",
  },
  // #ifdef MP-WEIXIN
  {
    label: "2.0",
  },
  // #endif
];
function changeSpeed(item: ArrayToUnion<typeof selectSpeed>) {
  const value = +item.label;
  videoData.electSpeed = value;
  videoData.videoCtx.playbackRate(value);
}
</script>

<template>
  <view class="CoVideo" :style="{ height, width }">
    <video
      :id="VIDEO_ID"
      :src="$videoProps.src"
      :autoplay="$videoProps.autoplay"
      :loop="$videoProps.loop"
      :muted="$videoProps.muted"
      :initial-time="$videoProps.initialTime"
      :duration="$videoProps.duration"
      :controls="$videoProps.controls"
      :danmu-list="$videoProps.danmuList"
      :danmu-btn="$videoProps.danmuBtn"
      :enable-danmu="$videoProps.enableDanmu"
      :page-gesture="$videoProps.pageGesture"
      :direction="$videoProps.direction"
      :show-progress="$videoProps.showProgress"
      :show-fullscreen-btn="$videoProps.showFullscreenBtn"
      :show-play-btn="$videoProps.showPlayBtn"
      :show-center-play-btn="$videoProps.showCenterPlayBtn"
      :show-loading="$videoProps.showLoading"
      :enable-progress-gesture="$videoProps.enableProgressGesture"
      :object-fit="$videoProps.objectFit"
      :poster="$videoProps.poster"
      :show-mute-btn="$videoProps.showMuteBtn"
      :title="$videoProps.title"
      :play-btn-position="$videoProps.playBtnPosition"
      :mobilenet-hint-type="$videoProps.mobilenetHintType"
      :enable-play-gesture="$videoProps.enablePlayGesture"
      :auto-pause-if-navigate="$videoProps.autoPauseIfNavigate"
      :auto-pause-if-open-native="$videoProps.autoPauseIfOpenNative"
      :vslide-gesture="$videoProps.vslideGesture"
      :vslide-gesture-in-fullscreen="$videoProps.vslideGestureInFullscreen"
      :ad-unit-id="$videoProps.adUnitId"
      :poster-for-crawler="$videoProps.posterForCrawler"
      :codec="$videoProps.codec"
      :http-cache="$videoProps.httpCache"
      :play-strategy="$videoProps.playStrategy"
      :header="$videoProps.header"
      @play="$videoProps.onPlay"
      @pause="$videoProps.onPause"
      @ended="$videoProps.onEnded"
      @timeupdate="$videoProps.onTimeupdate"
      @fullscreenchange="onFullscreenchange"
      @waiting="$videoProps.onWaiting"
      @error="$videoProps.onError"
      @progress="$videoProps.onProgress"
      @loadeddata="$videoProps.onLoadeddata"
      @loadstart="$videoProps.onLoadstart"
      @seeked="$videoProps.onSeeked"
      @seeking="$videoProps.onSeeking"
      @loadedmetadata="$videoProps.onLoadedmetadata"
      @fullscreenclick="$videoProps.onFullscreenclick"
      @controlstoggle="onControlstoggle"
    >
      <envCoverView
        :show="
          (Number(nodeInfo.height) > 250 || videoData.fullscreen) &&
          videoData.controls
        "
        class="CoVideo_selectSpeed flex-col flex-A-C flex-J-C PD-xs"
      >
        <envCoverView
          class="CoVideo_selectSpeedItem"
          :class="{
            CoVideo_selectSpeedItem__active: Object.is(
              +item.label,
              videoData.electSpeed
            ),
          }"
          @tap="changeSpeed(item)"
          v-for="(item, index) in selectSpeed"
          :key="index"
        >
          {{ item.label }}
        </envCoverView>
      </envCoverView>
    </video>
  </view>
</template>

<style lang="scss" scoped>
.CoVideo {
  .CoVideo_selectSpeed {
    $gap: 40px;
    position: absolute;
    left: 0;
    bottom: $gap;
    top: $gap;
    z-index: 9;
    margin: auto;
    padding: 0 4px;

    box-sizing: border-box;
    background: linear-gradient(0, #ffffff00, #ffffff88, #ffffff00);
    .CoVideo_selectSpeedItem {
      border-radius: 4px;
      padding: 2px 4px;
      width: 100%;
    }
    .CoVideo_selectSpeedItem__active {
      background-color: #000;
      color: #fff;
    }
  }
  video {
    position: relative;
    width: 100%;
    height: 100%;
    .envCoverView {
      line-height: 1em;
    }
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
