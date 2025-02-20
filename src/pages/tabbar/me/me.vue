<cfg lang="json">
{
  "navigationBarTitleText": "我的",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>
<script lang="ts" setup>
import { _require } from "@/utils/tools";
import { onPageScroll } from "@dcloudio/uni-app";
import taskStatistics from "./components/taskStatistics.vue";
import loopCheck from "./components/loopCheck.vue";
import { StateEnum } from "@/components/common/CoStateTag/CoStateTag.vue";
import router from "@/utils/router";

const userAuthEnum: StateEnum = [
  {
    state: 1,
    label: "管理员",
    class: "C-M1 B-M1-O-3 R-max P-row-xs F-S-xs ML-xs",
  },
];

function toCorpApplyAudit(query: AnyObject) {
  router.push("src/pages/corp/applyAudit.vue", { query });
}

const rapidLinks = [
  {
    icon: "icon-qiye",
    text: "公司成员：21人",
    iconColor: "var(--C-M1)",
    tap() {
      toCorpApplyAudit({
        tabIndex: 3,
      });
    },
  },
  {
    icon: "icon-dairuzhi",
    text: "待审核：3人",
    iconColor: "var(--C-M1)",
    tap() {
      toCorpApplyAudit({
        tabIndex: 1,
      });
    },
  },
];

const layoutInfo = reactive({
  scrollTop: 0,
});
onPageScroll((e) => {
  layoutInfo.scrollTop = e.scrollTop;
});
</script>
<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="flex-A-C MG-md gap-sm F-S-sm">
      <uv-image
        radius="var(--R-sm)"
        height="58px"
        width="58px"
        :src="_require('src/static/imgs/bg/home.png')"
        :mode="'aspectFill'"
      ></uv-image>
      <view>
        <view class="flex-A-C">
          <view class="F-S-md T-strong">张三</view>
          <CoStateTag :stateEnum="userAuthEnum" :state="1" />
        </view>
        <view class="C-T3">18888888888</view>
        <view>这个是个公司</view>
      </view>
    </view>

    <taskStatistics :scrollTop="layoutInfo.scrollTop" />
    <loopCheck :scrollTop="layoutInfo.scrollTop" />
  </CoPageView>
</template>
<style lang="scss" scoped></style>
