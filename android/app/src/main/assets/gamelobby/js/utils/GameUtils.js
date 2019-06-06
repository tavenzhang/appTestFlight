/*
* name;
*/
var GameUtils = /** @class */ (function () {
    function GameUtils() {
    }
    Object.defineProperty(GameUtils, "posOffset", {
        /**
         * 获取位置偏移量
         */
        get: function () {
            var width = 0;
            //获得屏幕的长宽比
            var bi = Laya.stage.width / Laya.stage.height;
            if (bi < 1.777778) {
                width = this.minGap;
            }
            else if (bi > 2.165333) {
                width = this.maxGap;
            }
            else {
                width = (bi - 1.777778) * (this.maxGap - this.minGap) / (2.165333 - 1.777778) + this.minGap;
            }
            return width;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取不同手机端分辨率的位置偏移量(后续将废弃posOffset)
     * @param min
     * @param max
     */
    GameUtils.getScreencOffset = function (min, max) {
        var width = 0;
        //获得屏幕的长宽比
        var scl = Laya.stage.width / Laya.stage.height;
        var minScl = 1.778666;
        var maxScl = 2.165333;
        if (scl <= minScl) {
            width = min;
        }
        else if (scl >= maxScl) {
            width = max;
        }
        else {
            width = (scl - minScl) * (max - min) / (maxScl - minScl) + min;
        }
        return width;
    };
    /**
     * 限制num的取值区间
     * @param cur
     * @param min
     * @param max
     */
    GameUtils.borderValue = function (cur, min, max) {
        if (cur > max)
            cur = max;
        else if (cur < min)
            cur = min;
        return cur;
    };
    Object.defineProperty(GameUtils, "isNativeApp", {
        /**
         * 判断是否运行在nativeApp
         */
        get: function () {
            return AppData.IS_NATIVE_APP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameUtils, "deviceToken", {
        /**
         * 获取设备号
         */
        get: function () {
            var uid = MyUid.getUid();
            return this.isNativeApp ? (AppData.NATIVE_DATA.deviceToken || uid) : uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameUtils, "appVer", {
        /**
         * 获取app版本号
         */
        get: function () {
            return "App " + AppData.NATIVE_DATA.appVersion;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 检查字符串是否为空
     * @param str
     * @param hint
     */
    GameUtils.checkStr = function (str, hint) {
        if (hint === void 0) { hint = null; }
        if (!str || str == "") {
            if (hint)
                Toast.showToast(hint);
            return false;
        }
        return true;
    };
    /**
     * 显示或者隐藏密码
     */
    GameUtils.onShowPwd = function (pwd) {
        switch (pwd.type) {
            case 'text':
                pwd.type = 'password';
                break;
            case 'password':
                pwd.type = 'text';
                break;
        }
        pwd.focus = true;
    };
    //最小和最大间隔(用于需要全屏适配的ui)
    GameUtils.minGap = 28;
    GameUtils.maxGap = 78; //安全边距
    return GameUtils;
}());
var InnerJumpUtil = /** @class */ (function () {
    function InnerJumpUtil() {
    }
    /**
     * 游戏内部跳转
     * @param cmd
     */
    InnerJumpUtil.doJump = function (cmd) {
        if (cmd == undefined)
            return;
        switch (cmd) {
            case InnerJumpCmd.activityCenter: {
                view.dlg.NoticeDlg.show();
                break;
            }
            case InnerJumpCmd.agentCenter: {
                view.dlg.AgentDlg.show("home");
                break;
            }
            case InnerJumpCmd.email: {
                view.dlg.MailboxDlg.show();
                break;
            }
            case InnerJumpCmd.personCenter: {
                view.dlg.FullMyCenterDlg.show();
                break;
            }
            case InnerJumpCmd.recharge: {
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_recharge, "recharge");
                break;
            }
            case InnerJumpCmd.service: {
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "custom");
                break;
            }
        }
    };
    return InnerJumpUtil;
}());
//# sourceMappingURL=GameUtils.js.map