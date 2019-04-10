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
var LoadingAnim = /** @class */ (function (_super) {
    __extends(LoadingAnim, _super);
    function LoadingAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.delay = 1000;
        _this.str_show_head = "Loading";
        _this.str_show_end = [
            ".",
            "..",
            "..."
        ];
        _this.frameId = 0;
        return _this;
    }
    LoadingAnim.prototype.init = function (str, w, h, fts, ftc, al, val) {
        if (fts === void 0) { fts = 24; }
        if (ftc === void 0) { ftc = "#000000"; }
        if (al === void 0) { al = "center"; }
        if (val === void 0) { val = "middle"; }
        this.lb_loading = Tools.newLabel("", w, h, fts, ftc, al, val);
        this.addChild(this.lb_loading);
    };
    LoadingAnim.prototype.startAnim = function () {
        Laya.timer.loop(this.delay, this, this.loopAnim);
    };
    LoadingAnim.prototype.stopAnim = function () {
        Laya.timer.clear(this, this.loopAnim);
    };
    LoadingAnim.prototype.loopAnim = function () {
        this.frameId += 1;
        if (this.frameId >= 3) {
            this.frameId = 0;
        }
        var endstr = this.str_show_end[this.frameId];
        var str = this.str_show_head + endstr;
        this.lb_loading.text = Tools.getStringByKey(str);
    };
    LoadingAnim.prototype.setText = function (str) {
        this.str_show_head = str;
        var endstr = this.str_show_end[this.frameId];
        var str = this.str_show_head + endstr;
        this.lb_loading.text = Tools.getStringByKey(str);
    };
    LoadingAnim.prototype.show = function (b) {
        this.visible = b;
        // Debug.trace('show loading anim b:'+b);
    };
    LoadingAnim.prototype.isShow = function () {
        return this.visible;
    };
    return LoadingAnim;
}(MySprite));
//# sourceMappingURL=LoadingAnim.js.map