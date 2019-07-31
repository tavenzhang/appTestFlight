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
/**
 * 登录类型
 */
var LoginType;
(function (LoginType) {
    LoginType[LoginType["unknown"] = 0] = "unknown";
    LoginType[LoginType["Fast"] = 1] = "Fast";
    LoginType[LoginType["WeChat"] = 2] = "WeChat";
    LoginType[LoginType["Account"] = 3] = "Account";
    LoginType[LoginType["Phone"] = 4] = "Phone";
    LoginType[LoginType["register"] = 5] = "register"; //当前处于注册界面
})(LoginType || (LoginType = {}));
/**
 * 登陆ui,包含loading
 */
var PageLogin = /** @class */ (function (_super) {
    __extends(PageLogin, _super);
    function PageLogin(cmd) {
        var _this = _super.call(this) || this;
        _this.gatewayCount = 0;
        _this.pb_loading.value = 0;
        //if(AppData.IS_NATIVE_APP){ //App加入微信登录按钮
        _this.loginBtns = [
            _this.login_fast,
            _this.login_wx,
            _this.login_account,
            _this.login_phone
        ];
        // }else{
        // this.loginBtns = [//按顺序加入按钮
        //     this.login_fast,
        //     this.login_account,
        //     this.login_phone
        // ];
        // this.login_wx.visible = false;
        // }
        var btnWidth = _this.loginBtns[0].width;
        var len = _this.loginBtns.length;
        var gap = 110;
        for (var i = 0; i < len; i++) {
            var btn = _this.loginBtns[i];
            btn.x = btnWidth / 2 + i * (btnWidth + gap);
            btn.visible = false;
        }
        _this.loginBtnGroup.width = len * btnWidth + (len - 1) * gap;
        //隐藏按钮
        _this.btn_service.visible = false;
        /**
         * 业主可替换的图标，需要动态加载
         */
        _this.sp_log.alpha = 0;
        _this.sp_log.skin = "./brand/login_icon.png";
        Laya.Tween.to(_this.sp_log, { delay: 300, alpha: 1 }, 600);
        //渠道包屏蔽
        if (AppData.isAndroidHack)
            _this.sp_log.visible = false;
        //设置游戏版本号
        ResConfig.versions = "Res v" + ConfObjRead.getVerConfig().versionNum;
        _this.verTxt.text = GameUtils.appVer + "\n" + ResConfig.versions;
        _this.cmd = cmd;
        //开始加载数据
        _this.startLoading();
        return _this;
    }
    /**
     * 开始加载数据
     */
    PageLogin.prototype.startLoading = function () {
        var conf = Laya.loader.getRes("./assets/conf/assets_lobby.json");
        if (PageLogin.isLoaded) {
            this.loadFinish();
        }
        else {
            //加载数据
            Laya.loader.load(conf.list, Laya.Handler.create(this, this.loadFinish), Laya.Handler.create(this, this.loadProgress, null, false));
        }
    };
    /**
     * 加载中
     */
    PageLogin.prototype.loadProgress = function (progress) {
        this.pb_loading.value = progress;
        this.lb_text.text = "正在加载资源" + Math.floor((progress * 100)) + "%";
    };
    /**
     * 加载结束
     */
    PageLogin.prototype.loadFinish = function () {
        if (!PageLogin.isLoaded)
            PostMHelp.initGame();
        PageManager.initDlgMap();
        Common.confObj = ConfObjRead.getConfCommon();
        ResConfig.addTween = Common.confObj.addTween;
        GameData.joinLobbyType = JoinLobbyType.loginJoin;
        if (!GameUtils.isNativeApp) {
            // ConfObjRead.getConfUrl().url = ConfObjRead.getConfUrl().urldev;//dev环境(debugxxx)
        }
        this.copyNativeAdress();
        this.updateGatewayInfo();
        EventManager.register(EventType.INIT_LOGINVIEW, this, this.initView);
        // //检查维护公告
        LayaMain.getInstance().checkGameMaintenance();
        //登录已经被加载过
        PageLogin.isLoaded = true;
    };
    /**
     * 拷贝native的地址
     * 注意：native所有http请求必须在这部操作之后
     */
    PageLogin.prototype.copyNativeAdress = function () {
        if (AppData.IS_NATIVE_APP) {
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
    };
    //获取init-info
    PageLogin.prototype.updateGatewayInfo = function (isError, callback) {
        var _this = this;
        if (isError === void 0) { isError = false; }
        if (callback === void 0) { callback = null; }
        var info = SaveManager.getObj().get(SaveManager.KEY_GATEWAYINFO, "");
        if (!isError && info) {
            if (!Common.gatewayInfo)
                Common.gatewayInfo = JSON.parse(info);
            eval(Common.gatewayInfo.sec);
            return;
        }
        HttpRequester.getGatewayInfo(this, function (suc, jobj) {
            if (suc) {
                Common.gatewayInfo = jobj;
                Common.gatewayInfo.tsDiff = Common.gatewayInfo.ts - Laya.Browser.now();
                eval(Common.gatewayInfo.sec);
                SaveManager.getObj().save(SaveManager.KEY_GATEWAYINFO, JSON.stringify(Common.gatewayInfo));
                if (callback)
                    callback();
            }
            else {
                Debug.error("init-err:", jobj.http.status);
                LayaMain.getInstance().showCircleLoading(false);
                if (jobj.http.status == 428) {
                    _this.gatewayCount++;
                    if (_this.gatewayCount <= 3) {
                        _this.updateGatewayInfo(true);
                    }
                    else {
                        Toast.showToast("服务异常,请稍后再试!");
                    }
                }
                else {
                    Toast.showToast("网络异常,请稍后再试!");
                }
            }
        });
    };
    PageLogin.prototype.initEvents = function () {
        var _this = this;
        EventManager.register(EventType.BLUR_NATIVE, this, this.lostFocusInputText);
        //监听微信登录消息
        EventManager.register(EventType.WeChatLogin, this, this.doWXLogin);
        //客服
        EventManager.addTouchScaleListener(this.btn_service, this, function () {
            SoundPlayer.clickSound();
            Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "custom");
        });
        //显示其他登陆
        EventManager.addTouchScaleListener(this.btn_other_login, this, function () {
            console.log("sdadsadsadsa");
            SoundPlayer.clickSound();
            _this.checkLocalFastInfo();
        });
        //快速登录模式
        EventManager.addTouchScaleListener(this.login_fast, this, function () {
            SoundPlayer.clickSound();
            _this.loginType = LoginType.Fast;
            _this.doFastLogin();
        });
        //账号登录模式
        EventManager.addTouchScaleListener(this.login_account, this, function () {
            SoundPlayer.clickSound();
            _this.selectLoginType(LoginType.Account);
        });
        //手机登录模式
        EventManager.addTouchScaleListener(this.login_phone, this, function () {
            SoundPlayer.clickSound();
            _this.selectLoginType(LoginType.Phone);
        });
        //微信登录
        EventManager.addTouchScaleListener(this.login_wx, this, function () {
            SoundPlayer.clickSound();
            _this.showWeChatLoginView();
        }, null, 1);
        //--------------快捷登录---------------------------
        //快捷登录确定
        EventManager.addTouchScaleListener(this.fast_login, this, function () {
            SoundPlayer.clickSound();
            _this.doFastLoginWithVC();
        });
        EventManager.addTouchScaleListener(this.fast_codePic, this, function () {
            SoundPlayer.clickSound();
            _this.askCode();
        }, null, 1);
        //--------------账号登录---------------------------
        //账号登录确定
        EventManager.addTouchScaleListener(this.acc_login, this, function () {
            SoundPlayer.clickSound();
            _this.isCodeLogin ? _this.doAccountLoginWithVC() : _this.doAccountLogin();
        });
        //切换到注册界面
        EventManager.addTouchScaleListener(this.acc_regBtn, this, function () {
            SoundPlayer.clickSound();
            _this.loginType = LoginType.register;
            _this.showRegisterView();
        });
        //账号登录-显示密码
        EventManager.pushEvent(this.acc_lookBtn, Laya.Event.CHANGE, this, this.togglePwdInput, [this.acc_pwdTxt]);
        EventManager.addTouchScaleListener(this.acc_codePic, this, function () {
            SoundPlayer.clickSound();
            _this.askCode();
        }, null, 1);
        //---------------注册-------------------------------
        EventManager.pushEvent(this.reg_lookBtn1, Laya.Event.CHANGE, this, this.togglePwdInput, [this.reg_pwdTxt1]);
        EventManager.pushEvent(this.reg_lookBtn2, Laya.Event.CHANGE, this, this.togglePwdInput, [this.reg_pwdTxt2]);
        //注册界面返回账号登录界面
        EventManager.addTouchScaleListener(this.reg_back, this, function () {
            SoundPlayer.clickSound();
            _this.loginType = LoginType.Account;
            _this.hideAllLoginUI();
            _this.showAccountLoginView();
        });
        //开始注册
        EventManager.addTouchScaleListener(this.reg_confirm, this, function () {
            SoundPlayer.clickSound();
            _this.doRegisterAccount();
        });
        EventManager.addTouchScaleListener(this.reg_codePic, this, function () {
            SoundPlayer.clickSound();
            _this.askCode();
        }, null, 1);
        //----------------手机登录----------------------
        //获取验证码
        EventManager.addTouchScaleListener(this.mp_getcodeBtn, this, function () {
            SoundPlayer.clickSound();
            _this.getPhoneVerCode();
        });
        //确定登录
        EventManager.addTouchScaleListener(this.mp_login, this, function () {
            SoundPlayer.clickSound();
            _this.doPhoneLogin();
        });
    };
    //手机登录
    PageLogin.prototype.doPhoneLogin = function () {
        var _this = this;
        if (this.mp_numTxt.text == "") {
            Toast.showToast("手机号不能为空");
            return;
        }
        if (this.mp_codeTxt.text == "") {
            Toast.showToast("验证码不能为空");
            return;
        }
        LayaMain.getInstance().showCircleLoading(true);
        if (!Common.gatewayInfo) {
            this.updateGatewayInfo(true, this.doPhoneLogin);
            return;
        }
        HttpRequester.phoneLogin(this.mp_numTxt.text, this.mp_codeTxt.text, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                if (jobj.certifiedPhone == false) { //这种情况需要跳转到用户登录界面
                    Toast.showToast("手机号认证失效，请账号登录后重新绑定手机");
                    _this.selectLoginType(LoginType.Account);
                    return;
                }
                _this.saveLoginInfo(jobj, LoginType.Phone);
                if (jobj.autoGenPassword) { //手机登录生成的密码(同一个号就第一次有),修改密码时要默认这个密码
                    SaveManager.getObj().save(SaveManager.KEY_PHONEPWD, jobj.autoGenPassword);
                }
                LayaMain.getInstance().initLobby();
            }
        });
    };
    //获取手机登录验证码
    PageLogin.prototype.getPhoneVerCode = function () {
        if (this.mp_numTxt.text == "") {
            Toast.showToast("手机号不能为空");
            return;
        }
        this.mp_getcodeBtn.visible = false;
        this.codeTime = 60;
        this.mp_timeTxt.text = this.codeTime.toString();
        Laya.timer.loop(1000, this, this.updateCodeTime);
        HttpRequester.getPhoneVercode(this.mp_numTxt.text, false, VerCodeType.MSG_LOGIN, this, function (suc, jobj) {
            //...
        });
    };
    PageLogin.prototype.updateCodeTime = function () {
        this.codeTime--;
        this.mp_timeTxt.text = this.codeTime.toString();
        if (this.codeTime <= 0) {
            this.clearCodeTime();
            this.mp_getcodeBtn.visible = true;
        }
    };
    PageLogin.prototype.clearCodeTime = function () {
        Laya.timer.clear(this, this.updateCodeTime);
    };
    /**
     * 初始化登录流程
     */
    PageLogin.prototype.initLoginProcess = function () {
        var _this = this;
        Common.getNormalFontByDevice();
        //token信息
        var temp_token = SaveManager.getObj().get(SaveManager.KEY_TOKEN, "");
        var status = Tools.getQueryVariable("status");
        var urlToken = Tools.getQueryVariable("token");
        if (!AppData.IS_NATIVE_APP) { //web端
            if (urlToken != undefined && urlToken.length != 0) {
                temp_token = urlToken;
            }
            Common.clientId = Tools.getQueryVariable("clientId");
            if (!Common.clientId)
                Common.clientId = ConfObjRead.getConfCommon().testClientId;
        }
        LobbyScene.initBgMusic();
        if (this.cmd && this.cmd.type) {
            this.showOtherLogin();
            this.selectLoginType(LoginType.Phone);
            return;
        }
        if (PageLogin.isLoaded) {
            this.checkLocalFastInfo();
            return;
        }
        if (temp_token.length <= 0 || status == '1') {
            this.checkLocalFastInfo();
        }
        else { //使用token登录
            HttpRequester.loginByToken(temp_token, this, function (suc, jobj) {
                if (suc) { //登录成功
                    Common.userInfo = jobj;
                    Common.access_token = temp_token;
                    SaveManager.getObj().save(SaveManager.KEY_TOKEN, temp_token);
                    if (!Common.clientId) {
                        Common.clientId = Common.userInfo.userBalance.clientId;
                    }
                    LayaMain.getInstance().initLobby();
                }
                else {
                    _this.checkLocalFastInfo();
                }
            });
        }
    };
    /**
     * 检查本地是否保存了快速登录账号
     */
    PageLogin.prototype.checkLocalFastInfo = function () {
        var _this = this;
        var userName = SaveManager.getObj().get(SaveManager.KEY_QK_USERNAME, "");
        this.password = SaveManager.getObj().get(SaveManager.KEY_QK_PASSWORD, "");
        if (userName && userName.length > 2 && this.password.length > 3) { //如果本地有数据
            this.fastName = userName;
            this.showOtherLogin();
        }
        else {
            HttpRequester.getFastUserInfo(this, function (suc, jobj) {
                if (suc) {
                    _this.password = jobj.password || "";
                    _this.fastName = jobj.username || "";
                    //本地保存
                    if (_this.fastName.length > 1) {
                        SaveManager.getObj().save(SaveManager.KEY_QK_USERNAME, _this.fastName);
                    }
                    else {
                        console.error("获取到的fastName异常", jobj);
                    }
                    if (_this.password.length > 1) {
                        SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD, _this.password);
                    }
                    else {
                        console.error("获取到的password异常", jobj);
                        _this.isChangePwd = true;
                    }
                }
                _this.showOtherLogin();
            });
        }
    };
    /**
     * 显示其他登陆按钮
     */
    PageLogin.prototype.showOtherLogin = function () {
        //显示客服图标
        this.btn_service.visible = true;
        //隐藏loading
        this.pb_loading.visible = false;
        this.lb_text.visible = false;
        //充值业主图标
        this.sp_log.width = 800;
        this.sp_log.height = 280;
        this.sp_log.top = 199;
        this.sp_log.left = 486;
        //隐藏登陆面板
        this.hideAllLoginUI();
        //隐藏其他登陆按钮
        this.btn_other_login.visible = false;
        //显示登录模式按钮
        this.loginBtns.forEach(function (btn) {
            btn.visible = true;
            btn.scale(0, 0);
            Laya.Tween.to(btn, { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.elasticOut);
        });
    };
    /**
     * 选择登陆模式
     */
    PageLogin.prototype.selectLoginType = function (type, comeFast) {
        if (comeFast === void 0) { comeFast = false; }
        //充值业主图标
        this.sp_log.width = 289;
        this.sp_log.height = 102;
        this.sp_log.top = 9;
        this.sp_log.left = 44;
        //显示其他登陆
        this.btn_other_login.visible = true;
        //隐藏登陆按钮
        this.loginBtns.forEach(function (btn) { return btn.visible = false; });
        //隐藏全部登陆的UI
        this.hideAllLoginUI();
        this.loginType = type;
        //显示不同的登陆UI
        switch (type) {
            case LoginType.Fast:
                this.showFastLoginView();
                break;
            case LoginType.Account:
                this.showAccountLoginView(comeFast);
                break;
            case LoginType.WeChat:
                this.showWeChatLoginView();
                break;
            case LoginType.Phone:
                this.showPhoneLoginView();
                break;
            default: break;
        }
    };
    /**
     * 让输入文本失去焦点
     * 用于解决ios系统点击输入后按Done界面不下来的问题
     */
    PageLogin.prototype.lostFocusInputText = function () {
        var inputs = [
            this.fast_nameTxt,
            this.fast_codeTxt,
            this.acc_nameTxt,
            this.acc_pwdTxt,
            this.acc_codeTxt,
            this.reg_nameTxt,
            this.reg_pwdTxt1,
            this.reg_pwdTxt2,
            this.reg_codeTxt
        ];
        inputs.forEach(function (txt) {
            txt.focus = false;
        });
    };
    /**
     * 初始化登录界面显示
     */
    PageLogin.prototype.initView = function () {
        //登陆流程
        this.initLoginProcess();
        //注册按钮点击事件
        this.initEvents();
    };
    PageLogin.prototype.destroy = function (vl) {
        this.clearCodeTime();
        EventManager.removeAllEvents(this);
        _super.prototype.destroy.call(this, vl);
    };
    ////////////////////////////////////////////////////////////////////
    /**
     * 隐藏全部登陆面板的UI
     */
    PageLogin.prototype.hideAllLoginUI = function () {
        this.panelFast.visible = false;
        this.panelAccount.visible = false;
        this.panelRegister.visible = false;
        this.panelPhone.visible = false;
    };
    //刷新验证码
    PageLogin.prototype.askCode = function () {
        this.rand = Math.random();
        var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.yanzhengma + "" + this.rand;
        switch (this.loginType) {
            case LoginType.Fast:
                this.fast_codePic.skin = url;
                break;
            case LoginType.Account:
                this.acc_codePic.skin = url;
                break;
            case LoginType.register:
                this.reg_codePic.skin = url;
                break;
        }
    };
    /**
     * 快速登陆
     */
    PageLogin.prototype.showFastLoginView = function () {
        //填充数据
        this.fast_nameTxt.text = this.fastName;
        this.fast_codeTxt.text = '';
        this.panelFast.visible = true;
        //请求第一次
        this.askCode();
    };
    /**
     * 账号登陆
     */
    PageLogin.prototype.showAccountLoginView = function (comeFast) {
        if (comeFast === void 0) { comeFast = false; }
        this.isCodeLogin = false;
        //填充数据
        this.acc_nameTxt.text = '';
        this.acc_pwdTxt.text = '';
        this.acc_pwdTxt.type = "password";
        this.acc_lookBtn.skin = "ui/res_login/btn_dl_yanjing01.png";
        this.accCodeGroup.visible = false;
        this.panelAccount.visible = true;
        if (this.isChangePwd && comeFast) {
            this.acc_nameTxt.text = this.fastName;
        }
        //请求第一次
        this.askCode();
    };
    /**
     * 微信登陆
     */
    PageLogin.prototype.showWeChatLoginView = function () {
        //todo:test 
        LayaMain.getInstance().weChatCertification(0);
    };
    /**
     * 手机号登陆
     */
    PageLogin.prototype.showPhoneLoginView = function () {
        this.panelPhone.visible = true;
    };
    ///////////////////////////////////////////////////////////////////////
    /**
     * 注册面板
     */
    PageLogin.prototype.showRegisterView = function () {
        //隐藏全部UI
        this.hideAllLoginUI();
        this.reg_nameTxt.text = "";
        this.reg_pwdTxt1.text = "";
        this.reg_pwdTxt2.text = "";
        this.reg_codeTxt.text = "";
        this.reg_lookBtn1.skin = this.reg_lookBtn2.skin = "ui/res_login/btn_dl_yanjing01.png";
        this.reg_pwdTxt1.type = this.reg_pwdTxt2.type = "password";
        var affcode = AppData.NATIVE_DATA.affCode;
        if (affcode && affcode.length > 3) {
            this.affcodeTxt.text = affcode;
            this.affcodeTxt.mouseEnabled = false;
            this.affcodeTxt.editable = false;
        }
        this.panelRegister.visible = true;
        this.askCode();
    };
    /**
     * 显示忘记密码页面
     */
    PageLogin.prototype.showForgetPasswordPanel = function () {
        //todo:...
    };
    ///////////////////////////////////////////////////////////////////////
    PageLogin.prototype.togglePwdInput = function (txt) {
        GameUtils.onShowPwd(txt);
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
    PageLogin.prototype.doFastLogin = function () {
        var _this = this;
        //修改过密码后导致卸载软件再安装软件，然后请求的密码为空，所以这种情况就跳转为账户登录界面
        if (this.isChangePwd && this.password.length < 2) {
            this.selectLoginType(LoginType.Account, true);
            return;
        }
        //转圈圈
        LayaMain.getInstance().showCircleLoading(true);
        if (!Common.gatewayInfo) {
            this.updateGatewayInfo(true, this.doFastLogin);
            return;
        }
        HttpRequester.fastLogin(this.fastName, this.password, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) { //成功
                if (jobj.secureLogin == undefined || jobj.secureLogin == true) { //为强账号，可以直接进入大厅
                    _this.saveLoginInfo(jobj, LoginType.Fast);
                    LayaMain.getInstance().initLobby();
                }
                else { //为弱账号，需要验证登录
                    Toast.showToast("用户名或者密码不正确");
                    _this.selectLoginType(LoginType.Fast);
                }
            }
            else {
                if (jobj.http.status == 428) {
                    _this.updateGatewayInfo(true);
                }
            }
        });
    };
    /**
     * 弱账号需要验证码登录
     */
    PageLogin.prototype.doFastLoginWithVC = function () {
        var _this = this;
        //效验验证码
        var code = this.fast_codeTxt.text;
        var verify = Tools.verifyQuickLogin(code);
        if (!verify.bRight) {
            Toast.showToast(Tools.getStringByKey(verify.msg));
            this.askCode();
            return;
        }
        LayaMain.getInstance().showCircleLoading(true);
        if (!Common.gatewayInfo) {
            this.updateGatewayInfo(true, this.doFastLoginWithVC);
            return;
        }
        HttpRequester.fastLoginWithVC(this.fastName, this.password, code, this.rand, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                _this.saveLoginInfo(jobj, LoginType.Fast);
                LayaMain.getInstance().initLobby();
            }
            else {
                _this.askCode();
                if (jobj.http.status == 428) {
                    _this.updateGatewayInfo(true);
                }
            }
        });
    };
    /**
     * 账号密码登陆
     */
    PageLogin.prototype.doAccountLogin = function () {
        var _this = this;
        var name = this.acc_nameTxt.text;
        var pwd = this.acc_pwdTxt.text;
        if (name == "openDebug" && pwd == "059") { //debug-open
            view.debug.DebugDlg.show();
            this.acc_nameTxt.text = "";
            this.acc_pwdTxt.text = "";
            return;
        }
        var verify = Tools.verifyLogin(name, pwd, "111");
        if (!verify.bRight) {
            Toast.showToast(Tools.getStringByKey(verify.msg));
            return;
        }
        PostMHelp.debugInfo({ name: name, pwd: pwd });
        LayaMain.getInstance().showCircleLoading(true);
        if (!Common.gatewayInfo) {
            this.updateGatewayInfo(true, this.doAccountLogin);
            return;
        }
        HttpRequester.accountLogin(name, pwd, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                if (jobj.secureLogin == undefined || jobj.secureLogin == true) { //登录成功
                    _this.saveLoginInfo(jobj, LoginType.Account);
                    if (_this.isChangePwd && name == _this.fastName) { //特殊情况出来
                        SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD, pwd);
                    }
                    LayaMain.getInstance().initLobby();
                }
                else { //需要输入验证码
                    _this.accCodeGroup.visible = true;
                    _this.isCodeLogin = true;
                    Toast.showToast("用户名或者密码不正确");
                }
            }
            else {
                if (jobj.http.status == 428) {
                    _this.updateGatewayInfo(true);
                }
            }
        });
    };
    /**
     * 账户登录-带验证码
     */
    PageLogin.prototype.doAccountLoginWithVC = function () {
        var _this = this;
        var name = this.acc_nameTxt.text;
        var pwd = this.acc_pwdTxt.text;
        var yzm = this.acc_codeTxt.text;
        var verify = Tools.verifyLogin(name, pwd, yzm);
        if (!verify.bRight) {
            Toast.showToast(Tools.getStringByKey(verify.msg));
            this.askCode();
            return;
        }
        LayaMain.getInstance().showCircleLoading(true);
        if (!Common.gatewayInfo) {
            this.updateGatewayInfo(true, this.doAccountLoginWithVC);
            return;
        }
        HttpRequester.accountLoginWithVC(name, pwd, yzm, this.rand, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                _this.saveLoginInfo(jobj, LoginType.Account);
                if (_this.isChangePwd && name == _this.fastName) {
                    SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD, pwd);
                }
                LayaMain.getInstance().initLobby();
            }
            else {
                _this.askCode();
                if (jobj.http.status == 428) {
                    _this.updateGatewayInfo(true);
                }
            }
        });
    };
    //保存登录信息
    PageLogin.prototype.saveLoginInfo = function (jobj, type) {
        Common.loginInfo = jobj;
        Common.access_token = jobj.oauthToken.access_token;
        Common.loginType = type;
        SaveManager.getObj().save(SaveManager.KEY_TOKEN, Common.access_token);
        SaveManager.getObj().save(SaveManager.KEY_LOGIN_TYPE, Common.loginType);
        SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO, Common.loginInfo);
        PostMHelp.tokenChange({ "payload": Common.access_token });
    };
    /**
     * 注册账号
     */
    PageLogin.prototype.doRegisterAccount = function () {
        var _this = this;
        var name = this.reg_nameTxt.text;
        var pwd = this.reg_pwdTxt1.text;
        var pwdconfirm = this.reg_pwdTxt2.text;
        var code = this.reg_codeTxt.text;
        var verify = Tools.verifyReg(name, pwd, pwdconfirm, code);
        if (!verify.bRight) {
            Toast.showToast(Tools.getStringByKey(verify.msg));
            this.askCode();
            return;
        }
        LayaMain.getInstance().showCircleLoading(true);
        HttpRequester.registerAccount(name, pwd, code, this.rand.toString(), this.affcodeTxt.text, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                Common.access_token = jobj.oauthToken.access_token;
                SaveManager.getObj().save(SaveManager.KEY_TOKEN, Common.access_token);
                LayaMain.getInstance().initLobby();
            }
            else {
                _this.askCode();
            }
        });
    };
    /**
     * 忘记密码
     */
    PageLogin.prototype.onForgetPwd = function () {
        //跳转忘记密码UI
        this.showForgetPasswordPanel();
    };
    /** 微信登录App请求返回
     * @param message
        "data": {
            accessToken: "23_TjJ1OECp7ylnjb4g753d4Nh47L6Drptk-O1i_iJjQmPD88FFcMiQUZUV2STqSLrhf7SUpuXnT2ayvuwtPNMmAVUN5_0GVNxfSEzdTWTVvic"
            access_token: "23_TjJ1OECp7ylnjb4g753d4Nh47L6Drptk-O1i_iJjQmPD88FFcMiQUZUV2STqSLrhf7SUpuXnT2ayvuwtPNMmAVUN5_0GVNxfSEzdTWTVvic"
            city: "吉隆坡"
            country: "马来西亚"
            expiration: "1563787256811"
            expires_in: "1563787256811"
            gender: "0"
            iconurl: ""
            language: "zh_CN"
            name: "heheda"
            openid: "ohmBWxFiFc7HtECjZIxi7jyj5Uq8"
            profile_image_url: ""
            province: "吉隆坡"
            refreshToken: "23_ZtB9fOhyY8qcBGO7PGTOKeyXIIYOzD-32t1cJaNkbdGsYBjB_ZjiPMV0IfJA09RwwPicvhINKsQVNGnmkY5Fxv-C383WLa67cN07Au5ooFE"
            screen_name: "heheda"
            uid: "od7H61SmIbhKoz9IPO
        }
     */
    PageLogin.prototype.doWXLogin = function (message) {
        var _this = this;
        Debug.log("doWXLogin = ", message); //debug
        //无数据直接跳出
        if (JSON.stringify(message.data) === '{}')
            return;
        if (message.data.uid == null || message.data.uid == "") {
            Toast.showToast("微信ID获取失败");
            return;
        }
        //打开遮罩
        LayaMain.getInstance().showCircleLoading(true);
        //保存微信数据
        Common.weChatData = message.data;
        //发送消息
        HttpRequester.wxLogin(message.data.uid, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false); //关闭遮罩
            Debug.log("resWXLogin = ", jobj); //debug
            if (suc) {
                _this.saveLoginInfo(jobj, LoginType.WeChat);
                if (jobj.autoGenPassword) {
                    SaveManager.getObj().save(SaveManager.KEY_WEICHATPWD, jobj.autoGenPassword);
                }
                LayaMain.getInstance().initLobby();
            }
            else {
                if (jobj.http.status == 428) {
                    _this.updateGatewayInfo(true);
                }
            }
        });
    };
    PageLogin.isLoaded = false;
    return PageLogin;
}(ui.UI.Page.LoginUI));
//# sourceMappingURL=PageLogin.js.map