<template>
  <view ref="eleMeter" :class="['zui-progress-circle', debug ? 'debug' : '']" :style="style">
    <view class="zui-progress-circle-wrapper">
      <image v-if="pointer" class="zui-progress-circle-pointer" mode="aspectFit" :src="pointer" :style="pointerStyle" />
      <image class="zui-progress-circle-ring" mode="aspectFit" :src="svgDataUrl" />
    </view>
    <view class="zui-progress-circle-slot">
      <slot />
    </view>
    <view v-if="debug" class="debug-frame">
      <view class="cross-v"></view>
      <view class="cross-h"></view>
      <view class="half-size"></view>
    </view>
  </view>
</template>

<script>
const DIR_CCW = "counterclockwise";
const DIR_CW = "clockwise";

const generateId = () => {
  const base = 999999 * Math.random();
  return Math.round(base) + 100000;
};

export default {
  name: "zui-progress-circle",

  components: {},

  props: {
    size: {
      type: Number,
      default: 180,
    },
    /**
     * 当前位置
     *
     * [0, 1]
     */
    position: {
      type: Number,
      default: 0,
    },
    /**
     * 环形起止位置
     */
    range: {
      type: [Array],
      default: () => [0, 360],
    },
    /**
     * 方向
     */
    direction: {
      type: String,
      default: DIR_CW,
      validator(val) {
        return [DIR_CCW, DIR_CW].includes(val)
      }
    },
    /**
     * 环形宽度
     */
    ringWidth: {
      type: Number,
      default: 8,
    },
    /**
     * 端点效果
     *
     * round | butt | square
     */
    linecap: {
      type: String,
      default: "round",
    },
    /**
     * 纹理贴图，组件支持配置前景和背景2个贴图
     *
     * 贴图可以是一个颜色，一个渐变填充，一个 base64 编码的图片。3种贴图可以搭配使用
     *
     */
    texture: {
      type: [String, Array],
      default: () => ["#1BB507", "#E2D8D8"],
    },

    pointer: String,

    pointerOffset: Number,

    /**
     * 修复遮盖问题
     */
    fixOverlay: Boolean,

    debug: Boolean,
  },

  data() {
    return {};
  },

  computed: {
    preset() {
      const preset = {}
      preset.start = this.range[0];
      preset.end =
        this.range[0] > this.range[1]
          ? this.range[1] + 360
          : this.range[1];
      preset.ringRadius = (this.size - this.ringWidth) / 2;
      preset.ringCenter = this.size / 2;
      preset.ringPerimeter = 2 * Math.PI * preset.ringRadius;
      preset.ringLength =
        ((preset.end - preset.start) * Math.PI * preset.ringRadius) / 180;
      preset.ringStart = (preset.start * Math.PI * preset.ringRadius) / 180;
      preset.ringEnd = (preset.end * Math.PI * preset.ringRadius) / 180;

      if (/^(ccw|counterclockwise)$/i.test(this.direction))
        preset.direction = DIR_CCW;
      else preset.direction = DIR_CW;

      return preset
    },

    textureFG() {
      const textureSize = this.size;

      if (typeof this.texture === "string") {
        return this.parseTexture(this.texture, textureSize);
      } else if (
        Object.prototype.toString.call(this.texture) === "[object Array]"
      ) {
        if (typeof this.texture[0] === "number") {
          return this.parseTexture(this.texture, textureSize);
        } else {
          return this.parseTexture(this.texture[0], textureSize);
        }
      } else {
        // use default texture
        return this.parseTexture("#1BB507", textureSize);
      }
    },

    textureBG() {
      const textureSize = this.size;
      if (typeof this.texture === "string") {
        return this.parseTexture(undefined, textureSize);
      } else if (
        Object.prototype.toString.call(this.texture) === "[object Array]"
      ) {
        if (typeof this.texture[0] === "number") {
          return this.parseTexture(undefined, textureSize);
        } else {
          return this.parseTexture(this.texture[1], textureSize);
        }
      } else {
        // use default texture
        return this.parseTexture("#E2D8D8", textureSize);
      }
    },

    hasBackground() {
      return !!this.textureBG;
    },

    svgDataUrl() {
      let svg = this.createSVG();
      svg = `data:image/svg+xml,${encodeURIComponent(svg.replace(/ +/g, " "))}`;
      return svg;
    },

    style() {
      const style = {
        width: `${this.size}px`,
        height: `${this.size}px`,
        "--zui-progress-circle-ring-size": `${this.size}px`,
        "--zui-progress-circle-ring-width": `${this.ringWidth}px`,
      }

      return Object.keys(style)
        .map((key) => `${key}:${style[key]}`)
        .join(";");
    },

    pointerStyle() {
      const style = {}

      const { start, end, ringRadius } = this.preset
      let rotate = ((end - start) * this.position + start)
      if (this.linecap === 'round' || this.linecap === 'butt') {
        rotate += (this.ringWidth / 3 * 180) / (Math.PI * ringRadius)
      }
      const offset = this.pointerOffset || 0
      style['--zui-progress-circle-pointer-rotate'] = `translate(-${offset}px, -50%) rotate(${rotate}deg)`
      style['--zui-progress-circle-pointer-center'] = `${offset}px 50%`
      return Object.keys(style)
        .map((key) => `${key}:${style[key]}`)
        .join(";");
    },
  },

  methods: {
    parseTexture(texture, textureSize) {
      if (!texture) return undefined;

      if (/^#[0-9a-f]+/i.test(texture)) {
        return {
          type: "color",
          value: texture,
        };
      }

      const defId = generateId();
      if (/Gradient>/i.test(texture)) {
        if (/id="[^"]+"/.test(texture)) {
          // Replace id
          texture = texture.replace(/id="[^"]+"/, `id="def_${defId}"`);
        } else {
          // Create id
          texture = texture.replace(
            /<(\w+Gradient) /,
            `<$1 id="def_${defId}" `
          );
        }
        return {
          type: "gradient",
          value: `url(#def_${defId})`,
          def: texture,
        };
      }

      if (Object.prototype.toString.call(texture) === "[object Array]") {
        texture = this.createGradient(defId, texture.slice(1), texture[0]);
        return {
          type: "gradient",
          value: `url(#def_${defId})`,
          def: texture,
        };
      }

      // Create image pattern
      if (/<pattern /.test(texture)) {
        if (/id="[^"]+"/.test(texture)) {
          // Replace id
          texture = texture.replace(/id="[^"]+"/, `id="def_${defId}"`);
        } else {
          // Create id
          texture = texture.replace(/<pattern /, `<$1 id="def_${defId}" `);
        }
      } else {
        // Url or base64 code
        texture = this.createPattern(`def_${defId}`, texture, textureSize);
      }

      return {
        type: "pattern",
        value: `url(#def_${defId})`,
        def: texture,
      };
    },
    /**
     * 创建渐变填充
     *
     * @param {color[]} stops 渐变颜色
     * @param {number} angle 渐变填充角度
     */
    createGradient(id, stops, angle) {
      const step = 100 / (stops.length - 1);
      const stopNodes = new Array(stops.length).fill(null).map((_, idx) => {
        return `<stop offset="${step * idx * 100}%" stop-color="${
          stops[idx]
        }" />`;
      });
      return `<linearGradient id="def_${id}" x1="0%" y1="0%" x2="100%" y2="64.9%" gradientTransform="rotate(${angle})">
          ${stopNodes.join("")}
        </linearGradient>`;
    },

    /**
     * 创建文理填充
     *
     * @param {string} img base64 image. URI not surpported.
     */
    createPattern(id, img, size) {
      size = size || "100";
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="100%" height="100%">
          <image xlink:href="${img}" x="0" y="0" width="100%" height="100%"/>
        </pattern>`;
    },

    /**
     * 创建圆环
     *
     * @param {string} fill 纹理ID
     * @param {number[]} dasharray 弧形数据
     */
    createCircle(fill, dasharray, type) {
      const { ringCenter, ringRadius, fixOverlay } =
        this.preset;
      const circle = {
        cx: ringCenter,
        cy: ringCenter,
        r: ringRadius,
        // 前景环稍大点, 用于遮盖底部环纹理
        "stroke-width": this.ringWidth,
        stroke: fill && fill.value,
        "stroke-linecap": this.linecap,
        "stroke-dasharray": dasharray.join(","),
      };

      if (fixOverlay) {
        /**
         * 装背景环尺寸调小，以解决前景无法完全遮盖的问题
         */
        const fw = type === "fg" ? this.ringWidth : this.ringWidth - 1;
        circle["stroke-width"] = fw > 8 ? fw : 8;
      }

      const props = Object.keys(circle)
        .map((key) => (circle[key] ? `${key}="${circle[key]}"` : ""))
        .join(" ");

      return `<circle fill="none" stroke-dashoffset="1" ${props}></circle>`;
    },

    generateDashArray(pos) {
      const {
        direction,
        ringStart,
        ringPerimeter,
        ringLength,
      } = this.preset;

      let ringStartPos = direction === DIR_CCW ? ringStart + (1 - pos) * ringLength : ringStart;
      let dash1 = 0;
      let dash2 = 0;
      let dash3 = 0;
      dash2 = 1 + ringStartPos;
      dash3 = pos * ringLength;
      const npos = ringStartPos + pos * ringLength;
      if (npos > ringPerimeter) {
        dash1 = npos - ringPerimeter;
        dash2 = ringStartPos - dash1;
      } else {
        dash1 = 0;
      }

      return [dash1, dash2, dash3, ringPerimeter];
    },

    /**
     * 创建 SVG 图形
     */
    createSVG() {
      const cirleBG = this.hasBackground
        ? this.createCircle(this.textureBG, this.generateDashArray(1))
        : "";
      const cirleFG = this.createCircle(
        this.textureFG,
        this.generateDashArray(this.position),
        "fg"
      );
      const defs = [this.textureFG.def || "", (this.textureBG && this.textureBG.def) || ""];
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${this.size}" height="${this.size}">
  <defs>
    ${defs.join("\n")}
  </defs>
  <g>
    ${cirleBG}
    ${cirleFG}
  </g>
</svg>`;
      return svg;
    },
  },
};
</script>

