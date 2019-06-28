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
    Object.defineProperty(GameUtils, "isAppSound", {
        /**
         * 判断是否native播放背景音乐
         */
        get: function () {
            return AppData.NATIVE_DATA.isAppSound;
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
    //添加长按事件(用于调试)
    GameUtils.addLongPress = function (obj, caller, callback) {
        var _this = this;
        var downFun = function () {
            obj.on(Laya.Event.MOUSE_UP, _this, upFun);
            obj.on(Laya.Event.MOUSE_OUT, _this, upFun);
            Laya.timer.once(2000, _this, callFun);
        };
        var upFun = function () {
            obj.off(Laya.Event.MOUSE_UP, _this, upFun);
            obj.off(Laya.Event.MOUSE_OUT, _this, upFun);
            Laya.timer.clear(_this, callFun);
        };
        var callFun = function () {
            if (caller && callback) {
                callback.call(caller);
                if (obj)
                    obj.off(Laya.Event.MOUSE_DOWN, _this, downFun);
            }
        };
        obj.on(Laya.Event.MOUSE_DOWN, this, downFun);
    };
    /**
     * 保存图片
     * @param sp
     * @param fileName
     * @param type
     */
    GameUtils.saveImage = function (sp, fileName, type) {
        if (fileName === void 0) { fileName = null; }
        if (type === void 0) { type = "png"; }
        var iw = 60;
        var box = new Laya.Sprite();
        box.graphics.drawRect(0, 0, sp.width + iw, sp.height + iw, "#ffffff");
        box.size(sp.width + iw, sp.height + iw);
        box.addChild(sp);
        sp.pos(box.width - sp.width >> 1, box.height - sp.height >> 1);
        var htmlC = box.drawToCanvas(box.width, box.height, 0, 0);
        var cv = htmlC.getCanvas();
        var base64 = cv.toDataURL("image/" + type);
        PostMHelp.game_common({ do: "saveImage", param: base64 });
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
            case DlgCmd.activityCenter: {
                view.dlg.NoticeDlg.show(DlgCmd.activityCenter);
                break;
            }
            case DlgCmd.noticeCenter: {
                view.dlg.NoticeDlg.show(DlgCmd.noticeCenter);
                break;
            }
            case DlgCmd.agentCenter: {
                view.dlg.AgentCenterDlg.show();
                break;
            }
            case DlgCmd.email: {
                view.dlg.MailboxDlg.show();
                break;
            }
            case DlgCmd.personCenter: {
                view.dlg.FullMyCenterDlg.show();
                break;
            }
            case DlgCmd.recharge: {
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_recharge, "recharge");
                break;
            }
            case DlgCmd.service: {
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "custom");
                break;
            }
            case DlgCmd.withdraw: {
                if (Common.userInfo_current && Common.userInfo_current.needResetPwd) {
                    view.dlg.QuickSetPassWordDlg.show();
                }
                else {
                    Tools.jump2module(ConfObjRead.getConfUrl().url.g_redraw, "redraw");
                }
                break;
            }
        }
    };
    return InnerJumpUtil;
}());
//# sourceMappingURL=GameUtils.js.map