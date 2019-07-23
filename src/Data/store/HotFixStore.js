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
    //是否静默更新 下次启动剩下
    @observable
    isNextAffect=false
    @observable
    percent = 0;
    @observable
    isInstalledFinish = false;

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

