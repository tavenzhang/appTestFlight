'use-strict';
import jdAppstore from "./JDAppStore";
import GameDZStore from "./GameDZStore";
import userStore from "./UserStore";
import CommonBoxStore from "./CommonBoxStore";
import initAppStore from "./InitAppStore";
import mainStore from "./MainStore";

//中央store 整合app 状态 需要多页面共享数据的store 请放在此处 方便注入 以及调用。
class RootStore {
    constructor() {
        this.mainStore = mainStore;
        this.jdAppstore=jdAppstore
        this.initAppStore = initAppStore;
        this.userStore=userStore;
        this.gameDZStore =new GameDZStore();
        this.commonBoxStore=new CommonBoxStore();

    }
}

const rootStore = new RootStore();

export default rootStore


