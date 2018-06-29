/**
 * Created by allen-jx on 2018/4/10.
 */
import {computed, action, observable} from 'mobx'
import {getContent, getGameSetting, getTopWinners} from '../../Common/Network/TCRequestService'
import {appId, config} from "../../Common/Network/TCRequestConfig";
import userStore from './UserStore'

export default class HomeStore {

    constructor() {

    }


    @observable content;
    @observable isLoading = true;
    @observable isRefreshing = true;
    @observable topWinnersModel;
    isFirstLoad = false;

    @action
    loadHomeContents(callback) {
        getContent((data) => {
            if (data && data.rs && data.content) {
                this.parseData(data);
                this.saveHomeCacheData(data);
                callback(true);
            } else {
                callback(false);
            }
        })
    }

    parseData(data) {
        TCHomeContents = data;
        let content = {};
        if (data.content.promotionBanners && data.content.promotionBanners.length > 0) {
            content.bannerData = data.content.promotionBanners;
        }
        if (data.content.announcements && data.content.announcements.length > 0) {
            content.noticeData = data.content.announcements;
        }
        if (data.content.menuIcons && data.content.menuIcons.length > 0) {
            content.menuIcons = data.content.menuIcons;
        }
        if (data.content.gameInfosHot && data.content.gameInfosHot.length > 0) {
            content.gameInfosHot = data.content.gameInfosHot;
        }
        if (data.content.gameInfosRecommend && data.content.gameInfosRecommend.length > 0) {
            if (data.content.gameInfosRecommend.length > 7) {
                content.gameInfosRecommend = data.content.gameInfosRecommend.slice(0, 7);
            }
            if (content.gameInfosRecommend % 2 !== 0) {
                content.gameInfosRecommend.push({
                    gameIconUrl: 'https://www.jiushouji.net/mobile/gameIcon/more@3x.1.0.png',
                    gameNameInChinese: '更多玩法',
                    gameDescription: '更多好玩游戏等你体验',
                    gameUniqueId: 'more'
                });
            }
        }
        if (data.content.dsfSportInfos && data.content.dsfSportInfos.length > 0) {
            content.dsfSportInfos = data.content.dsfSportInfos;
            if (content.dsfSportInfos.length % 2 !== 0) {
                // content.dsfSportInfos.push({})
            }
        }

        if (data.content.dsfEgameInfos && data.content.dsfEgameInfos.length > 0) {
            content.dsfEgameInfos = data.content.dsfEgameInfos;
            if (content.dsfEgameInfos.length % 2 !== 0) {
                // content.dsfEgameInfos.push({})
            }
        }

        if (data.content.dsfCardInfos && data.content.dsfCardInfos.length > 0) {
            content.dsfCardInfos = data.content.dsfCardInfos;
            if (content.dsfCardInfos.length % 2 !== 0) {
                // content.dsfEgameInfos.push({})
            }
        }
        this.isRefreshing = false;
        this.content = content;
    }

    saveHomeCacheData(json) {
        storage.save({
            key: 'TCHomeList',
            data: json
        })
    }

    async getHomeCacheData() {
        await storage
            .load({
                key: 'TCHomeList'
            })
            .then(res => {
                if (!this.isFirstLoad) {
                    JXLog('首页加载缓存获取结束');
                    this.parseData(res);
                }
            })
            .catch(err => {
            });
    }

    @action
    getTopWinners() {
        getTopWinners({clientId: appId},
            data => {
                if (data && data.content && data.content.length > 0) {
                    if (data.content.length > 20) {
                        data.content = data.content.slice(0, 20);
                    }
                    this.topWinnersModel = data.content
                }
            });
    }

    @action
    requestGameSetting() {
        let prizeGroup = userStore.prizeGroup ? userStore.prizeGroup : ''
        if (!userStore.userName || !userStore.isLogin) {
            prizeGroup = this.getVisitorPrizeGroup()
        }
        getGameSetting({
            prizeGroup: prizeGroup,
            clientId: appId
        }, (data) => {
            if (data && data.rs && data.content) {
                this.timer && clearInterval(this.timer);
                this.saveGameSetting(data)
            } else {
                this.timer = setTimeout(() => {
                    this.requestGameSetting()
                }, 6000);
            }
        })
    }

    getVisitorPrizeGroup = () => {
        let otherSetting = this.getOtherSettings();
        if (otherSetting) {
            return otherSetting.visitorPrizeGroup
        }
        return ''
    }

    getOtherSettings = () => {
        if (this.content) {
            let otherSetting = this.content.otherSettings
            return otherSetting
        }
        return null
    }

    saveGameSetting(json) {
        TCGameSetting = json;
        storage.save({
            key: 'TCGameSetting',
            data: json
        })
    }
}