
import { observable,action} from 'mobx'
import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs'
import {platInfo,appDomainBase} from "../../config/appConfig";
import {config} from "../../Common/Network/TCRequestConfig";
import NetUitls from "../../Common/Network/TCRequestUitls";

/**
 *app信息管理
 */
export  default  class BBLStore {

    @observable
    gameDomain = appDomainBase.base1;

    @observable
    loginDomain = appDomainBase.base1;

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

    @observable
    subGameParams={
        url:"",
        isGame: true
    }
    @observable
    isShowCircle=false;

    @action
    getUriConfig(){{
        return {
            url: {
                "home": `${this.gameDomain}/g_lobby/home.html`,
                "backlobby": `${this.gameDomain}/g_lobby/index.html`,
                "apihome": `${this.gameDomain}/api/v1`,

                "g_account": "../g_recharge/?module=account",
                "g_recharge": "../g_recharge/?module=recharge",
                "g_redraw": "../g_recharge/?module=redraw",
                "g_custom": "../g_recharge/?module=custom",
                "testcustomurl": "https://vp8.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=80002762&configID=2931&k=1"
            },
        }
    }}



    @observable
    jumpData = null;

    @observable
    debug_release_server = "";

    @action
    getVersionDomain() {

        let isSubWay = false;
        let subStrWay=`${TW_Store.appStore.subAppType}`;
        if(subStrWay.length>0&&subStrWay!="0"){
            isSubWay = true;
        }
        let versionDomain = this.isDebugApp ? this.debug_release_server: (platInfo.downDomain+platInfo.zipCheckServer.release_server);
        if(this.isDebugApp){
            versionDomain = this.debug_release_server;
        }else{
            if(isSubWay){
                versionDomain= platInfo.downDomain+platInfo.zipCheckServer.release_server+"/qudao"
            }else{
                versionDomain= platInfo.downDomain+platInfo.zipCheckServer.release_server
            }
        }
        //TW_Store.appStore.isInAnroidHack
        if(TW_Store.appStore.isInAnroidHack){
            versionDomain+="/isInAnroidHack"
        }
        //TW_Log("versionDomain----getVersionDomain---",versionDomain)
        //对于android hack 包。 故意使用不存在路径
       return versionDomain;
    }


    @action
    getVersionConfig () {
        return `${this.getVersionDomain()}`+"/game2.json?random="+Math.random();
    }

    @action
    showGameCircle(isShow=true) {
        if(TW_OnValueJSHome){
            TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.showLoading,{data:isShow,alpha:0.5}));
        }

        this.isShowCircle =isShow;
    }
    @action
    quitSubGame() {
       this.subGameParams={
            url:"",
            isGame: true
        }

    }

    @action
    isInSubGame() {
       return   this.subGameParams.url&&this.subGameParams.url.length >0;

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
        flushMoney:"flushMoney",
        gameData:"gameData",
        gamesinfo:"gamesinfo",
        updateProgress:"updateProgress",
        setrawroot:"setrawroot",//设置声音根目录
        playsoundByFile:"playsound",//通过文件名播放声音
        playmusicByFile:"playmusic",//通过文件名播放背景音乐
        onBlur:"onBlur",
        lobbyResume:"lobbyResume",
        game_loading:"game_loading",
        showGame:"showGame",
        bindPhone:"bindPhone",
        lifecycle:"lifecycle",
        showMask:"showMask",
        shareSucess:"shareSucess",
        openBindCard:"openBindCard",
        openBindAlipay:"openBindAlipay",
        showLoading:"showLoading",
        enterGame:"enterGame",
        openDebug:"openDebug",
    }

    //bgm.mp3 click.mp3 close.mp3 flopleft.mp3 flopright.mp3 recharge.mp3 rightbottomclose.mp3 showlogo.mp3
    SOUND_ENUM={
        bgm:"bgm.mp3",
        click:"click.mp3",
        close:"close.mp3",
        flopleft:"flopleft.mp3",
        flopright:"flopright.mp3",
        recharge:"recharge.mp3",
        rightbottomclose:"rightbottomclose.mp3",
        showlogo:"showlogo.mp3",
        enterPanelClick:"enterPanelClick.mp3",
        sfx_click:"sfx_click.mp3",
        returnLobbyClick:"returnLobbyClick.mp3"
    }

    @action
    playSoundByFile(file:String,isMusic=false){
        if(TW_OnValueJSHome){
            if(isMusic){
                TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.playmusicByFile, {data: file}));
            }else{
                TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.playsoundByFile, {data: file}));
            }
        }
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
    shareURL={ios:"",android:""}

    @observable
    shareData={}



    @action
    getAppData(){
        let  url = TW_Store.bblStore.gameDomain+ config.api.gameShareDown.replace("#0",platInfo.brand);
        let downUrl="";
        NetUitls.getUrlAndParamsAndCallback(url, null, (ret) => {
            if(ret.rs&&ret.content){
                this.shareData = ret.content;
                this.shareURL.ios=this.shareData.iosShareUrl ? this.shareData.iosShareUrl:" ";
                this.shareURL.android=this.shareData.androidShareUrl ? this.shareData.androidShareUrl:" ";
                downUrl = G_IS_IOS ? this.shareData.iosDownloadUrl:this.shareData.androidDownloadUrl;
                downUrl = downUrl ? downUrl:"";
                if(downUrl.indexOf("?")>-1){
                    downUrl = downUrl+"&random="+Math.random();
                }else{
                    downUrl = downUrl+"?random="+Math.random();
                }
                TW_Store.appStore.onShowDownAlert(downUrl);
                TW_Store.gameUIStroe.gustWebUrl = this.shareData.customerServiceUrl;
            }
            //let downUrl =  iosDownloadUrl
            TW_Log("---getUrlAndParamsAndCallback--getAppData--downUrl=="+downUrl,ret.content);
        },10,false,false);
    }

}

