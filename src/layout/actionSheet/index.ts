import wdActionSheet from "wot-design-uni/components/wd-action-sheet/wd-action-sheet.vue";
import {
  Action as OldAction,
  Panel as OldPanel,
} from "wot-design-uni/components/wd-action-sheet/types";
import { ComponentProps } from "vue-component-type-helpers";

/** 动作栏Props */
export interface ActionSheetProps
  extends Omit<OldActionSheetProps, "modelValue" | "onUpdate:modelValue"> {
  /** 菜单选项 */
  actions?: Action[];
  /** 自定义面板项,可以为字符串数组，也可以为对象数组，如果为二维数组，则为多行展示 */
  panels?: Panel[];
}
/** 菜单选项 */
export interface Action extends OldAction {
  onSelect: OnSelect;
  [k: string]: any;
}
/** 自定义面板项,可以为字符串数组，也可以为对象数组，如果为二维数组，则为多行展示 */
export interface Panel extends OldPanel {
  onSelect: OnSelect;
  [k: string]: any;
}
type OldActionSheetProps = ComponentProps<typeof wdActionSheet>;

export interface OnSelectEvent {
  item: Action & Panel;
  index: number;
}
export type OnSelect = Fun<[e: OnSelectEvent], any>;

export const showActionSheet = ref(false);
export const actionSheetProps = ref<ActionSheetProps>({});

export default {
  /**打开全局操作菜单 */
  open(props?: ActionSheetProps) {
    showActionSheet.value = true;
    if (props) actionSheetProps.value = { ...props };
  },
  /**关闭全局操作菜单 */
  close() {
    showActionSheet.value = false;
  },
};