<style lang="scss" scoped>
.zui-progress-circle {
  --zui-progress-circle-debug-color: #f00;
  position: relative;
}
.zui-progress-circle-wrapper {
  width: 100%;
  height: 100%;
}
.zui-progress-circle-ring {
  width: var(--zui-progress-circle-ring-size);
  height: var(--zui-progress-circle-ring-size);
}

.zui-progress-circle-slot {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: var(--zui-progress-circle-ring-width);
  box-sizing: border-box;
}

.zui-progress-circle-pointer {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: var(--zui-progress-circle-pointer-rotate);
  transform-origin: var(--zui-progress-circle-pointer-center);
  width: 50%;
  height: 50%;
  transition: transform 0.1s linear;
}

// Debug item style
.debug-frame ,
.cross-v,
.cross-h,
.half-size {
  position: absolute;
}

.debug-frame {
  position: absolute;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid var(--zui-progress-circle-debug-color);
  border-radius: 50%;
}


.cross-h, .cross-v,
.half-size  {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--zui-progress-circle-debug-color);
  mix-blend-mode: difference;
}
.cross-v {
  width: 1px;
  height: 100%;
}

.cross-h {
  width: 100%;
  height: 1px;
}

.half-size {
  width: 50%;
  height: 50%;
  border: 1px solid var(--zui-progress-circle-debug-color);
  background-color: transparent;
  border-radius: 50%;
}
// Debug style END
</style>
