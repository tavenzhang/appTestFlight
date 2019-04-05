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
var LoginScene = /** @class */ (function (_super) {
    __extends(LoginScene, _super);
    function LoginScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginScene.getObj = function () {
        return LoginScene.obj;
    };
    LoginScene.prototype.destroy = function (b) {
        LoginScene.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    LoginScene.prototype.onLoaded = function () {
        LoginScene.obj = this;
        var bg = Tools.addSprite(this, ConfObjRead.getConfLogin().bgscene);
        var sp_shine = new Shining();
        sp_shine.init(ConfObjRead.getConfLogin().login.bg.shine);
        this.addChild(sp_shine);
        if (!AppData.isAndroidHack) {
            var custom = new MyButton();
            custom.init(ConfObjRead.getConfLogin().custom, this, this.onCustomClick);
            custom.pos(ConfObjRead.getConfLogin().custom.pos.x, ConfObjRead.getConfLogin().custom.pos.y);
            this.addChild(custom);
        }
        switch (ConfObjRead.getConfLogin().loginui) {
            case "choose":
                ChooseLogin.showPad(this, ConfObjRead.getConfLoginChoose(), this, this.onClickChoose);
                break;
            case "account":
                LoginPad.showPad(this, ConfObjRead.getConfLogin().login);
                break;
            default:
                LoginPad.showPad(this, ConfObjRead.getConfLogin().login);
                break;
        }
        // var reg = RegPad.showPad(this,ConfObjRead.getConfLogin().reg);
    };
    LoginScene.prototype.onClickChoose = function (cmd) {
        switch (cmd) {
            case "quicklogin":
                ChooseLogin.getObj().destroy(true);
                QuickLogin.showPad(this, ConfObjRead.getConfLoginQuick(), this, this.otherWay);
                break;
            case "accountlogin":
                ChooseLogin.getObj().destroy(true);
                LoginPad.showPad(this, ConfObjRead.getConfLoginOther(), this, this.otherWay);
                break;
        }
    };
    LoginScene.prototype.otherWay = function (cmd) {
        switch (cmd) {
            case "other":
                if (QuickLogin.getObj()) {
                    QuickLogin.getObj().destroy(true);
                }
                if (LoginPad.getObj()) {
                    LoginPad.getObj().destroy(true);
                }
                ChooseLogin.showPad(this, ConfObjRead.getConfLoginChoose(), this, this.onClickChoose);
                break;
        }
    };
    LoginScene.prototype.onCustomClick = function (e) {
        Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "custom");
    };
    LoginScene.obj = null;
    return LoginScene;
}(MyScene));
//# sourceMappingURL=LoginScene.js.map