import {action, observable} from 'mobx'

export default class GameUpateStore {

    @observable
    isLoading = false;

    @observable
    isNeedUpdate = false;

    @observable
    isTempExist = false;



}