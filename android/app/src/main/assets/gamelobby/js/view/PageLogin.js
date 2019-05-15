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
    LoginType[LoginType["Fast"] = 0] = "Fast";
    LoginType[LoginType["WeChat"] = 1] = "WeChat";
    LoginType[LoginType["Account"] = 2] = "Account";
    LoginType[LoginType["Phone"] = 3] = "Phone";
    LoginType[LoginType["register"] = 4] = "register"; //当前处于注册界面
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
        //隐藏按钮
        _this.btn_account.visible = false;
        _this.btn_fast.visible = false;
        _this.btn_phone.visible = false;
        _this.btn_webchat.visible = false;
        _this.btn_service.visible = false;
        _this.in_put_password.maxChars = 15;
        _this.in_pwd.maxChars = 15;
        /**
         * 业主可替换的图标，需要动态加载
         */
        _this.sp_log.alpha = 0;
        _this.sp_log.skin = "./brand/login_icon.png";
        Laya.Tween.to(_this.sp_log, { delay: 300, alpha: 1 }, 600);
        //渠道包屏蔽
        if (AppData.isAndroidHack)
            _this.sp_log.visible = false;
        var isload = cmd == null ? false : cmd == 'isloaded';
        //开始加载数据
        _this.startLoading(isload);
        if(!isload)PostMHelp.initGame();
        return _this;
    }
    /**
     * 开始加载数据
     */
    PageLogin.prototype.startLoading = function (isload) {
        this.isload = isload;
        var conf = Laya.loader.getRes("./assets/conf/assets_lobby.json");
        //过滤数据
        var assets = [];
        var srcs = conf.src;
        for (var i = 0; i < srcs.length; i++) {
            var urls = Tools.getSrc(srcs[i].url);
            var types = Tools.getLoadingType(srcs[i].type);
            var v = { url: urls, type: types };
            assets.push(v);
        }
        //合并游戏列表相关素材
        // assets = assets.concat(ResConfig.getGameListResConfig());
        if (isload) {
            this.loadFinish();
        }
        else {
            //加载数据
            Laya.loader.load(assets, Laya.Handler.create(this, this.loadFinish), Laya.Handler.create(this, this.loadProgress, null, false));
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
        Common.confObj = ConfObjRead.getConfCommon();
        this.updateGatewayInfo();
        //登陆流程
        this.initLoginProcess();
        this.initEvents();
    };
    //获取init-info
    PageLogin.prototype.updateGatewayInfo = function (isError) {
        var _this = this;
        if (isError === void 0) { isError = false; }
        var info = SaveManager.getObj().get(SaveManager.KEY_GATEWAYINFO, "");
        if (!isError && info) {
            if (!Common.gatewayInfo)
                Common.gatewayInfo = JSON.parse(info);
            eval(Common.gatewayInfo.sec);
            return;
        }
        HttpRequester.getGatewayInfo(this, function (suc, jobj) {
            // console.error("gateway:", jobj);//debug
            if (suc) {
                Common.gatewayInfo = jobj;
                Common.gatewayInfo.tsDiff = Common.gatewayInfo.ts - Laya.Browser.now();
                eval(Common.gatewayInfo.sec);
                SaveManager.getObj().save(SaveManager.KEY_GATEWAYINFO, JSON.stringify(Common.gatewayInfo));
            }
            else {
                if (jobj.http.status == 428) {
                    _this.gatewayCount++;
                    if (_this.gatewayCount <= 3) {
                        _this.updateGatewayInfo(true);
                    }
                    else {
                        //...
                    }
                }
            }
        });
    };
    PageLogin.prototype.initEvents = function () {
        var _this = this;
        EventManager.register(EventType.BLUR_NATIVE, this, this.lostFocusInputText);
        //账号登录
        EventManager.addTouchScaleListener(this.btn_account, this, function () {
            SoundPlayer.clickSound();
            _this.selectLoginType(LoginType.Account);
        });
        //快速登录
        EventManager.addTouchScaleListener(this.btn_fast, this, function () {
            SoundPlayer.clickSound();
            _this.doFastLogin();
        });
        //客服
        EventManager.addTouchScaleListener(this.btn_service, this, function () {
            SoundPlayer.clickSound();
            Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "custom");
        });
        //显示其他登陆
        EventManager.addTouchScaleListener(this.btn_other_login, this, function () {
            SoundPlayer.clickSound();
            _this.checkLocalFastInfo();
        });
        //开始登录
        EventManager.addTouchScaleListener(this.btn_login, this, function () {
            SoundPlayer.clickSound();
            switch (_this.loginType) {
                case LoginType.Fast:
                    _this.doFastLoginWithVC();
                    break;
                case LoginType.Account:
                    _this.isCodeLogin ? _this.doAccountLoginWithVC() : _this.doAccountLogin();
                    break;
            }
        });
        //显示密码
        EventManager.addTouchScaleListener(this.btn_show_pwd, this, function () {
            SoundPlayer.clickSound();
            switch (_this.loginType) {
                case LoginType.register: { //注册界面
                    _this.onShowPwd(_this.btn_show_pwd, _this.in_put_password);
                    break;
                }
                case LoginType.Account: { //账户登录界面
                    _this.onShowPwd(_this.btn_show_pwd, _this.in_pwd);
                    break;
                }
            }
        });
        //注册
        EventManager.addTouchScaleListener(this.btn_register, this, function () {
            SoundPlayer.clickSound();
            _this.loginType = LoginType.register;
            _this.showRegisterView();
        });
        //注册界面返回账号登录界面
        EventManager.addTouchScaleListener(this.btn_back, this, function () {
            SoundPlayer.clickSound();
            _this.loginType = LoginType.Account;
            _this.hideAllLoginUI();
            _this.showAccountLoginView();
        });
        //显示密码-注册界面按钮
        EventManager.addTouchScaleListener(this.btn_show_pwd_1, this, function () {
            SoundPlayer.clickSound();
            _this.onShowPwd(_this.btn_show_pwd_1, _this.in_check_password);
        });
        //开始注册
        EventManager.addTouchScaleListener(this.btn_ok, this, function () {
            SoundPlayer.clickSound();
            _this.doRegisterAccount();
        });
        //验证码处理 以后每次点击请求
        this.sp_img_code.on(Laya.Event.CLICK, this, function () { return _this.askCode(); });
    };
    /**
     * 初始化登录流程
     */
    PageLogin.prototype.initLoginProcess = function () {
        var _this = this;
        //设置游戏版本号
        ResConfig.versions = "版本号：" + ConfObjRead.getVerConfig().versionNum;
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
                Common.clientId = ConfObjRead.getConfUrl().cmd.testClientId;
        }
        else { //app端
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
            this.checkLocalFastInfo();
            return;
        }
        if (temp_token.length <= 0 || status == '1') {
            this.checkLocalFastInfo();
        }
        else {
            HttpRequester.loginByToken(temp_token, this, function (suc, jobj) {
                if (suc) { //登录成功
                    Common.userInfo = jobj;
                    Common.access_token = temp_token;
                    SaveManager.getObj().save(SaveManager.KEY_TOKEN, temp_token);
                    if (!Common.clientId) {
                        Common.clientId = Common.userInfo.userBalance.clientId;
                    }
                    if (jobj.userRole) {
                        userData.role = jobj.userRole;
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
                        console.error("获取到的fastName异常");
                    }
                    if (_this.password.length > 1) {
                        SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD, _this.password);
                    }
                    else {
                        console.error("获取到的password异常");
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
    PageLogin.prototype.selectLoginType = function (type) {
        //充值业主图标
        this.sp_log.width = 289;
        this.sp_log.height = 102;
        this.sp_log.top = 9;
        this.sp_log.left = 44;
        //显示其他登陆
        this.btn_other_login.visible = true;
        //隐藏登陆按钮
        this.btn_account.visible = false;
        this.btn_fast.visible = false;
        this.btn_phone.visible = false;
        this.btn_webchat.visible = false;
        //隐藏全部登陆的UI
        this.hideAllLoginUI();
        this.loginType = type;
        //显示不同的登陆UI
        switch (type) {
            case LoginType.Fast:
                this.showFastLoginView();
                break;
            case LoginType.Account:
                this.showAccountLoginView();
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
    /**
     * 让输入文本失去焦点
     * 用于解决ios系统点击输入后按Done界面不下来的问题
     */
    PageLogin.prototype.lostFocusInputText = function () {
        if (this.in_account)
            this.in_account.focus = false;
        if (this.in_code)
            this.in_code.focus = false;
        if (this.in_pwd)
            this.in_pwd.focus = false;
        if (this.in_phone)
            this.in_phone.focus = false;
        if (this.in_put_password)
            this.in_put_password.focus = false;
        if (this.in_check_password)
            this.in_check_password.focus = false;
    };
    PageLogin.prototype.destroy = function (vl) {
        EventManager.removeEvent(EventType.BLUR_NATIVE, this, this.lostFocusInputText);
        EventManager.removeAllEvents(this);
        _super.prototype.destroy.call(this, vl);
    };
    ////////////////////////////////////////////////////////////////////
    /**
     * 隐藏全部登陆面板的UI
     */
    PageLogin.prototype.hideAllLoginUI = function () {
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
    //刷新验证码
    PageLogin.prototype.askCode = function () {
        this.rand = Math.random();
        var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.yanzhengma + "" + this.rand;
        this.sp_img_code.skin = url;
    };
    /**
     * 快速登陆
     */
    PageLogin.prototype.showFastLoginView = function () {
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
        //请求第一次
        this.askCode();
        //填充数据
        this.in_account.text = this.fastName;
        this.in_code.text = '';
    };
    /**
     * 账号登陆
     */
    PageLogin.prototype.showAccountLoginView = function () {
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
            // this.sp_code,
            // this.in_code,
            // this.sp_img_code,
            this.sp_pwd,
            this.in_pwd,
            this.btn_show_pwd,
        ];
        all.forEach(function (sp) { return sp.visible = true; });
        this.isCodeLogin = false;
        //填充数据
        this.in_code.text = '';
        this.in_account.text = '';
        this.in_pwd.text = '';
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
    PageLogin.prototype.showRegisterView = function () {
        //隐藏全部UI
        this.hideAllLoginUI();
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
    };
    /**
     * 现实修改密码
     */
    PageLogin.prototype.showChangePasswordPanel = function () {
        //隐藏全部UI
        this.hideAllLoginUI();
        //重置布局
        //标题
        this.sp_title.skin = "ui/res_login/img_dl_biaotou06.png";
    };
    /**
     * 显示忘记密码页面
     */
    PageLogin.prototype.showForgetPasswordPanel = function () {
        //隐藏全部UI
        this.hideAllLoginUI();
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
    };
    ///////////////////////////////////////////////////////////////////////
    /**
     * 显示或者隐藏密码
     */
    PageLogin.prototype.onShowPwd = function (btn, pwd) {
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
    PageLogin.prototype.doFastLogin = function () {
        var _this = this;
        //转圈圈
        LayaMain.getInstance().showCircleLoading(true);
        HttpRequester.fastLogin(this.fastName, this.password, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) { //成功
                if (jobj.secureLogin == undefined || jobj.secureLogin == true) { //为强账号，可以直接进入大厅
                    _this.saveFastLoginInfo(jobj);
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
        var code = this.in_code.text;
        var verify = Tools.verifyQuickLogin(code);
        if (!verify.bRight) {
            Toast.showToast(Tools.getStringByKey(verify.msg));
            this.askCode();
            return;
        }
        LayaMain.getInstance().showCircleLoading(true);
        HttpRequester.fastLoginWithVC(this.fastName, this.password, code, this.rand, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                _this.saveFastLoginInfo(jobj);
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
    //保存快速登录信息
    PageLogin.prototype.saveFastLoginInfo = function (jobj) {
        Common.loginInfo = jobj;
        Common.loginType = Common.TYPE_LOGIN_QK;
        Common.access_token = jobj.oauthToken.access_token;
        PostMHelp.tokenChange({ "payload": Common.access_token });
        SaveManager.getObj().save(SaveManager.KEY_TOKEN, Common.access_token);
        SaveManager.getObj().save(SaveManager.KEY_LOGIN_TYPE, Common.loginType);
        SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO, Common.loginInfo);
    };
    /**
     * 账号密码登陆
     */
    PageLogin.prototype.doAccountLogin = function () {
        var _this = this;
        var name = this.in_account.text;
        var pwd = this.in_pwd.text;
        var yzm = this.in_code.text;
        PostMHelp.debugInfo({ name: name, pwd: pwd });
        LayaMain.getInstance().showCircleLoading(true);
        HttpRequester.accountLogin(name, pwd, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                if (jobj.secureLogin == undefined || jobj.secureLogin == true) { //登录成功
                    _this.saveAccountLoginInfo(jobj);
                    LayaMain.getInstance().initLobby();
                }
                else { //需要输入验证码
                    _this.sp_code.visible = true;
                    _this.in_code.visible = true;
                    _this.sp_img_code.visible = true;
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
        var name = this.in_account.text;
        var pwd = this.in_pwd.text;
        var yzm = this.in_code.text;
        var verify = Tools.verifyLogin(name, pwd, yzm);
        if (!verify.bRight) {
            Toast.showToast(Tools.getStringByKey(verify.msg));
            this.askCode();
            return;
        }
        LayaMain.getInstance().showCircleLoading(true);
        HttpRequester.accountLoginWithVC(name, pwd, yzm, this.rand, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                _this.saveAccountLoginInfo(jobj);
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
    //保存账户登录信息
    PageLogin.prototype.saveAccountLoginInfo = function (jobj) {
        Common.loginInfo = jobj;
        Common.access_token = jobj.oauthToken.access_token;
        Common.loginType = Common.TYPE_LOGIN_ACCOUNT;
        SaveManager.getObj().save(SaveManager.KEY_TOKEN, Common.access_token);
        SaveManager.getObj().save(SaveManager.KEY_LOGIN_TYPE, Common.loginType);
        SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO, Common.loginInfo);
        PostMHelp.tokenChange({ "payload": Common.access_token });
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
     * 注册账号
     */
    PageLogin.prototype.doRegisterAccount = function () {
        var _this = this;
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
        HttpRequester.registerAccount(name, pwd, code, this.rand.toString(), this, function (suc, jobj) {
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
    return PageLogin;
}(ui.UI.Page.LoginUI));
//# sourceMappingURL=PageLogin.js.map