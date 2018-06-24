import MainStore from "./MainStore";

'use-strict';
import {observable, action, computed, autorun} from "mobx";
import BalanceStore from "./BalanceStore";
import GameDZStore from "./GameDZStore";

//中央store 整合app 状态 需要多页面共享数据的store 请放在此处 方便注入 以及调用。
class RootStore {
    constructor() {
        this.balanceStore = new BalanceStore();
        this.mainStore =MainStore;
        this.gameDZStore =new GameDZStore();
    }
}

const rootStore = new RootStore()

export default rootStore


