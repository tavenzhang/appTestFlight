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
var ProgressPie = /** @class */ (function (_super) {
    __extends(ProgressPie, _super);
    function ProgressPie() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initRotation = 130;
        _this.startAngle = 120;
        _this.endAngle = 360; //120;
        _this.stepAngle = 5;
        return _this;
    }
    ProgressPie.prototype.init = function () {
        this.bg0 = new Laya.Sprite();
        this.bg0.loadImage("./assets/ui/img_game_progress_02.png");
        this.addChild(this.bg0);
        this.sp_mask = new Laya.Sprite();
        this.drawPie(this.startAngle, this.endAngle, 102, 102, 102);
        // this.addChild(this.sp_mask);
        this.bgProgress = new Laya.Sprite();
        this.bgProgress.loadImage("./assets/ui/img_game_progress_01.png");
        this.bgProgress.pivot(102, 102);
        this.bgProgress.pos(102, 102);
        this.addChild(this.bgProgress);
        this.bgProgress.rotation = this.initRotation;
        // Debug.trace('bp w:'+this.bgProgress.width+" h:"+this.bgProgress.height);
        this.bgProgress.mask = this.sp_mask;
        // this.sp_mask = this.bgProgress;
        // this.bgProgress.mask = this.bg0;
        // this.bg0.mask = this.bgProgress;
        // Laya.timer.loop(100,this,this.drawLoop);
        // Laya.timer.loop(100,this,this.rotateProgress);
    };
    ProgressPie.prototype.drawPie = function (start, end, x, y, r) {
        // this.sp_mask.graphics.clear();
        this.sp_mask.graphics.drawPie(x, y, r, start, end, "#ff0000", "#ff0000", 0);
        // this.sp_mask.size(204,204);
        // Debug.trace('w:'+this.sp_mask.width+" h:"+this.sp_mask.height);
    };
    ProgressPie.prototype.rotateProgress = function () {
        this.bgProgress.rotation += this.stepAngle;
        // this.bgProgress.mask = this.sp_mask;
        if (this.bgProgress.rotation >= 360) {
            // Debug.trace('stop rotate');
            Laya.timer.clear(this, this.rotateProgress);
        }
    };
    ProgressPie.prototype.drawLoop = function () {
        // this.startAngle += this.stepAngle;
        this.endAngle += this.stepAngle;
        var x = 102;
        var y = 102;
        var r = 102;
        // Debug.trace('drawLoop startAngle:'+this.startAngle+' endAngle:'+this.endAngle+" x:"+x+" y:"+y+" r:"+r);
        this.drawPie(this.startAngle, this.endAngle, x, y, r);
        // this.bgProgress.rotation += this.stepAngle;
        // this.bgProgress.mask = this.sp_mask;
        if (this.endAngle >= 360) {
            // Debug.trace('stop draw pie');
            Laya.timer.clear(this, this.drawLoop);
        }
    };
    return ProgressPie;
}(Laya.Sprite));
//# sourceMappingURL=ProgressPie.js.map