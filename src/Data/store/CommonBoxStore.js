import {action, observable, computed} from "mobx";

export default class CommonBoxStore {

    @observable
    spinState = {visible: false, isModal: false, overStyle: {}, style: {}, margeTop: 0}

    @observable
    txtHint = "检查到大厅变更 \n 正在下载中..." +G_IS_IOS ? "完成后将自动重启!":"";

    @observable
    curPecent = 0;

    @observable
    totalPecent = 100;

    @observable
    isShow = false;

    @action
    showSpin(overStyle = {}, style = {}, isModal = true, marginTop = 0) {
        this.spinState.visible = true;
        this.spinState.overStyle = overStyle;
        this.spinState.isModal = isModal;
        this.spinState.margeTop = marginTop;
        this.spinState.style = style
    }


    @action
    showSpinWithState(spinState = {}) {
        this.spinState.visible = true;
        this.spinState.overStyle = spinState.overStyle != null ? spinState.overStyle : {};
        this.spinState.isModal = spinState.isModal != null ? spinState.isModal : true ;
        this.spinState.margeTop = spinState.marginTop != null ? spinState.marginTop : 0;
        this.spinState.style = spinState.style != null ? spinState.style : {};
    }

    @action
    hideSpin() {
        this.spinState.visible = false
    }

    @computed get visibleView() {
        return this.spinState.visible
    }
}