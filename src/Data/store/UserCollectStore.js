import {observable, action, computed} from 'mobx'

import {getUserCollects, saveUserCollects, cancelUserCollects} from '../../Common/Network/TCRequestService'
import userStore from './UserStore'
import _ from 'lodash';

class UserCollectStore {

    constructor() {

    }

    @observable collects = [];

    @action
    getCollects(callback) {
        JXLog("==================getCollects")
        userStore.isLogin && getUserCollects(res => {
            JXLog("==================getCollects", res);

            if (res.rs) {
                let gameIds = res.content ? res.content.gameId : ''
                if (gameIds.length > 0) {
                    gameIds = _.trimEnd(gameIds, ",")
                    this.collects = gameIds.split(",")
                    JXLog('TCUSER_COLLECT = ' + gameIds);
                }
            }
            callback && callback(res);
        })
    }

    @action
    saveUserCollects(gameId, callback) {
        saveUserCollects({gameId: gameId}, res => {
            let result = {};
            if (res.rs) {
                this.collects.push(gameId);
                result.rs = true;
            } else {
                result.rs = false;
                result.message = res.message ? res.message : "保存失败";
            }
            callback(result);
        });
    }

    @action
    cancelUserCollects(gameIds, callback) {
        if (this.collects.length) {
            cancelUserCollects({gameId: gameIds ? gameIds : this.collects.join(",")}, res => {
                if (res.rs) {
                    if (gameIds) {
                        for (let i = 0; i < this.collects.length; i++) {
                            if (this.collects[i] === gameIds) {
                                this.collects.splice(i, 1);
                            }
                        }
                    } else {
                        this.collects = [];
                    }
                }
                callback(res);
            });
        }
    }

    @action
    isCollected(gameId) {
        if (this.collects.length) {
            for (let i = 0; i < this.collects.length; i++) {
                if (this.collects[i] === gameId) {
                    return true;
                }
            }
        }
        return false;
    }

    @computed get hasCollected() {
        return this.collects.length !== 0;
    }

}


const userCollectStore = new UserCollectStore();
export default userCollectStore;