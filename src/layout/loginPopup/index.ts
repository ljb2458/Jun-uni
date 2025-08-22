export const showLoginPopup = ref(false);

export let _resolve = (...p: any[]) => {};
export let _reject = (...p: any[]) => {};
export function openLoginPopup() {
  return new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
    showLoginPopup.value = true;
  });
}
export function closeLoginPopup() {
  showLoginPopup.value = false;
  _reject();
}
