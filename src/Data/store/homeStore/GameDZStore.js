import {computed, action, observable} from 'mobx'
import NetUitls from "../../../Common/Network/TCRequestUitls";
import {config} from '../../../Common/Network/TCRequestConfig'
export default  class GameDZStore {

    @observable gameData=[];


    @action
    loadGames(paltFrom="MG",callback) {
        NetUitls.getUrlAndParamsAndPlatformAndCallback(config.api.gamesDZList,paltFrom, null, (res)=>{
            if(res.content){
                this.gameData = res.content;
            }
            if(callback){
                callback()
            }
        });
    }

   @computed get hotGame() {
        let hotGame = [];
        if (this.gameData) {
            this.gameData.slice().map(item => {
                if (item.categoryName === "热门") {
                    hotGame = item.games.slice(0, 2);
                }
            })
        }
        return hotGame;
    }

    @computed get allGame() {
        let allGame = [];
        if (this.gameData) {

            this.gameData.slice().map(item => {
               // JXLog("allGame---item",item);
                allGame =allGame.concat(item.games.slice());
            })
        }
        return allGame;
    }
}

