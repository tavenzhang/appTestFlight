var MyUid = /** @class */ (function () {
    function MyUid() {
    }
    MyUid.getPlatforms = function () {
        var rs = [];
        if (Laya.Browser.onWP) {
            rs.push(MyUid.KEY_P_WP);
        }
        if (Laya.Browser.onWeiXin) {
            rs.push(MyUid.KEY_P_WX);
        }
        if (Laya.Browser.onSafari) {
            rs.push(MyUid.KEY_P_SAFARI);
        }
        if (Laya.Browser.onQQBrowser) {
            rs.push(MyUid.KEY_P_QQBROWSER);
        }
        if (Laya.Browser.onMQQBrowser) {
            rs.push(MyUid.KEY_P_MQQBROWSER);
        }
        if (Laya.Browser.onMobile) {
            rs.push(MyUid.KEY_P_MOBILE);
        }
        if (Laya.Browser.onMiniGame) {
            rs.push(MyUid.KEY_P_MINIGAME);
        }
        if (Laya.Browser.onMac) {
            rs.push(MyUid.KEY_P_MAC);
        }
        if (Laya.Browser.onLimixiu) {
            rs.push(MyUid.KEY_P_LIMIXIU);
        }
        if (Laya.Browser.onIPhone) {
            rs.push(MyUid.KEY_P_IPHONE);
        }
        if (Laya.Browser.onIPad) {
            rs.push(MyUid.KEY_P_IPAD);
        }
        if (Laya.Browser.onMobile) {
            rs.push(MyUid.KEY_P_MOBILE);
        }
        if (Laya.Browser.onEdge) {
            rs.push(MyUid.KEY_P_EDGE);
        }
        if (Laya.Browser.onIE) {
            rs.push(MyUid.KEY_P_IE);
        }
        if (Laya.Browser.onFirefox) {
            rs.push(MyUid.KEY_P_FIREFOX);
        }
        if (Laya.Browser.onPC) {
            rs.push(MyUid.KEY_P_PC);
        }
        if (Laya.Browser.onIOS) {
            rs.push(MyUid.KEY_P_IOS);
        }
        if (Laya.Browser.onAndroid) {
            rs.push(MyUid.KEY_P_ANDROID);
        }
        if (rs.length <= 0) {
            rs.push(MyUid.KEY_P_UNKNOW);
        }
        return rs;
    };
    MyUid.getPlatform = function () {
        if (Laya.Browser.onPC) {
            return MyUid.KEY_P_PC;
        }
        else if (Laya.Browser.onMac) {
            return MyUid.KEY_P_MAC;
        }
        else if (Laya.Browser.onMobile) {
            return MyUid.KEY_P_MOBILE;
        }
        // return MyUid.KEY_P_UNKNOW;
        return null;
    };
    MyUid.getUid = function () {
        MyUid.uid = SaveManager.getObj().get(SaveManager.KEY_UID, "");
        if (MyUid.uid.length <= 0) {
            MyUid.createUid();
            SaveManager.getObj().save(SaveManager.KEY_UID, MyUid.uid);
        }
        // Debug.trace("getUid:"+MyUid.uid);
        return MyUid.uid;
    };
    MyUid.createUid = function () {
        var b64 = new MyBase64();
        var t = Laya.Browser.now();
        var ua = Laya.Browser.userAgent;
        var str = t + ua;
        // Debug.trace("ua:"+ua);
        // Debug.trace("t:"+t);
        // Debug.trace("str:"+str);
        // MyUid.uid = b64.decode(str);
        // Debug.trace('uid 1:'+MyUid.uid);
        MyUid.uid = btoa(str);
        // var dc = atob(MyUid.uid);
        // Debug.trace('uid:'+MyUid.uid);
        // Debug.trace('dc:'+dc);
    };
    MyUid.uid = "";
    MyUid.KEY_P_MOBILE = "MOBILE";
    MyUid.KEY_P_PC = "PC";
    MyUid.KEY_P_MAC = "MAC";
    MyUid.KEY_P_IOS = "IOS";
    MyUid.KEY_P_ANDROID = "ANDROID";
    MyUid.KEY_P_IPAD = "IPAD";
    MyUid.KEY_P_IPHONE = "IPHONE";
    MyUid.KEY_P_WP = "WP";
    MyUid.KEY_P_QQBROWSER = "QQBROWSER";
    MyUid.KEY_P_MQQBROWSER = "MQQBROWSER";
    MyUid.KEY_P_SAFARI = "SAFARI";
    MyUid.KEY_P_IE = "IE";
    MyUid.KEY_P_FIREFOX = "FIREFOX";
    MyUid.KEY_P_EDGE = "EDGE";
    MyUid.KEY_P_QQ = "QQ";
    MyUid.KEY_P_WX = "WX";
    MyUid.KEY_P_LIMIXIU = "LIMIXIU";
    MyUid.KEY_P_MINIGAME = "MINIGAME";
    MyUid.KEY_P_WAP = "WAP";
    MyUid.KEY_P_UNKNOW = "UNKNOW";
    MyUid.platforms = null;
    return MyUid;
}());
//# sourceMappingURL=MyUid.js.map