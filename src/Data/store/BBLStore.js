
import { observable} from 'mobx'
import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs'

/**
 *app信息管理
 */
export  default  class BBLStore {

    @observable
    homeDomain = "http://sit.106games.com";

    @observable
    zipVersion = "app_1";

    @observable
    isForeReload = false;

    storeDir = DocumentDirectoryPath;

    tempZipDir=`${DocumentDirectoryPath}/game.zip`

    @observable
    versionUrl = "http://192.168.11.120:8888/game.json"+"?random="+Math.random();

    @observable
    versionManger = {name:"home",versionNum:1,source:'http://192.168.11.120:8888/gamelobby.zip',isFlush:false}

    //用于动态替换大厅域名
    @observable
    urlJSON={
        url:{
            "home":"http://106games.com/g_lobby/home.html",
            "backlobby":"http://106games.com/g_lobby/index.html",
            "accounturl":"http://192.168.1.93:8091/api/v1",
            "lobbyurl":"http://192.168.1.93:8091/api/v1",
            "rooturl":"http://192.168.1.93:8091/api/v1",

            "g_account":"../g_recharge/?module=account",
            "g_recharge":"../g_recharge/?module=recharge",
            "g_redraw":"../g_recharge/?module=redraw",
            "g_custom":"../g_recharge/?module=custom",

            "testcustomurl":"https://vp8.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=80002762&configID=2931&k=1"
        },
    }

}

