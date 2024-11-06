<cfg lang="json">
{
  "navigationBarTitleText": "首页",
  "navigationStyle": "custom"
}
</cfg>

<script setup lang="ts">
import router from "@/package/js/router";
import { _require } from "@/utils/tools";
import { onPageScroll } from "@dcloudio/uni-app";
import useSysStore from "@/store/useSysStore";

const sysStore = useSysStore();
const cards = computed(() => [
  {
    bg: `${_require("src/static/imgs/bg/home_card_1.png")}`,
    title: "容易上手",
    content: "操作简单，功能直观，容易上手",
  },
  {
    bg: `${_require("src/static/imgs/bg/home_card_2.png")}`,
    title: "功能全面",
    content: "线上线下一体化",
  },
  {
    bg: `${_require("src/static/imgs/bg/home_card_3.png")}`,
    title: "专业服务",
    content: "专业售后团队进行使用培训",
  },
  {
    bg: `${_require("src/static/imgs/bg/home_card_4.png")}`,
    title: "持续迭代",
    content: "专业研发团队保证产品持续稳步向前",
  },
]);
const cards2 = computed(() => [
  {
    icon: _require("src/static/imgs/icon/home_card_1.png"),
    title: "客户的移动订货平台",
    content: "手机下订单、随时随地轻松定货，分级定价格、查看物流动态",
  },
  {
    icon: _require("src/static/imgs/icon/home_card_2.png"),
    title: "订单资料的云端保险柜",
    content:
      "客户下单、发货、物流、收货、收款全过程都有记录，收款、查账、对账不出差错",
  },
  {
    icon: _require("src/static/imgs/icon/home_card_3.png"),
    title: "产品的移动陈列室",
    content:
      "产品、图片、价格、功能促销方案图文并茂，随时展示产品，代替产品画册和样品",
  },
  {
    icon: _require("src/static/imgs/icon/home_card_4.png"),
    title: "业务数据的分析师柜",
    content:
      "每天提供经营日报表，掌握业务状态。分析客户订单和浏览痕迹，及时采取针对措施",
  },
  {
    icon: _require("src/static/imgs/icon/home_card_5.png"),
    title: "发展客户的“吸星大法”",
    content:
      "客户轻松注册平台，不被业务员带走，系统化管理客户资料，降低获客成本和难度",
  },
  {
    icon: _require("src/static/imgs/icon/home_card_6.png"),
    title: "业务上下流程工作协同",
    content:
      "外部订单与内部流程协同、内部上下流程工作协同，提高效率、减少人力成本",
  },
  {
    icon: _require("src/static/imgs/icon/home_card_7.png"),
    title: "老板的移动办公室",
    content: "分级设定员工不同的管理权限，随时撑控业务状况",
  },
  {
    icon: _require("src/static/imgs/icon/home_card_8.png"),
    title: "交易有场景开启下一个交易模式",
    content: "在虚拟陈列里下单，大大提高客户临时增加采购品种的可能",
  },
]);
function toAboutUs() {
  router.push("src/pages/setup/aboutUs/aboutUs.vue");
}
</script>

<template>
  <CoPageView
    :onPageScroll="onPageScroll"
    :bgImg="_require('src/static/imgs/bg/home.png')"
  >
    <template #customNavbar>
      <view class="flex-A-C gap-sm" style="line-height: initial">
        <view
          class="logo inline-block B-B1 R-max PD-xxs"
          style="height: 30px; width: 30px"
        >
          <image
            @tap="sysStore.launch()"
            style="height: 100%; width: 100%"
            :src="_require('src/static/logo.png')"
          ></image>
        </view>
        <view class="F-S-md">订小易</view>
      </view>
    </template>
    <view class="PD-md MT-lg">
      <view class="flex-A-C gap-sm F-S-sm">
        <view class="C-white flex-1">
          <view>专业数字化</view>
          <view class="T-strong MT-xxs F-S-md">营销订货及管理系统</view>
          <view class="MT-xs"
            >订货商城，访销开单，营销拓客，分级定价，进销存，财务资金，数据报表一应俱全。</view
          >
          <view @click="toAboutUs" class="MT-xs flex-A-B gap-xs">
            公司简介
            <up-icon name="arrow-rightward" color="var(--C-white)" size="1em" />
          </view>
        </view>
        <view class="flex-1">
          <ReImage
            :mode="'widthFix'"
            width="100%"
            :src="_require('src/static/imgs/display/home_1.png')"
          />
        </view>
      </view>
    </view>

    <CoCard class="offset PD-md">
      <CoGrid col="2" repeat="1fr">
        <CoCard
          v-for="(card, index) in cards"
          :key="index"
          class="C-white size-fill PD-sm flex"
          :bgImg="card.bg"
        >
          <view class="ML-auto" style="width: 65%">
            <view class="T-strong F-S-sm">{{ card.title }}</view>
            <view class="F-S-xs">{{ card.content }}</view>
          </view>
        </CoCard>
      </CoGrid>
      <view class="PD-sm">
        <view class="T-A-C MT-lg"> 订小易助你打造智能商业体系 </view>
        <view class="flex-J-C MT-sm">
          <CoDivider />
        </view>
        <view class="MT-sm">
          订小易基于微信小程序及PC端saas系统。依托强大的微信生态，客户无需下载app即可实现高效定货。围绕企业与下游客户的渠道业务流程设计，以订单处理为核心，实现在订单处理、商品分享、商品促销、资金对账、支付物流、决策分析等业务环节的全程电子商务；实时数据决策，让生意简单高效！
        </view>
        <view class="flex-J-C MT-md">
          <ReImage
            :src="_require('src/static/imgs/display/home_2.png')"
            :mode="'widthFix'"
          />
        </view>
      </view>
    </CoCard>
    <CoCard bg="#FDEDE3" class="PD-md">
      <view class="T-A-C">订小易能为你带来什么</view>
      <view class="flex-J-C MT-sm">
        <CoDivider />
      </view>
      <CoGrid class="MT-md" col="2" repeat="1fr">
        <CoCard
          v-for="(card, index) in cards2"
          :key="index"
          class="size-fill PD-sm flex-A-C flex-col T-A-C F-S-sm"
        >
          <ReImage
            class="PD-md R-max"
            style="background: linear-gradient(0deg, #ff6100, #fd8c00)"
            width="30px"
            height="30px"
            :src="card.icon"
          />
          <view class="MT-sm T-strong">{{ card.title }}</view>
          <view class="MT-sm C-T4">{{ card.content }}</view>
        </CoCard>
      </CoGrid>
    </CoCard>
  </CoPageView>
</template>

<style lang="scss" scoped>
.CoPageView {
  background-repeat: no-repeat;
  background-size: contain;
}

.offset {
  position: relative;
  z-index: 10;
}
</style>
