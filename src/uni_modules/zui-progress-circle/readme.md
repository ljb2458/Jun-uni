# &lt;zui-progress-circle /&gt;

一款汽车仪表盘，环形温度指示器，环形进度条组件。支持自由弧度设置，支持图片纹理设置。






## 🍏 在线演示

**[💻 点我在浏览器里预览 https://uni.imgozi.cn/zui-progress-circle/](https://uni.imgozi.cn/zui-progress-circle/?utm_source=uni-plugin-market&utm_medium=readme&utm_campaign=zui-progress-circle&utm_id=uni-plugin)**

PS: 启动浏览器预览需要打开手机模器

**[📱 扫码体验](https://uni.imgozi.cn/zui-progress-circle/?utm_source=uni-plugin-market&utm_medium=readme&utm_campaign=zui-progress-circle&utm_id=uni-plugin)**

<img src="https://uni.imgozi.cn/zui-progress-circle/static/preview-qr.png" width="128" />



## 🍐 快速上手：

```html
<zui-progress-circle :position="0.5" />
```



## 🍊 参数

#### 🍉 size: `number`

组件尺寸

#### 🍉 ringWidth: `number`

环形宽度

#### 🍉 range: `[number, number]`

弧形起始角度范围，默认：[0, 360]。

值范围：[0, 360]

- 当起点角度小于终点角度时，按顺时针方向画圆弧；
- 当起点角度大于终点角度时，按逆时针方向画弧形；

#### 🍉 position: `number`

当前位置，默认：0。

值范围：[0, 1]

#### 🍉 direction: `'cw' | 'ccw' | 'clockwise' | 'counterclockwise'`

进度绘制方向，默认：'cw'

- cw, clockwise  顺时针方向
- ccw, counterclockwise  逆时针方向

#### 🍉 linecap: `'round' | 'butt' | 'flat'`

弧形端点形状，默认：'round'

#### 🍉 texture: `string | [number, ...string[]] | [ string | [number, ...string[]], string | [number, ...string[]] ]`

弧形纹理，默认：[ '<span style="background: #1BB507;color:#333">#1BB507</span>', '<span style="background: #E2D8D8;color:#333">#E2D8D8</span>' ]

- 只配置前景：`'#1BB507'`
- 同时配置前景与背景：`[ '#1BB507', '#E2D8D8' ]`

弧形的纹理支持以下几种形式：

1. CSS 颜色值

2. 一个包含线性渐变的颜色数组，颜色均匀分布

   `[number, ...sring[]]`

   第一个参数为渐变角度，第二个及以后的参数为颜色序列

3. 一段描述渐变的 SVG 代码，可完全自定义渐变。

4. base64 格式图片。❗️❗️❗️实验性功能，可能引起性能问题，请谨慎使用❗️❗️❗️

当只指定一种纹理时，表示只设置前景纹理，背景为透明状态。

当指定两种纹理时，第一个纹理配置为前景纹理，第二个纹理配置为背景纹理


#### 🍉 pointer: `string`

指针图片。图片尺寸要求宽度**等于**仪表盘尺寸的一半，高度**不超过**仪表盘尺寸的一半。


#### 🍉 pointerOffset: `number`

指针偏移。用于调整指针中心点位置，默认位于指针图片的左侧垂直中心点位置。


#### 🍉 fixOverlay: `boolean`

是否启用修正。

该参数仅在同时设置前景和背景和有效，用于解决前景无法完全覆盖背景的情况。

使用此修正的副作用是背景圆弧的宽度会比前景宽度小2像素。


#### 🍉 debug: `boolean`

默认: false

开启 debug 模式，debug 模式会显示组件边界线，方便进行 UI 布局与 debug



<span class="banner">
<span class="surport">
<a class="btn btn-support " data-toggle="modal" data-target="#support_modal" style="border: 1px solid #ec4d4d;letter-spacing: 1px;">
  🍓🍇🍉  喜欢就打赏一下  🍒🍑🥭
</a>
</span>
</span>



## 🍎 兼容性说明

| 兼容性 | 小程序 | 版本 | 说明 |
| :---: | :--- | :--- | ---- |
| | 快应用 | 0.1.0 |  |
| ✅ | 微信小程序 | 0.1.2 |  |
| ✅ | 支付宝小程序 | 0.1.2 |  |
| | 百度小程序 | 0.1.0 |  |
| | 字节小程序 | 0.1.0 |  |
| ✅ | QQ小程序 | 0.1.2 |  |
| ✅ | 钉钉小程序 | 0.1.2 |  |
| | 快手小程序 | 0.1.0 |  |
| ✅ | 飞书小程序 | 0.1.2 | 飞书小程序不支持动态将图片编码为 base64，使用图片纹理时需要注意 |
| | 京东小程序 | 0.1.0 |  |



## 🍓 支持

如果组件对您有帮助，请不吝打赏。肥宅快乐水🥤是创作动力！🥤🥤🥤

<span class="banner">
<span class="surport">
<a class="btn btn-support " data-toggle="modal" data-target="#support_modal" style="border: 1px solid #ec4d4d;letter-spacing: 1px;">
  🍓🍇🍉  喜欢就打赏一下  🍒🍑🥭
</a>
</span>
</span>
