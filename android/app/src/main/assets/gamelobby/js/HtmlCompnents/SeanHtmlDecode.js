/*
Author : sean.guo49@gmail.com
create : 20190118
Features : Read json Object and create LayaAir Labels
*/
var SeanHtmlDecode = /** @class */ (function () {
    function SeanHtmlDecode() {
        this.height_max = 0; //单个标签的最大高度
        this.width_max = 0; //单个标签的最大宽度
    }
    SeanHtmlDecode.getInstance = function (confObj) {
        if (!SeanHtmlDecode.obj) {
            var a = new SeanHtmlDecode();
            a.confObj = confObj;
            SeanHtmlDecode.obj = a;
        }
        return SeanHtmlDecode.obj;
    };
    //对编码过的html的json对象进行解码并转为Label数组
    SeanHtmlDecode.prototype.decodeObj2Labels = function (nodes) {
        // Debug.trace("SeanHtmlDecode.decodeObj2Labels nodes:");
        // Debug.trace(nodes);
        //记录高度
        var hei = 0, wid = 0;
        //逐个解析样式，并构造对应的Label并添加到数组中
        var a = new Array();
        //没有样式的时候，就是默认的纯文本内容
        if (nodes && nodes.length > 0) {
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                //取出一个节点，构造一个label
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
    //根据一个样式，构造一个Label
    SeanHtmlDecode.prototype.newLabel = function (node) {
        var lb = new SeanLabel(); //new Laya.Label();
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
    //从默认属性中提取一个值
    SeanHtmlDecode.prototype.getDefaultAttrValue_ = function (attr) {
        var attrs = this.confObj.defaultAttr;
        for (var i = 0; i < attrs.length; i++) {
            var conf = attrs[i];
            //分析该配置是否所选
            var pos = conf.indexOf(attr, 0);
            if (pos == 0) {
                //选中了
                var sls = conf.split("-");
                return sls[1];
            }
        }
        return null;
    };
    //提取出对应位置的字符串
    SeanHtmlDecode.prototype.getTextFrom = function (str, style) {
        var a = "";
        if (style) {
            var offset = style.offset;
            var len = style.len;
            a = str.substr(offset, len);
        }
        else {
            //没有样式的时候，说明全是文本
            a = str;
        }
        return a;
    };
    //从样式里取出字体尺寸
    SeanHtmlDecode.prototype.getFontSize = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                //查找字符串里面是否有fontsize字样
                if (sty.indexOf("fontsize") >= 0) {
                    //切分，取出数值
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return Number(sls[1]);
                    }
                }
            }
        }
        //没有的时候，就默认一个字体大小
        return 18; // return this.getDefaultAttrValue("fontsize");
    };
    //从样式里取出字体尺寸
    SeanHtmlDecode.prototype.getFontColor = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                // Debug.trace("SeanHtmlDecode.getFontColor sty i:"+i+" :"+sty);
                //查找字符串里面是否有fontsize字样
                if (sty.indexOf("fontcolor") >= 0) {
                    //切分，取出数值
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return this.transRGBColor(sls[1]);
                    }
                }
            }
        }
        //没有的时候，就默认一个
        return "#ffffff"; //return this.getDefaultAttrValue("fontcolor");
    };
    //检测颜色是否合法
    SeanHtmlDecode.prototype.CheckIsColor = function (color) {
        var a = color.indexOf("#", 0);
        if (a == 0) {
            return true;
        }
        return false;
    };
    //转换RGB颜色为十六进制颜色
    SeanHtmlDecode.prototype.transRGBColor = function (rgb) {
        //先检测传递进来的rgb是否16进制
        // var isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#ac3');
        var isOk = this.CheckIsColor(rgb);
        if (isOk) {
            // Debug.trace("SeanHtmlDecode.transRGBColor is hex:"+rgb);
            return rgb;
        }
        // Debug.trace("SeanHtmlDecode.transRGBColor rgb:"+rgb);
        //去掉rgb中的所有无用字符，比如rgb，（ 等
        var str = rgb.replace("rgb", "");
        str = str.replace("(", "");
        str = str.replace(")", "");
        //以逗号切分
        var arr = str.split(",");
        //遍历数组，逐个生成hex，并拼接
        var result = "#";
        for (var i = 0; i < arr.length; i++) {
            var r = arr[i];
            // Debug.trace("SeanHtmlDecode.transRGBColor r:"+r);
            var hex = this.trans2hex(r);
            // Debug.trace("SeanHtmlDecode.transRGBColor hex:"+hex);
            // result.push(hex);
            result = result + hex;
        }
        // Debug.trace("SeanHtmlDecode.transRGBColor result:"+result);
        return result;
    };
    //转换一个RGB值为hex
    SeanHtmlDecode.prototype.trans2hex = function (rgb) {
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    };
    //获取字体的下划线配置
    SeanHtmlDecode.prototype.getFontUnderline = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                //查找字符串里面是否有fontsize字样
                if (sty.indexOf("underline") >= 0) {
                    return true;
                }
            }
        }
        //没有的时候，就默认一个
        return false;
    };
    //下划线颜色
    SeanHtmlDecode.prototype.getFontUnderlineColor = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                //查找字符串里面是否有
                if (sty.indexOf("fontunderlinecolor") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return this.transRGBColor(sls[1]);
                    }
                }
            }
        }
        //没有的时候，就默认一个
        //var a = this.getDefaultAttrValue("fontunderlinecolor");
        // Debug.trace("SeanHtmlDecode.getFontUnderLineColor "+a+".");
        var a = "#ffffff";
        return a;
    };
    //获取字体名
    SeanHtmlDecode.prototype.getFontFamily = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                //查找字符串里面是否有
                if (sty.indexOf("fontfamily") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return sls[1];
                    }
                }
            }
        }
        //没有的时候，就默认一个
        return "Arail"; //return this.getDefaultAttrValue("fontfamily");//
    };
    //对齐方式
    SeanHtmlDecode.prototype.getFontAlign = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                //遍历数组查找字符串里面是否有
                if (sty.indexOf("fontalign") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return sls[1];
                    }
                }
            }
        }
        //没有的时候，就默认一个
        return "left"; //return this.getDefaultAttrValue("fontalign");//
    };
    //获取背景色
    SeanHtmlDecode.prototype.getFontBgcolor = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                //查找字符串里面是否有
                if (sty.indexOf("fontbgcolor") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return this.transRGBColor(sls[1]);
                    }
                }
            }
        }
        //没有的时候，就默认一个
        return null; //return this.getDefaultAttrValue("fontbgcolor");//
    };
    //粗体
    SeanHtmlDecode.prototype.getFontBold = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                //查找字符串里面是否有
                if (sty.indexOf("fontbold") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return true;
                    }
                }
            }
        }
        //没有的时候，就默认一个
        return false;
    };
    //斜体字
    SeanHtmlDecode.prototype.getFontItalic = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                //查找字符串里面是否有
                if (sty.indexOf("fontitalic") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return true;
                    }
                }
            }
        }
        //没有的时候，就默认一个
        return false;
    };
    //行间距
    SeanHtmlDecode.prototype.getFontLeading = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                //查找字符串里面是否有
                if (sty.indexOf("fontleading") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return Number(sls[1]);
                    }
                }
            }
        }
        //没有的时候，就默认一个
        return 0; //return this.getDefaultAttrValue("fontleading");//
    };
    //超出动作，hidden,visible,scroll
    SeanHtmlDecode.prototype.getFontOverflow = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                //查找字符串里面是否有
                if (sty.indexOf("fontoverflow") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return sls[1];
                    }
                }
            }
        }
        //没有的时候，就默认一个
        return "visible"; //return this.getDefaultAttrValue("fontoverflow");//
    };
    //上右下左边距
    SeanHtmlDecode.prototype.getFontPadding = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                //查找字符串里面是否有
                if (sty.indexOf("fontpadding") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return sls[1];
                    }
                }
            }
        }
        //没有的时候，就默认一个
        return "0,0,0,0"; //return this.getDefaultAttrValue("fontpadding");//
    };
    //描边宽度
    SeanHtmlDecode.prototype.getFontStroke = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                //查找字符串里面是否有
                if (sty.indexOf("fontstroke") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return Number(sls[1]);
                    }
                }
            }
        }
        //没有的时候，就默认一个
        return 0; //return this.getDefaultAttrValue("fontstroke");//
    };
    //描边颜色
    SeanHtmlDecode.prototype.getFontStrokeColor = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                //查找字符串里面是否有
                if (sty.indexOf("fontstrokecolor") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return this.transRGBColor(sls[1]);
                    }
                }
            }
        }
        //没有的时候，就默认一个
        return "#ff0000"; //return this.getDefaultAttrValue("fontstrokecolor");//
    };
    //纵向对齐方式
    SeanHtmlDecode.prototype.getFontValign = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                //查找字符串里面是否有
                if (sty.indexOf("fontvalign") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return sls[1];
                    }
                }
            }
        }
        //没有的时候，就默认一个
        return "middle"; //return this.getDefaultAttrValue("fontvalign");//
    };
    //是否自动换行
    SeanHtmlDecode.prototype.getFontWordwrap = function (styles) {
        if (styles) {
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                //查找字符串里面是否有
                if (sty.indexOf("fontwordwrap") >= 0) {
                    var sls = sty.split("-");
                    if (sls.length > 0) {
                        return true;
                    }
                }
            }
        }
        //没有的时候，就默认一个
        return false; //return this.getDefaultAttrValue("fontwordwrap");//
    };
    SeanHtmlDecode.obj = null;
    return SeanHtmlDecode;
}());
//# sourceMappingURL=SeanHtmlDecode.js.map