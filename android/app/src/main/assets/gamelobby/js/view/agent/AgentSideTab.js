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
var AgentSideTab = /** @class */ (function (_super) {
    __extends(AgentSideTab, _super);
    function AgentSideTab() {
        return _super.call(this) || this;
    }
    AgentSideTab.prototype.init = function ($image) {
        this.tab_on = $image.getChildByName("tab_on");
        this.tab_on.alpha = 0;
        var db = this.db = new DragonBoneAnim();
        db.loadInit({ skUrl: "./assets/animation/agent/btn.sk" });
        this.tab_on.addChildAt(db, 0);
        db.x = 180;
        db.y = 55;
    };
    AgentSideTab.prototype.destroy = function () {
        if (this.db) {
            this.db.destroy(true);
        }
    };
    return AgentSideTab;
}(DlgSideTab));
//# sourceMappingURL=AgentSideTab.js.map