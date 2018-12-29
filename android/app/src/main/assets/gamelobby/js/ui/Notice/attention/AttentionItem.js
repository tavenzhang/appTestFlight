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
var AttentionItem = /** @class */ (function (_super) {
    __extends(AttentionItem, _super);
    function AttentionItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AttentionItem.prototype.init = function (root, conf, sortid) {
        //配置
        this.root = root;
        this.conf = conf;
        this.btnswitch = new MySwitchBtn();
        this.btnswitch.init(this.conf.switch, this, this.btnClick);
        this.addChild(this.btnswitch);
        this.btnswitch.setOn(0, false);
        this.lb_game = Tools.addLabels(this, this.conf.lbGame);
        this.lb_title = Tools.addLabels(this, this.conf.lbGameContent);
        this.markNew = Tools.addSprite(this, this.conf.markNew);
        this.markNew.visible = false;
        var y = this.conf.pos.y + sortid * (this.conf.switch.size.h + this.conf.switch.size.gh);
        this.pos(this.conf.pos.x, y);
        this.setChoosed(false);
        // this.setReaded(false);
    };
    AttentionItem.prototype.setOn = function (id) {
        if (id == 0) {
            this.setChoosed(false);
        }
        else if (id == 1) {
            this.setChoosed(true);
        }
        this.btnswitch.setOn(id);
    };
    AttentionItem.prototype.btnClick = function (a) {
        // Debug.trace("btnClick");
        // Debug.trace(a);
        this.root.changeTab(this.data.noticeid);
        this.setReaded(true);
    };
    AttentionItem.prototype.setData = function (data) {
        this.data = data;
        if (this.lb_game) {
            this.lb_game.text = this.data.game;
        }
        if (this.lb_title) {
            this.lb_title.text = this.data.title;
        }
        this.setReaded(this.data.bRead);
    };
    AttentionItem.prototype.setChoosed = function (b) {
        if (b) {
            if (this.lb_game) {
                this.lb_game.color = this.conf.lbGame.font.color;
            }
            if (this.lb_title) {
                this.lb_title.color = this.conf.lbGameContent.font.color;
            }
        }
        else {
            if (this.lb_game) {
                this.lb_game.color = this.conf.lbGame.unchoose.color;
            }
            if (this.lb_title) {
                this.lb_title.color = this.conf.lbGameContent.unchoose.color;
            }
        }
    };
    AttentionItem.prototype.setReaded = function (b) {
        this.markNew.visible = !b;
        // Debug.trace("b:"+b+" bRead:"+this.data.bRead+" cateid:"+this.cateId);
        if (b && !this.data.bRead) {
            //通知服务器，已读
            this.data.bRead = true;
            //减少该分类总数
            AttentionDialog.getObj().refreshDataUnread(this.cateId); //this.data.noticeid);
        }
    };
    return AttentionItem;
}(Laya.Sprite));
//# sourceMappingURL=AttentionItem.js.map