'use-strict';
import MainStore from "./homeStore/MainStore";
import GameDZStore from "./homeStore/GameDZStore";

//中央store 整合app 状态 需要多页面共享数据的store 请放在此处 方便注入 以及调用。
class RootStore {
    constructor() {
        this.mainStore = new MainStore();
        this.gameDZStore =new GameDZStore();
    }
}

const rootStore = new RootStore()

export default rootStore


