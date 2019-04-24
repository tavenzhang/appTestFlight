/*
* name;
*/
var GameUtils = /** @class */ (function () {
    function GameUtils() {
    }
    Object.defineProperty(GameUtils, "posOffset", {
        /**
         * 获取位置偏移量
         */
        get: function () {
            var width = 0;
            //获得屏幕的长宽比
            var bi = Laya.stage.width / Laya.stage.height;
            if (bi < 1.777778) {
                width = this.minGap;
            }
            else if (bi > 2.165333) {
                width = this.maxGap;
            }
            else {
                width = (bi - 1.777778) * (this.maxGap - this.minGap) / (2.165333 - 1.777778) + this.minGap;
            }
            return width;
        },
        enumerable: true,
        configurable: true
    });
    //最小和最大间隔(用于需要全屏适配的ui)
    GameUtils.minGap = 28;
    GameUtils.maxGap = 78;
    return GameUtils;
}());
//# sourceMappingURL=GameUtils.js.map