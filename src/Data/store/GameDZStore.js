import {computed, action, observable} from 'mobx'
import NetUitls from "../../Common/Network/TCRequestUitls";
import {config} from '../../Common/Network/TCRequestConfig'
export default  class GameDZStore {

    @observable gameData=[];

    constructor(){
        this.lastPlatForm =null;
    }


    @action
    loadGames(paltFrom="MG",callback) {
        if(this.lastPlatForm!=paltFrom){
            this.lastPlatForm =paltFrom;
            this.gameData=[];
        }
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

