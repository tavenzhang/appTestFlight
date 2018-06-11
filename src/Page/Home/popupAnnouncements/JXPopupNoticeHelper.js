/**
 * Created by Sam on 08/06/2018.
 * Copyright © 2017年 JX. All rights reserved.
 */
import _ from 'lodash';
const key = 'JXPpupAnnouncements'
let APPPpupAnnouncementsReadList = []

/** 获取首页弹窗公告*/
function getPopupAnnouncements(callBack) {
    storage.load({key: key})
        .then(res => {
            APPPpupAnnouncementsReadList = res
            if (TCHomeContents.content) {
                //服务器返回数组
                let popupAnnouncements = TCHomeContents.content.popupAnnouncements
                let filtrationArray =  []
                //过滤已读
                for (let i=0;i<popupAnnouncements.length;i++){
                    let item = popupAnnouncements[i]
                    let isRead = false
                    for (let j=0;j<APPPpupAnnouncementsReadList.length;j++){
                        if(item.id === APPPpupAnnouncementsReadList[j].id){
                            isRead =true;
                            break;
                        }
                    }
                    if (!isRead){
                        filtrationArray.push(item)
                    }
                }
                if (callBack){
                    callBack(filtrationArray)
                }
            }
        })
        .catch(err => {
            if(TCHomeContents&&TCHomeContents.content.popupAnnouncements){
                callBack(TCHomeContents.content.popupAnnouncements)
            }
        });
}


function setReadPopupAnnouncements(readList){
    if (readList && readList.length >0){
        let temp = _.concat(APPPpupAnnouncementsReadList,readList)
        storage.save({
            key: key,
            data:temp
        });
    }
}

export {
    setReadPopupAnnouncements,
    getPopupAnnouncements
}
