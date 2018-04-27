/**
 * Created by Sam on 19/01/2017.
 * Copyright © 2016年 JX. All rights reserved.
 */

import {
    NativeModules,
    Platform
} from 'react-native'

import _ from 'lodash';
import {config} from '../../Common/Network/TCRequestConfig'
import NetUtils from '../../Common/Network/TCRequestUitls'
import Toast from '../../Common/JXHelper/JXToast';
let instance = null
export default class TCInitHelper {
    // 构造
    constructor() {
        if (!instance) {
            instance = this
        }
        return instance;
    }


    async  getUserCollects() {
        await storage.load({
            key: 'collects',
        }).then(res => {
            if (res) {
                TCUSER_COLLECTS = _.concat(TCUSER_COLLECTS, res)
                this.getCollectWithUser()
            }
        }).catch(err => {

        })
    }


    getUserCollectsFromServer(callback) {
        if (TCUSER_DATA.username && TCUSER_DATA.islogin) {
            NetUtils.getUrlAndParamsAndCallback(config.api.getBookmarks, null, (res)=> {
                if (res.rs) {
                    let gameIds = res.content ? res.content.gameId : ''
                    if (gameIds.length > 0) {
                        gameIds = _.trimEnd(gameIds, ",")
                        TCUSER_COLLECT = gameIds.split(",")
                        JXLog('TCUSER_COLLECT = ' + TCUSER_COLLECT)
                    }
                }
                callback ? callback(res) : null
            }, 0, false)
        }
    }


    saveUserCollectsToServer(gameId, callback) {
        NetUtils.PostUrlAndParamsAndCallback(config.api.saveBookmarks, {gameId: gameId}, (res)=> {
            if (res.rs) {
                TCUSER_COLLECT.push(gameId)
            }
            callback ? callback(res) : null
        }, 0, false)
    }

    cancelUserCollectsFromServer(gameIds, callback) {
        if (!TCUSER_COLLECT || TCUSER_COLLECT.length == 0) {
            return
        }

        NetUtils.DeleteUrlAndParamsAndCallback(config.api.delBookmarks, {gameId: gameIds ? gameIds : TCUSER_COLLECT.join(',')}, (res)=> {
            if (res.rs) {
                if (gameIds) {
                    for (var i = 0; i < TCUSER_COLLECT.length; i++) {
                        if (TCUSER_COLLECT[i] === gameIds) {
                            TCUSER_COLLECT.splice(i, 1)
                        }
                    }
                } else {
                    TCUSER_COLLECT = []
                }
            }
            callback ? callback(res) : null
        }, 0, false)
    }

    isCollected(gameId) {
        if (TCUSER_COLLECT && TCUSER_COLLECT.length > 0) {
            for (var i = 0; i < TCUSER_COLLECT.length; i++) {
                if (TCUSER_COLLECT[i] === gameId) {
                    return true
                }
            }
        }
        return false
    }


    isCollectFromGameId(gameId) {
        if (TCUSER_COLLECT && TCUSER_COLLECT.length > 0) {
            for (var i = 0; i < TCUSER_COLLECT.length; i++) {
                let collet = TCUSER_COLLECT[i]
                if (collet) {
                    if (collet.gameUniqueId === gameId) {
                        return true
                    }
                }
            }
        }
        return false
    }

    addCollectWithUser(collect) {
        TCUSER_COLLECTS = _.concat(TCUSER_COLLECTS, collect)
        storage.save({
            key: 'collects',
            data: TCUSER_COLLECTS
        })
    }

    isExistCollect() {
        for (var i = 0; i < TCUSER_COLLECTS.length; i++) {
            let userCollects = TCUSER_COLLECTS[i]
            if (userCollects.username === TCUSER_DATA.username) {
                TCUSER_COLLECT = userCollects.userCollects
                return true
            }
        }
        return false
    }

    removeAllCollect() {
        if (!TCUSER_COLLECT) {
            return
        } else {
            TCUSER_COLLECT = []
        }
    }

}
