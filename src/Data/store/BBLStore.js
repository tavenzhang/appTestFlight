
import { observable} from 'mobx'


/**
 *app信息管理
 */
export  default  class BBLStore {

    @observable
    homeDomain = "http://106games.com";

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

