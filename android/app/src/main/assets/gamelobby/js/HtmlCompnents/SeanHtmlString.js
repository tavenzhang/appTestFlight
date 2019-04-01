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
var SeanHtmlString = /** @class */ (function (_super) {
    __extends(SeanHtmlString, _super);
    function SeanHtmlString(str_html, src_conf) {
        var _this = _super.call(this) || this;
        _this.str_html = "";
        _this.src_conf = "";
        _this.str_html = str_html;
        _this.src_conf = src_conf;
        _this.init();
        return _this;
    }
    SeanHtmlString.prototype.init = function () {
        Laya.loader.load(this.src_conf, Laya.Handler.create(this, this.onConfLoaded, [this.src_conf]), null, Laya.Loader.JSON);
    };
    SeanHtmlString.prototype.onConfLoaded = function (p) {
        this.confObj = Laya.loader.getRes(p);
        if (this.confObj) {
            this.create();
        }
        else {
            Debug.error("Can not read the html conf lib check the path:" + this.src_conf);
        }
    };
    SeanHtmlString.prototype.create = function () {
        var strObj = SeanHtmlEncode.getInstance(this.confObj).encodeHtml2Obj(this.str_html);
        if (!strObj) {
            Debug.error("SeanHtmlString.create error no strObj");
            return;
        }
        var arr_labels = SeanHtmlDecode.getInstance(this.confObj).decodeObj2Labels(strObj);
        if (!arr_labels) {
            Debug.error("SeanHtmlString.create error no arr_labels");
            return;
        }
        var lastX = 0;
        var lastW = 0;
        var w = 0;
        var h = 0;
        var hei_m = SeanHtmlDecode.obj.height_max;
        var wid_m = SeanHtmlDecode.obj.width_max;
        var x = 0, y = 0;
        var ix = 0, iy = 0, lineH = this.confObj.defaultParam.lineheight;
        for (var i = 0; i < arr_labels.length; i++) {
            var l = arr_labels[i];
            // x = ix + lastX + lastW;
            // y = hei_m - l.height;
            var bWrap = false;
            if (l.isWrap()) {
                ix = 0;
                lastX = 0;
                lastW = 0;
                iy = iy + hei_m + lineH;
                bWrap = true;
                // Debug.trace("SeanHtmlString.create isWrap text:"+l.text);
            }
            else {
                bWrap = false;
            }
            var indentSum = l.getIndent();
            if (indentSum > 0) {
                var sumx = indentSum * this.confObj.defaultParam.emOffset;
                ix += sumx;
                // Debug.trace("SeanHtmlString.create sumx:"+sumx+" ix:"+ix+" lastX:"+lastX);
            }
            x = ix + lastX + lastW;
            y = iy + hei_m - l.height;
            if (indentSum > 0) {
                ix = 0;
            }
            // Debug.trace("SeanHtmlString.create x:"+x+" y:"+y);
            // Debug.trace("SeanHtmlString.create ix:"+ix+" iy:"+iy);
            // Debug.trace("SeanHtmlString.create lastX:"+lastX+" lastW:"+lastW);
            l.pos(x, y);
            this.addChild(l);
            lastX = x;
            lastW = l.width;
            w += l.width;
            if (l.height > h) {
                h = l.height;
            }
        }
        this.size(w, h);
    };
    SeanHtmlString.prototype.getWidth = function () {
        return this.width;
    };
    return SeanHtmlString;
}(Laya.Sprite));
//# sourceMappingURL=SeanHtmlString.js.map