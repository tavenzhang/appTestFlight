
import { observable,action} from 'mobx'
import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs'
import {platInfo} from "../../config/appConfig";

/**
 *app信息管理
 */
export  default  class BBLStore {

    @observable
    homeDomain = platInfo.gameDomain;

    @observable
    urlDomain = platInfo.gameDomain;

    // @observable
    // homeDomain = "http://sit.106games.com";
    //
    // @observable
    // urlDomain = "http://106games.com";

    @observable
    isLoading = true;

    @observable
    clientId =  "11";

    @observable
    isDebugApp = false;

    storeDir = DocumentDirectoryPath;

    tempZipDir=`${DocumentDirectoryPath}/game.zip`;



    @observable
    versionManger = {name:"home",versionNum:1,source:'gamelobby.zip',isFlush:false}

    //用于动态替换大厅域名 //http:192.168.1.93:8091
    // "accounturl":"http://192.168.1.93:8091/api/v1",
    // "lobbyurl":"http://192.168.1.93:8091/api/v1",
    // "rooturl":"http://192.168.1.93:8091/api/v1"

    @observable
    urlJSON={
        url:{
            "home":`${platInfo.gameDomain}/g_lobby/home.html`,
            "backlobby":`${platInfo.gameDomain}/g_lobby/index.html`,
            "apihome":`${platInfo.gameDomain}/api/v1`,

            "g_account":"../g_recharge/?module=account",
            "g_recharge":"../g_recharge/?module=recharge",
            "g_redraw":"../g_recharge/?module=redraw",
            "g_custom":"../g_recharge/?module=custom",
            "testcustomurl":"https://vp8.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=80002762&configID=2931&k=1"
        },
    }


    @action
    getVersionDomain() {
        TW_Log("platInfo.homeDomain-----"+platInfo.gameDomain,platInfo.gameDomain)
       return this.isDebugApp ? platInfo.zipCheckServer.debug_server: platInfo.zipCheckServer.release_server  ;
    }


    @action
    getVersionConfig () {
        return `${this.getVersionDomain()}`+"/game.json?random="+Math.random();
    }

    @observable
    lastGameUrl = "home";

    ACT_ENUM = {
        logout:"logout",
        playMusic:"playMusic",
        stopMusic:"stopMusic",
        windowResize:"windowResize",
        appData:"appData",
        http:"http",
        flushMoney:"flushMoney"
    }

    @action
    getWebAction(act:String,param={}){
        return {...param,action:act}
    }

    @action
    changeShowDebug(state) {
        this.isDebugApp =state;
    }


}

