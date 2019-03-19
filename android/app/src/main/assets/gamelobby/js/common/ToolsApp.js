var ToolsApp = /** @class */ (function () {
    function ToolsApp() {
    }
    ToolsApp.initAppData = function () {
        var appData = window["appData"];
        if (appData) {
            window["bDebugPlatform"] = "native";
            AppData.IS_NATIVE_APP = true;
            AppData.NATIVE_DATA = appData;
            AppData.isAndroidHack = appData.isAndroidHack;
            if ("" + appData.clientId == "5") {
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