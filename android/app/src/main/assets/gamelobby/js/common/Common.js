var Common = /** @class */ (function () {
    function Common() {
    }
    Common.changePathType = function (n) {
        Common.pathType = n;
    };
    Common.emptyLoginInfo = function () {
        return {
            "strongPwd": true
        };
    };
    Common.canGoinGame = function (roomData) {
        var zhunru = roomData.roomConfig.minScore; // * 100000;
        var balance = Common.userInfo.userBalance.balance;
        // Debug.trace("zhunru:"+zhunru+" balance:"+balance);
        if (zhunru <= balance) {
            //房间准入金额小于我当前拥有的
            //可以进去
            return true;
        }
        return false;
        // return true;
    };
    //根据游戏id找出游戏数据
    Common.getGameDataById = function (id) {
        // Debug.trace("Common getGameDataById:"+id);
        // Debug.trace("Common.gameInfo.datas:");
        // Debug.trace(Common.gameInfo.datas);
        // Debug.trace("Common.gameInfo:");
        // Debug.trace(Common.gameInfo);
        // for(var k in Common.gameInfo)
        for (var k = 0; k < Common.gameInfo.length; k++) {
            var o = Common.gameInfo[k]; //.datas[k];
            if (o.id == id) {
                return o;
            }
        }
        return null;
    };
    //记录当前已经加载的模块
    Common.pushModule = function (src, conf) {
        var mod = {
            "src": src,
            "conf": conf
        };
        Common.moduleLoaded.push(mod);
    };
    //检查模块是否已经被加载
    Common.getModuleLoaded = function (src) {
        // for(var k in Common.moduleLoaded)
        for (var k = 0; k < Common.moduleLoaded.length; k++) {
            var one = Common.moduleLoaded[k];
            if (one.src == src) {
                //有了，已经加载
                return one;
            }
        }
        return null;
    };
    //获取当前游戏的别名
    Common.getCurGameInfo = function (id) {
        if (id === void 0) { id = null; }
        // Common.getAliasFromRoomPanel();
        if (id == null) {
            id = Common.gameId;
        }
        try {
            var glen = Common.gameInfo.length;
            // Debug.traceObj("Common.getCurGameAlias glen:"+glen+" id:"+id);
            // for( var k in Common.gameInfo )
            for (var k = 0; k < glen; k++) {
                var g = Common.gameInfo[k];
                // Debug.trace("Common.getCurGameAlias g.id:"+g.id);
                if (g.id == id) //Common.gameId )
                 {
                    // Debug.trace("Common.getCurGameAlias return g.alias:"+g.alias);
                    //这个就是当前的游戏
                    return g; //.alias;
                }
            }
            Debug.trace("Common.getCurGameAlias return zjh");
            return null;
        }
        catch (e) {
            return null;
        }
    };
    //从房间列表面板提取游戏数据，返回alias
    Common.getAliasFromRoomPanel = function () {
        try {
            Debug.traceObj("Common.getAliasFromRoomPanel:");
            Debug.traceObj(RoomPanel.obj);
            Debug.traceObj(RoomPanel.obj.gamedata);
            // var s = RoomPanel.obj.gamedata;
        }
        catch (e) {
        }
        return "";
    };
    //读取当前默认字体
    Common.getNormalFontByDevice = function () {
        var dv = "";
        //先读取当前的设备
        if (Laya.Browser.onPC) {
            dv = MyUid.KEY_P_PC;
        }
        else if (Laya.Browser.onIOS) {
            dv = MyUid.KEY_P_IOS;
        }
        else if (Laya.Browser.onAndroid) {
            dv = MyUid.KEY_P_ANDROID;
        }
        else if (Laya.Browser.onMac) {
            dv = MyUid.KEY_P_MAC;
        }
        else {
            Common.normalFont = "xxx";
        }
        var plen = ConfObjRead.getConfVersion().platform_font.length;
        for (var k = 0; k < plen; k++) {
            var pf = ConfObjRead.getConfVersion().platform_font[k];
            var ps = pf.platform;
            var pslen = ps.length;
            for (var m = 0; m < pslen; m++) {
                var pname = ps[m];
                if (pname == dv) {
                    Common.normalFont = pf.font;
                    return;
                }
            }
        }
        Common.normalFont = "xxx";
    };
    Common.getLoginPlatform = function () {
        return Common.LOGIN_PLATFORM;
    };
    Common.setLoginPlatform = function (s) {
        Common.LOGIN_PLATFORM = s;
    };
    Common.GM_SCREEN_H = 750;
    Common.GM_SCREEN_W = 1334;
    Common.IDX_TOP_LOADING = 9999;
    Common.IDX_TOP_TOAST = 99999;
    Common.IDX_TOP_DRAW = 99998;
    Common.IDX_BELOW_DRAW = 88888;
    Common.PATH_TYPE_XD = 0;
    Common.PATH_TYPE_JD = 1;
    Common.pathType = Common.PATH_TYPE_XD;
    Common.TYPE_LOGIN_UNKNOW = 0;
    Common.TYPE_LOGIN_QK = 1;
    Common.TYPE_LOGIN_ACCOUNT = 2;
    Common.loginType = 0;
    //当前登录用户令牌
    Common.access_token = "";
    //当前用户是否全新登录
    Common.bNewlogin = true;
    //当前选中的游戏id
    Common.gameId = 0;
    //游戏名字
    // public static alias:string = "";
    //当前游戏的websocket连接地址
    Common.wsUrl = "";
    //当前选中的房间id
    Common.roomId = 0;
    //返回地址，回到大厅地址
    Common.backUrl = "http://192.168.1.145/gamelobby/index.d.html";
    //channel   在config中配置
    Common.channel = "";
    //device 需要结合app的java交互获取
    //浏览器中时，看看结合几个参数标记能不能行
    Common.device = "";
    //当前已经加载的资源和代码目录
    Common.moduleLoaded = new Array();
    //开关音乐音效的时候记录,默认上次音量是满的
    //上次的音乐音量
    Common.lastMusicVolume = 1;
    //上次的音效音量
    Common.lastSoundVolume = 1;
    //音效开还是关
    Common.bSoundSwitch = true;
    //帮助配置
    Common.confHelp = null;
    //默认的字体
    Common.normalFont = null;
    //当前登录设备
    Common.LOGIN_PLATFORM = "";
    return Common;
}());
//# sourceMappingURL=Common.js.map