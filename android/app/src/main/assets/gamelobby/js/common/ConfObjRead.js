var ConfObjRead = /** @class */ (function () {
    function ConfObjRead() {
    }
    ConfObjRead.getConfText = function () {
        if (!ConfObjRead.textObj) {
            ConfObjRead.textObj = Laya.Loader.getRes("./assets/conf/textconf.json");
        }
        return ConfObjRead.textObj;
    };
    ConfObjRead.getConfCommon = function () {
        if (!this.commonObj) {
            this.commonObj = Laya.Loader.getRes("./assets/conf/config.json");
        }
        return this.commonObj;
    };
    ConfObjRead.getConfUrl = function () {
        if (!ConfObjRead.urlObj) {
            ConfObjRead.urlObj = Laya.Loader.getRes("./assets/conf/urls.json");
        }
        return ConfObjRead.urlObj;
    };
    ConfObjRead.getGameIconConfig = function () {
        if (!this.gameIconConfig) {
            this.gameIconConfig = Laya.Loader.getRes("./assets/conf/gameIcons.json");
        }
        return this.gameIconConfig;
    };
    ConfObjRead.getVerConfig = function () {
        if (!this.verConfig) {
            this.verConfig = Laya.Loader.getRes("./assets/conf/version.json");
        }
        return this.verConfig;
    };
    ConfObjRead.textObj = null;
    ConfObjRead.commonObj = null;
    ConfObjRead.urlObj = null;
    /**
     * 游戏图标配置
     */
    ConfObjRead.gameIconConfig = null;
    ConfObjRead.verConfig = null;
    return ConfObjRead;
}());
//# sourceMappingURL=ConfObjRead.js.map