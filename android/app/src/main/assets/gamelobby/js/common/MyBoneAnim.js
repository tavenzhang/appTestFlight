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
var MyBoneAnim = /** @class */ (function (_super) {
    __extends(MyBoneAnim, _super);
    function MyBoneAnim() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyBoneAnim.getInstance = function (conf) {
        if (!MyBoneAnim.obj) {
            var a = new MyBoneAnim();
            a.init(conf);
        }
        return MyBoneAnim.obj;
    };
    MyBoneAnim.prototype.destroy = function (b) {
        MyBoneAnim.obj = null;
        if (this.mFactory)
            this.mFactory.off(Laya.Event.COMPLETE, this, this.parseComplete);
        if (this.mArmature)
            this.mArmature.off(Laya.Event.STOPPED, this, this.animationStop);
        this.stopAnim();
        _super.prototype.destroy.call(this, b);
    };
    MyBoneAnim.prototype.setListener = function (caller, callback, data) {
        this.caller = caller;
        this.callback = callback;
        this.data = data;
    };
    MyBoneAnim.prototype.init = function (conf) {
        this.conf = conf;
        MyBoneAnim.obj = this;
        var text = Laya.Loader.getRes(this.conf.textPath);
        var arrbuffer = Laya.Loader.getRes(this.conf.animPath);
        // Debug.trace("text:"+this.conf.textPath);
        // Debug.trace("arrbuffer:"+this.conf.animPath);
        this.mFactory = new Laya.Templet();
        this.mFactory.on(Laya.Event.COMPLETE, this, this.parseComplete);
        this.mFactory.parseData(text, arrbuffer, 10);
        // this.visible = false;
    };
    MyBoneAnim.prototype.parseComplete = function () {
        this.mArmature = this.mFactory.buildArmature();
        this.mArmature.x = this.conf.pos.x;
        this.mArmature.y = this.conf.pos.y;
        this.mArmature.playbackRate(this.conf.playSpeed);
        this.mArmature.on(Laya.Event.STOPPED, this, this.animationStop);
        this.addChild(this.mArmature);
    };
    MyBoneAnim.prototype.setPlaySpd = function (spd) {
        this.mArmature.playbackRate(spd);
    };
    MyBoneAnim.prototype.animationStop = function () {
        this.stopAnim();
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, [this.data]);
        }
        if (this.conf.loopdelay) {
            // Debug.trace("animationStop once playAgain");
            Laya.timer.once(this.conf.loopdelay, this, this.playAgain);
        }
    };
    MyBoneAnim.prototype.playAgain = function () {
        // Debug.trace("playAgain");
        this.playAnim(0, true);
    };
    MyBoneAnim.prototype.stopAnim = function () {
        if (this.conf.stopHide) {
            this.visible = this.conf.stopHide.value;
        }
        else {
            this.visible = false;
        }
        if (this.mArmature)
            this.mArmature.stop();
    };
    MyBoneAnim.prototype.playAnim = function (n, b) {
        if (this.conf.loopdelay) {
            // Debug.trace("playAnim have loopdelay");
            this.mArmature.play(0, false);
        }
        else {
            this.mArmature.play(n, b);
        }
        this.visible = true;
    };
    MyBoneAnim.obj = null;
    return MyBoneAnim;
}(MySprite));
//# sourceMappingURL=MyBoneAnim.js.map