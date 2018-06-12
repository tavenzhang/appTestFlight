import MainStore from "./homeStore/MainStore";

'use-strict';
import {observable, action, computed, autorun} from "mobx";
import BalanceStore from "./userCenterStore/BalanceStore";
import GameDZStore from "./homeStore/GameDZStore";

//中央store 整合app 状态 需要多页面共享数据的store 请放在此处 方便注入 以及调用。
class RootStore {
    constructor() {
        this.balanceStore = new BalanceStore();
        this.mainStore = new MainStore();
        this.gameDZStore =new GameDZStore();
    }
}

const rootStore = new RootStore()

export default rootStore


