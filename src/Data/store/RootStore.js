import UserStore from "./UserStore";

'use-strict';
import CommonBoxStore from "./CommonBoxStore";
import AppInfoStore from "./AppInfoStore";
import BBLStore from "./BBLStore";
import DataStore from "./DataStore";
import HotFixStore from "./HotFixStore";
import BankStore from "./BankStore";
import UserPayTypeStore from "./UserPayTypeStore";
import UserAccountStore from "./UserAccountStore";
import UserWithdrawStore from "./UserWithdrawStore";
import GameUIStroe from "./GameUIStroe";
//中央store 整合app 状态 需要多页面共享数据的store 请放在此处 方便注入 以及调用。
class RootStore {
    constructor() {
        this.appStore= new AppInfoStore()
        this.dataStore=new DataStore();
        this.commonBoxStore=new CommonBoxStore();
        this.hotFixStore = new HotFixStore();
        this.bblStore =new BBLStore();
        this.userStore = new UserStore();
        this.bankStore = new BankStore();
        this.userPayTypeStore=new UserPayTypeStore();
        this.userAccountStore=new UserAccountStore();
        this.userWithdrawStore= new UserWithdrawStore();
        this.gameUIStroe=new GameUIStroe();

    }
}

const rootStore = new RootStore();

export default rootStore


