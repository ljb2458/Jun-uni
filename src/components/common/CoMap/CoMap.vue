<script setup lang="ts">
import { StyleValue } from "vue";
import { uniApiToPromise } from "@/utils/rewriteUni";
import { generateUUID } from "@/utils/tools/generate";
import { _require } from "@/utils/tools";
import type {
  MapProps,
  MapOnRegionchangeEvent,
} from "@uni-helper/uni-app-types";
import { useVModel } from "@/hooks/toolsHooks";
import envCoverView from "./envCoverView.vue";
import envCoverImage from "./envCoverImage.vue";

const MIN_SCALE = 3;
const MAX_SCALE = 20;
const SCALE = 16;
const LATITUDE = 39.909;
const LONGITUDE = 116.39742;
const MAP_ID = `map-${generateUUID().slice(0, 60)}`;
const props = withDefaults(
  defineProps<{
    showMap?: boolean;
    mapHidIcon?: boolean | string;
    mapProps?: MapProps;
    topHeight?: string;
    bottomHeight?: string;
    leftIcons?: IconItem[];
    rightIcons?: IconItem[];
  }>(),
  {
    mapProps: () => ({}),
    leftIcons: () => [],
    rightIcons: () => [],
    topHeight: "100px",
    bottomHeight: "0px",
    showMap: true,
  }
);

const emit = defineEmits<{
  "update:showMap": [v: boolean];
}>();

const showMap = useVModel(props, "showMap", emit);

const layoutInfo = computed(() => {
  let { topHeight, bottomHeight } = props;
  if (!mapData.fill) topHeight = bottomHeight = "0px";
  return { topHeight, bottomHeight };
});
const $mapProps = computed(() => ({
  latitude: LATITUDE,
  longitude: LONGITUDE,
  minScale: MIN_SCALE,
  maxScale: MAX_SCALE,
  scale: SCALE,
  layerStyle: 1,
  enable3D: true,
  enableZoom: true,
  enableScroll: true,
  enablePoi: true,
  enableBuilding: true,
  enableIndoorMap: true,
  ...props.mapProps,
}));
const latitude = useVModel(props.mapProps, "latitude", undefined, {
  defaultValue: LATITUDE,
});
const longitude = useVModel(props.mapProps, "longitude", undefined, {
  defaultValue: LONGITUDE,
});

onMounted(() => {
  mapData.mapCtx = uni.createMapContext(MAP_ID, getCurrentInstance());
});
/**map地图相关数据 */
const mapData = reactive({
  fill: false,
  scale: $mapProps.value.scale,
  mapCtx: defineType<UniNamespace.MapContext>()!,
});
function changeFill(value: boolean = !mapData.fill) {
  mapData.fill = value;
}
async function changeScale(value: number) {
  const minScale = $mapProps.value.minScale;
  const maxScale = $mapProps.value.maxScale;
  if (value > maxScale) value = maxScale;
  if (value < minScale) value = minScale;
  const res = await uniApiToPromise(mapData.mapCtx.getCenterLocation);
  latitude.value = res.latitude;
  longitude.value = res.longitude;
  mapData.scale = value;
}
function moveToLocal() {
  mapData.mapCtx.moveToLocation({
    latitude: latitude.value,
    longitude: longitude.value,
  });
  changeScale(SCALE);
}
async function onRegionchange(e: MapOnRegionchangeEvent) {
  if (typeof props.mapProps.onRegionchange == "function")
    props.mapProps.onRegionchange(e);
  if (e.causedBy !== "scale") return;
  const res = await uniApiToPromise(mapData.mapCtx.getScale);
  changeScale(res.scale);
}

interface IconItem {
  class?: any;
  iconPath?: string;
  tap?: Fun;
  style?: StyleValue;
}

const leftIconList = computed<IconItem[]>(() => {
  const iconArray = [...props.leftIcons];

  iconArray.unshift({
    class: ["_MT-auto", "_B-none"],
  });
  iconArray.push({
    class: ["_MB-auto", "_B-none"],
  });
  return iconArray;
});

const rightIconList = computed<IconItem[]>(() => {
  const iconArray = [...props.rightIcons];
  if (showMap.value) {
    iconArray.push(
      {
        class: ["_MB-0"],
        iconPath: _require("src/static/components/images/plus.png"),
        tap: () => changeScale(mapData.scale + 1),
      },
      {
        class: ["_MT-0"],
        iconPath: _require("src/static/components/images/reduce.png"),
        tap: () => changeScale(mapData.scale - 1),
      },
      {
        class: ["_MT-auto"],
        iconPath: _require("src/static/components/images/local.png"),
        tap: () => moveToLocal(),
      },
      {
        iconPath: mapData.fill
          ? _require("src/static/components/images/fullScreenExit.png")
          : _require("src/static/components/images/fullScreen.png"),
        tap: () => changeFill(),
        class: ["_MT-auto"],
      }
    );
  }
  if (mapData.fill && props.mapHidIcon) {
    let iconPath = _require("src/static/components/images/menu.png");
    if (typeof props.mapHidIcon !== "boolean") iconPath = props.mapHidIcon;
    iconArray.unshift({
      iconPath,
      tap: () => {
        showMap.value = !showMap.value;
      },
    });
  }
  iconArray.unshift({
    class: ["_MT-auto", "_B-none"],
  });
  iconArray.push({
    class: ["_MB-auto", "_B-none"],
  });
  return iconArray;
});
</script>

