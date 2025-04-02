<cfg lang="json">
{
  "navigationBarTitleText": "折叠面板",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";

const activeNames = ref<number[]>([]);

const activeName = ref<number>();

const collapses = [
  {
    title: "高考迫在眉睫",
    message: "1人看过",
    content:
      "现在距离高考仅有12天了，但是我现在仍然浑浑噩噩，整天抱着个手机，一点学习的样子的没有。从去年九月份开始，我这两个学期的状态远不如之前了，我知道高考的重要性，也知道高考意味着什么，但是我的确无法强迫自己学习。哎，还有12天，我该怎么办啊，我现在一点都没有高三学生应该有的样子，希望群里的好心人帮帮我，让我重新有动力去学习，为了一个学生的未来，请v我50。",
  },
  {
    title: "群难进",
    message: "5人看过",
    content:
      "我托了关系才进了这个群，聊天跟不上，不聊又怕被踢，聊了又没人理，所以整天一个人自言自语，我都快得抑郁症了，还请活泼开朗阳光的姐姐加我，我们一起去苏州吃螃蟹，一起去青岛吹海风，一起去柳州吃螺蛳粉，一起去迪士尼看烟花，一起去沂蒙山看日出日落，去新疆吃烤串儿，去北京吃烤鸭，去东北吃鸡架，去重庆吃火锅，去陕西吃泡馍，去武汉吃热干面，然后再到长沙喝茶颜悦色，顺利的话我们会结婚，我们会有一个灿烂的余生，不顺利的话今天疯狂星期四v50请我吃一顿肯德基。",
  },
];

const treeLv1 = ref<number[]>([]);
const treeLv2 = ref<number[]>([]);
const collapsesTree = [
  {
    title: "冷门",
    message: "总计6人看过",
    content: "冷门文案，欢迎挖掘",
    childrens: [
      {
        title: "失业了",
        message: "1人看过",
        content:
          "失业了，最近没有怎么哭了，我现在慢慢变好了吧！以前有多快乐，现在就有多难过。从人间烟火的日常，到红着眼睛告别，消失在彼此的世界里，很痛，也很难。今天是肯德基疯狂星期四，v我50，抚慰我支离破碎的心。",
      },
      {
        title: "被群主骗三年",
        message: "5人看过",
        content:
          "被群主欺骗三年，说进群就分配富婆情缘，但是时至今日，群里面还都是一群和我一样没人要的骚话网友，我很心痛天天以泪洗面，最近没有怎么哭了，慢慢变好了......以前有多快乐，现在就有多难过。从听到分配情缘的快乐，到被欺骗的委屈，用真心换群主的欺瞒，很痛也很难。今天是肯德基疯狂星期四，v我 60，抚慰我支离破碎的心。别问我为啥比他们多 10，我贪心想多喝杯杨枝甘露。",
      },
    ],
  },
  {
    title: "热门",
    message: "总计300人看过",
    content: "热门文案，欢迎收看",
    childrens: [
      {
        title: "内推好机会",
        message: "100人看过",
        content:
          "有没有要找工作的？我这边内推入职，朝九晚六，做五休二，全国都有分公司。前三个月试用期每个月8000块，满三个月转正月薪26000，一年后给你买车，两年后给你买房。有意者点击头像私聊，并交50块押金。",
      },
      {
        title: "暗恋五年一无所有",
        message: "200人看过",
        content:
          "暗恋五年的人发朋友圈官宣了 我整夜买醉 哭累了，听说酸奶和炸鸡一起吃会中毒，酸奶我有了，你能不能帮我买份炸鸡？听说肯德基的毒性最强",
      },
    ],
  },
];
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <view class="F-S-lg MT-md MB-xs">基本使用</view>
      <CoCollapse
        v-for="(item, index) in collapses"
        v-model:value="activeNames"
        :name="index"
        :title="item.title"
        :message="item.message"
        class="B-B1 R-sm MT-sm"
        header-class="PD-sm"
      >
        <view class="PD-sm border-T">{{ item.content }} </view>
      </CoCollapse>

      <view class="F-S-lg MT-md MB-xs">手风琴模式</view>
      <view class="F-S-sm C-T3">
        只需要将 value 的默认值设置为非数组，即可开启手风琴模式
      </view>
      <CoCollapse
        v-for="(item, index) in collapses"
        v-model:value="activeName"
        :name="index"
        :title="item.title"
        :message="item.message"
        class="B-B1 R-sm MT-sm"
        header-class="PD-sm"
      >
        <view class="PD-sm border-T">{{ item.content }} </view>
      </CoCollapse>
      <view class="F-S-lg MT-md MB-xs">嵌套使用</view>
      <view class="F-S-sm C-T3">
        良好的嵌套支持，欢迎体验
      </view>
      <CoCollapse
        v-for="(group, index) in collapsesTree"
        v-model:value="treeLv1"
        :name="index"
        :title="group.title"
        :message="group.message"
        class="R-sm MT-sm"
        header-class="B-M1 C-white PD-sm"
      >
        <view class="border-T B-T1-O1 PD-sm">
          <view>{{ group.content }} </view>
          <CoCollapse
            v-for="(item, index) in group.childrens"
            v-model:value="treeLv2"
            :name="index"
            :title="item.title"
            :message="item.message"
            class="B-B1 R-sm MT-sm"
            header-class="PD-sm"
          >
            <view class="PD-sm border-T">{{ item.content }} </view>
          </CoCollapse>
        </view>
      </CoCollapse>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
