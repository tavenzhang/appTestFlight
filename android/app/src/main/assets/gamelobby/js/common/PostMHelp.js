var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var PostMHelp = /** @class */ (function () {
    function PostMHelp() {
    }
    //native log 
    PostMHelp.Log = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "Log" }, data)), "*");
    };
    //令牌更改通知消息
    PostMHelp.tokenChange = function (data) {
        if (data === void 0) { data = {}; }
        var msg = JSON.stringify(__assign({ action: "game_user_token" }, data));
        // Debug.trace("tokenChange msg:");
        // Debug.trace(msg);
        window.top.postMessage(msg, "*");
    };
    PostMHelp.jumpToGame = function (data) {
        if (data === void 0) { data = {}; }
        //需要关闭声音
        try {
            lamain.onGamePause();
        }
        catch (e) { }
        //
        var msg = JSON.stringify(__assign({ action: "game_open_game" }, data));
        // Debug.trace("jumpToGame msg:");
        // Debug.trace(msg);
        window.top.postMessage(msg, "*");
        if (AppData.IS_NATIVE_APP) {
            window.top.postMessage(JSON.stringify(__assign({ action: "JumpGame" }, data)), "*");
        }
    };
    PostMHelp.jumpToUrl = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "JumpUrl" }, data)), "*");
    };
    PostMHelp.goBack = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "game_back" }, data)), "*");
    };
    //充值
    PostMHelp.game_recharge = function (data) {
        if (data === void 0) { data = {}; }
        //需要关闭声音
        // try{
        //       lamain.onGamePause();
        // }catch(e){}
        window.top.postMessage(JSON.stringify(__assign({ action: "game_recharge" }, data)), "*");
    };
    //提款
    PostMHelp.game_redraw = function (data) {
        //需要关闭声音
        // try{
        //       lamain.onGamePause();
        // }catch(e){}
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "game_redraw" }, data)), "*");
    };
    //打开个人信息
    PostMHelp.game_account = function (data) {
        if (data === void 0) { data = {}; }
        //需要关闭声音
        // try{
        //       lamain.onGamePause();
        // }catch(e){}
        window.top.postMessage(JSON.stringify(__assign({ action: "game_account" }, data)), "*");
    };
    //打开客服
    PostMHelp.game_custom = function (data) {
        if (data === void 0) { data = {}; }
        //需要关闭声音
        // try{
        //       lamain.onGamePause();
        // }catch(e){}
        window.top.postMessage(JSON.stringify(__assign({ action: "game_custom" }, data)), "*");
    };
    //代理大厅 所有app请求
    PostMHelp.game_Http = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "http" }, data)), "*");
    };
    //调试信息
    PostMHelp.debugInfo = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "debugInfo" }, data)), "*");
    };
    //调试信息
    PostMHelp.game_share = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "game_share" }, data)), "*");
    };
    return PostMHelp;
}());
//# sourceMappingURL=PostMHelp.js.map