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
var LoginType;
(function (LoginType) {
    LoginType[LoginType["Fast"] = 0] = "Fast";
    LoginType[LoginType["WeChat"] = 1] = "WeChat";
    LoginType[LoginType["Account"] = 2] = "Account";
    LoginType[LoginType["Phone"] = 3] = "Phone";
})(LoginType || (LoginType = {}));
/**
 * 登陆ui,包含loading
 */
var PageLogin = /** @class */ (function (_super) {
    __extends(PageLogin, _super);
    function PageLogin(cmd) {
        var _this = _super.call(this) || this;
        _this.pb_loading.value = 0;
        //隐藏按钮
        _this.btn_account.visible = false;
        _this.btn_fast.visible = false;
        _this.btn_phone.visible = false;
        _this.btn_webchat.visible = false;
        _this.btn_service.visible = false;
        var isload = cmd == null ? false : cmd == 'isloaded';
        //开始加载数据
        _this.startLoading(isload);
        return _this;
    }
    /**
     * 开始加载数据
     */
    PageLogin.prototype.startLoading = function (isload) {
        this.isload = isload;
        var conf = Laya.loader.getRes("./assets/ui/loading/conf/assets_lobby.json");
        //过滤数据
        var assets = [];
        var srcs = conf.src;
        for (var i = 0; i < srcs.length; i++) {
            var urls = Tools.getSrc(srcs[i].url);
            var types = Tools.getLoadingType(srcs[i].type);
            var v = { url: urls, type: types };
            assets.push(v);
        }
        if (isload) {
            this.LoadFinish();
        }
        else {
            //加载数据
            Laya.loader.load(assets, Laya.Handler.create(this, this.LoadFinish), Laya.Handler.create(this, this.Loading, null, false));
        }
    };
    /**
     * 加载中
     */
    PageLogin.prototype.Loading = function (progress) {
        this.pb_loading.value = progress;
        this.lb_text.text = "正在加载资源" + Math.floor((progress * 100)) + "%";
    };
    /**
     * 加载结束
     */
    PageLogin.prototype.LoadFinish = function () {
        //登陆流程
        this.oldProcess();
        //显示其他登陆按钮
        //this.OnShowOtherLogin();
    };
    /**
     * 老的流程，这里是复制过来的代码
     */
    PageLogin.prototype.oldProcess = function () {
        var _this = this;
        Common.confObj = Laya.loader.getRes("./assets/conf/common/config.json");
        //测试
        //Common.confObj.testLogin = true;
        Common.getNormalFontByDevice();
        var temp_token = SaveManager.getObj().get(SaveManager.KEY_TOKEN, "");
        var status = Tools.getQueryVariable("status");
        var urlToken = Tools.getQueryVariable("token");
        if (!AppData.IS_NATIVE_APP) {
            if (urlToken != undefined && urlToken.length != 0) {
                temp_token = urlToken;
            }
            Common.clientId = Tools.getQueryVariable("clientId");
            if (!Common.clientId)
                Common.clientId = ConfObjRead.getConfUrl().cmd.testClientId;
        }
        else {
            var urlJson = AppData.NATIVE_DATA.urlJSON;
            var localUrlJson = ConfObjRead.getConfUrl();
            Common.clientId = AppData.NATIVE_DATA.clientId;
            if (urlJson) {
                for (var key in urlJson) {
                    if (localUrlJson[key]) {
                        for (var subKey in urlJson[key]) {
                            if (localUrlJson[key][subKey]) {
                                localUrlJson[key][subKey] = urlJson[key][subKey];
                            }
                        }
                    }
                }
            }
        }
        LobbyScene.initBgMusic();
        if (this.isload) {
            this.OnShowOtherLogin();
            return;
        }
        if (temp_token.length <= 0 || status == '1' || Common.confObj.testLogin) {
            this.OnShowOtherLogin();
        }
        else {
            var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.userinfobalance + "?access_token=" + temp_token;
            NetManager.getObj().HttpConnect(url, this, function (s, stat, hr) {
                if (stat == "complete") {
                    Common.userInfo = s;
                    Common.access_token = temp_token;
                    SaveManager.getObj().save(SaveManager.KEY_TOKEN, temp_token);
                    if (!Common.clientId) {
                        Common.clientId = Common.userInfo.userBalance.clientId;
                    }
                    PageManager.Get().DestoryCurrentView();
                    LayaMain.getInstance().initLobby();
                }
                else {
                    _this.OnShowOtherLogin();
                }
            });
        }
    };
    /**
     * 显示其他登陆按钮
     */
    PageLogin.prototype.OnShowOtherLogin = function () {
        var _this = this;
        //显示客服图标
        this.btn_service.visible = true;
        //客服
        EventManager.addTouchScaleListener(this.btn_service, this, function () {
            SoundPlayer.clickSound();
            Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "custom");
        });
        //隐藏loading
        this.pb_loading.visible = false;
        this.lb_text.visible = false;
        //充值业主图标
        this.sp_log.width = 800;
        this.sp_log.height = 280;
        this.sp_log.top = 199;
        this.sp_log.left = 486;
        //临时代码，现在只有2种登陆方式
        this.btn_fast.centerX = -250;
        this.btn_account.centerX = 250;
        //显示4个按钮
        this.btn_account.visible = true;
        this.btn_fast.visible = true;
        // this.btn_phone.visible = true;
        // this.btn_webchat.visible = true;
        this.show_btns.play(0, false);
        //暂时使用绿色的图
        //this.btn_fast.skin = 'ui/res_login/btn_dl_kuaijie02.png';
        //绑定4个按钮事件
        // this.btn_account.once(Laya.Event.CLICK, this, this.SelectLoginType, [LoginType.Account]);
        // this.btn_fast.once(Laya.Event.CLICK,    this, this.SelectLoginType, [LoginType.Fast]);
        //this.btn_phone.once(Laya.Event.CLICK,   this, this.SelectLoginType, [LoginType.Phone]);
        //this.btn_webchat.once(Laya.Event.CLICK, this, this.SelectLoginType, [LoginType.WeChat]);
        EventManager.addTouchScaleListener(this.btn_account, this, function () {
            SoundPlayer.clickSound();
            _this.SelectLoginType(LoginType.Account);
        });
        EventManager.addTouchScaleListener(this.btn_fast, this, function () {
            SoundPlayer.clickSound();
            _this.SelectLoginType(LoginType.Fast);
        });
        //隐藏登陆面板
        this.panel.visible = false;
        //隐藏其他登陆按钮
        this.btn_other_login.visible = false;
        //提前刷一个验证码
        //this.askCode();
    };
    /**
     * 选择登陆模式
     */
    PageLogin.prototype.SelectLoginType = function (type) {
        var _this = this;
        //充值业主图标
        this.sp_log.width = 289;
        this.sp_log.height = 102;
        this.sp_log.top = 9;
        this.sp_log.left = 44;
        //显示其他登陆
        this.btn_other_login.visible = true;
        //this.btn_other_login.once(Laya.Event.CLICK, this, this.OnShowOtherLogin);
        //显示其他登陆
        EventManager.addTouchScaleListener(this.btn_other_login, this, function () {
            SoundPlayer.clickSound();
            _this.OnShowOtherLogin();
        });
        //隐藏登陆按钮
        this.btn_account.visible = false;
        this.btn_fast.visible = false;
        this.btn_phone.visible = false;
        this.btn_webchat.visible = false;
        //隐藏全部登陆的UI
        this.HideAllLoginUI();
        //显示不同的登陆UI
        switch (type) {
            case LoginType.Fast:
                this.ShowFastLoginPanel();
                break;
            case LoginType.Account:
                this.ShowAccountLoginPanel();
                break;
            case LoginType.WeChat:
                this.ShowWeChatLoginPanel();
                break;
            case LoginType.Phone:
                this.ShowPhoneLoginPanel();
                break;
            default: break;
        }
        //显示登陆面板
        this.panel.visible = true;
    };
    ////////////////////////////////////////////////////////////////////
    /**
     * 隐藏全部登陆面板的UI
     */
    PageLogin.prototype.HideAllLoginUI = function () {
        var all = [
            this.sp_remark,
            this.btn_save_pic,
            this.btn_login,
            this.btn_register,
            this.btn_forget,
            this.btn_show_pwd,
            this.btn_ok,
            this.btn_back,
            this.btn_phone_code,
            this.in_account,
            this.in_code,
            this.in_pwd,
            this.in_phone,
            this.sp_img_code,
            this.sp_code,
            this.sp_account,
            this.sp_pwd,
            this.sp_phone,
            this.sp_input_password,
            this.in_put_password,
            this.sp_check_password,
            this.in_check_password,
            this.btn_show_pwd_1,
        ];
        all.forEach(function (sp) { return sp.visible = false; });
    };
    PageLogin.prototype.askCode = function () {
        this.rand = Math.random();
        var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.yanzhengma + "" + this.rand;
        this.sp_img_code.skin = url;
    };
    /**
     * 快速登陆
     */
    PageLogin.prototype.ShowFastLoginPanel = function () {
        var _this = this;
        //重置布局
        //标题
        this.sp_title.skin = "ui/res_login/img_dl_biaotou03.png";
        //账号文字
        this.sp_account.top = 137;
        this.sp_account.left = 95;
        //账号输入框
        this.in_account.top = 129;
        this.in_account.left = 229;
        this.in_account.editable = false;
        this.in_account.mouseEnabled = false;
        //验证码文字
        this.sp_code.left = 95;
        this.sp_code.top = 222;
        //验证码输入
        this.in_code.top = 213;
        this.in_code.left = 229;
        this.in_code.width = 410;
        //验证码
        this.sp_img_code.top = 224;
        this.sp_img_code.left = 450;
        //登陆按钮位置
        this.btn_login.bottom = -124;
        this.btn_login.centerX = 0;
        //显示快速使用的UI
        var all = [
            this.sp_account,
            this.in_account,
            this.sp_code,
            this.in_code,
            this.sp_img_code,
            this.sp_remark,
            //this.btn_save_pic,
            this.btn_login,
        ];
        all.forEach(function (sp) { return sp.visible = true; });
        var that = this;
        //开始监听
        //this.btn_login.on(Laya.Event.CLICK,    this, this.OnFastLogin);
        //this.btn_save_pic.on(Laya.Event.CLICK, this, this.OnSavePic);
        EventManager.addTouchScaleListener(this.btn_login, this, function () {
            SoundPlayer.clickSound();
            _this.OnFastLogin();
        });
        //验证码处理 以后每次点击请求
        this.sp_img_code.on(Laya.Event.CLICK, this, function () { return _this.askCode(); });
        // EventManager.addTouchScaleListener(this.sp_img_code, this, () => {
        //     SoundPlayer.clickSound();
        //     this.OnFastLogin();
        // });
        //请求第一次
        this.askCode();
        //填充数据
        this.in_account.text = SaveManager.getObj().get(SaveManager.KEY_QK_USERNAME, "");
        this.password = SaveManager.getObj().get(SaveManager.KEY_QK_PASSWORD, "");
        this.in_code.text = '';
        //如果本地没有保存快速登陆账号的话, 去服务端拉取
        if (this.in_account.text.length <= 0) {
            var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
            var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.prequicklogin;
            LayaMain.getInstance().showCircleLoading(true);
            NetManager.getObj().HttpConnect(url, this, function (s, state, hr) {
                LayaMain.getInstance().showCircleLoading(false);
                if (state == "complete") {
                    var jobj;
                    try {
                        jobj = JSON.parse(s);
                    }
                    catch (e) {
                        Debug.trace(e);
                        jobj = s;
                    }
                    that.in_account.text = jobj.username;
                    that.password = jobj.password;
                }
                else {
                    var err = hr.http.response;
                    if (err) {
                        var obj = JSON.parse(err);
                        Toast.showToast(obj.message);
                    }
                    else {
                        Toast.showToast(Tools.getStringByKey(ConfObjRead.getConfCommon().unknow_err)); //"未知错误，请联系管理员");
                    }
                }
            }, header, null, "POST", "JSON");
        }
        // this.quick_pwd = SaveManager.getObj().get(SaveManager.KEY_QK_PASSWORD,"");
    };
    /**
     * 账号登陆
     */
    PageLogin.prototype.ShowAccountLoginPanel = function () {
        var _this = this;
        //重置布局
        //标题
        this.sp_title.skin = "ui/res_login/img_dl_biaotou01.png";
        //登陆按钮位置
        this.btn_login.bottom = -124;
        this.btn_login.centerX = 205;
        //注册按钮位置
        this.btn_register.bottom = -124;
        this.btn_register.centerX = -205;
        //账号文字
        this.sp_account.top = 119;
        this.sp_account.left = 95;
        //账号输入框
        this.in_account.top = 111;
        this.in_account.left = 229;
        this.in_account.editable = true;
        this.in_account.mouseEnabled = true;
        //密码文字
        this.sp_pwd.top = 188;
        this.sp_pwd.left = 95;
        //密码输入框
        this.in_pwd.top = 180;
        this.in_pwd.left = 229;
        //验证码文字
        this.sp_code.left = 95;
        this.sp_code.top = 257;
        //验证码输入
        this.in_code.top = 248;
        this.in_code.left = 229;
        this.in_code.width = 410;
        //验证码
        this.sp_img_code.top = 260;
        this.sp_img_code.left = 450;
        this.btn_show_pwd.skin = 'ui/res_login/btn_dl_yanjing01.png';
        //显示快速使用的UI
        var all = [
            this.sp_account,
            this.in_account,
            this.btn_login,
            this.btn_register,
            this.sp_code,
            this.in_code,
            this.sp_img_code,
            this.sp_pwd,
            this.in_pwd,
            this.btn_show_pwd,
        ];
        all.forEach(function (sp) { return sp.visible = true; });
        //监听按钮事件
        //this.btn_show_pwd.on(Laya.Event.CLICK,      this, this.OnShowPwd, [this.btn_show_pwd, this.in_pwd]);
        EventManager.addTouchScaleListener(this.btn_show_pwd, this, function () {
            SoundPlayer.clickSound();
            _this.OnShowPwd(_this.btn_show_pwd, _this.in_pwd);
        });
        //this.btn_forget.once(Laya.Event.CLICK,      this, this.OnForgetPwd);
        //this.btn_login.on(Laya.Event.CLICK,         this, this.OnAccountLogin);
        EventManager.addTouchScaleListener(this.btn_login, this, function () {
            SoundPlayer.clickSound();
            _this.OnAccountLogin();
        });
        //this.btn_register.on(Laya.Event.CLICK,    this, this.OnRegister);
        EventManager.addTouchScaleListener(this.btn_register, this, function () {
            SoundPlayer.clickSound();
            _this.OnRegister();
        });
        //填充数据
        this.in_code.text = '';
        this.in_account.text = '';
        this.in_pwd.text = '';
        //验证码处理 以后每次点击请求
        this.sp_img_code.on(Laya.Event.CLICK, this, function () { return _this.askCode(); });
        // EventManager.addTouchScaleListener(this.btn_register, this, () => {
        //     SoundPlayer.clickSound();
        //     this.OnRegister();
        // });
        //请求第一次
        this.askCode();
    };
    /**
     * 微信登陆
     */
    PageLogin.prototype.ShowWeChatLoginPanel = function () {
        //重置布局
        //显示快速使用的UI
    };
    /**
     * 手机号登陆
     */
    PageLogin.prototype.ShowPhoneLoginPanel = function () {
        //重置布局
        //显示快速使用的UI
    };
    ///////////////////////////////////////////////////////////////////////
    /**
     * 注册面板
     */
    PageLogin.prototype.ShowRedisterPanel = function () {
        var _this = this;
        //隐藏全部UI
        this.HideAllLoginUI();
        //当前版本只有简单注册 
        //重置布局
        //标题
        this.sp_title.skin = "ui/res_login/img_dl_biaotou04.png";
        //账号文字
        this.sp_account.top = 124;
        this.sp_account.left = 95;
        //账号输入框
        this.in_account.top = 116;
        this.in_account.left = 229;
        this.in_account.editable = true;
        this.in_account.mouseEnabled = true;
        //验证码文字
        this.sp_code.left = 95;
        this.sp_code.top = 298;
        //验证码输入
        this.in_code.top = 289;
        this.in_code.left = 229;
        this.in_code.width = 410;
        //验证码
        this.sp_img_code.top = 299;
        this.sp_img_code.left = 450;
        //显示密码 
        this.btn_show_pwd.top = 187;
        this.btn_show_pwd.left = 582;
        //显示密码 
        this.btn_show_pwd_1.top = 242;
        this.btn_show_pwd.left = 582;
        this.btn_show_pwd_1.skin = this.btn_show_pwd.skin = 'ui/res_login/btn_dl_yanjing01.png';
        //显示UI
        var all = [
            this.sp_account,
            this.in_account,
            this.sp_code,
            this.in_code,
            this.sp_img_code,
            this.btn_ok,
            this.btn_back,
            this.sp_input_password,
            this.sp_check_password,
            this.in_check_password,
            this.in_put_password,
            this.btn_show_pwd,
            this.btn_show_pwd_1,
        ];
        all.forEach(function (sp) { return sp.visible = true; });
        //监听事件
        //this.btn_back.once(Laya.Event.CLICK,        this, this.OnBackAccountLoginPanel);
        EventManager.addTouchScaleListener(this.btn_back, this, function () {
            SoundPlayer.clickSound();
            _this.OnBackAccountLoginPanel();
        });
        //this.btn_show_pwd.on(Laya.Event.CLICK,      this, this.OnShowPwd, [this.btn_show_pwd, this.in_put_password]);
        EventManager.addTouchScaleListener(this.btn_show_pwd, this, function () {
            SoundPlayer.clickSound();
            _this.OnShowPwd(_this.btn_show_pwd, _this.in_put_password);
        });
        //this.btn_show_pwd_1.on(Laya.Event.CLICK,    this, this.OnShowPwd, [this.btn_show_pwd_1, this.in_check_password]);
        EventManager.addTouchScaleListener(this.btn_show_pwd_1, this, function () {
            SoundPlayer.clickSound();
            _this.OnShowPwd(_this.btn_show_pwd_1, _this.in_check_password);
        });
        //this.btn_ok.on(Laya.Event.CLICK,            this, this.OnRegisterAccount);
        EventManager.addTouchScaleListener(this.btn_ok, this, function () {
            SoundPlayer.clickSound();
            _this.OnRegisterAccount();
        });
    };
    /**
     * 现实修改密码
     */
    PageLogin.prototype.ShowChangePasswordPanel = function () {
        //隐藏全部UI
        this.HideAllLoginUI();
        //重置布局
        //标题
        this.sp_title.skin = "ui/res_login/img_dl_biaotou06.png";
    };
    /**
     * 显示忘记密码页面
     */
    PageLogin.prototype.ShowForgetPasswordPanel = function () {
        var _this = this;
        //隐藏全部UI
        this.HideAllLoginUI();
        //重置布局
        //标题
        this.sp_title.skin = "ui/res_login/img_dl_biaotou05.png";
        //账号文字
        this.sp_account.top = 124;
        this.sp_account.left = 95;
        //账号输入框
        this.in_account.top = 116;
        this.in_account.left = 229;
        this.in_account.editable = true;
        this.in_account.mouseEnabled = true;
        //手机号
        this.sp_phone.top = 207;
        this.sp_phone.left = 95;
        //输入手机号
        this.in_phone.top = 199;
        this.in_phone.left = 229;
        //验证码文字
        this.sp_code.left = 95;
        this.sp_code.top = 291;
        //验证码输入
        this.in_code.top = 282;
        this.in_code.left = 229;
        this.in_code.width = 200;
        //显示快速使用的UI
        var all = [
            this.sp_account,
            this.in_account,
            this.sp_phone,
            this.in_phone,
            this.btn_ok,
            this.btn_back,
            this.sp_code,
            this.in_code,
            this.btn_phone_code,
        ];
        all.forEach(function (sp) { return sp.visible = true; });
        //监听事件
        //this.btn_back.once(Laya.Event.CLICK, this, this.OnBackAccountLoginPanel);
        EventManager.addTouchScaleListener(this.btn_back, this, function () {
            SoundPlayer.clickSound();
            _this.OnBackAccountLoginPanel();
        });
        //this.btn_ok.on(Laya.Event.CLICK, this, this.OnRegisterAccount);
    };
    ///////////////////////////////////////////////////////////////////////
    /**
     * 返回账号登陆
     */
    PageLogin.prototype.OnBackAccountLoginPanel = function () {
        this.HideAllLoginUI();
        this.ShowAccountLoginPanel();
    };
    /**
     * 显示或者隐藏密码
     */
    PageLogin.prototype.OnShowPwd = function (btn, pwd) {
        switch (pwd.type) {
            case 'text':
                pwd.type = 'password';
                btn.skin = 'ui/res_login/btn_dl_yanjing01.png';
                break;
            case 'password':
                pwd.type = 'text';
                btn.skin = 'ui/res_login/btn_dl_yanjing02.png';
                break;
        }
        pwd.focus = true;
    };
    /**
     * 客服服务
     */
    PageLogin.prototype.OnService = function () {
        //TODO 打开客服
    };
    /**
     * 保存图片到本地
     */
    PageLogin.prototype.OnSavePic = function () {
        //TODO 保存图片到本地
        // if( window.conch )
        // {
        //     window.conch.captureScreen(function(arrayBuff,width,height){
        //         window.conch.saveAsPng( arrayBuff, width, height, window.conch.getCachePath()+"/test.png" );
        //         console.debug(window.conch.getCachePath()+"/test.png");
        //     }
        // }
        // console.debug("");
    };
    /**
     * 快速登陆
     */
    PageLogin.prototype.OnFastLogin = function () {
        var _this = this;
        //效验验证码
        var code = this.in_code.text;
        var verify = Tools.verifyQuickLogin(code);
        if (!verify.bRight) {
            Toast.showToast(Tools.getStringByKey(verify.msg));
            this.askCode();
            return;
        }
        //转圈圈
        LayaMain.getInstance().showCircleLoading(true);
        var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.quicklogin;
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*", "device_token", MyUid.getUid()];
        var ePwd = window['SecretUtils'].rsaEncodePWD(this.password);
        var data = {
            username: this.in_account.text,
            password: ePwd,
            validateCode: this.in_code.text,
            webUniqueCode: this.rand
        };
        var jd = JSON.stringify(data);
        var that = this;
        NetManager.getObj().HttpConnect(url, this, function (s, stat, hr) {
            LayaMain.getInstance().showCircleLoading(false);
            if (stat == "complete") {
                var jobj;
                try {
                    jobj = JSON.parse(s);
                }
                catch (e) {
                    Debug.trace(e);
                    jobj = s;
                }
                try {
                    Common.loginInfo = jobj;
                    Common.loginType = Common.TYPE_LOGIN_QK;
                    Common.access_token = jobj.oauthToken.access_token;
                    SaveManager.getObj().save(SaveManager.KEY_TOKEN, Common.access_token);
                    PostMHelp.tokenChange({ "payload": Common.access_token });
                    SaveManager.getObj().save(SaveManager.KEY_QK_USERNAME, that.in_account.text);
                    SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD, that.password);
                    SaveManager.getObj().save(SaveManager.KEY_LOGIN_TYPE, Common.loginType);
                    SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO, Common.loginInfo);
                    PageManager.Get().DestoryCurrentView();
                    LayaMain.getInstance().initLobby();
                }
                catch (e) {
                    Debug.trace(e);
                }
            }
            else {
                var err = hr.http.response;
                if (err) {
                    var obj = JSON.parse(err);
                    Toast.showToast(obj.message);
                }
                else {
                    Toast.showToast(Tools.getStringByKey(ConfObjRead.getConfCommon().unknow_err)); //"未知错误，请联系管理员");
                }
                _this.askCode();
            }
        }, header, jd, "POST", "JSON");
    };
    /**
     * 账号密码登陆
     */
    PageLogin.prototype.OnAccountLogin = function () {
        var name = this.in_account.text;
        var pwd = this.in_pwd.text;
        var yzm = this.in_code.text;
        PostMHelp.debugInfo({ name: name, pwd: pwd });
        var verify = Tools.verifyLogin(name, pwd, yzm);
        if (!verify.bRight) {
            Toast.showToast(Tools.getStringByKey(verify.msg));
            this.askCode();
            return;
        }
        //开始登陆
        LayaMain.getInstance().showCircleLoading(true);
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
        var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.userlogin;
        var ePwd = window['SecretUtils'].rsaEncodePWD(pwd);
        var swebUniqueCode = String(this.rand);
        var data = {
            username: name,
            password: ePwd,
            validateCode: yzm,
            webUniqueCode: swebUniqueCode
        };
        var jd = JSON.stringify(data);
        var that = this;
        NetManager.getObj().HttpConnect(url, this, function (s, stat, hr) {
            LayaMain.getInstance().showCircleLoading(false);
            if (stat == "complete") {
                var jobj;
                try {
                    jobj = JSON.parse(s);
                }
                catch (e) {
                    Debug.trace(e);
                    jobj = s;
                }
                try {
                    Common.loginInfo = jobj;
                    Common.access_token = jobj.oauthToken.access_token;
                    Common.loginType = Common.TYPE_LOGIN_ACCOUNT;
                    SaveManager.getObj().save(SaveManager.KEY_TOKEN, Common.access_token);
                    SaveManager.getObj().save(SaveManager.KEY_LOGIN_TYPE, Common.loginType);
                    SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO, Common.loginInfo);
                    PostMHelp.tokenChange({ "payload": Common.access_token });
                    // if( jobj.strongPwd )
                    // {
                    PageManager.Get().DestoryCurrentView();
                    LayaMain.getInstance().initLobby();
                    // } else {
                    //     //this.ShowChangePasswordPanel();
                    //      ChangePwdNormal.showPad(LayaMain.getInstance().getRootNode(),ConfObjRead.getConfChangePwd(), this, this.cancelChangePassword);
                    //      ChangePwdNormal.getObj().setSucListener(this, this.changePassword);
                    // }
                }
                catch (e) {
                    Debug.trace(e);
                }
            }
            else {
                var err = hr.http.response;
                if (err) {
                    var obj = JSON.parse(err);
                    Toast.showToast(obj.message);
                }
                else {
                    Toast.showToast(Tools.getStringByKey(ConfObjRead.getConfCommon().unknow_err));
                }
                that.askCode();
            }
        }, header, jd, "POST", "JSON");
    };
    // /**
    //  * 取消修改密码
    //  */
    // public cancelChangePassword() {
    // }
    // /**
    //  * 密码修改成功
    //  */
    // public changePassword() {
    //     this.in_account.text = '';
    //     this.in_pwd.text = '';
    //     this.askCode();
    //     Toast.showToast(Tools.getStringByKey(ConfObjRead.getConfChangePwd().textChanged));
    // }
    /**
     * 注册
     */
    PageLogin.prototype.OnRegister = function () {
        //跳转注册页面
        this.ShowRedisterPanel();
    };
    /**
     * 注册账号
     */
    PageLogin.prototype.OnRegisterAccount = function () {
        var name = this.in_account.text;
        var pwd = this.in_put_password.text;
        var pwdconfirm = this.in_check_password.text;
        var code = this.in_code.text;
        var verify = Tools.verifyReg(name, pwd, pwdconfirm, code);
        if (!verify.bRight) {
            Toast.showToast(Tools.getStringByKey(verify.msg));
            this.askCode();
            return;
        }
        LayaMain.getInstance().showCircleLoading(true);
        var ePwd = window['SecretUtils'].rsaEncodePWD(pwd);
        var deviceId = String(this.rand);
        var data = {
            username: name,
            password: ePwd,
            hash: '',
            validateCode: code,
            webUniqueCode: deviceId,
            affCode: AppData.NATIVE_DATA.affCode
        };
        var that = this;
        window['SecretUtils'].encode(name, pwd, function (hash) {
            data.hash = hash;
            var jd = JSON.stringify(data);
            NetManager.getObj().HttpConnect(ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.userreg, that, that.ResponseInfo, ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"], jd, "POST", "JSON");
        });
    };
    /**
     * 注册返回
     */
    PageLogin.prototype.ResponseInfo = function (s, stat, hr) {
        LayaMain.getInstance().showCircleLoading(false);
        if (stat == "complete") {
            var jobj;
            try {
                jobj = JSON.parse(s);
            }
            catch (e) {
                Debug.trace(e);
                jobj = s;
            }
            Common.access_token = jobj.oauthToken.access_token;
            SaveManager.getObj().save(SaveManager.KEY_TOKEN, Common.access_token);
            PageManager.Get().DestoryCurrentView();
            LayaMain.getInstance().initLobby();
            //this.onCloseClick(null);
        }
        else {
            var err = hr.http.response;
            try {
                var jo = JSON.parse(err);
                Toast.showToast(jo.message);
            }
            catch (e) {
                Debug.trace("error===" + err, hr.http);
            }
            this.askCode();
        }
    };
    /**
     * 忘记密码
     */
    PageLogin.prototype.OnForgetPwd = function () {
        //跳转忘记密码UI
        this.ShowForgetPasswordPanel();
    };
    return PageLogin;
}(ui.UI.Page.LoginUI));
//# sourceMappingURL=PageLogin.js.map