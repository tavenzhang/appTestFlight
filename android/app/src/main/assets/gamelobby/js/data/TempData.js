/*
* 存放一些临时数据
*/
var TempData = /** @class */ (function () {
    function TempData() {
    }
    TempData.bRequestStatus = 1;
    TempData.bClickFullscreen = false;
    return TempData;
}());
var ResConfig = /** @class */ (function () {
    function ResConfig() {
    }
    /**
     * 通过头像id获取头像skin
     * @param id 注意格式为01,02...
     */
    ResConfig.getHeadSkinByID = function (id) {
        return "touxiang/img_touxiang_" + id + ".jpg";
    };
    /**
     * 通过别名获取游戏本地配置
     * @param alias
     */
    ResConfig.getGameIconConfig = function (alias) {
        var config = ConfObjRead.getGameIconConfig();
        var list = config.list;
        var len = list.length;
        var arr = list.filter(function (value) { return value.alias == alias; });
        if (arr && arr.length > 0)
            return arr[0];
        //如果没有找到，就使用默认数据
        alias = config.defaultIcon;
        arr = list.filter(function (value) { return value.alias == alias; });
        return arr[0];
    };
    /**
     * 获取游戏列表素材配置(用于预加载)
     */
    ResConfig.getGameListResConfig = function () {
        var config = ConfObjRead.getGameIconConfig();
        var list = config.list;
        var arr = [];
        list.forEach(function (value) {
            // arr.push({ url: value.norm, type: Laya.Loader.IMAGE });
            // arr.push({ url: value.gray, type: Laya.Loader.IMAGE });
            arr.push({ url: value.anim_png, type: Laya.Loader.IMAGE });
            arr.push({ url: value.anim_sk, type: Laya.Loader.BUFFER });
        });
        return arr;
    };
    /**
     * 游戏当前版本号
     */
    ResConfig.versions = "版本号：4.0424.2154";
    return ResConfig;
}());
//# sourceMappingURL=TempData.js.map