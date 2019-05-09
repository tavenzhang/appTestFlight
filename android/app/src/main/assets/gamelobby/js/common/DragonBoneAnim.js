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
/*
* 龙骨动画播放器
* 采用时时加载龙骨动画素材，不需要预加载
*/
var DragonBoneAnim = /** @class */ (function (_super) {
    __extends(DragonBoneAnim, _super);
    function DragonBoneAnim() {
        var _this = _super.call(this) || this;
        _this.mFactory = new Laya.Templet();
        _this.mFactory.on(Laya.Event.COMPLETE, _this, _this.parseComplete);
        _this.mFactory.on(Laya.Event.ERROR, _this, _this.onError);
        return _this;
    }
    /**
     * 动态加载模式初始化(如果动画的显示不需要那么及时，建议使用这种方式)
     * @param vo
     */
    DragonBoneAnim.prototype.loadInit = function (vo) {
        if (vo.playRate == undefined)
            vo.playRate = 1;
        if (vo.autoPlay == undefined)
            vo.autoPlay = true;
        if (vo.loop == undefined)
            vo.loop = true;
        if (vo.loopDelay == undefined)
            vo.loopDelay = 0;
        this._vo = vo;
        this.mFactory.loadAni(vo.skUrl);
    };
    /**
     * 解析模式初始化(需要预加载sk和png文件)
     * @param vo
     */
    DragonBoneAnim.prototype.parseInit = function (vo) {
        if (vo.playRate == undefined)
            vo.playRate = 1;
        if (vo.autoPlay == undefined)
            vo.autoPlay = true;
        if (vo.loop == undefined)
            vo.loop = true;
        if (vo.loopDelay == undefined)
            vo.loopDelay = 0;
        if (vo.pngUrl == undefined || vo.pngUrl == "") {
            console.error("请设置动画png路径");
            return;
        }
        this._vo = vo;
        var text = Laya.Loader.getRes(vo.pngUrl);
        var arrbuffer = Laya.Loader.getRes(vo.skUrl);
        if (!text || !arrbuffer) {
            console.error("动画素材需要预加载：", vo.pngUrl, vo.skUrl);
            return;
        }
        this.mFactory.parseData(text, arrbuffer, 30);
    };
    /**
     * 开始播放
     */
    DragonBoneAnim.prototype.play = function () {
        if (this.mArmature) {
            this.mArmature.play(0, false);
        }
    };
    /**
     * 停止播放
     */
    DragonBoneAnim.prototype.stop = function () {
        if (this.mArmature) {
            this.mArmature.stop();
        }
    };
    DragonBoneAnim.prototype.parseComplete = function () {
        this.mArmature = this.mFactory.buildArmature(0);
        this.mArmature.playbackRate(this._vo.playRate);
        this.addChild(this.mArmature);
        this.mArmature.on(Laya.Event.STOPPED, this, this.playEnd);
        if (this._vo.autoPlay)
            this.play();
    };
    DragonBoneAnim.prototype.playEnd = function () {
        if (this._vo.loop) {
            if (this._vo.loopDelay > 0)
                Laya.timer.once(this._vo.loopDelay, this, this.play);
            else
                this.play();
        }
    };
    DragonBoneAnim.prototype.onError = function (e) {
        console.error("parse-anim-err:", e);
    };
    /**
     * 销毁
     * @param dc
     */
    DragonBoneAnim.prototype.destroy = function (dc) {
        if (dc === void 0) { dc = true; }
        this.stop();
        if (this.mFactory) {
            this.mFactory.off(Laya.Event.COMPLETE, this, this.parseComplete);
            this.mFactory.off(Laya.Event.ERROR, this, this.onError);
            this.mFactory.destroy();
            this.mFactory = null;
        }
        if (this.mArmature) {
            this.mArmature.off(Laya.Event.STOPPED, this, this.playEnd);
            this.mArmature.destroy(true);
            this.mArmature = null;
        }
        _super.prototype.destroy.call(this, dc);
    };
    return DragonBoneAnim;
}(Laya.Sprite));
//# sourceMappingURL=DragonBoneAnim.js.map