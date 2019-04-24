var Toast = /** @class */ (function () {
    function Toast() {
    }
    /**
     * 显示toast
     * @param str
     */
    Toast.showToast = function (str) {
        if (!this.tip) {
            this.tip = new ui.dlg.TipViewUI();
            this.tip.mouseEnabled = false;
            this.tip.centerX = 0;
            this.tip.centerY = 0;
            Laya.stage.addChild(this.tip);
            this.tip.zOrder = Dialog.manager.zOrder + 1;
            this.tip.scale(0, 0);
            Laya.Tween.to(this.tip, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.cubicOut);
        }
        this.tip.infoTxt.text = str;
        Laya.timer.clear(this, this.clear);
        Laya.timer.once(3000, this, this.clear);
    };
    Toast.clear = function () {
        Laya.timer.clear(this, this.clear);
        this.tip && this.tip.destroy(true);
        this.tip = null;
    };
    return Toast;
}());
//# sourceMappingURL=Toast.js.map