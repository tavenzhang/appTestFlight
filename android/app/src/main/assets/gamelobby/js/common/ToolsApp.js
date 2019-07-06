var ToolsApp = /** @class */ (function () {
    function ToolsApp() {
    }
    ToolsApp.initAppData = function () {
        var appData = window["appData"];
        if (appData) {
            AppData.IS_NATIVE_APP = true;
            AppData.NATIVE_DATA = appData;
            AppData.isAndroidHack = appData.isAndroidHack;
            Debug.bDebug = appData.isDebug;
            if ("" + appData.clientId == "5" || "" + appData.clientId == "31") {
                window["initVconsole"]();
            }
        }
    };
    ToolsApp.getGameJumpUrl = function (host, dir) {
        var a = "";
        if (AppData.IS_NATIVE_APP) {
            a = "/" + dir;
        }
        else {
            a = host + "/" + dir;
        }
        return a;
    };
    return ToolsApp;
}());
//# sourceMappingURL=ToolsApp.js.map