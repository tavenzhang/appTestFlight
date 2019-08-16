var Debug = /** @class */ (function () {
    function Debug() {
    }
    Object.defineProperty(Debug, "httpDebug", {
        get: function () {
            return this._httDebug;
        },
        set: function (value) {
            this._httDebug = value;
            if (value && !window["openDebug"]) {
                window["initVconsole"]();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Debug, "openDebug", {
        /**是否开启了日志功能 */
        get: function () {
            return window["openDebug"] || this._httDebug;
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
     * 普通输出
     * @param mess
     * @param parms
     */
    Debug.log = function (mess) {
        var parms = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parms[_i - 1] = arguments[_i];
        }
        if (!this.openDebug && GameUtils.isNativeApp) {
            return;
        }
        console.log(mess, parms);
    };
    /**
     * 异常打印
     * @param mess
     * @param parms
     */
    Debug.error = function (mess) {
        var parms = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parms[_i - 1] = arguments[_i];
        }
        if (!this.openDebug && GameUtils.isNativeApp) {
            return;
        }
        console.error(mess, parms);
    };
    Debug.bDebug = window["bDebug"];
    Debug.bDebugPlatform = window["bDebugPlatform"];
    Debug._httDebug = false;
    return Debug;
}());
//# sourceMappingURL=Debug.js.map