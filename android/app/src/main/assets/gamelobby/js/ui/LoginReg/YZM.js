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
var YZM = /** @class */ (function (_super) {
    __extends(YZM, _super);
    function YZM() {
        return _super.call(this) || this;
    }
    YZM.prototype.init = function (node, conf) {
        this.conf = conf;
        this.fatherNode = node;
        this.imgYanzhengma = this.newYanzhengma(this.fatherNode, this.conf);
    };
    YZM.prototype.newYanzhengma = function (node, conf) {
        switch (YZM.pathType) {
            case YZM.PATH_TYPE_XD:
                return this.newYanzhengma_xiangdui(node, conf);
            default:
                return this.newYanzhengma_juedui(node, conf);
        }
    };
    YZM.prototype.refresh = function () {
        this.onYanzhengmaFocus(this.fatherNode);
    };
    YZM.prototype.onYanzhengmaFocus = function (node) {
        this.clearYanzhengma(node);
        // Debug.trace("focus on yanzhengma");
        this.imgYanzhengma = this.newYanzhengma(node, this.conf);
    };
    YZM.prototype.clearYanzhengma = function (node) {
        // if( this.imgYanzhengma )
        // {
        //     node.removeChild(this.imgYanzhengma);
        //     this.imgYanzhengma.destroy(true);
        //     this.imgYanzhengma = null;
        // }
    };
    YZM.prototype.newYanzhengma_xiangdui = function (node, conf) {
        var img;
        if (this.imgYanzhengma) {
            img = this.imgYanzhengma;
        }
        else {
            img = new Laya.Image();
            img.on(Laya.Event.CLICK, this, this.onYanzhengmaFocus, [node]);
            img.pos(conf.pos.x, conf.pos.y);
            img.size(conf.size.w, conf.size.h);
            node.addChild(img);
        }
        this.yanzhengma_root = Math.random();
        // img.pos(conf.pos.x,conf.pos.y);
        // img.size(conf.size.w,conf.size.h);
        // Debug.trace("RegPad.newYanzhengma root:"+this.yanzhengma_root);
        var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.yanzhengma + "" + this.yanzhengma_root;
        // Debug.trace("RegPad.newYanzhengma url:"+url);
        img.skin = url;
        // img.on(Laya.Event.CLICK,this,this.onYanzhengmaFocus,[node]);
        // node.addChild(img);
        return img;
    };
    YZM.prototype.newYanzhengma_juedui = function (node, conf) {
        var img;
        if (this.imgYanzhengma) {
            img = this.imgYanzhengma;
        }
        else {
            img = new Laya.Image();
            img.on(Laya.Event.CLICK, this, this.onYanzhengmaFocus, [node]);
            img.pos(conf.pos.x, conf.pos.y);
            img.size(conf.size.w, conf.size.h);
            node.addChild(img);
        }
        this.yanzhengma_root = Math.random();
        // img.pos(conf.pos.x,conf.pos.y);
        // img.size(conf.size.w,conf.size.h);
        Debug.trace("RegPad.newYanzhengma root:" + this.yanzhengma_root);
        var url = Tools.getCurHost(Tools.getCurFullPath()); //+"/";
        var ext = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.yanzhengma + "" + this.yanzhengma_root;
        if (ext.indexOf("../") == 0) {
            ext = ext.substr(3, ext.length);
        }
        url = url + ext;
        Debug.trace("RegPad.newYanzhengma url:" + url);
        img.skin = url;
        // img.on(Laya.Event.CLICK,this,this.onYanzhengmaFocus,[node]);
        // node.addChild(img);
        return img;
    };
    YZM.prototype.getRandomRoot = function () {
        Debug.trace("YZM.getRandomRoot:" + this.yanzhengma_root);
        return "" + this.yanzhengma_root;
    };
    YZM.PATH_TYPE_XD = 0;
    YZM.PATH_TYPE_JD = 1;
    YZM.pathType = YZM.PATH_TYPE_XD;
    return YZM;
}(MySprite));
//# sourceMappingURL=YZM.js.map