import { defineStore } from "pinia";
import { localStorage } from "mp-storage";
import { apiGetWxOpenId, apiGeAllDictList, ApiGeAllDictList } from "@/api/sys";
import { CoStateOrm } from "@/components/common/CoStateTag/CoStateTag.vue";
import { CSSProperties, StyleValue } from "vue";
import { toRgba } from "@/utils/tools/css";

const env = import.meta.env;
export default defineStore("SysStore", {
  //*全局仓库
  state,
  //*全局函数
  actions: {
    async getWxOpenId(
      code: string,
      refresh = false
    ): Promise<string | undefined> {
      if (this.openId && refresh !== true) return this.openId;
      const res = await apiGetWxOpenId({ JsCode: code });
      if (!res.isSuccess) return;
      this.openId = res.result.openId;
      return this.openId;
    },
    setDefHttpHeader(val: SysStore.defHttpHeader, replace = false) {
      if (replace === true) {
        this.defHttpHeader = val;
        return;
      }
      this.defHttpHeader = {
        ...this.defHttpHeader,
        ...val,
      };
    },

    async geAllDictList() {
      const res = await apiGeAllDictList();
      if (!res.isSuccess) return;
      this.allDictList = res.result;
    },
  },
  //*计算属性
  getters: {
    dictOrm(): Record<ApiGeAllDictList.ResKey, CoStateOrm> {
      const dictOrm: Record<ApiGeAllDictList.ResKey, CoStateOrm> = {} as any;
      if (!this.allDictList) return dictOrm;
      const styleOrm: Record<ApiGeAllDictList.TagType, CSSProperties> = {
        primary: {
          color: "var(--c-jun-primary)",
          background: "var(--c-jun-primary  c-op-30)",
        },
        danger: {
          color: "var(--C-fail)",
          background: "var(--C-fail  c-op-30)",
        },
        info: {
          color: "var(--c-jun-c-2)",
          background: "var(--c-jun-c  c-op-30)",
        },
        success: {
          color: "var(--c-jun-success)",
          background: "var(--c-jun-success  c-op-30)",
        },
        warning: {
          color: "var(--C-warn)",
          background: "var(--C-warn  c-op-30)",
        },
      };
      for (const _key in this.allDictList) {
        const key = _key as keyof typeof this.allDictList;
        const val = this.allDictList[key];
        dictOrm[key] = val.map((v) => {
          let style: StyleValue;
          if (v.styleSetting) {
            try {
              const cssObj: CSSProperties = JSON.parse(v.styleSetting);
              if (cssObj.color && !cssObj.background) {
                cssObj.background = toRgba(cssObj.color, 0.3);
              }
              style = cssObj;
            } catch (error) {
              console.error(error);
              style = v.styleSetting;
            }
          }
          style = [styleOrm[v.tagType], style];
          return {
            ...v,
            label: v.name,
            style,
            class: v.classSetting,
          };
        });
      }
      return dictOrm;
    },
  },
  //*仓库数据缓存
  persist: [
    {
      key: "SysStore",
      storage: localStorage, //指定储存位置
    },
  ],
});
/**state类型定义 */
export namespace SysStore {
  export interface Data {
    openId: string | undefined;
    defHttpHeader: defHttpHeader | undefined;
    allDictList: ApiGeAllDictList.ResOrm | undefined;
  }
  export interface defHttpHeader {
    Authorization: string;
  }
}
/**初始化pinia */
function state(): SysStore.Data {
  return {
    openId: undefined,
    defHttpHeader: undefined,
    allDictList: undefined,
  };
}
