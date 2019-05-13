/**
 * 事件管理器
 * 用于添加触摸缩放按钮效果和全局事件管理
 */
var EventManager = /** @class */ (function () {
    function EventManager() {
        this.pool = new Laya.Dictionary();
        this.downPos = new Laya.Point();
    }
    Object.defineProperty(EventManager, "inst", {
        get: function () {
            if (!EventManager._inst) {
                EventManager._inst = new EventManager();
            }
            return EventManager._inst;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 派发全局事件
     * @param type
     * @param data
     */
    EventManager.dispath = function (type, data) {
        this.eventer.event(type, [data]);
    };
    /**
     * 注册全局事件
     * @param type
     * @param caller
     * @param callback
     */
    EventManager.register = function (type, caller, callback) {
        this.eventer.on(type, caller, callback);
    };
    /**
     * 删除全局事件
     * @param type
     * @param caller
     * @param callback
     */
    EventManager.removeEvent = function (type, caller, callback) {
        if (!caller)
            return;
        this.eventer.off(type, caller, callback);
    };
    //------------------------
    /**
     * 添加带触摸缩放效果的点击事件
     * @param target
     * @param thisObject
     * @param listener
     * @param scale
     */
    EventManager.addTouchScaleListener = function (target, thisobj, listener, params, scale) {
        if (params === void 0) { params = null; }
        if (scale === void 0) { scale = 1.05; }
        EventManager.inst.addScaleListener(target, thisobj, listener, params, scale);
    };
    /**
     * 删除按钮事件
     * @param target
     */
    EventManager.removeBtnEvent = function (target) {
        EventManager.inst.removeEvent(target);
    };
    /**
     * 删除thisobj关联的所以按钮事件
     * @param thisobj
     */
    EventManager.removeAllEvents = function (thisobj) {
        EventManager.inst.removeAllEvents(thisobj);
    };
    EventManager.prototype.addScaleListener = function (target, thisobj, listener, params, scale) {
        if (params === void 0) { params = null; }
        if (scale === void 0) { scale = 1.05; }
        if (!target)
            return;
        target.on(Laya.Event.MOUSE_DOWN, this, this.onScaleTouch);
        target.on(Laya.Event.MOUSE_OUT, this, this.onScaleTouch);
        target.on(Laya.Event.MOUSE_UP, this, this.onScaleTouch);
        var arr = this.pool.get(thisobj);
        if (!arr)
            arr = [];
        if (arr.indexOf(target) == -1)
            arr.push(target);
        this.pool.set(target, new CustomObj(target, listener, thisobj, params, scale));
        this.pool.set(thisobj, arr);
    };
    EventManager.prototype.removeEvent = function (target) {
        if (!target)
            return;
        var obj = this.pool.get(target);
        if (obj) {
            var arr = this.pool.get(obj.thisobj);
            if (arr && arr.indexOf(target) != -1) {
                var id = arr.indexOf(target);
                arr.splice(id, 1);
                if (arr.length == 0) {
                    this.pool.remove(obj.thisobj);
                    arr = null;
                }
            }
            target.off(Laya.Event.MOUSE_DOWN, this, this.onScaleTouch);
            target.off(Laya.Event.MOUSE_OUT, this, this.onScaleTouch);
            target.off(Laya.Event.MOUSE_UP, this, this.onScaleTouch);
            this.pool.remove(obj);
            obj.dispose();
            obj = null;
        }
    };
    EventManager.prototype.removeAllEvents = function (thisobj) {
        var arr = this.pool.get(thisobj);
        if (arr) {
            for (var i = 0; i < arr.length; i++) {
                this.removeEvent(arr[i]);
                i--;
            }
        }
    };
    EventManager.prototype.onScaleTouch = function (e) {
        var btn = e.currentTarget;
        var obj = this.pool.get(btn);
        if (!obj)
            return;
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN: {
                obj.isTapBegin = true;
                this.downPos.setTo(e.stageX, e.stageY);
                var scl = obj.sclNum;
                Laya.Tween.to(btn, { scaleX: scl, scaleY: scl }, 100);
                break;
            }
            case Laya.Event.MOUSE_OUT: {
                Laya.Tween.to(btn, { scaleX: 1, scaleY: 1 }, 100);
                obj.isTapBegin = false;
                break;
            }
            case Laya.Event.MOUSE_UP: {
                Laya.Tween.to(btn, { scaleX: 1, scaleY: 1 }, 100);
                obj.isTapBegin = false;
                var dist = this.downPos.distance(e.stageX, e.stageY);
                if (dist < 20) { //触发点击事件
                    obj.callback(e);
                }
                break;
            }
        }
    };
    /**
     * 全局事件派发器
     */
    EventManager.eventer = new Laya.EventDispatcher();
    /**
     * 防止按钮重复点击的时间间隔
     */
    EventManager.delayClickTime = 500;
    return EventManager;
}());
var CustomObj = /** @class */ (function () {
    function CustomObj(target, listener, thisobj, argObject, sclNum) {
        this.isTapBegin = false;
        this.target = null;
        this.listener = null;
        this.thisobj = null;
        this.argObject = null;
        this.isclick = true;
        this.target = target;
        this.listener = listener;
        this.sclNum = sclNum;
        this.thisobj = thisobj;
        this.argObject = argObject;
    }
    CustomObj.prototype.callback = function (evt) {
        if (!this.isclick)
            return;
        if (this.thisobj && this.listener) {
            this.listener.call(this.thisobj, evt, this.argObject);
            this.isclick = false;
            Laya.timer.once(EventManager.delayClickTime, this, this.resetState);
        }
    };
    CustomObj.prototype.resetState = function () {
        this.isclick = true;
    };
    CustomObj.prototype.dispose = function () {
        Laya.timer.clear(this, this.resetState);
        this.target = null;
        this.listener = null;
        this.thisobj = null;
        this.argObject = null;
    };
    return CustomObj;
}());
var EventType = /** @class */ (function () {
    function EventType() {
    }
    EventType.RESIZE = "resize";
    EventType.FLUSH_USERINFO = "flushUserInfo";
    EventType.FLUSH_HEADICON = "flushHeadIcon";
    /**
     * 失去焦点通知
     * 收到此通知后要将输入文本的焦点设为false,以解决ios系统点击键盘的Done按钮后界面收不回来
     */
    EventType.BLUR_NATIVE = "blurNative";
    /**
     * 游戏更新初始化
     */
    EventType.GAME_UPDATE_INIT = "gameUpdateInfo";
    /**
     * 游戏更新进度(百分比)
     */
    EventType.GAME_UPDATE_PROGRESS = "gameUpdateProgress";
    //刷新代理按钮的显示
    EventType.FLUSH_AGENCYBTN = "flushAgencyBtn";
    return EventType;
}());
//# sourceMappingURL=EventManager.js.map