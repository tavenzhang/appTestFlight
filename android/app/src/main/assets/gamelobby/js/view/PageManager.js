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
                    "res/atlas/ui/panel_notice/roullette/activityRoullette.atlas",
                    "res/atlas/ui/panel_notice/roullette/activityRoullette/select_light.atlas"
                ]
            ],
            _a[DlgCmd.noticeCenter] = [
                view.dlg.NoticeDlg,
                [
                    "res/atlas/ui/panel_notice.atlas",
                    "res/atlas/ui/panel_notice/message.atlas",
                    "res/atlas/ui/panel_notice/roullette.atlas",
                    "res/atlas/ui/panel_notice/share.atlas",
                    "res/atlas/ui/panel_notice/roullette/activityRoullette.atlas",
                    "res/atlas/ui/panel_notice/roullette/activityRoullette/select_light.atlas"
                ]
            ],
            _a[DlgCmd.agentCenter] = [
                view.dlg.AgentCenterDlg,
                [
                    "./res/atlas/ui/agent.atlas",
                    "./res/atlas/ui/bitFont/agentFont.atlas",
                    "./res/atlas/ui/agent/qrposter.atlas"
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
            _a[DlgCmd.changePwdDlg] = [view.dlg.QuickSetPassWordDlg, ["./res/atlas/ui/fullMyCenter.atlas"]],
            _a[DlgCmd.accountInfo] = [view.dlg.center.AccountInfoDlg, ["./res/atlas/ui/fullMyCenter.atlas"]],
            _a[DlgCmd.alipayBind] = [view.dlg.center.BindAlipayDlg, ["./res/atlas/ui/fullMyCenter.atlas"]],
            _a[DlgCmd.balance] = [
                view.dlg.BalanceDlg,
                [
                    "./res/atlas/ui/balance.atlas",
                    "./res/atlas/ui/balance/subres.atlas"
                ]
            ],
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
     * 通过命令动态显示弹窗
     * @param cmd
     * @param params
     */
    PageManager.showDlg = function (cmd, params) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var arr = this.dlgMap[cmd];
        if (arr) {
            this.addDlg(arr[1], arr[0], params, args);
        }
    };
    /**
     * @param assets 依赖资源列表
     * @param dlgClass 弹窗类
     * @param params 参数
     */
    PageManager.addDlg = function (assets, dlgClass, params) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var res = Laya.loader.getRes(assets[0]);
        if (res) {
            dlgClass.show(params, args);
        }
        else {
            LayaMain.getInstance().showCircleLoading();
            Laya.loader.load(assets, Handler.create(null, function () { return show(); }));
        }
        function show() {
            LayaMain.getInstance().showCircleLoading(false);
            dlgClass.show(params, args);
        }
    };
    /**
     * 释放弹窗占用内存
     * @param cmd
     */
    PageManager.clearDlgRes = function (cmd) {
        var arr = this.dlgMap[cmd];
        if (arr && arr.length > 1) {
            var res = arr[1];
            res.forEach(function (url) {
                Laya.loader.clearTextureRes(url);
            });
        }
        Laya.loader.clearTextureRes("ui/panel_common/img_com_quanping_di.jpg");
        Laya.loader.clearTextureRes("ui/panel_common/maxdlg.png");
        Laya.loader.clearTextureRes("asset/animation/agent/banner.png");
        Laya.loader.clearTextureRes("asset/animation/agent/btn.png");
    };
    /**
     * 释放大厅界面占用内存
     */
    PageManager.clearLobbyRes = function () {
        this.lobbyRes.forEach(function (url) {
            Laya.loader.clearTextureRes(url);
        });
        //释放活动
        this.clearDlgRes(DlgCmd.activityCenter);
        this.clearDlgRes(DlgCmd.personCenter);
        this.clearDlgRes(DlgCmd.email);
        this.clearDlgRes(DlgCmd.balance);
    };
    /**
     * 释放login界面占用内存
     */
    PageManager.clearLoginRes = function () {
        Laya.loader.clearTextureRes("res/atlas/ui/res_login.atlas");
    };
    //当前页面
    PageManager.current = null;
    PageManager.dlgMap = null; //弹窗地图
    //大厅相关资源(用于释放内存)
    PageManager.lobbyRes = [
        "res/atlas/ui/bitFont/goldFont.atlas",
        "res/atlas/ui/panel_common.atlas",
        "res/atlas/ui/lobby/bottombar.atlas",
        "res/atlas/ui/common.atlas",
        "res/atlas/ui/lobby.atlas",
        "assets/ui/avatorpad/touxiang.atlas",
        "ui/lobby/bg_dating.jpg",
        "asset/animation/coins/money_icon.png",
        "asset/animation/girl/girl.png",
        "asset/animation/loading/xiaoLoding.png",
        "asset/animation/shopicon/shopicon.png"
    ];
    return PageManager;
}());
//# sourceMappingURL=PageManager.js.map