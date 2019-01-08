
import { observable,action} from 'mobx'
import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs'

/**
 *app信息管理
 */
export  default  class BBLStore {

    @observable
    homeDomain = "http://webplatform.psxiaohe.com";

    @observable
    backDomain = "http://webplatform.psxiaohe.com";


    @observable
    isLoading = true;

    @observable
    clientId =  "11";

    @observable
    isShowDebug = false;

    storeDir = DocumentDirectoryPath;

    tempZipDir=`${DocumentDirectoryPath}/game.zip`;

    @observable
    versionDomain =this.isShowDebug ? "http://192.168.11.120:8888":"https://download.jwyxw.net/ios/bbl"  ;


    @observable
    versionManger = {name:"home",versionNum:1,source:'gamelobby.zip',isFlush:false}

    //用于动态替换大厅域名
    @observable
    urlJSON={
        url:{
            "home":"http://106games.com/g_lobby/home.html",
            "backlobby":"http://106games.com/g_lobby/index.html",
            "accounturl":"https://webplatform.psxiaohe.com/api/v1",
            "lobbyurl":"https://webplatform.psxiaohe.com/api/v1",
            "rooturl":"https://webplatform.psxiaohe.com/api/v1",

            "g_account":"../g_recharge/?module=account",
            "g_recharge":"../g_recharge/?module=recharge",
            "g_redraw":"../g_recharge/?module=redraw",
            "g_custom":"../g_recharge/?module=custom",
            "testcustomurl":"https://vp8.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=80002762&configID=2931&k=1"
        },
    }


    @action
    getGameVersion () {
        if(!this.versionManger) {
            return `init_0`
        }
        return ` ${this.versionManger.versionNum}`
    }

    @action
    getVersionConfig () {
        return `${this.versionDomain}`+"/game.json?random="+Math.random();
    }

    @observable
    lastGameUrl = "home";

    ACT_ENUM = {
        logout:"logout",
        playMusic:"playMusic",
        stopMusic:"stopMusic",
        windowResize:"windowResize",
        appData:"appData"
    }


    getWebAction(act:String,param={}){

        return {action:act,...param}
    }

    // switch (message.action) {
    // case "logout":
    //     LayaMain.onQuit();
    // break;
    // case "playMusic":
    //     Laya.SoundManager.stopMusic();
    // Laya.SoundManager.playMusic(ConfObjRead.getConfMusic().src);
    // break;
    // case "stopMusic":
    //     Laya.SoundManager.stopMusic();
    // case "windowResize":
    //     this.onResize();
    // break;

}

