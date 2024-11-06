<cfg lang="json">
{
  "navigationBarTitleText": "公司简介"
}
</cfg>

<script setup lang="ts">
import { _require } from "@/utils/tools";

const videoContext = uni.createVideoContext("myVideo");
function videoErrorCallback(e: any) {
  uni.showModal({
    content: e.target.errMsg,
    showCancel: false,
  });
}
const timerShaftList = computed(() => {
  const config = [
    {
      image: {
        slot: "left",
        src: _require("src/static/imgs/display/aboutUs_1.png"),
      },
      text: {
        slot: "right",
        title: "2026 全国布局",
        conent:
          "加大在人工智能、大数据等前沿技术的研发投入，推出具有创新性和技术壁垒的新功能。搭建资源共享平台，将优质的供应商、服务商、资本市场等资源引入客户生态，帮助客户拓展业务边界、获取更多发展机会。通过品牌魅力、市场前景及共赢的加盟政策，吸纳志同道合的伙伴加盟，全面布局全国市场，覆盖一二线城市及经济活跃区域，共同开创事业新篇章",
      },
    },
    {
      text: {
        slot: "left",
        title: "2025 GMV破万亿",
        conent:
          "不断提升产品质量、服务意识以及品牌影响力，通过提供先进的技术、工具、资源与营销方式，培育和赋能超万家客户，助力客户提升竞争力，实现平台综合GMV破万亿",
      },
    },
    {
      text: {
        slot: "right",
        title: "2024 云仓版上线",
        conent:
          "云仓系统专为超大型仓库和追求高效、精准管理的企业量身定制，集成了更智能的仓储管理系统（WMS）与运输管理系统（TMS），旨在通过智能化手段，重塑智慧仓储与物流行业的未来",
      },
    },
    {
      text: {
        slot: "left",
        title: "2023 再受认可",
        conent:
          "公司始终将技术创新作为企业发展的核心驱动力，注重知识产权的保护与管理，将研发成果快速转化为具有市场竞争力的产品和服务。并再次获评国家高新技术企业，技术研发与创新能力再受肯定",
      },
    },
    {
      text: {
        slot: "right",
        title: "2023 深化合作",
        conent:
          "携手湖南金蝶等行业资源，为客户提供业财税一体化系统，不仅简化了客户的财务管理流程，还提升了数据的精确性和实时性，有助于客户在竞争激烈的市场中迅速响应做出决策",
      },
    },
    {
      text: {
        slot: "left",
        title: "2022 生产系统上线",
        conent:
          "以一体化管理系统为宗旨，继续深化供应链系统研发，致力于为更多生产型商贸企业提供销售、生产、采购、仓储、物流、配送、资金全流程信息化服务",
      },
    },
    {
      text: {
        slot: "right",
        title: "2021 爆发增长",
        conent:
          "加强内容创作，深化线上运营，通过社交媒体、短视频平台、直播等新兴渠道，进行品牌宣传和产品推广，让广大商贸企业接触和使用订小易。",
      },
    },
    {
      text: {
        slot: "left",
        title: "2021 旗舰版上线",
        conent:
          "不断收集客户的反馈，吸收客户的建议，并在此基础上发布旗舰版，为客户提供全流程的一体化数字营销与管理系统。",
      },
    },
    {
      text: {
        slot: "right",
        title: "2020 浴火重生",
        conent:
          "受疫情影响，公司线下业务和代理加盟业务受到严峻挑战，于此同时，我们也感受到商贸企业对于信息化的需求越来越迫切。公司全面转型线上销售模式，打开了新的商业机会和发展空间。",
      },
    },
    {
      text: {
        slot: "left",
        title: "2020 备受肯定",
        conent:
          "始终坚持自主研发，紧跟行业发展趋势，持续推出具有前瞻性的新功能、新服务，引领商贸管理领域的技术潮流，获得了国家高新技术企业的称号与肯定。",
      },
    },
    {
      text: {
        slot: "right",
        title: "2019 火热加盟",
        conent:
          "作为同时期行业内较早推出基于小程序的产品，收获到了客户的好评与选择，也吸引了众多加盟商的积极加入",
      },
    },
    {
      text: {
        slot: "left",
        title: "2018 项目上线",
        conent:
          "基于小程序新一代设计语言，为分享、营销、转化提供了更好的载体，帮助商家快速搭建贴近客户的电商平台",
      },
    },
    {
      slot: "right",
      title: "2017 项目立项",
      conent:
        "组建核心团队，深入供应链行业研究，深挖客户需求，洞察商贸行业趋势，设计符合当前市场需求的系统模型",
    },
  ];
  if (!spread.value) return config.slice(0, 5);
  return config;
});
const spread = ref(false);
</script>

