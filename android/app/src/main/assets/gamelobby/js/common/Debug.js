var Debug = /** @class */ (function () {
    function Debug() {
    }
    Debug.trace = function (ct, data) {
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
    //是否在debug模式
    Debug.bDebug = window["bDebug"];
    return Debug;
}());
//# sourceMappingURL=Debug.js.map