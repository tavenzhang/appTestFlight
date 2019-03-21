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
    PostMHelp.Log = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "Log" }, data)), "*");
    };
    PostMHelp.tokenChange = function (data) {
        if (data === void 0) { data = {}; }
        var msg = JSON.stringify(__assign({ action: "game_user_token" }, data));
        window.top.postMessage(msg, "*");
    };
    PostMHelp.startUpdate = function (data) {
        window.top.postMessage(JSON.stringify(__assign({ action: "startUpdate" }, data)), "*");
    };
    PostMHelp.jumpToGame = function (data) {
        if (data === void 0) { data = {}; }
        try {
            lamain.onGamePause();
        }
        catch (e) { }
        var msg = JSON.stringify(__assign({ action: "game_open_game" }, data));
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
    PostMHelp.game_recharge = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "game_recharge" }, data)), "*");
    };
    PostMHelp.game_redraw = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "game_redraw" }, data)), "*");
    };
    PostMHelp.game_account = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "game_account" }, data)), "*");
    };
    PostMHelp.game_custom = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "game_custom" }, data)), "*");
    };
    PostMHelp.game_Http = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "http" }, data)), "*");
    };
    PostMHelp.debugInfo = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "debugInfo" }, data)), "*");
    };
    PostMHelp.game_share = function (data) {
        if (data === void 0) { data = {}; }
        window.top.postMessage(JSON.stringify(__assign({ action: "game_share" }, data)), "*");
    };
    return PostMHelp;
}());
//# sourceMappingURL=PostMHelp.js.map