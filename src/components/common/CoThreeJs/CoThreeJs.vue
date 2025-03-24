<script setup lang="ts">
import { queryNode } from "@/utils/rewriteUni";

import {
  Scene,
  Clock,
  WebGL1Renderer,
  $window,
  $requestAnimationFrame,
  PerspectiveCamera,
  PLATFORM,
  sRGBEncoding,
  $cancelAnimationFrame,
} from "three-platformize";
import { WechatPlatform } from "three-platformize/src/WechatPlatform";
import { OrbitControls } from "three-platformize/examples/jsm/controls/OrbitControls";
import {
  Canvas,
  CanvasOnErrorEvent,
  CanvasOnLongtapEvent,
  CanvasOnTouchcancelEvent,
  CanvasOnTouchendEvent,
  CanvasOnTouchmoveEvent,
  CanvasOnTouchstartEvent,
} from "@uni-helper/uni-app-types";

export interface CoThreeJsCtx {
  defScene: Scene;
  clock: Clock;
  canvas: Canvas;
  platform: WechatPlatform;
  defCamera: PerspectiveCamera;
  defControls: OrbitControls;
  renderer: WebGL1Renderer;
  onUpdate: Fun<[Fun<[Clock]>], void>;
}
const updateCallBackArray: Fun[] = [];
const ctx: CoThreeJsCtx = {
  defScene: new Scene(),
  clock: new Clock(),
  canvas: undefined as any,
  platform: undefined as any,
  defCamera: undefined as any,
  defControls: undefined as any,
  renderer: undefined as any,
  onUpdate: (callBack) => {
    updateCallBackArray.push(callBack);
    return () => {
      const index = updateCallBackArray.indexOf(callBack);
      if (index === -1) return;
      updateCallBackArray.slice(index, 1);
    };
  },
};

const CANVAS_ID = "CANVAS_ID";

const props = withDefaults(
  defineProps<{
    height?: string;
    width?: string;
  }>(),
  {
    height: "300px",
    width: "100%",
  }
);

const emit = defineEmits<{
  touchmove: [v: CanvasOnTouchmoveEvent];
  touchend: [v: CanvasOnTouchendEvent];
  touchstart: [v: CanvasOnTouchstartEvent];
  touchcancel: [v: CanvasOnTouchcancelEvent];
  longtap: [v: CanvasOnLongtapEvent];
  error: [v: CanvasOnErrorEvent];
  load: [v: typeof ctx];
  update: [v: Clock];
}>();

onMounted(async () => {
  const { node: canvas } = await queryNode(
    `#${CANVAS_ID}`,
    getCurrentInstance()
  );
  ctx.canvas = canvas;
  ctx.platform = new WechatPlatform(canvas);
  ctx.renderer = new WebGL1Renderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  // 开启DeviceOrientation
  // platform.enableDeviceOrientation("ui");
  PLATFORM.set(ctx.platform);
  ctx.defCamera = new PerspectiveCamera(50, canvas.width / canvas.height);
  ctx.defControls = new OrbitControls(ctx.defCamera, canvas);

  ctx.defCamera.position.set(0, 0, 10);
  ctx.defControls.enableDamping = true;
  ctx.defControls.autoRotate = true;
  ctx.defControls.dampingFactor = 0.05;
  ctx.defControls.enableZoom = true;

  ctx.renderer.setSize(canvas.width, canvas.height);
  ctx.renderer.setPixelRatio($window.devicePixelRatio);
  ctx.renderer.outputEncoding = sRGBEncoding;

  ctx.renderer.render(ctx.defScene, ctx.defCamera);

  const render = () => {
    emit("update", ctx.clock);
    updateCallBackArray.forEach((v) => v(ctx.clock));
    frameId = $requestAnimationFrame(render);
    ctx.defControls.update();
    ctx.renderer.render(ctx.defScene, ctx.defCamera!);
  };
  render();
  emit("load", ctx);
});

let frameId: number;
onBeforeUnmount(() => {
  $cancelAnimationFrame(frameId);
  PLATFORM.dispose();
});
function onTouchmove(e: CanvasOnTouchmoveEvent) {
  emit("touchmove", e);
  ctx.platform.dispatchTouchEvent(e);
}
function onTouchend(e: CanvasOnTouchendEvent) {
  emit("touchend", e);
  ctx.platform.dispatchTouchEvent(e);
}
function onTouchstart(e: CanvasOnTouchstartEvent) {
  emit("touchstart", e);
  ctx.platform.dispatchTouchEvent(e);
}
function onLongtap(e: CanvasOnLongtapEvent) {
  emit("longtap", e);
  ctx.platform.dispatchTouchEvent(e);
}
function onError(e: CanvasOnErrorEvent) {
  emit("error", e);
  ctx.platform.dispatchTouchEvent(e);
}
</script>

<template>
  <view class="CoThreeJs" :style="{ height, width }">
    <canvas
      class="CoThreeJs_canvas"
      @touchmove.stop="onTouchmove"
      @touchend.stop="onTouchend"
      @touchstart.stop="onTouchstart"
      @touchcancel.stop="onTouchcancel"
      @longtap="onLongtap"
      @error="onError"
      type="webgl"
      :id="CANVAS_ID"
    ></canvas>
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.CoThreeJs {
  .CoThreeJs_canvas {
    height: 100%;
    width: 100%;
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
