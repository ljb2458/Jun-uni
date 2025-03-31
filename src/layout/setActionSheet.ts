import type {
  Action,
  ActionSheetProps as OldActionSheetProps,
} from "@ttou/uv-typings/types/actionSheet";

export interface ActionSheetOptionsItem extends Action {
  tap: Fun;
}
export type ActionSheetOptions = ActionSheetOptionsItem[];

export interface ActionSheetProps extends OldActionSheetProps {
  actions?: ActionSheetOptions;
}

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
