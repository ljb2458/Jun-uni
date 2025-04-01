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
    </script>
    
    <template>
      <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll"> </CoPageView>
    </template>
    
    <style lang="scss" scoped></style>
    