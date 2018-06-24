import {computed, action, observable} from 'mobx'
import NetUitls from "../../Common/Network/TCRequestUitls";
import {config} from '../../Common/Network/TCRequestConfig'
export default  class GameDZStore {

    @observable gameData=[];


    @action
    loadGames(paltFrom="MG",callback) {
        NetUitls.getUrlAndParamsAndPlatformAndCallback(config.api.gamesDZList, null, paltFrom, (res)=>{
            if(res.content){
                this.gameData = res.content;
            }
            if(callback){
                callback(res.content)
            }
        });
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

