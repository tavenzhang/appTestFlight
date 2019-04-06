var Debug = /** @class */ (function () {
    function Debug() {
    }
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
        // if (!Debug.bDebug) {
        //     return;
        // }
        // if (Debug.bDebugPlatform == "web") {
        //     Debug.traceWeb(ct);
        // }
        // else {
            PostMHelp.Log({ ct: ct, data: data });
       // }
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