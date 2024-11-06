import { ModalProps } from "@ttou/uv-typings/types/modal";
export const showModal = ref(false);
export const modalProps = ref<ModalProps>({});
let _resolve = () => {};
let _reject = () => {};
const setModal = {
  open(props?: ModalProps) {
    if (props) modalProps.value = { ...props };
    showModal.value = true;
    return new Promise<void>((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
  },
  close() {
    showModal.value = false;
  },
};
export function onResovle() {
  setModal.close();
  _resolve();
}
export function onReject() {
  setModal.close();
  _reject();
}
export default setModal;
