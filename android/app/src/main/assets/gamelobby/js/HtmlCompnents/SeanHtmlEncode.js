var SeanHtmlEncode = /** @class */ (function () {
    function SeanHtmlEncode() {
    }
    SeanHtmlEncode.getInstance = function (confObj) {
        if (!SeanHtmlEncode.obj) {
            var a = new SeanHtmlEncode();
            a.confObj = confObj;
            SeanHtmlEncode.obj = a;
        }
        return SeanHtmlEncode.obj;
    };
    SeanHtmlEncode.prototype.encodeHtml2Obj = function (str_html) {
        var text = this.filterHtmls(str_html);
        var nodes = this.foreachStyles(null, 0, str_html);
        return nodes;
    };
    SeanHtmlEncode.prototype.foreachStyles = function (parentNode, start, str_html) {
        var return_nodes = [];
        var startAt = start;
        var node = this.getNodeFrom(parentNode, startAt, str_html);
        while (node) {
            return_nodes.push(node);
            node = this.getNodeFrom(parentNode, node.end, str_html);
        }
        var readChildren = [];
        for (var i = 0; i < return_nodes.length; i++) {
            var nd = return_nodes[i];
            if (nd.children) {
                var nd_children = this.foreachStyles(nd, 0, nd.html);
                if (nd_children) {
                    for (var j = 0; j < nd_children.length; j++) {
                        var c_node = nd_children[j];
                        readChildren.push(c_node);
                    }
                }
            }
            else {
                readChildren.push(nd);
            }
        }
        return readChildren;
    };
    SeanHtmlEncode.prototype.getNextNodePosition = function (start, str_html) {
        var libNodes = this.confObj.labels;
        var curNode = null;
        var p = str_html.length;
        for (var i = 0; i < libNodes.length; i++) {
            var libNode = libNodes[i];
            var pos = str_html.indexOf(libNode.lb, start);
            if (pos < p) {
                p = pos;
            }
        }
        return p;
    };
    SeanHtmlEncode.prototype.getNodeFrom = function (parentNode, start, str_html) {
        var ct = str_html.substring(start, str_html.length);
        // Debug.trace("SeanHtmlEncode.getNodeFrom ct:"+ct);
        var libNodes = this.confObj.labels;
        // Debug.trace("SeanHtmlEncode.getNodeFrom libNodes:");
        // Debug.trace(libNodes);
        var curNode = null;
        var p = str_html.length;
        for (var i = 0; i < libNodes.length; i++) {
            var libNode = libNodes[i];
            var pos = str_html.indexOf(libNode.lb, start);
            // Debug.trace("SeanHtmlEncode.getNodeFrom pos:"+pos+" libNode:");
            // Debug.trace(libNode);
            if (p >= pos && pos != -1) {
                p = pos;
            }
            if (pos == start) {
                curNode = libNode;
            }
        }
        // Debug.trace("SeanHtmlEncode.getNodeFrom start:"+start+" str_html:"+str_html);
        // Debug.trace("SeanHtmlEncode.getNodeFrom curNode:");
        // Debug.trace(curNode);
        if (!curNode) {
            if (p >= 0) {
                // Debug.trace("SeanHtmlEncode.getNodeFrom p:"+p+" start:"+start);
                var str_null = str_html.substring(start, p);
                // Debug.trace("SeanHtmlEncode.getNodeFrom str_null:"+str_null);
                if (str_null.length > 0) {
                    // var b = {
                    //     "name":"",
                    //     "attr":this.getDefaultAttr(parentNode),
                    //     "html":str_null,
                    //     "children":false,
                    //     "end":p
                    // };
                    var b = new SeanAttributeNode("", this.getDefaultAttr(parentNode), str_null, false, p);
                    var attrEnd = this.checkAttrNodeEnd(str_html, start, p);
                    if (attrEnd && attrEnd.length > 0) {
                        for (var i = 0; i < attrEnd.length; i++) {
                            var ae = attrEnd[i];
                            b.attr.push(ae);
                        }
                    }
                    return b;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
        var end = str_html.indexOf(curNode.end, start);
        // Debug.trace("SeanHtmlEncode.getNodeFrom start:"+start+" end:"+end);
        var ctHead = this.getCountOf(curNode.lb, start, end + curNode.end.length, str_html);
        var ctEnd = this.getCountOf(curNode.end, start, end + curNode.end.length, str_html);
        var ctSum = ctHead - ctEnd;
        // Debug.trace("SeanHtmlEncode.getNodeFrom str_html:"+str_html);
        // Debug.trace("SeanHtmlEncode.getNodeFrom curNode:"+curNode.key);
        // Debug.trace("SeanHtmlEncode.getNodeFrom ctSum:"+ctSum+" ctHead:"+ctHead+" ctEnd:"+ctEnd);
        if (ctSum != 0) {
            if (ctSum > 0) {
                end = this.indexOfCount(curNode.end, str_html, end + curNode.end.length, ctSum);
                // Debug.trace("SeanHtmlEncode.getNodeFrom ctSum:"+ctSum+" end:"+end);
                while (ctSum != 0) {
                    ctHead = this.getCountOf(curNode.lb, start, end + curNode.end.length, str_html);
                    ctEnd = this.getCountOf(curNode.end, start, end + curNode.end.length, str_html);
                    ctSum = ctHead - ctEnd;
                    if (ctSum > 0) {
                        end = this.indexOfCount(curNode.end, str_html, end + curNode.end.length, ctSum);
                    }
                }
            }
            else {
                Debug.error("SeanHtmlEncode.getNodeFrom ctSum:" + ctSum + " node:" + curNode.key);
                return null;
            }
        }
        var nodeStartEnd = start + curNode.lb.length;
        var labelStartEnd = str_html.indexOf(">", nodeStartEnd);
        var html = str_html.substring(labelStartEnd + 1, end);
        var attr_content = str_html.substring(nodeStartEnd, labelStartEnd);
        var attr = this.getAttrByNode(curNode, attr_content);
        if (parentNode) {
            for (var pn = 0; pn < parentNode.attr.length; pn++) {
                attr.push(parentNode.attr[pn]);
                parentNode.attr[pn] = parentNode.attr[pn] + "-1";
            }
        }
        var bChildren = this.isHaveChildren(html);
        var a = new SeanAttributeNode(curNode.key, attr, html, bChildren, end + curNode.end.length);
        var attrEnd = this.checkAttrNodeEnd(str_html, start, end);
        if (attrEnd && attrEnd.length > 0) {
            for (var i = 0; i < attrEnd.length; i++) {
                var ae = attrEnd[i];
                a.attr.push(ae);
            }
        }
        return a;
    };
    SeanHtmlEncode.prototype.checkAttrNodeEnd = function (str_html, start, end) {
        var attrs = [];
        // Debug.trace("SeanHtmlEncode.checkAttrNodeEnd");
        // Debug.trace("str_html:"+str_html);
        // Debug.trace("start:"+start+" end:"+end);
        var beforeStr = str_html.substring(0, start);
        if (!beforeStr || beforeStr.length <= 0) {
            // Debug.trace("SeanHtmlEncode.checkAttrNodeEnd beforeStr null");
            return null;
        }
        // Debug.trace("SeanHtmlEncode.checkAttrNodeEnd beforeStr:"+beforeStr);
        var libn = this.confObj.attrNodeEnd;
        for (var i = 0; i < libn.length; i++) {
            var nde = libn[i];
            var p = beforeStr.lastIndexOf(nde[0]);
            // Debug.trace("SeanHtmlEncode.checkAttrNodeEnd p:"+p);
            if (p != -1) {
                var pEnd = p + nde[0].length;
                var sum = pEnd - start;
                // Debug.trace("SeanHtmlEncode.checkAttrNodeEnd pEnd:"+pEnd+" sum:"+sum);
                if (sum == 0) {
                    var attr = this.rebuildAttrValue(nde[1], nde[2]);
                    // attr = attr + "-childno";
                    attrs.push(attr);
                    // Debug.trace("SeanHtmlEncode.checkAttrNodeEnd attr:"+attr);
                }
            }
        }
        // Debug.trace("SeanHtmlEncode.checkAttrNodeEnd attrs:");
        // Debug.trace(attrs);
        return attrs;
    };
    SeanHtmlEncode.prototype.indexOfCount = function (key, str_html, start, num) {
        // Debug.trace("SeanHtmlEncode.indexOfCount key:"+key+" start:"+start+" num:"+num);
        // Debug.trace("str_html:"+str_html);
        var x = str_html.indexOf(key, start);
        // Debug.trace("SeanHtmlEncode.indexOfCount x0:"+x);
        for (var i = 1; i < num; i++) {
            x = str_html.indexOf(key, x + 1);
            // Debug.trace("SeanHtmlEncode.indexOfCount x1:"+x);
        }
        // Debug.trace("SeanHtmlEncode.indexOfCount x2:"+x);
        return x;
    };
    SeanHtmlEncode.prototype.getCountOf = function (key, start, end, str_html) {
        var a = 0;
        var str = str_html.substring(start, end);
        // Debug.trace("SeanHtmlEncode.getCountOf key:"+key+" start:"+start+" end:"+end);
        // Debug.trace("SeanHtmlEncode.getCountOf str:"+str);
        a = str.split(key).length - 1;
        // Debug.trace("SeanHtmlEncode.getCountOf a:"+a);
        return a;
    };
    SeanHtmlEncode.prototype.isHaveChildren = function (html) {
        var libNodes = this.confObj.labels;
        for (var i = 0; i < libNodes.length; i++) {
            var libNode = libNodes[i];
            var pos = html.indexOf(libNode.lb, 0);
            if (pos >= 0) {
                return true;
            }
        }
        return false;
    };
    SeanHtmlEncode.prototype.getDefaultAttr = function (parentNode) {
        var attr = [];
        if (parentNode) {
            // attr = parentNode.attr;
            for (var i = 0; i < parentNode.attr.length; i++) {
                // var child = parentNode.attr[i].indexOf("childno");
                // if( child == -1 )
                // {
                attr.push(parentNode.attr[i]);
                parentNode.attr[i] = parentNode.attr[i] + "-1";
                // }
            }
        }
        else {
            attr = this.confObj.defaultAttr;
        }
        return attr;
    };
    SeanHtmlEncode.prototype.getAttrByNode = function (curNode, htmls) {
        var html = htmls;
        var filter = this.confObj.filter;
        for (var i = 0; i < filter.length; i++) {
            var fi = filter[i];
            html = html.replace(fi, "");
        }
        var a = [];
        // Debug.trace("SeanHtmlEncode.getAttrByNode node:");
        // Debug.trace(node);
        // Debug.trace("html:"+html);
        var attrLibs = this.confObj.attr;
        for (var i = 0; i < attrLibs.length; i++) {
            var attrOne = attrLibs[i][0];
            var pos = html.indexOf(attrOne, 0);
            if (pos >= 0) {
                var value = this.getAttrValue(attrOne, html);
                var newAttr = this.rebuildAttrValue(attrLibs[i][1], value);
                a.push(newAttr);
            }
        }
        var attrNode = this.confObj.attrNode;
        for (var i = 0; i < attrNode.length; i++) {
            var attrN = attrNode[i][0];
            var pos = curNode.lb.indexOf(attrN, 0);
            if (pos == 0) {
                var name = attrNode[i][1];
                var value = attrNode[i][2];
                var newAttr = this.rebuildAttrValue(name, value);
                a.push(newAttr);
            }
        }
        return a;
    };
    SeanHtmlEncode.prototype.rebuildAttrValue = function (attr, value) {
        var a = attr + "-" + value;
        return a;
    };
    SeanHtmlEncode.prototype.getAttrValue = function (attrName, str) {
        // Debug.trace("SeanHtmlEncode.getAttrValue attrName:"+attrName+" str:"+str);
        var nameP = str.indexOf(attrName, 0);
        // var nameEndP = nameP+attrName.length;
        var maoP = str.indexOf(":", nameP);
        var fenP = str.indexOf(";", maoP);
        var vStr = str.substring(maoP + 1, fenP);
        var vStrNospace = this.removeSpace(vStr);
        // Debug.trace("SeanHtmlEncode.getAttrValue v:"+vStrNospace);
        return vStrNospace;
    };
    SeanHtmlEncode.prototype.removeSpace = function (str) {
        var a = str.replace(/\s+/g, "");
        // 去除两头空格:
        // str = str.replace(/^\s+|\s+$/g,"");
        // 去除左空格：
        // str=str.replace( /^\s/, '');
        // 去除右空格：
        // str=str.replace(/(\s$)/g, "");
        //去掉所有px
        a = a.replace("px", "");
        return a;
    };
    SeanHtmlEncode.prototype.filterHtmls = function (str_html) {
        return str_html.replace(/<[^>]+>/g, "");
    };
    SeanHtmlEncode.obj = null;
    return SeanHtmlEncode;
}());
//# sourceMappingURL=SeanHtmlEncode.js.map