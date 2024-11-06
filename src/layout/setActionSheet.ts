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
  open(props?: ActionSheetProps) {
    showActionSheet.value = true;
    if (props) actionSheetProps.value = { ...props };
  },
  close() {
    showActionSheet.value = false;
  },
};
