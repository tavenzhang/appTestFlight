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
var MyBBLoading = /** @class */ (function (_super) {
    __extends(MyBBLoading, _super);
    function MyBBLoading() {
        var _this = _super.call(this) || this;
        MyBBLoading.obj = _this;
        return _this;
    }
    MyBBLoading.getObj = function () {
        return MyBBLoading.obj;
    };
    MyBBLoading.prototype.destroy = function (b) {
        MyBBLoading.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    //显示加载progress，b 是否显示，tips 要显示的文本，bshow 是否显示半透明背景
    MyBBLoading.showPad = function (node, conf, data) {
        if (data === void 0) { data = null; }
        if (!MyBBLoading.obj) {
            var d = data;
            if (!d) {
                d = {
                    "tips": "正在加载中",
                    "bShowBg": true
                };
            }
            var o = new MyBBLoading();
            o.init(conf, d.tips, d.bShowBg);
            o.pos(conf.pos.x, conf.pos.y);
            node.addChild(o);
            o.father = node;
            o.createSaizi();
        }
        MyBBLoading.obj.show();
    };
    MyBBLoading.prototype.hide = function () {
        this.visible = false;
        MyBBLoading.obj = null;
        this.father.removeChild(this);
        this.destroy(true);
    };
    MyBBLoading.prototype.show = function (b) {
        if (b === void 0) { b = true; }
        _super.prototype.show.call(this, b);
        if (!b) {
            this.hide();
        }
    };
    MyBBLoading.prototype.createSaizi = function () {
        if (this.loadingbg) {
            this.loadingbg.visible = false;
        }
        if (this.loadingft) {
            this.loadingft.visible = false;
        }
        //先加载动画资源
        this.onloadedAnim(null);
        this.startLoading();
    };
    MyBBLoading.prototype.onloadedAnim = function (s) {
        // this.anim_saizi = new Laya.Animation();
        // this.anim_saizi.loadAtlas(this.conf.anim.src); // 加载图集动画
        // this.anim_saizi.interval = this.conf.anim.interval;//30; // 设置播放间隔（单位：毫秒）
        // this.anim_saizi.index = this.conf.anim.index;//1; // 当前播放索引
        // this.anim_saizi.play(); // 播放图集动画
        // this.anim_saizi.pos(
        //     this.conf.anim.pos.x,
        //     this.conf.anim.pos.y
        // );
        // this.addChild(this.anim_saizi);
        this.sp_bbl = Tools.addSprite(this, this.conf.iconshow);
    };
    return MyBBLoading;
}(MyCircleLoading));
//# sourceMappingURL=MyBBLoading.js.map