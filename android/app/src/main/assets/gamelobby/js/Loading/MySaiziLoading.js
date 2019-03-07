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
var MySaiziLoading = /** @class */ (function (_super) {
    __extends(MySaiziLoading, _super);
    function MySaiziLoading() {
        var _this = _super.call(this) || this;
        MySaiziLoading.obj = _this;
        return _this;
    }
    MySaiziLoading.getObj = function () {
        return MySaiziLoading.obj;
    };
    MySaiziLoading.prototype.destroy = function (b) {
        MySaiziLoading.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    //显示加载progress，b 是否显示，tips 要显示的文本，bshow 是否显示半透明背景
    MySaiziLoading.showPad = function (node, conf, data) {
        if (data === void 0) { data = null; }
        if (!MySaiziLoading.obj) {
            var d = data;
            if (!d) {
                d = {
                    "tips": "Loading",
                    "bShowBg": true
                };
            }
            var o = new MySaiziLoading();
            o.init(conf, d.tips, d.bShowBg);
            o.pos(conf.pos.x, conf.pos.y);
            node.addChild(o);
            o.father = node;
            o.createSaizi();
            // o.zOrder = Common.IDX_TOP_LOADING;
        }
        MySaiziLoading.obj.show();
    };
    MySaiziLoading.prototype.hide = function () {
        this.visible = false;
        MySaiziLoading.obj = null;
        // Laya.stage.removeChild(this);
        this.father.removeChild(this);
        this.destroy(true);
        // lamain.restoreLoaderPath();
    };
    MySaiziLoading.prototype.show = function (b) {
        if (b === void 0) { b = true; }
        _super.prototype.show.call(this, b);
        if (!b) {
            this.hide();
        }
    };
    MySaiziLoading.prototype.createSaizi = function () {
        this.loadingbg.visible = false;
        this.loadingft.visible = false;
        //先加载动画资源
        // Laya.loader.load(this.conf.anim.src,new Laya.Handler(this,this.onloadedAnim));
        this.onloadedAnim(null);
    };
    MySaiziLoading.prototype.onloadedAnim = function (s) {
        // Debug.trace('PgBarSaizi onloadedAnim s:');
        // Debug.trace(s);
        this.anim_saizi = new Laya.Animation();
        this.anim_saizi.loadAtlas(this.conf.anim.src); // 加载图集动画
        this.anim_saizi.interval = this.conf.anim.interval; //30; // 设置播放间隔（单位：毫秒）
        this.anim_saizi.index = this.conf.anim.index; //1; // 当前播放索引
        this.anim_saizi.play(); // 播放图集动画
        // 获取动画的边界信息
        // var bounds: Laya.Rectangle = this.anim_saizi.getGraphicBounds();
        // this.anim_saizi.pivot(bounds.width / 2, bounds.height / 2);
        // Debug.trace(bounds);
        this.anim_saizi.pos(this.conf.anim.pos.x, this.conf.anim.pos.y); //Laya.stage.width / 2, Laya.stage.height / 2);
        this.addChild(this.anim_saizi);
        // Debug.trace(this.anim_saizi);
    };
    return MySaiziLoading;
}(MyCircleLoading));
//# sourceMappingURL=MySaiziLoading.js.map