var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
    //载入完毕
    LoginScene.prototype.onLoaded = function () {
        LoginScene.obj = this;
        //背景
        var bg = Tools.addSprite(this, ConfObjRead.getConfLogin().bgscene);
        //客服按钮
        var custom = new MyButton();
        custom.init(ConfObjRead.getConfLogin().custom, this, this.onCustomClick);
        custom.pos(ConfObjRead.getConfLogin().custom.pos.x, ConfObjRead.getConfLogin().custom.pos.y);
        this.addChild(custom);
        //登录
        var login = LoginPad.showPad(this, ConfObjRead.getConfLogin().login);
        //注册
        // var reg = RegPad.showPad(this,ConfObjRead.getConfLogin().reg);
    };
    LoginScene.prototype.onCustomClick = function (e) {
        Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom);
    };
    LoginScene.obj = null;
    return LoginScene;
}(MyScene));
//# sourceMappingURL=LoginScene.js.map