<template>
  <CoPageView class="PD-md">
    <video
      class="video"
      id="myVideo"
      src="http://static.dingxiaoyi.cn/Videos/dingxiaoyiproject.mp4"
      @error="videoErrorCallback"
      controls
    ></video>
    <view class="T-A-C MT-md T-strong">公司介绍</view>
    <view class="flex-J-C MT-sm">
      <CoDivider />
    </view>
    <view class="MT-sm">
      湖南各佳智能科技有限公司，致力于商贸企业供应链系统开发，积累了近30项国家软件知识产权著作证书。2020年，湖南省科学技术厅、湖南省财政厅、国家税务总局湖南省税务局认定并授予国家高新技术企业，是国内最先开发SaaS系统的团队之一。
      经过多年的互联网商业应用技术沉淀，为商贸企业提供“互联网+”经营转型的系统设计、开发以及提供互动营销云服务，帮助商贸企业“互联网+”战略的落地。
      现已成功推出了各种业态的商贸企业系统软件，以B2b场景的订小易订货系统为核心，同时，向下游零售商推出“小易店家”智慧收银系统，“小易美餐”餐饮系统。向上，提供异业联盟供应链商业模式系统服务、数字化市场解决方案等，帮助传统经销商实现数字化转型，帮助行业实现数字化本地生态。
    </view>
    <view class="T-A-C MT-md T-strong">发展历程</view>
    <view class="flex-J-C MT-sm">
      <CoDivider />
    </view>
    <CoTimerShaftItem class="MT-xl" hid-dot style="height: 20px">
    </CoTimerShaftItem>
    <CoTimerShaftItem v-for="(item, index) in timerShaftList" :key="index">
      <template v-if="item.image" #[item.image?.slot]>
        <ReImage width="100%" :mode="'widthFix'" :src="item.image.src" />
      </template>
      <template v-if="item.text" #[item.text?.slot]>
        <view class="T-strong">{{ item.text.title }}</view>
        <CoDivider
          style="margin-top: -4px"
          height="4px"
          :width="`${item.text.title.length * 13}px`"
        />
        <view class="F-S-xs MT-xs">
          {{ item.text.conent }}
        </view>
      </template>
    </CoTimerShaftItem>

    <view class="flex-J-C flex-A-C flex-col MT-xs">
      <view
        @click="spread = !spread"
        :class="{ spreadIcon__active: spread }"
        class="spreadIcon"
      >
        <up-icon
          class="icon-arrow-down"
          name="arrow-down"
          color="var(--C-M1)"
          size="16"
        />
      </view>
      <view class="T-A-C C-T4 F-S-sm MT-xs">
        <block v-if="spread">点击收起</block>
        <block v-else>点击展示全部</block>
      </view>
    </view>
    <view class="MT-xl">
      <view class="T-strong T-A-C">订小易商家分布</view>
      <view class="flex-J-C MT-sm"><CoDivider width="2em" /></view>
      <view class="relative">
        <ReImage
          width="100%"
          mode="widthFix"
          :src="_require('src/static/imgs/display/aboutUs_map_1.png')"
        />
        <view class="left-bottom">
          <view class="T-strong">订小易城市分布</view>
          <CoDivider style="margin-top: -4px" height="4px" :width="`7em`" />
          <view class="F-S-sm MT-xs" style="width: 50%">
            目前订小易商家已开拓湖南、湖北、 上海、海南、江西、广西、浙江、
            河南、广东等省市地区
          </view>
        </view>
      </view>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped>
.left-bottom {
  position: absolute;
  left: 0;
  bottom: 0;
}
.video {
  width: 100%;
  height: 250px;
}
.icon-arrow-down {
  padding: var(--gap-xxs);
  border: solid 2px var(--C-M1);
  border-radius: var(--R-max);
}
.spreadIcon {
  transform: rotate(0deg);
  transition: transform 0.3s;
}
.spreadIcon__active {
  transform: rotate(180deg);
}
</style>
