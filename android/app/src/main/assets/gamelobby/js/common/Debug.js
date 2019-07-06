var Debug = /** @class */ (function () {
    function Debug() {
    }
    Object.defineProperty(Debug, "openDebug", {
        /**是否开启了日志功能 */
        get: function () {
            return window["openDebug"];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 用于调试一些容易出错的信息
     * @param mess
     * @param parms
     */
    Debug.output = function (mess) {
        var parms = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parms[_i - 1] = arguments[_i];
        }
        if (!this.openDebug)
            return;
        console.error(mess, parms);
    };
    /**
     * 用于普通信息调试
     * @param mess
     * @param parms
     */
    Debug.outputLog = function (mess) {
        var parms = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parms[_i - 1] = arguments[_i];
        }
        if (!this.openDebug)
            return;
        console.log(mess, parms);
    };
    Debug.traceObj = function (ct, data) {
        if (data === void 0) { data = {}; }
        if (!Debug.bDebug) {
            return;
        }
        console.log(ct);
        PostMHelp.Log({ ct: ct, data: data });
    };
    Debug.error = function (ct) {
        if (!Debug.bDebug) {
            return;
        }
        console.error(ct);
    };
    Debug.trace = function (ct, data) {
        if (data === void 0) { data = {}; }
        if (!Debug.bDebug) {
            return;
        }
        if (Debug.bDebugPlatform == "web") {
            Debug.traceWeb(ct);
        }
        if (AppData.IS_NATIVE_APP) {
            PostMHelp.Log({ ct: ct, data: data });
        }
    };
    Debug.traceWeb = function (ct, data) {
        if (data === void 0) { data = {}; }
        if (!Debug.bDebug) {
            return;
        }
        console.log(ct);
    };
    Debug.traceX = function (ct, data) {
        if (data === void 0) { data = {}; }
        if (!Debug.bDebug) {
            return;
        }
        data = data ? data : {};
        console.log(ct, data);
        PostMHelp.Log({ ct: ct, data: data });
    };
    Debug.traceAny = function (ct, data) {
        if (data === void 0) { data = {}; }
        if (!Debug.bDebug) {
            return;
        }
        // console.log(ct.constructor.name+":");//Object
        console.log(ct);
        PostMHelp.Log({ ct: ct, data: data });
        // Debug.callWithVariableName(Debug.fn);
    };
    Debug.traceMsg = function (ct, data) {
        if (!Debug.bDebug) {
            return;
        }
        console.log(ct);
        PostMHelp.Log({ ct: ct, data: data });
    };
    Debug.bDebug = window["bDebug"];
    Debug.bDebugPlatform = window["bDebugPlatform"];
    return Debug;
}());
//# sourceMappingURL=Debug.js.map