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
var MineMenus = /** @class */ (function (_super) {
    __extends(MineMenus, _super);
    function MineMenus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MineMenus.getInstance = function (node, conf) {
        if (MineMenus.obj == null) {
            // Debug.trace("MineMenu.getInstance obj null");
            var d = new MineMenus();
            d.init(conf);
            node.addChild(d);
        }
        // Debug.trace("MineMenu.getInstance obj:");
        // Debug.trace(MineMenus.obj);
        return MineMenus.obj;
    };
    MineMenus.prototype.destroy = function (b) {
        MineMenus.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    MineMenus.prototype.init = function (conf) {
        MineMenus.obj = this;
        this.conf = conf;
        // Debug.trace("MineMenu.init 0");
        if (this.conf.menus) {
            // Debug.trace("MineMenu.init 1");
            this.btn_menus = new PopMineMenus();
            this.btn_menus.init(this.conf.menus);
            this.addChild(this.btn_menus);
            this.btn_menus.show(this.conf.default.bOpen);
        }
        if (this.conf.switch) {
            // Debug.trace("MineMenu.init 3");
            this.btn_switch = new MyButton();
            this.btn_switch.init(this.conf.switch, this, this.clickSwitch);
            this.addChild(this.btn_switch);
            this.btn_switch.btn_ui.alpha = this.conf.switch.alpha;
            // Debug.trace("MineMenu.init 4");
            if (this.conf.switch.anim) {
                // Debug.trace("MineMenu.init 5");
                var anim = new MyBoneAnim();
                anim.init(this.conf.switch.anim);
                this.addChild(anim);
                anim.playAnim(0, true);
                // Debug.trace("MineMenu.init 6");
            }
            // Debug.trace("MineMenu.init 7");
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
        // Debug.trace("MineMenu.init 8");
    };
    MineMenus.prototype.clickSwitch = function (e) {
        // this.btn_menus.switch();
        Tools.jump2module(ConfObjRead.getConfUrl().url.g_recharge, "recharge");
    };
    MineMenus.obj = null;
    return MineMenus;
}(MySprite));
//# sourceMappingURL=MineMenu.js.map