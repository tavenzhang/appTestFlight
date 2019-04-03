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
var AgentContentDesc = /** @class */ (function (_super) {
    __extends(AgentContentDesc, _super);
    function AgentContentDesc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentContentDesc.prototype.initContent = function () {
        _super.prototype.initContent.call(this);
        this.sp_content = new MySprite();
        this.addChild(this.sp_content);
        if (this.conf.size) {
            this.size(this.conf.size.w, this.conf.size.h);
            this.sp_content.size(this.conf.size.w, this.conf.size.h);
            this.scrollRect = new Laya.Rectangle(0, 0, this.conf.size.w, this.conf.size.h);
            this.on(Laya.Event.MOUSE_DOWN, this, this.onMouseEvent);
        }
        if (this.conf.sprites) {
            var h = 0;
            var len = this.conf.sprites.length;
            for (var i = 0; i < len; i++) {
                var spconf = this.conf.sprites[i];
                if (spconf.type == "list") {
                    var li = new AgentList(this.sp_content, ConfObjRead.getConfListDesc());
                    this.sp_content.addChild(li);
                    li.setData(ConfObjRead.getConfListDescTest());
                    h += li.height;
                }
                else if (spconf.type == "listbottom") {
                    var spb = Tools.addSprite(this.sp_content, spconf);
                    spb.y = h;
                    h += spb.height;
                }
                else {
                    var sp = Tools.addSprite(this.sp_content, spconf);
                    h += sp.height;
                }
            }
            this.sp_content.size(this.conf.size.w, h);
            Debug.trace("AgentContentDesc.initContent h:" + h);
        }
    };
    AgentContentDesc.prototype.onMouseEvent = function (e) {
        var x = e.stageX;
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                var max = this.conf.size.h - this.sp_content.height;
                // Debug.trace("AgentContentDesc.onMouseEvent max:"+max);
                if (max < 0) {
                    this.sp_content.startDrag(new Laya.Rectangle(0, max, 0, Math.abs(max)), this.conf.guanxing, this.conf.xiangpiDis, this.conf.xiangpiTime, null, true, 0.92);
                }
                else {
                    this.sp_content.startDrag(new Laya.Rectangle(0, 0, 0, 0), this.conf.guanxing, this.conf.xiangpiDis, this.conf.xiangpiTime, null, true, 0.92);
                }
                break;
        }
    };
    return AgentContentDesc;
}(AgentContent));
//# sourceMappingURL=AgentContentDesc.js.map