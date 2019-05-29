/*
* name;
*/
var TabSelectView = /** @class */ (function () {
    function TabSelectView(tab, animPath) {
        if (animPath === void 0) { animPath = null; }
        this.tab = tab;
        this.tab.alpha = 0;
        this.ix = this.tab.x;
        //
        if (animPath) {
            this.anim = new DragonBoneAnim();
            this.anim.loadInit({ skUrl: animPath });
            this.tab.addChild(this.anim);
            this.anim.pos(140, 55);
        }
    }
    TabSelectView.prototype.show = function (iy, tween) {
        if (tween === void 0) { tween = false; }
        this.tab.y = iy;
        if (tween) {
            this.tab.x = this.ix - 30;
            Laya.Tween.clearTween(this.tab);
            Laya.Tween.to(this.tab, { alpha: 1, x: this.ix }, 400);
        }
        else {
            this.tab.alpha = 1;
        }
    };
    TabSelectView.prototype.hide = function () {
        Laya.Tween.clearTween(this.tab);
        Laya.Tween.to(this.tab, { alpha: 0 }, 200);
    };
    TabSelectView.prototype.destroy = function () {
        if (this.tab)
            Laya.Tween.clearTween(this.tab);
        if (this.anim) {
            this.anim.destroy();
            this.anim = null;
        }
    };
    return TabSelectView;
}());
//# sourceMappingURL=TabSelectView.js.map