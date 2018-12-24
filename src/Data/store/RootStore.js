import HotFixStore from "./HotFixStore";

'use-strict';
import CommonBoxStore from "./CommonBoxStore";
import AppInfoStore from "./AppInfoStore";
import mainStore from "./MainStore";
import BBLStore from "./BBLStore";

//中央store 整合app 状态 需要多页面共享数据的store 请放在此处 方便注入 以及调用。
class RootStore {
    constructor() {
        this.mainStore = mainStore;
        this.appInfoStore= new AppInfoStore()
        this.commonBoxStore=new CommonBoxStore();
        this.hotFixStore = new HotFixStore();
        this.bblStore =new BBLStore()


    }
}

const rootStore = new RootStore();

export default rootStore


