import {observable,action} from 'mobx'

class AppStore {

    @observable userData = {
        login:false,
        username:"",
        password:"",
    }

    @action
    loginIn (data) {
        data.login=true;
        this.userData = data;
    }

    @action
    loginOut () {
        this.userData ={
            login:false,
            username:"",
            password:"",
        }
    }
}


const appStore = new AppStore()

export default appStore
