import MainStore from "./homeStore/MainStore";

'use-strict';
import {observable, action, computed, autorun} from "mobx";
import BalanceStore from "./userCenterStore/BalanceStore";
import GameDZStore from "./homeStore/GameDZStore";

//中央store 整合app 状态
class RootStore {
    constructor() {
        this.balanceStore = new BalanceStore();
        this.mainStore = new MainStore();
       // this.homeStore = new HomeStore();
        this.gameDZStore =new GameDZStore();

    }
}

const rootStore = new RootStore()

export default rootStore


