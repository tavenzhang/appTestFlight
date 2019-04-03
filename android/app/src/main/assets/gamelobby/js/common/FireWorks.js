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
var FireWorks = /** @class */ (function (_super) {
    __extends(FireWorks, _super);
    function FireWorks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FireWorks.prototype.init = function (conf) {
        this.conf = conf;
        this.arr_fws = new Array();
        for (var a = 0; a < this.conf.num; a++) {
            var f = new MyBoneAnim();
            f.init(this.conf.anim);
            this.addChild(f);
            // var time = this.randomTime();
            // Laya.timer.once(time,this,this.playAnim,[f]);
            var spd = this.randomSpd();
            f.setPlaySpd(spd);
            var pos = this.randomPos();
            f.pos(pos.x, pos.y);
            var color = this.randomColor();
            this.filterColor(f, color);
            // Debug.trace("firwWorks pos x:"+pos.x+" y:"+pos.y);
            // Debug.trace("color :");
            // Debug.trace(color);
            f.playAnim(0, true);
            this.arr_fws.push(f);
        }
    };
    FireWorks.prototype.randomSpd = function () {
        var rd = (Math.random() * 99999) % this.conf.maxspd + this.conf.minspd;
        // Debug.trace("randomSpd :"+rd);
        return rd;
    };
    FireWorks.prototype.playAnim = function (f) {
        // Debug.trace("playAnim f:");
        // Debug.trace(f);
        f.playAnim(0, true);
    };
    FireWorks.prototype.randomTime = function () {
        var rd = (Math.random() * 99999) % this.conf.timeOffset;
        return rd;
    };
    FireWorks.prototype.randomPos = function () {
        var rdx = (Math.random() * 99999) % this.conf.pos.maxx + this.conf.pos.minx;
        var rdy = (Math.random() * 99999) % this.conf.pos.maxy + this.conf.pos.miny;
        return { "x": rdx, "y": rdy };
    };
    FireWorks.prototype.randomColor = function () {
        var rd = Math.floor((Math.random() * 99999) % this.conf.color.length);
        // Debug.trace('randomColor rd:'+rd);
        return this.conf.color[rd];
    };
    FireWorks.prototype.filterColor = function (tg, color) {
        // var redMat = [
        // 	1,0,0,0,0,	//R
        // 	0,0,0,0,0,	//G
        // 	0,0,0,0,0,	//B
        // 	0,0,0,1,0,	//A
        // ];
        var redMat = color;
        var redfilter = new Laya.ColorFilter(redMat);
        tg.filters = [redfilter];
    };
    return FireWorks;
}(MySprite));
//# sourceMappingURL=FireWorks.js.map