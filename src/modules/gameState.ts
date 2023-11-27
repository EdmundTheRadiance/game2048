/// <reference path="../../node_modules/minigame-api-typings/index.d.ts" />
import event from "./event";
import pieces from "./pieces";

enum state {
    START,
    PLAYING,
    PAUSING,
    END
}

let currentState: state;
const enterStateFuncMap: { [key in state] ? : () => void } = {};
const exitStateFuncMap: { [key in state] ? : () => void } = {};

enterStateFuncMap[state.START] = () => {
    mod.start();
}
exitStateFuncMap[state.START] = () => {
    event.trigger('GameState.exitStart');
}

enterStateFuncMap[state.PAUSING] = () => {
    wx.showModal({
        content: '游戏已暂停',
        showCancel: false,
        success(res) {
            if (res.confirm) {
                mod.transitionTo(state.PLAYING);
            }
        }
    });
    event.trigger('GameState.enterPausing');
};
exitStateFuncMap[state.PAUSING] = () => {
    event.trigger('GameState.exitStart');
}

enterStateFuncMap[state.END] = () => {
    wx.showModal({
        content: '游戏已结束',
        showCancel: false,
        success(res) {
            if (res.confirm) {
                mod.transitionTo(state.START);
            }
        }
    });
}

const isValidTransition = function(toState: state): boolean {
    switch (currentState) {
        case state.START:
            return toState === state.PLAYING;
        case state.PLAYING:
            return toState === state.PAUSING || toState === state.END;
        case state.PAUSING:
            return toState === state.PLAYING;
        case state.END:
            return toState === state.START;
        default:
            return false;
    }
}

const mod = {
    state,
    start() {
        currentState = state.START;
        pieces.generatePiece();
        mod.transitionTo(state.PLAYING);
    },
    transitionTo(toState: state): void {
        if (isValidTransition(toState)) {
            exitStateFuncMap[currentState]?.();
            currentState = toState;
            enterStateFuncMap[toState]?.();
            console.log(`状态已变更为 ${toState}`);
        } else {
            console.log(`无效的状态转换: ${currentState} -> ${toState}`);
        }
    },
}

export default mod;
