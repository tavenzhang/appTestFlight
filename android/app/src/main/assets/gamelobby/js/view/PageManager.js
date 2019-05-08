var Handler = Laya.Handler;
/**
 * 页面管理
 */
var PageManager = /** @class */ (function () {
    function PageManager() {
        ///////////////////////////////////////////////////////////////////////
        //当前页面
        this.current = null;
    }
    PageManager.Get = function () {
        if (!PageManager.manager)
            PageManager.manager = new PageManager();
        return PageManager.manager;
    };
    /**
     * 显示一个页面
     * @param res 资源
     * @param classType 类型
     */
    PageManager.prototype.ShowPage = function (res, classType, cmd) {
        if (cmd === void 0) { cmd = null; }
        var that = this;
        function show() {
            that.DestoryCurrentView();
            //实例化新页面
            that.current = new classType(cmd);
            //装载节点
            Laya.stage.addChild(that.current);
        }
        //预加载，还是直接实例化
        if (res) {
            Laya.loader.load(res, Handler.create(null, function () { return show(); }));
        }
        else {
            show();
        }
    };
    /**
     * 主动销毁当前窗口
     */
    PageManager.prototype.DestoryCurrentView = function () {
        //销毁上一个页面
        this.current && this.current.removeSelf();
        this.current && this.current.destroy(true);
        this.current = null;
    };
    return PageManager;
}());
//# sourceMappingURL=PageManager.js.map