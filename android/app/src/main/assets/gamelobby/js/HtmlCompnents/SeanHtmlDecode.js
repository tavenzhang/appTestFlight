var SeanHtmlDecode = /** @class */ (function () {
    function SeanHtmlDecode() {
        this.height_max = 0;
        this.width_max = 0;
    }
    SeanHtmlDecode.getInstance = function (confObj) {
        if (!SeanHtmlDecode.obj) {
            var a = new SeanHtmlDecode();
            a.confObj = confObj;
            SeanHtmlDecode.obj = a;
        }
        return SeanHtmlDecode.obj;
    };
    SeanHtmlDecode.prototype.decodeObj2Labels = function (nodes) {
        var hei = 0, wid = 0;
        var a = new Array();
        if (nodes && nodes.length > 0) {
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                var lb = this.newLabel(node);
                a.push(lb);
                if (lb.height > hei) {
                    hei = lb.height;
                }
                if (lb.width > wid) {
                    wid = lb.width;
                }
            }
        }
        this.height_max = hei;
        this.width_max = wid;
        if (a.length <= 0) {
            a = null;
        }
        return a;
    };
    SeanHtmlDecode.prototype.newLabel = function (node) {
        var lb = new SeanLabel();
        lb.setData(node);
        var styles = node.attr;
        var str = node.html;
        lb.align = this.getFontAlign(styles);
        var bgColor = this.getFontBgcolor(styles);
        if (bgColor) {
            lb.bgColor = bgColor;
        }
        lb.bold = this.getFontBold(styles);
        var borderColor = this.getFontBgcolor(styles);
        if (borderColor) {
            lb.borderColor = borderColor;
        }
        lb.color = this.getFontColor(styles);
        lb.font = this.getFontFamily(styles);
        lb.fontSize = this.getFontSize(styles);
        lb.italic = this.getFontItalic(styles);
        lb.leading = this.getFontLeading(styles);
        lb.overflow = this.getFontOverflow(styles);
        lb.padding = this.getFontPadding(styles);
        lb.stroke = this.getFontStroke(styles);
        lb.strokeColor = this.getFontStrokeColor(styles);
        lb.text = str; //this.getTextFrom(str,styles);
        lb.underline = this.getFontUnderline(styles);
        lb.underlineColor = this.getFontUnderlineColor(styles);
        lb.valign = this.getFontValign(styles);
        lb.wordWrap = this.getFontWordwrap(styles);
        return lb;
    };
    SeanHtmlDecode.prototype.getDefaultAttrValue_ = function (attr) {
        var attrs = this.confObj.defaultAttr;
        for (var i = 0; i < attrs.length; i++) {
            var conf = attrs[i];
            var pos = conf.indexOf(attr, 0);
            if (pos == 0) {
                var sls = conf.split("-");
                return sls[1];
            }
        }
        return null;
    };
    SeanHtmlDecode.prototype.getTextFrom = function (str, style) {
        var a = "";
        if (style) {
            var offset = style.offset;
            var len = style.len;
            a = str.substr(offset, len);
        }
        else {
            a = str;
        }
        return a;
    };
    SeanHtmlDecode.prototype.getFontSize = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("fontsize") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return Number(sls[1]);
                    }
                }
            }
        }
        return 18;
    };
    SeanHtmlDecode.prototype.getFontColor = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("fontcolor") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return this.transRGBColor(sls[1]);
                    }
                }
            }
        }
        return "#ffffff";
    };
    SeanHtmlDecode.prototype.CheckIsColor = function (color) {
        var a = color.indexOf("#", 0);
        if (a == 0) {
            return true;
        }
        return false;
    };
    SeanHtmlDecode.prototype.transRGBColor = function (rgb) {
        var isOk = this.CheckIsColor(rgb);
        if (isOk) {
            return rgb;
        }
        var str = rgb.replace("rgb", "");
        str = str.replace("(", "");
        str = str.replace(")", "");
        var arr = str.split(",");
        var result = "#";
        for (var i = 0; i < arr.length; i++) {
            var r = arr[i];
            var hex = this.trans2hex(r);
            result = result + hex;
        }
        return result;
    };
    SeanHtmlDecode.prototype.trans2hex = function (rgb) {
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    };
    SeanHtmlDecode.prototype.getFontUnderline = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("underline") >= 0) {
                    return true;
                }
            }
        }
        return false;
    };
    SeanHtmlDecode.prototype.getFontUnderlineColor = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("fontunderlinecolor") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return this.transRGBColor(sls[1]);
                    }
                }
            }
        }
        var a = "#ffffff";
        return a;
    };
    SeanHtmlDecode.prototype.getFontFamily = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("fontfamily") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return sls[1];
                    }
                }
            }
        }
        return "Arail";
    };
    SeanHtmlDecode.prototype.getFontAlign = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("fontalign") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return sls[1];
                    }
                }
            }
        }
        return "left";
    };
    SeanHtmlDecode.prototype.getFontBgcolor = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("fontbgcolor") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return this.transRGBColor(sls[1]);
                    }
                }
            }
        }
        return null;
    };
    SeanHtmlDecode.prototype.getFontBold = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("fontbold") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    SeanHtmlDecode.prototype.getFontItalic = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("fontitalic") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    SeanHtmlDecode.prototype.getFontLeading = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("fontleading") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return Number(sls[1]);
                    }
                }
            }
        }
        return 0;
    };
    SeanHtmlDecode.prototype.getFontOverflow = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("fontoverflow") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return sls[1];
                    }
                }
            }
        }
        return "visible";
    };
    SeanHtmlDecode.prototype.getFontPadding = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("fontpadding") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return sls[1];
                    }
                }
            }
        }
        return "0,0,0,0";
    };
    SeanHtmlDecode.prototype.getFontStroke = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("fontstroke") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return Number(sls[1]);
                    }
                }
            }
        }
        return 0;
    };
    SeanHtmlDecode.prototype.getFontStrokeColor = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("fontstrokecolor") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return this.transRGBColor(sls[1]);
                    }
                }
            }
        }
        return "#ff0000";
    };
    SeanHtmlDecode.prototype.getFontValign = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("fontvalign") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return sls[1];
                    }
                }
            }
        }
        return "middle";
    };
    SeanHtmlDecode.prototype.getFontWordwrap = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty.indexOf("fontwordwrap") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    SeanHtmlDecode.obj = null;
    return SeanHtmlDecode;
}());
//# sourceMappingURL=SeanHtmlDecode.js.map