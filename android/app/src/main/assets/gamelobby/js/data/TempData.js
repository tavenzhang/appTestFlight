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
     * 游戏当前版本号
     */
    ResConfig.versions = "版本号：4.0424.2154";
    return ResConfig;
}());
//# sourceMappingURL=TempData.js.map