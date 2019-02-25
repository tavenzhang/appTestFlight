import {action, observable} from 'mobx'

export default class GameUIStroe {

    @observable
    isShowUserInfo = false;

    @observable
    isShowAddPayView= false;

    @observable
    isShowWithDraw = false;

    @observable
    isShowGuest= false;

    @observable
    gustWebUrl= "";
}
