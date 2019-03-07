/*
Author : sean.guo49@gmail.com
create : 20190118
Features : read html nodes and transform to json Object
*/
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
    //对html字符串编码，转换为json对象
    SeanHtmlEncode.prototype.encodeHtml2Obj = function (str_html) {
        //一段带html标签的文本
        //去掉所有html标签，获取完整字符内容
        var text = this.filterHtmls(str_html);
        //递归提取出所有节点        
        var nodes = this.foreachStyles(null, 0, str_html);
        return nodes;
    };
    //遍历字符串，提取节点
    SeanHtmlEncode.prototype.foreachStyles = function (parentNode, start, str_html) {
        var return_nodes = [];
        //逐个字符串检查标签
        var startAt = start;
        //找到一个标签
        var node = this.getNodeFrom(parentNode, startAt, str_html);
        //继续找后面的平级标签
        while (node) {
            return_nodes.push(node);
            node = this.getNodeFrom(parentNode, node.end, str_html);
        }
        var readChildren = [];
        //当前级别的标签全部找完了，都在数组里面了
        //遍历数组
        //继续遍历html内容
        for (var i = 0; i < return_nodes.length; i++) {
            var nd = return_nodes[i];
            if (nd.children) {
                var nd_children = this.foreachStyles(nd, 0, nd.html);
                //将所有的子节点内容插入到数组中
                if (nd_children) {
                    for (var j = 0; j < nd_children.length; j++) {
                        var c_node = nd_children[j];
                        readChildren.push(c_node);
                    }
                }
            }
            else {
                //没有子节点的节点就不用找了
                readChildren.push(nd);
            }
        }
        return readChildren;
    };
    //查找下个节点在字符串中的位置
    SeanHtmlEncode.prototype.getNextNodePosition = function (start, str_html) {
        //所有支持的节点
        var libNodes = this.confObj.labels;
        //当前找到的第一个节点
        var curNode = null;
        var p = str_html.length;
        //遍历所有支持节点，检查字符串中最近的一个是哪个节点
        for (var i = 0; i < libNodes.length; i++) {
            var libNode = libNodes[i];
            var pos = str_html.indexOf(libNode.lb, start);
            // Debug.trace("SeanHtmlEncode.getNodeFrom pos:"+pos+" libNode:");
            // Debug.trace(libNode);
            if (pos < p) {
                //找到了一个节点
                p = pos;
            }
        }
        return p;
    };
    //在指定的字符串str_html中，查找支持的节点，返回出节点的所有内容
    SeanHtmlEncode.prototype.getNodeFrom = function (parentNode, start, str_html) {
        // Debug.trace("SeanHtmlEncode.getNodeFrom start:"+start+" str_html:"+str_html);
        var ct = str_html.substring(start, str_html.length);
        // Debug.trace("SeanHtmlEncode.getNodeFrom ct:"+ct);
        //所有支持的节点
        var libNodes = this.confObj.labels;
        // Debug.trace("SeanHtmlEncode.getNodeFrom libNodes:");
        // Debug.trace(libNodes);
        //当前找到的第一个节点
        var curNode = null;
        var p = str_html.length; //第一个标签出现在字符串的什么位置
        // Debug.trace("SeanHtmlEncode.getNodeFrom p:"+p);
        //遍历所有支持节点，检查字符串中最近的一个是哪个节点
        for (var i = 0; i < libNodes.length; i++) {
            var libNode = libNodes[i];
            var pos = str_html.indexOf(libNode.lb, start);
            // Debug.trace("SeanHtmlEncode.getNodeFrom pos:"+pos+" libNode:");
            // Debug.trace(libNode);
            if (p >= pos && pos != -1) {
                p = pos; //记录下最近的标签
            }
            if (pos == start) //起点就是标签
             {
                //找到了一个节点
                curNode = libNode;
            }
        }
        // Debug.trace("SeanHtmlEncode.getNodeFrom start:"+start+" str_html:"+str_html);
        // Debug.trace("SeanHtmlEncode.getNodeFrom curNode:");
        // Debug.trace(curNode);
        if (!curNode) {
            //没有找到节点
            //那么取出起点到第一个标签出现的位置的内容，作为一个默认节点
            //前提是得有节点
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
                    //检查是否有特殊后置标签
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
        //提取出该节点起止点间的所有内容
        var end = str_html.indexOf(curNode.end, start);
        // Debug.trace("SeanHtmlEncode.getNodeFrom start:"+start+" end:"+end);
        //检查start到end+len之间有几个当前节点？
        //计算节点头和尾的数量，是否相同
        var ctHead = this.getCountOf(curNode.lb, start, end + curNode.end.length, str_html);
        var ctEnd = this.getCountOf(curNode.end, start, end + curNode.end.length, str_html);
        //不相同的话，根据头的数量来查找对应数量的尾
        var ctSum = ctHead - ctEnd;
        // Debug.trace("SeanHtmlEncode.getNodeFrom str_html:"+str_html);
        // Debug.trace("SeanHtmlEncode.getNodeFrom curNode:"+curNode.key);
        // Debug.trace("SeanHtmlEncode.getNodeFrom ctSum:"+ctSum+" ctHead:"+ctHead+" ctEnd:"+ctEnd);
        if (ctSum != 0) {
            if (ctSum > 0) {
                //ctSum > 0 头的数量多，再找对应数量为尾即可
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
                //ctSum < 0 头的数量少了，不对，不应该出现这种情况
                Debug.error("SeanHtmlEncode.getNodeFrom ctSum:" + ctSum + " node:" + curNode.key);
                return null;
            }
        }
        //最终得出尾的end
        //取出完整节点的前节点结束位置
        var nodeStartEnd = start + curNode.lb.length;
        var labelStartEnd = str_html.indexOf(">", nodeStartEnd);
        var html = str_html.substring(labelStartEnd + 1, end);
        //提取出该节点的所有属性及值
        var attr_content = str_html.substring(nodeStartEnd, labelStartEnd);
        var attr = this.getAttrByNode(curNode, attr_content);
        if (parentNode) {
            for (var pn = 0; pn < parentNode.attr.length; pn++) {
                //检查父级属性，是否含有childno字段，有就不得继承
                // var child = parentNode.attr[pn].indexOf("childno");
                // if( child == -1 )
                // {
                attr.push(parentNode.attr[pn]);
                parentNode.attr[pn] = parentNode.attr[pn] + "-1";
                // }
            }
        }
        //检查是否有子节点
        var bChildren = this.isHaveChildren(html);
        // var a = {
        //     "name":curNode.key,
        //     "attr":attr,
        //     "html":html,
        //     "children":bChildren,
        //     "end":end+curNode.end.length//+start
        // };
        var a = new SeanAttributeNode(curNode.key, attr, html, bChildren, end + curNode.end.length);
        //检查是否有特殊后置标签
        var attrEnd = this.checkAttrNodeEnd(str_html, start, end);
        if (attrEnd && attrEnd.length > 0) {
            for (var i = 0; i < attrEnd.length; i++) {
                var ae = attrEnd[i];
                a.attr.push(ae);
            }
        }
        //返回数据结构
        return a;
    };
    //查找当前节点前面是否有特殊节点的结束符号？需要加上该特殊节点的属性
    //查到之后，返回一个属性数组
    SeanHtmlEncode.prototype.checkAttrNodeEnd = function (str_html, start, end) {
        var attrs = [];
        // Debug.trace("SeanHtmlEncode.checkAttrNodeEnd");
        // Debug.trace("str_html:"+str_html);
        // Debug.trace("start:"+start+" end:"+end);
        //首先start之前要有字符串，没有就直接返回空
        var beforeStr = str_html.substring(0, start);
        if (!beforeStr || beforeStr.length <= 0) {
            // Debug.trace("SeanHtmlEncode.checkAttrNodeEnd beforeStr null");
            return null;
        }
        // Debug.trace("SeanHtmlEncode.checkAttrNodeEnd beforeStr:"+beforeStr);
        //遍历所有后置特殊标签
        var libn = this.confObj.attrNodeEnd;
        for (var i = 0; i < libn.length; i++) {
            //取出一个，检查start之前有没有？最近的一个位置是哪里
            var nde = libn[i];
            var p = beforeStr.lastIndexOf(nde[0]);
            // Debug.trace("SeanHtmlEncode.checkAttrNodeEnd p:"+p);
            if (p != -1) {
                //前面找到有这个标签，检查该标签与当前start点的距离，必须等于0才可以
                var pEnd = p + nde[0].length;
                var sum = pEnd - start;
                // Debug.trace("SeanHtmlEncode.checkAttrNodeEnd pEnd:"+pEnd+" sum:"+sum);
                if (sum == 0) {
                    //添加当前属性
                    var attr = this.rebuildAttrValue(nde[1], nde[2]);
                    //该属性不得延续给子节点
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
    //查找str_html字符串中，start之后的内容里面出现的第num次key的位置
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
    //提取标签节点的数量
    //在str_html字符串中的start到end之间，查找key的数量
    SeanHtmlEncode.prototype.getCountOf = function (key, start, end, str_html) {
        var a = 0;
        var str = str_html.substring(start, end);
        // Debug.trace("SeanHtmlEncode.getCountOf key:"+key+" start:"+start+" end:"+end);
        // Debug.trace("SeanHtmlEncode.getCountOf str:"+str);
        a = str.split(key).length - 1;
        // Debug.trace("SeanHtmlEncode.getCountOf a:"+a);
        return a;
    };
    //是否有子节点
    SeanHtmlEncode.prototype.isHaveChildren = function (html) {
        var libNodes = this.confObj.labels;
        //遍历所有支持节点，检查字符串中最近的一个是哪个节点
        for (var i = 0; i < libNodes.length; i++) {
            var libNode = libNodes[i];
            var pos = html.indexOf(libNode.lb, 0);
            if (pos >= 0) {
                //有节点
                return true;
            }
        }
        return false;
    };
    //获取缺省属性
    SeanHtmlEncode.prototype.getDefaultAttr = function (parentNode) {
        var attr = [];
        if (parentNode) {
            //先继承父级属性
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
    //提取节点属性
    SeanHtmlEncode.prototype.getAttrByNode = function (curNode, htmls) {
        //先对属性内容进行过滤
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
        //遍历可用属性库，检索是否存在对应属性？
        for (var i = 0; i < attrLibs.length; i++) {
            var attrOne = attrLibs[i][0];
            var pos = html.indexOf(attrOne, 0);
            if (pos >= 0) {
                //存在
                //取出该属性值
                var value = this.getAttrValue(attrOne, html);
                //将新的属性存入数组
                var newAttr = this.rebuildAttrValue(attrLibs[i][1], value);
                a.push(newAttr);
            }
        }
        //同时检查某些节点，是否自带属性，比如斜体，粗体等
        var attrNode = this.confObj.attrNode;
        for (var i = 0; i < attrNode.length; i++) {
            var attrN = attrNode[i][0];
            var pos = curNode.lb.indexOf(attrN, 0);
            if (pos == 0) {
                //与该节点匹配了
                //提取该节点属性及值
                var name = attrNode[i][1];
                var value = attrNode[i][2];
                var newAttr = this.rebuildAttrValue(name, value);
                a.push(newAttr);
            }
        }
        return a;
    };
    //将拿到的属性名字与值，重构成新的属性值字符串，以便后面使用
    SeanHtmlEncode.prototype.rebuildAttrValue = function (attr, value) {
        var a = attr + "-" + value;
        return a;
    };
    //从字符串str中提取出attrName的值
    SeanHtmlEncode.prototype.getAttrValue = function (attrName, str) {
        // Debug.trace("SeanHtmlEncode.getAttrValue attrName:"+attrName+" str:"+str);
        //属性名在字符串中的位置
        var nameP = str.indexOf(attrName, 0);
        //属性后面的位置
        // var nameEndP = nameP+attrName.length;
        //属性后面的冒号位置
        var maoP = str.indexOf(":", nameP);
        //冒号后面的分号位置
        var fenP = str.indexOf(";", maoP);
        //冒号与分号之间的字符串
        var vStr = str.substring(maoP + 1, fenP);
        //字符串去掉空格
        var vStrNospace = this.removeSpace(vStr);
        // Debug.trace("SeanHtmlEncode.getAttrValue v:"+vStrNospace);
        return vStrNospace;
    };
    //移除字符串str中的所有空格
    SeanHtmlEncode.prototype.removeSpace = function (str) {
        // 去除所有空格:
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
    //过滤所有html标签
    SeanHtmlEncode.prototype.filterHtmls = function (str_html) {
        return str_html.replace(/<[^>]+>/g, "");
    };
    SeanHtmlEncode.obj = null;
    return SeanHtmlEncode;
}());
//# sourceMappingURL=SeanHtmlEncode.js.map