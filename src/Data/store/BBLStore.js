
import { observable,action} from 'mobx'
import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs'
import {platInfo} from "../../config/appConfig";

/**
 *app信息管理
 */
export  default  class BBLStore {

    @observable
    gameDomain = platInfo.gameDomain;

    @observable
    loginDomain = platInfo.loginDomain;



    @observable
    isLoading = true;

    @observable
    avatarData = null;


    @observable
    isDebugApp = false;

    storeDir = DocumentDirectoryPath;

    tempZipDir=`${DocumentDirectoryPath}/home.zip`;

    tempGameZip=`${DocumentDirectoryPath}/game.zip`;

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

    @observable
    menuJson={
        "menus":{
            "btns":[
                {
                    "desc":"帐号",
                    "cmd":"account",
                    "pos":{ "x":1140, "y":700 },
                    "src":[
                        "./assets/ui/mine/btn_account.png"
                    ],
                    "size":{ "w":82, "h":87 },
                    "maxScale":{"x":1.02,"y":1.02},
                    "normalScale":{"x":1,"y":1},
                    "sfxX":"assets/raw/Click.mp3"
                },
            ]
        },
    }

    @observable
    jumpData = null;


    @action
    getVersionDomain() {
        TW_Log("platInfo.homeDomain-----"+platInfo.gameDomain,platInfo.gameDomain)
        //对于android hack 包。 故意使用不存在路径
       return this.isDebugApp ? platInfo.zipCheckServer.debug_server: platInfo.zipCheckServer.release_server +(TW_Store.appStore.isInAnroidHack ? "/androidHack":"") ;
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

    @action
    getHeadIcoUrl(){
        //{"content":{"userId":1107,"avatar":"3","firstLogin":false,"userState":"NORMAL"},"rs":true,}

        let avatarId =  this.avatarData&&this.avatarData.avatar ? this.avatarData.avatar:"01"
        if(avatarId.length<2){
            avatarId="0"+avatarId
        }
        let url= `https://download.jingjingxiao.com/game/gameImage/head/img_touxiang_${avatarId}.jpg`;
        TW_Log("getHeadIcoUrl--------url--"+url,this.avatarData)
        return url
       // uri:"https://download.jingjingxiao.com/game/gameImage/head/img_touxiang_01.jpg"}
    }

    @observable
    shareURL={
        ios:"https://download.jinkuangjia.com/game/app.html?sub=release-chyqp&app=1&rom=7827",
        android:"https://download.jinkuangjia.com/game/release/chyqp/chyqp.apk?rom=5593",
    }

}

