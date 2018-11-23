import {observable, action} from 'mobx'


 class MainStore {
    //tab选择
    @observable selectedTab = 'home';

    @action
    changeTab(tabName) {
        this.selectedTab = tabName;
    }
}
const mainStore = new MainStore();
export default mainStore;
