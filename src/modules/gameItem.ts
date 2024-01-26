/// <reference path="../../node_modules/minigame-api-typings/index.d.ts" />
import Bomb from "../models/Bomb";
import GameItem from "../models/GameItem";
import { EventName } from "../typings/index";
import event from "./event";
import { deepCloneObject } from './utils';

const gameItems: GameItem[] = [];

export default {
    init() {
        const bomb = new Bomb();
        gameItems.push(bomb);
        event.on(EventName["GAMEITEM.CLICK"], (index: number) => {
            gameItems[index].click();
        });
    },
    getItems() {
        return deepCloneObject(gameItems);
    }
}
