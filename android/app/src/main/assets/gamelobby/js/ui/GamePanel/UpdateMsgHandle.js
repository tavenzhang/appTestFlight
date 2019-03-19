var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
更新消息处理
*/
var UpdateMsgHandle = /** @class */ (function (_super) {
    __extends(UpdateMsgHandle, _super);
    function UpdateMsgHandle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化消息，哪些游戏需要更新
    UpdateMsgHandle.onInitMsg = function (data) {
        // data = [
        //     {
        //         "gameId":31,
        //         "bupdate":true
        //     },
        //     {
        //         "gameId":30,
        //         "bupdate":true
        //     },
        //     {
        //         "gameId":29,
        //         "bupdate":true
        //     }
        // ];
        //刷新纪录
        UpdateMsgHandle.updateInitMsg = data;
        //刷新
        if (GamePanel.getInstance()) {
            GamePanel.getInstance().onUpdateMsgInit();
        }
    };
    UpdateMsgHandle.clearInfoByAlias = function (alias) {
        // Debug.trace("UpdateMsgHandle.clearInfoByAlias alias:"+alias);
        // Debug.trace(UpdateMsgHandle.updateInitMsg);
        for (var i = 0; i < UpdateMsgHandle.updateInitMsg.length; i++) {
            var obj = UpdateMsgHandle.updateInitMsg[i];
            // Debug.trace(obj);
            if (obj.alias == alias) {
                // Debug.trace("UpdateMsgHandle.clearInfoByAlias alias:"+alias+" i:"+i);
                UpdateMsgHandle.updateInitMsg.splice(i, 1);
                // Debug.trace(UpdateMsgHandle.updateInitMsg);
                return;
            }
        }
    };
    UpdateMsgHandle.onUpdateMsg = function (data) {
        // data = [
        //     {
        //         "gameId":30,
        //         "percent":0.7
        //     }
        // ];
        //刷新
        if (GamePanel.getInstance()) {
            GamePanel.getInstance().onUpdatePercent(data);
        }
    };
    UpdateMsgHandle.updateInitMsg = null; //当前哪些游戏是需要下载或者更新的
    return UpdateMsgHandle;
}(Laya.Sprite));
//# sourceMappingURL=UpdateMsgHandle.js.map