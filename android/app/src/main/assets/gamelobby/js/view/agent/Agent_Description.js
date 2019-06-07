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
var Agent_Description = /** @class */ (function (_super) {
    __extends(Agent_Description, _super);
    function Agent_Description() {
        return _super.call(this) || this;
    }
    Agent_Description.prototype.init = function () {
        this.DragArea.scrollRect = new Laya.Rectangle(0, 0, this.DragArea.width, this.DragArea.height);
        this.dragObj.on(Laya.Event.MOUSE_DOWN, this, this.onDrag);
        this.on(Laya.Event.MOUSE_UP, this, this.onDrag);
        this.on(Laya.Event.MOUSE_MOVE, this, this.onDrag);
        this.isDrag = false;
        this.customerService.text = AgentData.customerServiceUrl || "";
        this._minY = -(this.dragObj.height - this.DragArea.height) - 10;
        if (this.customerService.text === "") {
            this.DragArea.y = 0;
        }
        else {
            this.DragArea.y = this.customerService.height;
            this._minY -= this.customerService.height;
        }
    };
    Agent_Description.prototype.onDrag = function ($e) {
        var x = $e.stageX;
        var y = $e.stageY;
        switch ($e.type) {
            case Laya.Event.MOUSE_DOWN: {
                this.moveX = x;
                this.moveY = y;
                this.initY = this.dragObj.y;
                break;
            }
            case Laya.Event.MOUSE_UP: {
                if (this.isDrag) {
                    this.isDrag = false;
                    this.moveX = 0;
                    this.moveY = 0;
                    this.handlePositions();
                    // this.listInitY = null;
                }
                break;
            }
            case Laya.Event.MOUSE_MOVE: {
                this.isDrag = true;
                if (this.moveY > 0) {
                    var move = y - this.moveY;
                    this.moveY = y;
                    this.dragObj.y += move;
                }
                break;
            }
        }
    };
    Agent_Description.prototype.handlePositions = function () {
        switch (true) {
            case this.dragObj.y > 0: {
                Laya.Tween.to(this.dragObj, { y: 0 }, 100);
                break;
            }
            case this.dragObj.y < this._minY: {
                Laya.Tween.to(this.dragObj, { y: this._minY }, 100);
                break;
            }
        }
    };
    Agent_Description.prototype.destroy = function (destroyChild) {
        this.dragObj.off(Laya.Event.MOUSE_DOWN, this, this.onDrag);
        this.off(Laya.Event.MOUSE_UP, this, this.onDrag);
        this.off(Laya.Event.MOUSE_MOVE, this, this.onDrag);
        _super.prototype.destroy.call(this, destroyChild);
    };
    return Agent_Description;
}(ui.dlg.agent.Agent_DescriptionUI));
//# sourceMappingURL=Agent_Description.js.map