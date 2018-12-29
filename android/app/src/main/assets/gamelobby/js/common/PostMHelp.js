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
    PostMHelp.jupmToGame = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "JumpGame" }, data)), "*");
    };
    PostMHelp.jupmToUrl = function (data) {
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
        window.top.postMessage(JSON.stringify(__assign({ action: "game_recharge" }, data)), "*");
    };
    //提款
    PostMHelp.game_redraw = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "game_redraw" }, data)), "*");
    };
    //打开个人信息
    PostMHelp.game_account = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "game_account" }, data)), "*");
    };
    //打开客服
    PostMHelp.game_custom = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "game_custom" }, data)), "*");
    };
    return PostMHelp;
}());
//# sourceMappingURL=PostMHelp.js.map