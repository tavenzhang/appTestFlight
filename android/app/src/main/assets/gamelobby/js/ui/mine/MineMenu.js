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
var MineMenus = /** @class */ (function (_super) {
    __extends(MineMenus, _super);
    function MineMenus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MineMenus.getInstance = function (node, conf) {
        if (MineMenus.obj == null) {
            var d = new MineMenus();
            d.init(conf);
            node.addChild(d);
        }
        return MineMenus.obj;
    };
    MineMenus.prototype.destroy = function (b) {
        MineMenus.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    MineMenus.prototype.init = function (conf) {
        MineMenus.obj = this;
        this.conf = conf;
        if (this.conf.menus) {
            this.btn_menus = new PopMineMenus();
            this.btn_menus.init(this.conf.menus);
            this.addChild(this.btn_menus);
            this.btn_menus.show(this.conf.default.bOpen); //初始进来，不显示
        }
        if (this.conf.switch) {
            this.btn_switch = new MyButton();
            this.btn_switch.init(this.conf.switch, this, this.clickSwitch);
            this.addChild(this.btn_switch);
            if (this.conf.switch.anim) {
                var anim = new MyBoneAnim();
                anim.init(this.conf.switch.anim);
                this.btn_switch.addChild(anim);
                anim.playAnim(0, true);
            }
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    MineMenus.prototype.clickSwitch = function (e) {
        //点击后，检查菜单组是否打开？进行切换
        this.btn_menus.switch();
    };
    MineMenus.obj = null;
    return MineMenus;
}(Laya.Sprite));
//# sourceMappingURL=MineMenu.js.map