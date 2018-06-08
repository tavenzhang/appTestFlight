import {observable, action} from 'mobx'


export default class MainStore {
    //tab选择
    @observable selectedTab = 'home';

    @action
    changeTab(tabName) {
        //this.selectedTab = tabName;
        this.selectedTab = tabName;
    }
}

