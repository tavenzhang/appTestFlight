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
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var EmbedLoadingView = /** @class */ (function (_super) {
        __extends(EmbedLoadingView, _super);
        function EmbedLoadingView() {
            var _this = _super.call(this) || this;
            //
            _this.mouseEnabled = true;
            //初始化动画
            _this.anim = new DragonBoneAnim();
            _this.anim.parseInit({ skUrl: "./assets/animation/loading/xiaoLoding.sk", pngUrl: "./assets/animation/loading/xiaoLoding.png" });
            _this.animBox.addChild(_this.anim);
            //初始化遮罩
            _this.bgMask = new Laya.Sprite();
            _this.addChildAt(_this.bgMask, 0);
            //
            _this.visible = true;
            return _this;
        }
        /**
         * 嵌入
         * @param embedBox 需要嵌入的Box
         * @param alp 遮罩alpha
         */
        EmbedLoadingView.prototype.EmbedBox = function (embedBox, alp) {
            if (alp === void 0) { alp = 0.5; }
            //开始嵌入
            embedBox.addChild(this);
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
            //设置遮罩
            this.bgMask.alpha = alp;
            this.bgMask.graphics.drawRect(0, 0, embedBox.width, embedBox.height, "#000000");
        };
        EmbedLoadingView.prototype.destroy = function () {
            if (this.anim) {
                this.anim.destroy();
                this.anim = null;
            }
            _super.prototype.destroy.call(this, true);
        };
        return EmbedLoadingView;
    }(ui.EmbedLoadingViewUI));
    view.EmbedLoadingView = EmbedLoadingView;
})(view || (view = {}));
//# sourceMappingURL=EmbedLoadingView.js.map