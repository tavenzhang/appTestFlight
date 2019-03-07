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
        this.mArmature.playbackRate(this.conf.playSpeed); //播放速度 默认 1 
        // if( this.conf.loop )
        // {
        //     this.mArmature.play(0,true);
        // }else{
        //     this.mArmature.play(0,false);
        //     this.mArmature.on(Laya.Event.STOPPED,this,this.animationStop);
        // }
        this.mArmature.on(Laya.Event.STOPPED, this, this.animationStop);
        this.addChild(this.mArmature);
    };
    //设置播放速度
    MyBoneAnim.prototype.setPlaySpd = function (spd) {
        this.mArmature.playbackRate(spd);
    };
    //动画播放完毕
    MyBoneAnim.prototype.animationStop = function () {
        //播放完毕后干嘛？等服务器发牌
        this.stopAnim();
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, [this.data]);
        }
        //如果有循环间隔
        if (this.conf.loopdelay) {
            // Debug.trace("animationStop once playAgain");
            Laya.timer.once(this.conf.loopdelay, this, this.playAgain);
        }
    };
    //时间间隔到了，重新播放一次
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
    };
    MyBoneAnim.prototype.playAnim = function (n, b) {
        //如果是有循环播放间隔的
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
}(Laya.Sprite));
//# sourceMappingURL=MyBoneAnim.js.map