import {observable, action, computed} from "mobx";
import {getMessageList, getMessageStatus} from "../../Common/Network/TCRequestService";
import userStore from "./UserStore";


class UserMessageStore {

    //消息列表
    @observable messageList = [];
    @observable title = "全部消息";
    @observable selectedIndex = -1;

    /**
     * 获取消息状态
     * @param callback
     */
    getMessageStatus(callback) {
        getMessageStatus({access_token: userStore.access_token}, res => callback(res))
    }

    @action
    initMessage(type, pageNum, pageSize, callback) {
        let param = {
            type: type,
            start: pageSize * pageNum,
            pageSize: pageSize
        }
        getMessageList(param, (res) => {
            if (res.rs) {
                userStore.newMsgCount = 0;
            }
            callback(res);
        });
    }
}

const messageStore = new UserMessageStore();
export default messageStore;
