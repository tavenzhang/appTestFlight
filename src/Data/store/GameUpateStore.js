import {action, observable} from 'mobx'

export default class GameUpateStore {

    @observable
    isLoading = false;

    @observable
    isNeedUpdate = true;

    @observable
    isAppDownIng= false;

    @observable
    isTempExist = false;

    @observable
    isOldHome = false;

    @observable
    isInSubGame = false;



}