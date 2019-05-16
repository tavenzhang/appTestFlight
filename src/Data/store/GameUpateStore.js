import {action, observable} from 'mobx'

export default class GameUpateStore {

    @observable
    isLoading = false;

    @observable
    isNeedUpdate = true;

    @observable
    isTempExist = false;

    @observable
    isOldHome = false;



}