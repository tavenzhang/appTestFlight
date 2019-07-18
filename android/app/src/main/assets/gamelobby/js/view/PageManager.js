var Handler = Laya.Handler;
/**
 * 页面管理
 */
var PageManager = /** @class */ (function () {
    function PageManager() {
    }
    PageManager.initDlgMap = function () {
        var _a;
        if (this.dlgMap)
            return;
        /**
         * 弹窗配置：类+依赖资源(不包括公共资源)
         * 注意：通过配置的弹窗类都要设置show静态方法入口
         */
        this.dlgMap = (_a = {},
            _a[DlgCmd.activityCenter] = [
                view.dlg.NoticeDlg,
                [
                    "res/atlas/ui/panel_notice.atlas",
                    "res/atlas/ui/panel_notice/message.atlas",
                    "res/atlas/ui/panel_notice/roullette.atlas",
                    "res/atlas/ui/panel_notice/share.atlas",
                    "res/atlas/ui/panel_notice/roullette/spinner.atlas"
                ]
            ],
            _a[DlgCmd.agentCenter] = [
                view.dlg.AgentCenterDlg,
                [
                    "./res/atlas/ui/agent.atlas",
                    "./res/atlas/ui/bitFont/agentFont.atlas"
                ]
            ],
            _a[DlgCmd.email] = [
                view.dlg.MailboxDlg,
                [
                    "./res/atlas/ui/mailbox.atlas",
                    "./res/atlas/ui/bitFont/mailFont.atlas"
                ]
            ],
            _a[DlgCmd.personCenter] = [view.dlg.FullMyCenterDlg, ["./res/atlas/ui/fullMyCenter.atlas"]],
            _a[DlgCmd.bindPhoneAct] = [view.dlg.bindPhone.BindPhoneActiveDlg, ["./res/atlas/ui/bindPhone.atlas"]],
            _a[DlgCmd.bindPhone] = [view.dlg.center.BindPhoneDlg, ["./res/atlas/ui/fullMyCenter.atlas"]],
            _a);
    };
    /**
     * 显示一个页面
     * @param res 资源
     * @param classType 类型
     */
    PageManager.showPage = function (res, classType, cmd) {
        if (cmd === void 0) { cmd = null; }
        var that = this;
        function show() {
            that.destoryCurrentView();
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
    PageManager.destoryCurrentView = function () {
        //销毁上一个页面
        this.current && this.current.removeSelf();
        this.current && this.current.destroy(true);
        this.current = null;
    };
    /**
     * todo:动态显示弹窗(DlgLoader)
     * 通过命令动态显示弹窗
     * @param cmd
     * @param params
     */
    PageManager.showDlg = function (cmd, params) {
        var arr = this.dlgMap[cmd];
        if (arr) {
            this.addDlg(arr[1], arr[0], params);
        }
    };
    /**
     * @param assets 依赖资源列表
     * @param dlgClass 弹窗类
     * @param params 参数
     */
    PageManager.addDlg = function (assets, dlgClass, params) {
        var res = Laya.loader.getRes(assets[0]);
        if (res) {
            dlgClass.show(params);
        }
        else {
            LayaMain.getInstance().showCircleLoading();
            Laya.loader.load(assets, Handler.create(null, function () { return show(); }));
        }
        function show() {
            LayaMain.getInstance().showCircleLoading(false);
            dlgClass.show(params);
        }
    };
    //当前页面
    PageManager.current = null;
    PageManager.dlgMap = null; //弹窗地图
    return PageManager;
}());
//# sourceMappingURL=PageManager.js.map