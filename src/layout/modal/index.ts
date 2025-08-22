import { ModalProps } from "@ttou/uv-typings/types/modal";
export const showModal = ref(false);
export const modalProps = ref<
  ModalProps & {
    /**
     * 是否使用 slot
     * @description 在 content 没有值时，默认开启
     */
    useSlot?: string;
  }
>({});
let _resolve = () => {};
let _reject = () => {};
const modal = {
  /**打开全局 mobal 提示框 */
  open(props?: ModalProps) {
    if (props) modalProps.value = { ...props };
    showModal.value = true;
    return new Promise<void>((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
  },
  /**关闭全局 mobal 提示框 */
  close() {
    showModal.value = false;
  },
};
export function onResovle() {
  modal.close();
  _resolve();
}
export function onReject() {
  modal.close();
  _reject();
}
export default modal;
