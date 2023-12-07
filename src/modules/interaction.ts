/// <reference path="../../node_modules/minigame-api-typings/index.d.ts" />
import { EventName, Direction } from "../typings/index";
import event from "./event";

export default {
    init() {
        let startX = 0;
        let startY = 0;
        // 监听触摸事件
        wx.onTouchStart((e: WechatMinigame.OnTouchStartListenerResult) => {
            // 获取按下手指的坐标
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        wx.onTouchEnd((e: WechatMinigame.OnTouchStartListenerResult) => {
            // 获取抬起手指的坐标
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;

            // 计算坐标差值
            const deltaX = endX - startX;
            const deltaY = endY - startY;

            // 判断滑动方向
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    event.trigger(EventName["INTERFACE.SWIPE"], Direction.RIGHT);
                } else {
                    event.trigger(EventName["INTERFACE.SWIPE"], Direction.LEFT);
                }
            } else {
                if (deltaY > 0) {
                    event.trigger(EventName["INTERFACE.SWIPE"], Direction.DOWN);
                } else {
                    event.trigger(EventName["INTERFACE.SWIPE"], Direction.UP);
                }
            }
        });
    }
}
