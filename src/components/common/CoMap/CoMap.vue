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

const MIN_SCALE = 3;
const MAX_SCALE = 20;
const SCALE = 16;
const LATITUDE = 39.909;
const LONGITUDE = 116.39742;
const MAP_ID = `map-${generateUUID().slice(0, 30)}`;
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

const latitude = useVModel(props.mapProps, "latitude", undefined, {
  defaultValue: LATITUDE,
});
const longitude = useVModel(props.mapProps, "longitude", undefined, {
  defaultValue: LONGITUDE,
});
const maxScale = computed(() =>
  mapPropsDef(props.mapProps.maxScale, MAX_SCALE)
);
const minScale = computed(() =>
  mapPropsDef(props.mapProps.minScale, MIN_SCALE)
);

/**
 * 定义mapProps默认值
 */
function mapPropsDef<T>(value: T | undefined): T | undefined;
function mapPropsDef<T>(value: T | undefined, defaultValue: T): T;
function mapPropsDef<T>(value: T | undefined, defaultValue?: T): T | undefined {
  return Object.is(value, undefined) ? defaultValue : value;
}

let mapCtx: UniNamespace.MapContext;
onMounted(() => {
  mapCtx = uni.createMapContext(MAP_ID, getCurrentInstance());
});
/**map地图相关数据 */
const mapData = reactive({
  fill: false,
  scale: mapPropsDef(props.mapProps.scale, SCALE),
});
function changeFill(value: boolean = !mapData.fill) {
  mapData.fill = value;
}
async function changeScale(value: number) {
  const minScale = mapPropsDef(props.mapProps.minScale, MIN_SCALE);
  const maxScale = mapPropsDef(props.mapProps.maxScale, MAX_SCALE);
  if (value > maxScale) value = maxScale;
  if (value < minScale) value = minScale;
  const res = await uniApiToPromise(mapCtx.getCenterLocation);
  latitude.value = res.latitude;
  longitude.value = res.longitude;
  mapData.scale = value;
}
function moveToLocal() {
  mapCtx.moveToLocation({
    latitude: latitude.value,
    longitude: longitude.value,
  });
  changeScale(SCALE);
}
async function onRegionchange(e: MapOnRegionchangeEvent) {
  if (typeof props.mapProps.onRegionchange == "function")
    props.mapProps.onRegionchange(e);
  if (e.causedBy !== "scale") return;
  const res = await uniApiToPromise(mapCtx.getScale);
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
    <!-- #ifdef APP -->
    <cover-view
      class="controls__top"
      v-show="mapData.fill"
      :style="{ height: layoutInfo.topHeight }"
    >
      <slot name="top"></slot>
    </cover-view>
    <cover-view
      class="controls__bottom"
      v-show="mapData.fill"
      :style="{ height: layoutInfo.bottomHeight }"
    >
      <slot name="bottom"></slot>
    </cover-view>
    <!-- #endif -->
    <!-- #ifndef APP -->
    <view
      class="controls__top"
      v-show="mapData.fill && $slots.top"
      :style="{ height: layoutInfo.topHeight }"
    >
      <slot name="top"></slot>
    </view>
    <view
      class="controls__bottom"
      v-show="mapData.fill"
      :style="{ height: layoutInfo.bottomHeight }"
    >
      <slot name="bottom"></slot>
    </view>
    <!-- #endif -->

    <cover-view
      class="controls__left"
      :style="{
        top: layoutInfo.topHeight,
        bottom: layoutInfo.bottomHeight,
      }"
    >
      <cover-view
        v-for="(item, index) in leftIconList"
        :key="index"
        class="controls_iconBox"
        :class="item.class"
        :style="[item.style]"
      >
        <cover-image
          @tap="item.tap"
          class="controls_iconImg"
          :src="item.iconPath"
        ></cover-image>
      </cover-view>
    </cover-view>
    <cover-view
      class="controls__right"
      :style="{
        top: layoutInfo.topHeight,
        bottom: layoutInfo.bottomHeight,
      }"
    >
      <cover-view
        v-for="(item, index) in rightIconList"
        :key="index"
        class="controls_iconBox"
        :class="item.class"
        :style="[item.style]"
      >
        <cover-image
          @tap="item.tap"
          class="controls_iconImg"
          :src="item.iconPath"
        ></cover-image>
      </cover-view>
    </cover-view>
    <map
      v-show="showMap"
      :id="MAP_ID"
      :latitude="latitude"
      :longitude="longitude"
      :scale="mapData.scale"
      :theme="mapPropsDef(mapProps.theme)"
      :min-scale="minScale"
      :max-scale="maxScale"
      :layer-style="mapPropsDef(mapProps.layerStyle, 1)"
      :markers="mapPropsDef(mapProps.markers)"
      :polyline="mapPropsDef(mapProps.polyline)"
      :circles="mapPropsDef(mapProps.circles)"
      :polygons="mapPropsDef(mapProps.polygons)"
      :controls="mapPropsDef(mapProps.controls)"
      :include-points="mapPropsDef(mapProps.includePoints)"
      :enable-3d="mapPropsDef(mapProps.enable3D, true)"
      :show-compass="mapPropsDef(mapProps.showCompass, false)"
      :enable-zoom="mapPropsDef(mapProps.enableZoom, true)"
      :enable-scroll="mapPropsDef(mapProps.enableScroll, true)"
      :enable-rotate="mapPropsDef(mapProps.enableRotate, false)"
      :enable-overlooking="mapPropsDef(mapProps.enableOverlooking, false)"
      :enable-satellite="mapPropsDef(mapProps.enableSatellite, false)"
      :enable-traffic="mapPropsDef(mapProps.enableTraffic, false)"
      :enable-poi="mapPropsDef(mapProps.enablePoi, true)"
      :enable-building="mapPropsDef(mapProps.enableBuilding, true)"
      :show-location="mapPropsDef(mapProps.showLocation, false)"
      :enable-indoor-map="mapPropsDef(mapProps.enableIndoorMap, true)"
      :onMarkertap="mapProps.onMarkertap"
      :onLabeltap="mapProps.onLabeltap"
      :onCallouttap="mapProps.onCallouttap"
      :onControltap="mapProps.onControltap"
      :onTap="mapProps.onTap"
      :onUpdated="mapProps.onUpdated"
      :onAnchorpointtap="mapProps.onAnchorpointtap"
      :onPoitap="mapProps.onPoitap"
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
    gap: 12px;
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