<template>
  <view class="CoMap" :class="{ CoMap__fill: mapData.fill }">
    <slot></slot>

    <envCoverView
      class="controls__top"
      :show="mapData.fill"
      :style="{ height: layoutInfo.topHeight }"
    >
      <slot name="top"></slot>
    </envCoverView>
    <envCoverView
      class="controls__bottom"
      :show="mapData.fill"
      :style="{ height: layoutInfo.bottomHeight }"
    >
      <slot name="bottom"></slot>
    </envCoverView>

    <envCoverView
      class="controls__left"
      :style="{
        top: layoutInfo.topHeight,
        bottom: layoutInfo.bottomHeight,
      }"
    >
      <envCoverView
        v-for="(item, index) in leftIconList"
        :key="index"
        class="controls_iconBox"
        :class="item.class"
        :style="[item.style]"
      >
        <envCoverImage
          @tap="item.tap"
          class="controls_iconImg"
          :src="item.iconPath"
        ></envCoverImage>
      </envCoverView>
    </envCoverView>
    <envCoverView
      class="controls__right"
      :style="{
        top: layoutInfo.topHeight,
        bottom: layoutInfo.bottomHeight,
      }"
    >
      <envCoverView
        v-for="(item, index) in rightIconList"
        :key="index"
        class="controls_iconBox"
        :class="item.class"
        :style="[item.style]"
      >
        <envCoverImage
          @tap="item.tap"
          class="controls_iconImg"
          :src="item.iconPath"
        ></envCoverImage>
      </envCoverView>
    </envCoverView>
    <map
      v-show="showMap"
      :id="MAP_ID"
      :latitude="latitude"
      :longitude="longitude"
      :scale="mapData.scale"
      :theme="$mapProps.theme"
      :min-scale="$mapProps.minScale"
      :max-scale="$mapProps.maxScale"
      :layer-style="$mapProps.layerStyle"
      :markers="$mapProps.markers"
      :polyline="$mapProps.polyline"
      :circles="$mapProps.circles"
      :polygons="$mapProps.polygons"
      :controls="$mapProps.controls"
      :include-points="$mapProps.includePoints"
      :enable-3d="$mapProps.enable3D"
      :show-compass="$mapProps.showCompass"
      :enable-zoom="$mapProps.enableZoom"
      :enable-scroll="$mapProps.enableScroll"
      :enable-rotate="$mapProps.enableRotate"
      :enable-overlooking="$mapProps.enableOverlooking"
      :enable-satellite="$mapProps.enableSatellite"
      :enable-traffic="$mapProps.enableTraffic"
      :enable-poi="$mapProps.enablePoi"
      :enable-building="$mapProps.enableBuilding"
      :show-location="$mapProps.showLocation"
      :enable-indoor-map="$mapProps.enableIndoorMap"
      @onMarkertap="$mapProps.onMarkertap"
      @onLabeltap="$mapProps.onLabeltap"
      @onCallouttap="$mapProps.onCallouttap"
      @onControltap="$mapProps.onControltap"
      @onTap="$mapProps.onTap"
      @onUpdated="$mapProps.onUpdated"
      @onAnchorpointtap="$mapProps.onAnchorpointtap"
      @onPoitap="$mapProps.onPoitap"
      @regionchange="onRegionchange"
    >
    </map>
  </view>
</template>

<style lang="scss" scoped>
.CoMap {
  position: relative;
  $gap-row: 12px;
  $icon-size: 34px;
  $bottom-height: 54px;
  transition: all 150ms linear;
  overflow: hidden;
  background-color: #ffffff;

  .controls__top,
  .controls__bottom,
  .controls__left,
  .controls__right {
    position: absolute;
    z-index: 2;
    // border: solid red 1px;
  }
  .controls_iconBox {
    &:active {
      background-color: #8c8c8c;
    }
    background-color: #ffffff;
    border-radius: 6px;
    padding: 6px;
    height: $icon-size;
    width: $icon-size;
    box-sizing: border-box;
    .controls_iconImg {
      height: 100%;
      width: 100%;
    }
  }
  .controls__top {
    top: 0;
    left: 0;
    right: 0;
  }
  .controls__bottom {
    bottom: 0;
    right: 0;
    left: 0;
  }
  .controls__left,
  .controls__right {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    flex-direction: column;
  }
  .controls__left {
    left: $gap-row;
    width: $icon-size;
  }
  .controls__right {
    right: $gap-row;
    width: $icon-size;
  }

  map {
    height: 100%;
    width: 100%;
  }
}
.CoMap__fill {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 999;
  margin: 0 !important;
  border-radius: 0 !important;
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
