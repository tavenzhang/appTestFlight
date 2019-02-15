import {action, observable} from 'mobx'

export default class HotFixStore {

    constructor() {

    }

    @observable
    updateFinished = false;
    @observable
    syncMessage = "初始化配置中...";
    @observable
    updateStatus = 0;

    @observable
    progress = null;
    @observable
    currentDeployKey="";

    //默认允许更新
    allowUpdate = true;

    @action
    skipUpdate() {
        this.progress = false;
        this.updateFinished = true;
        this.updateStatus = 0
        this.syncMessage = ''
    }

    @action
    updateFailMsg(msg) {
        this.syncMessage = msg;
        this.updateFinished = false;
        this.updateStatus = -1;
    }

}

