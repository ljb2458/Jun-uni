
export {}

declare module 'vue' {
  export interface GlobalComponents {
    "up-collapse": typeof import("./components/ReCollapse/ReCollapse.vue")["default"];
    "up-collapse-item": typeof import("./components/ReCollapseItem/ReCollapseItem.vue")["default"];
    "u-radio-group": typeof import("./components/ReRadioGroup/ReRadioGroup.vue")["default"];
    "u-checkbox-group": typeof import("./components/ReCheckboxGroup/ReCheckboxGroup.vue")["default"];
    "u-swipe-action": typeof import("./components/ReSwipeActionGroup/ReSwipeActionGroup.vue")["default"];
    "u-action-sheet": typeof import("./components/ReActionSheet/ReActionSheet.vue")["default"];
    "u-button": typeof import("./components/ReButton/ReButton.vue")["default"];
    "u-calendar": typeof import("./components/ReCalendar/ReCalendar.vue")["default"];
    "u-checkbox": typeof import("./components/ReCheckbox/ReCheckbox.vue")["default"];
    "u-count-to": typeof import("./components/ReCountTo/ReCountTo.vue")["default"];
    "up-divider": typeof import("./components/ReDivider/ReDivider.vue")["default"];
    "u-empty": typeof import("./components/ReEmpty/ReEmpty.vue")["default"];
    "u-image": typeof import("./components/ReImage/ReImage.vue")["default"];
    "u-line": typeof import("./components/ReLine/ReLine.vue")["default"];
    "u-loading-icon": typeof import("./components/ReLoadingIcon/ReLoadingIcon.vue")["default"];
    "u-loading-page": typeof import("./components/ReLoadingPage/ReLoadingPage.vue")["default"];
    "u-modal": typeof import("./components/ReModal/ReModal.vue")["default"];
    "u-notice-bar": typeof import("./components/ReNoticeBar/ReNoticeBar.vue")["default"];
    "u-notify": typeof import("./components/ReNotify/ReNotify.vue")["default"];
    "u-number-box": typeof import("./components/ReNumberBox/ReNumberBox.vue")["default"];
    "u-picker": typeof import("./components/RePicker/RePicker.vue")["default"];
    "u-popup": typeof import("./components/RePopup/RePopup.vue")["default"];
    "u-radio": typeof import("./components/ReRadio/ReRadio.vue")["default"];
    "u-slider": typeof import("./components/ReSlider/ReSlider.vue")["default"];
    "u-sticky": typeof import("./components/ReSticky/ReSticky.vue")["default"];
    "u-swipe-action-item": typeof import("./components/ReSwipeActionItem/ReSwipeActionItem.vue")["default"];
    "u-swiper": typeof import("./components/ReSwiper/ReSwiper.vue")["default"];
    "u-switch": typeof import("./components/ReSwitch/ReSwitch.vue")["default"];
    "u-tag": typeof import("./components/ReTag/ReTag.vue")["default"];
    "u-text": typeof import("./components/ReText/ReText.vue")["default"];
    "u-textarea": typeof import("./components/ReTextarea/ReTextarea.vue")["default"];
    "u-tooltip": typeof import("./components/ReTooltip/ReTooltip.vue")["default"];
    "u-transition": typeof import("./components/ReTransition/ReTransition.vue")["default"];
  }
}
