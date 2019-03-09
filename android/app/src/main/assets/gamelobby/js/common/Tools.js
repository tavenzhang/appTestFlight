var Tools = /** @class */ (function () {
    function Tools() {
    }
    Tools.prototype.Commonructor = function () {
    };
    /*
    getSecretFromUserNamePassword(username, password) {
        return username.substring(0, 3) + password.substring(0, 3) +
            username.substring(username.length - 2, username.length) +
            password.substring(password.length - 2, password.length) +
            username.length + password.length+(TCUSER_DEVICE_TOKEN?TCUSER_DEVICE_TOKEN:'')
    }

    encode(username, password, callBack) {
            Bcrypt.setRandomFallback(this.callBack)
        var str = this.getSecretFromUserNamePassword(username, password)
        JXLog('str == '+str)

        Bcrypt.genSalt(6, function (err, salt) {
            Bcrypt.hash(str, salt, (err, hash) => {
                callBack(hash.substring(7))
            })
        })
    }
    */
    //检查对象是否存在，不存在就抛出异常
    Tools.isAssets = function (a) {
        if (a) {
            return a;
        }
        try {
            throw new Error('Something bad-----shawn');
        }
        catch (e) {
            Debug.trace("-------------shawn-----------begin----");
            Debug.trace(e);
            Debug.trace("-------------shawn-----------end------");
        }
    };
    //将总数拆解，以参数中的固定数字分成若干份
    Tools.splitBetNum = function (num) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        //遍历所有种类
        var i = 0;
        var last = num;
        var usedCoins = []; // {};
        for (i = (args.length - 1); i >= 0; i--) {
            //剩余所有额度，都用当前筹码时，需要的数量
            var ct = Tools.getCountOf(last, args[i]);
            //如果当前筹码不是最小的一个，那么就要给后面留一半
            if (i == 0) {
                //否则，是最小一个筹码的时候，需要把所有都用该筹码来展示
                var u0 = Math.floor(ct);
                usedCoins["" + args[i]] = u0;
            }
            else {
                //只取一半，剩下的一半留给后面的筹码用
                var use = Math.floor(ct / 2); //该种类筹码使用数量
                var used = use * args[i]; //使用的筹码占用数额
                last = last - used; //剩余数额，给下一轮用
                usedCoins["" + args[i]] = use;
            }
        }
        // Debug.trace("splitBetNum num:"+num+" as:");
        // Debug.trace(usedCoins);
        //根据当前的数量参数，生成数组
        var arr = [];
        // for(var a in usedCoins)
        for (var a = 0; a < usedCoins.length; a++) {
            var one = usedCoins[a];
            var coins = a;
            var count = one;
            var dd = 0;
            for (dd = 0; dd < count; dd++) {
                arr.push(Number(coins));
            }
        }
        // Debug.trace("splitBetNum arr:");
        // Debug.trace(arr);
        return arr;
    };
    //总数total，可以被分成多少个single？
    Tools.getCountOf = function (total, single) {
        var ct = total / single;
        // Debug.trace("number:"+total+" can be split:"+ct+" single:"+single);
        return ct;
    };
    //切分字符串为单个字符串数组
    Tools.splitString = function (str) {
        // var s = String(str);//'我1234567890';
        // Debug.trace("s:"+s);
        // var reg = new RegExp(".{1}","g");
        // var rs = new Array();
        // try{
        //     rs = s.match(reg);
        //     rs.push(s.substring(rs.join('').length));
        // }catch(e){
        //     Debug.trace(e);
        // }
        var s = String(str);
        var rs = s.split("");
        return rs;
    };
    //返回当前资源完整路径
    Tools.getSrc = function (src) {
        // return src+"?v="+Common.loadConf.version.value;
        return src;
    };
    //返回当前资源版本地址补充部分
    Tools.getSrcVersion = function () {
        return "?v=" + Common.loadConf.version.value;
    };
    //MyBase64 加解密
    Tools.b64EncodeUnicode = function (str) {
        //1.加密
        var base = new MyBase64();
        var result = base.encode(str);
        return result;
    };
    Tools.b64DecodeUnicode = function (str) {
        var base = new MyBase64();
        //2.解密
        var result2 = base.decode(str);
        return result2;
    };
    //创建html元素
    Tools.newHTMLIframeElement = function (conf) {
        var p = new Laya.HTMLIframeElement(); //无法指定pos及宽高
        p.href = conf.href;
        return p;
        // var p = new Laya.HTMLDivElement();  //无法指定href
        // p.x = conf.pos.x;
        // p.y = conf.pos.y;
        // Debug.trace("newHTMLIframeElement conf:");
        // Debug.trace(conf);
        // p.pos(conf.pos.x,conf.pos.y);
        // p.size(conf.size.w,conf.size.h);
        // var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
        //    '<foreignObject width="100%" height="100%">' +
        //    '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
        //      '<em>I</em> like' + 
        //      '<span style="color:white; text-shadow:0 0 2px blue;">' +
        //      'cheese</span>' +
        //    '</div>' +
        //    '</foreignObject>' +
        //    '</svg>';
        // var DOMURL = window.URL;// || window;//.webkitURL || window;
        // var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        // var url = DOMURL.createObjectURL(svg);
        // Debug.trace("svg url:"+url);
        // var p = new Laya.Image();
        // p.pos(conf.pos.x,conf.pos.y);
        // p.size(conf.size.w,conf.size.h);
        // // p.skin = url;
        // // var img = new Image();
        // var img = Laya.HTMLImage.create();
        // img.src = url;
        // img.onload = function(p){
        //     Debug.trace("svg img loaded");
        //     var tex = new Laya.Texture();
        // }
    };
    //字符串中间部分用星号替代
    Tools.starString = function (str, rep) {
        var s = str;
        var len = str.length;
        var o1 = Math.floor(len / 3); //从1/3处开始替换为星星
        var o2 = o1 * 2;
        var s1 = s.substr(0, o1);
        // Debug.trace("0-"+o1+" s1:"+s1);
        var s3 = s.substr(o2, len);
        // Debug.trace(o2+"-"+len+" s3:"+s3);
        return s1 + rep + s3;
    };
    //以自加载Image来构建帮助页面内容
    Tools.newImage = function (conf) {
        var img = new Laya.Image(conf.href);
        img.pos(conf.pos.x, conf.pos.y);
        img.size(conf.size.w, conf.size.h);
        return img;
    };
    Tools.addSprite = function (node, conf) {
        if (!conf) {
            return null;
        }
        var sp = Tools.newSprite(conf);
        node.addChild(sp);
        return sp;
    };
    //根据配置构造Sprite
    Tools.newSprite = function (conf) {
        var sp = new Laya.Sprite();
        if (conf.src) {
            sp.loadImage(conf.src);
            // Tools.addSpriteLoadListener(sp,conf,this,this.spriteLoaded);
        }
        sp.pos(conf.pos.x, conf.pos.y);
        if (conf.size) {
            //如果有设定尺寸，则拉伸一下
            if (!Tools.resizeSprite(sp, conf.size.w, conf.size.h)) {
                Debug.trace("newSprite false conf:");
                Debug.trace(conf);
            }
        }
        if (conf.pivot) {
            sp.pivot(conf.pivot.x, conf.pivot.y);
        }
        return sp;
    };
    //重设sp宽度高度
    Tools.resizeSprite = function (sp, w, h) {
        var nw = sp.width;
        var nh = sp.height;
        if (nw <= 0 || nh <= 0) {
            Debug.trace("Tools.resizeSprite sprite not loaded width and height == 0 sp=");
            Debug.trace(sp);
            return false;
        }
        var pw = w;
        var ph = h;
        var sx = pw / nw;
        var sy = ph / nh;
        sp.scale(sx, sy);
        return true;
    };
    // public static addSpriteLoadListener(sp:any,conf:any,caller:any,callback:any):void
    // {
    // }
    // public static spriteLoaded():void
    // {
    // }
    //检测当前平台
    Tools.platformInfo = function () {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var p = {};
        if (isAndroid) {
            p.os = "Android";
        }
        else if (isiOS) {
            p.os = "IOS";
        }
        else {
            p.os = "other";
        }
        return p;
    };
    //
    Tools.deviceInfo = function () {
        Debug.trace("deviceInfo:");
        Debug.trace(window['plus']);
        if (window['plus']) {
            Tools.plusReady();
        }
        else {
            document.addEventListener("plusready", Tools.plusReady, false);
        }
    };
    Tools.plusReady = function () {
        Debug.trace("plus:");
        Debug.trace(window['plus']);
    };
    //跳转到指定地址
    Tools.jump2url = function (url) {
        try {
            var au = url; //Tools.filterUrl2rewrite(Tools.whichRewrite(),url);
            var enUrl = encodeURI(au);
            au = enUrl;
            // if( Common.confObj.openblank.value == 1 )
            // {
            //     window.open(au);
            // }else{
            // if(Common.IS_NATIVE_APP){
            PostMHelp.jumpToUrl({ au: au });
            // }else{
            //     window.location.href = au;
            // }
            // }
        }
        catch (e) {
        }
    };
    //过滤游戏目录前的../
    Tools.filterGameDir = function (url) {
        var dir = url;
        var idx = url.indexOf("../");
        if (idx == 0) {
            //需要过滤
            var s = url.substr(3, url.length);
            dir = s;
        }
        Debug.trace("Tools.filterGameDir url:" + url + " idx:" + idx + " dir:" + dir);
        return dir;
    };
    //跳转到游戏
    Tools.jump2game = function (urls) {
        try {
            var url = urls;
            // Debug.trace("Tools jump2game url:"+url);
            var ginfo = Common.getCurGameInfo();
            var backurl = ConfObjRead.getConfUrl().url.backlobby;
            var mainUrl = Tools.getCurFullPath();
            // Debug.trace("Tools.jump2game mainUrl:"+mainUrl);
            var hostUrl = Tools.getCurHost(mainUrl);
            //将url前头的../去掉
            var dir = Tools.filterGameDir(urls);
            var jumpUrl = hostUrl + "/" + dir;
            Debug.trace("Tools.jump2game jumpUrl:" + jumpUrl);
            if (AppData.IS_NATIVE_APP) {
                jumpUrl = "/" + dir;
            }
            var jobj = {};
            // Debug.trace("Tools.jump2game create jobj");
            if (ginfo && ginfo.alias) {
                // Debug.trace("Tools jump2game0 alias:"+ginfo.alias+" backUrl:"+backurl);
                if (ginfo.alias == "zjh") {
                    backurl = backurl + "?gameId=" + Common.gameId + "&alias=" + ginfo.alias;
                }
            }
            else {
                ginfo = {
                    "alias": "",
                    "name": "" //"炸金花"
                };
            }
            // Debug.trace("Tools jump2game1 alias:"+ginfo.alias+" backUrl:"+backurl);
            jobj = {
                "token": Common.access_token,
                "httpUrl": ConfObjRead.getConfUrl().url.apihome,
                "gameId": Common.gameId,
                "wsUrl": Common.wsUrl,
                "roomId": Common.roomId,
                "backUrl": backurl,
                "alias": ginfo.alias,
                "name": ginfo.name,
                "clientId": Common.clientId,
                "mainUrl": mainUrl
            };
            // Debug.trace("Tools.jump2game jobj:");
            // Debug.trace(jobj);
            var b = new MyBase64();
            var param = b.encode(JSON.stringify(jobj));
            var au = jumpUrl + "?jumpData=" + param;
            var enUrl = encodeURI(au);
            au = enUrl;
            var ne = b.decode(param);
            Debug.trace("Tools.jump2game url:" + au);
            //需要关闭声音等暂停操作
            LayaMain.getInstance().onGamePause();
            // if(Common.IS_NATIVE_APP){
            PostMHelp.jumpToGame({ "payload": au });
            // }else{
            // if( Common.confObj.openblank.value == 1 )
            // {
            //     window.open(au);
            // }else{
            // window.location.href = au;
            // }
            // }
        }
        catch (e) {
            //Debug.trace(e);
        }
    };
    //检查字符串是否存在
    Tools.isHaveString = function (str, instr) {
        var p = instr.indexOf(str);
        if (p >= 0) {
            return true;
        }
        return false;
    };
    //检查头部是否有./字符串
    Tools.isHaveHeadPoint = function (str, instr, len) {
        var ins = instr.substr(0, len);
        var b = Tools.isHaveString(str, ins);
        // Debug.trace("Tools.isHaveHeadPoint str:"+str+" instr:"+instr+" len:"+len+" ins:"+ins+" b:"+b);
        // return b;
        if (b) {
            //有，直接返回
            return instr;
        }
        //else{
        //没有，加上再返回
        //}
        return "." + instr;
    };
    //跳转到扩展模块
    Tools.jump2module = function (url, type) {
        try {
            // var curl = ConfObjRead.getConfUrl().url.testcustomurl;
            // if( Common.userInfo && Common.userInfo.customUrl )
            // {
            //     curl = Common.userInfo.customUrl;
            // }
            // Debug.trace("Common.userInfo:");
            // Debug.trace(Common.userInfo);
            var jobj = {
                "token": Common.access_token,
                "httpUrl": ConfObjRead.getConfUrl().url.apihome,
                // "clientId":Common.userInfo.userBalance.clientId,
                "clientId": Common.clientId,
                // "cid":Common.userInfo.userBalance.clientId,
                "backUrl": ConfObjRead.getConfUrl().url.backlobby //,
                // "mainUrl":ConfObjRead.getConfUrl().url.backlobby,
                // "customUrl":curl
            };
            var b = new MyBase64();
            var param = b.encode(JSON.stringify(jobj));
            var au = url; // + "?jumpData="+ param;
            if (Tools.isHaveString("?", url)) {
                au = url + "&jumpData=" + param;
            }
            else {
                au = url + "?jumpData=" + param;
            }
            var enUrl = encodeURI(au);
            au = enUrl;
            // Debug.trace("jump2module:"+au);
            // Debug.trace(jobj);
            //Add by Jelly 设定死 
            // if(Common.IS_NATIVE_APP)
            if (1 + 1 == 2) {
                //这里都需要使用postMessage Modify by Jelly on 2018.12.27
                //Add by Jelly on 2018.12.27
                switch (type) {
                    case "account":
                        PostMHelp.game_account(jobj);
                        break;
                    case "custom":
                        PostMHelp.game_custom(jobj);
                        break;
                    case "recharge":
                        PostMHelp.game_recharge(jobj);
                        break;
                    case "redraw":
                        PostMHelp.game_redraw(jobj);
                        break;
                    case "share":
                        PostMHelp.game_share(jobj);
                        break;
                }
                // PostMHelp.jupmToUrl({jobj,au})
            }
            else {
                window.location.href = au;
            }
        }
        catch (e) {
            Debug.trace(e);
        }
    };
    //载入指定路径的js代码
    //这种方式会重写整个页面，加到head标签里面
    Tools.loadJavaScript = function (src) {
        document.write("<scr" + "ipt src='" + src + "' loader='laya'></scr" + 'ipt>');
    };
    //按规则缩放精灵,wid - 目标总宽度
    Tools.scaleSprite = function (sp, src, conf, wid) {
        if (wid === void 0) { wid = 0; }
        var lw = conf.lw;
        var cw = conf.cw;
        var rw = conf.rw;
        var midw = conf.cwid;
        if (wid != 0) {
            midw = Math.floor(wid) - lw - rw;
        }
        var texture = Laya.loader.getRes(Tools.getSrc(src));
        if (!texture) {
            return;
        }
        var tw = texture.width;
        var th = texture.height;
        // sp.graphics.drawTexture(texture,0,0,tw,th);
        var x1, y1, w1, h1;
        x1 = 0;
        y1 = 0;
        w1 = lw; //x1 + lx;
        h1 = th;
        // Debug.trace('x1:'+x1+" y1:"+y1+" w1:"+w1+" h1:"+h1);
        // sp.graphics.drawTexture(texture,x1,y1,w1,h1);
        var texLeft = Laya.Texture.createFromTexture(texture, x1, y1, w1, h1);
        sp.graphics.drawTexture(texLeft, x1, y1, texLeft.width, texLeft.height);
        var x2, y2, w2, h2;
        x2 = tw - rw;
        y2 = 0;
        w2 = rw; //x2 + (rx-cx);
        h2 = th;
        // Debug.trace('x2:'+x2+" y2:"+y2+" w2:"+w2+" h2:"+h2);
        var texRight = Laya.Texture.createFromTexture(texture, x2, y2, w2, h2);
        var drawX, drawY, drawW, drawH;
        drawX = x1 + w1 + midw;
        drawY = y2;
        drawW = texRight.width;
        drawH = texRight.height;
        // Debug.trace('drawX:'+drawX+" drawY:"+drawY+" drawW:"+drawW+" drawH:"+drawH);
        sp.graphics.drawTexture(texRight, drawX, //750,
        drawY, //0,
        drawW, drawH);
        var x_c, y_c, w_c, h_c;
        x_c = lw;
        y_c = 0;
        w_c = tw - lw - rw;
        h_c = th;
        // Debug.trace("xc:"+x_c+" yc:"+y_c+" wc:"+w_c+" hc:"+h_c);
        var texCenter = Laya.Texture.createFromTexture(texture, x_c, y_c, w_c, h_c);
        drawX = w1;
        drawY = y_c;
        drawW = midw;
        drawH = texRight.height;
        // Debug.trace('drawX:'+drawX+" drawY:"+drawY+" drawW:"+drawW+" drawH:"+drawH);
        sp.graphics.drawTexture(texCenter, drawX, drawY, drawW, //texCenter.width,//
        drawH);
        // sp.graphics.drawTexture(texture,x2,y2,w2,h2);
    };
    //按规则缩放精灵V向 hei - 目标总高度
    Tools.scaleSpriteV = function (sp, src, conf, hei) {
        if (hei === void 0) { hei = 0; }
        var th = conf.th;
        var mh = conf.mh;
        var bh = conf.bh;
        var midh = conf.mhei;
        if (hei != 0) {
            midh = Math.floor(hei) - th - bh;
        }
        // Debug.trace("Tools.scaleSpriteV src:"+src);
        var texture = Laya.loader.getRes(Tools.getSrc(src));
        if (!texture) {
            return;
        }
        // Debug.trace("Tools.scaleSpriteV texture:");
        // Debug.trace(texture);
        var txw = texture.width;
        var txh = texture.height;
        var x1, y1, w1, h1;
        x1 = 0;
        y1 = 0;
        w1 = txw;
        h1 = th;
        // Debug.trace('x1:'+x1+" y1:"+y1+" w1:"+w1+" h1:"+h1);
        var tex1 = Laya.Texture.createFromTexture(texture, x1, y1, w1, h1);
        sp.graphics.drawTexture(tex1, x1, y1, tex1.width, tex1.height);
        var x2, y2, w2, h2;
        x2 = 0;
        y2 = txh - bh;
        w2 = txw;
        h2 = bh;
        // Debug.trace('x2:'+x2+" y2:"+y2+" w2:"+w2+" h2:"+h2);
        var tex2 = Laya.Texture.createFromTexture(texture, x2, y2, w2, h2);
        var drawX, drawY, drawW, drawH;
        drawX = x1;
        drawY = y1 + h1 + midh;
        drawW = tex2.width;
        drawH = tex2.height;
        // Debug.trace('drawX:'+drawX+" drawY:"+drawY+" drawW:"+drawW+" drawH:"+drawH);
        sp.graphics.drawTexture(tex2, drawX, drawY, drawW, drawH);
        var x_c, y_c, w_c, h_c;
        x_c = 0;
        y_c = th;
        w_c = txw;
        h_c = mh;
        // Debug.trace("xc:"+x_c+" yc:"+y_c+" wc:"+w_c+" hc:"+h_c);
        var texCenter = Laya.Texture.createFromTexture(texture, x_c, y_c, w_c, h_c);
        drawX = x_c;
        drawY = y_c;
        drawW = txw;
        drawH = midh;
        // Debug.trace('drawX:'+drawX+" drawY:"+drawY+" drawW:"+drawW+" drawH:"+drawH);
        sp.graphics.drawTexture(texCenter, drawX, drawY, drawW, drawH);
        //从当前sp绘制图像中，抽出texture
    };
    //按规则缩放精灵V向 hei - 目标总高度
    Tools.scaleSpriteHV = function (sp, src, confHV, wid, hei) {
        if (wid === void 0) { wid = 0; }
        if (hei === void 0) { hei = 0; }
        var texture = Laya.loader.getRes(Tools.getSrc(src));
        if (!texture) {
            return;
        }
        var txw = texture.width;
        var txh = texture.height;
        //left top
        var x0, y0, w0, h0;
        x0 = 0;
        y0 = 0;
        w0 = confHV.lw;
        h0 = confHV.th;
        // Debug.trace('x1:'+x1+" y1:"+y1+" w1:"+w1+" h1:"+h1);
        var tex0 = Laya.Texture.createFromTexture(texture, x0, y0, w0, h0);
        var drawX0, drawY0, drawW0, drawH0;
        drawX0 = 0;
        drawY0 = 0;
        drawW0 = w0;
        drawH0 = h0;
        sp.graphics.drawTexture(tex0, drawX0, drawY0, drawW0, drawH0);
        // right top
        var x1, y1, w1, h1;
        x1 = confHV.lw + confHV.cw;
        y1 = 0;
        w1 = confHV.rw;
        h1 = confHV.th;
        // Debug.trace('x1:'+x1+" y1:"+y1+" w1:"+w1+" h1:"+h1);
        var tex1 = Laya.Texture.createFromTexture(texture, x1, y1, w1, h1);
        var drawX1, drawY1, drawW1, drawH1;
        drawX1 = confHV.lw + confHV.cwid;
        drawY1 = 0;
        drawW1 = w1;
        drawH1 = h1;
        sp.graphics.drawTexture(tex1, drawX1, drawY1, drawW1, drawH1);
        //left bottom
        var x2, y2, w2, h2;
        x2 = 0;
        y2 = confHV.th + confHV.mh;
        w2 = confHV.lw;
        h2 = confHV.bh;
        // Debug.trace('x2:'+x2+" y2:"+y2+" w2:"+w2+" h2:"+h2);
        var tex2 = Laya.Texture.createFromTexture(texture, x2, y2, w2, h2);
        var drawX2, drawY2, drawW2, drawH2;
        drawX2 = 0;
        drawY2 = confHV.th + confHV.mhei;
        drawW2 = confHV.lw;
        drawH2 = confHV.bh;
        // Debug.trace('drawX:'+drawX+" drawY:"+drawY+" drawW:"+drawW+" drawH:"+drawH);
        sp.graphics.drawTexture(tex2, drawX2, drawY2, drawW2, drawH2);
        var x3, y3, w3, h3;
        x3 = confHV.lw + confHV.cw;
        y3 = confHV.th + confHV.mh;
        w3 = confHV.rw;
        h3 = confHV.bh;
        // Debug.trace("xc:"+x_c+" yc:"+y_c+" wc:"+w_c+" hc:"+h_c);
        var tex3 = Laya.Texture.createFromTexture(texture, x3, y3, w3, h3);
        var drawX3, drawY3, drawW3, drawH3;
        drawX3 = confHV.lw + confHV.cwid;
        drawY3 = confHV.th + confHV.mhei;
        drawW3 = confHV.rw;
        drawH3 = confHV.bh;
        // Debug.trace('drawX:'+drawX+" drawY:"+drawY+" drawW:"+drawW+" drawH:"+drawH);
        sp.graphics.drawTexture(tex3, drawX3, drawY3, drawW3, drawH3);
        //top center
        var x4, y4, w4, h4;
        x4 = confHV.lw;
        y4 = 0;
        w4 = confHV.cw;
        h4 = confHV.th;
        // Debug.trace("xc:"+x_c+" yc:"+y_c+" wc:"+w_c+" hc:"+h_c);
        var tex4 = Laya.Texture.createFromTexture(texture, x4, y4, w4, h4);
        var drawX4, drawY4, drawW4, drawH4;
        drawX4 = confHV.lw;
        drawY4 = 0;
        drawW4 = confHV.cwid;
        drawH4 = confHV.th;
        // Debug.trace('drawX:'+drawX+" drawY:"+drawY+" drawW:"+drawW+" drawH:"+drawH);
        sp.graphics.drawTexture(tex4, drawX4, drawY4, drawW4, drawH4);
        //bottom center
        var x5, y5, w5, h5;
        x5 = confHV.lw;
        y5 = confHV.th + confHV.mh;
        w5 = confHV.cw;
        h5 = confHV.bh;
        // Debug.trace("xc:"+x_c+" yc:"+y_c+" wc:"+w_c+" hc:"+h_c);
        var tex5 = Laya.Texture.createFromTexture(texture, x5, y5, w5, h5);
        var drawX5, drawY5, drawW5, drawH5;
        drawX5 = confHV.lw;
        drawY5 = confHV.th + confHV.mhei;
        drawW5 = confHV.cwid;
        drawH5 = confHV.th;
        // Debug.trace('drawX:'+drawX+" drawY:"+drawY+" drawW:"+drawW+" drawH:"+drawH);
        sp.graphics.drawTexture(tex5, drawX5, drawY5, drawW5, drawH5);
        //left middle
        this.drawMyTexture(sp, texture, 0, confHV.th, confHV.lw, confHV.mh, 0, confHV.th, confHV.lw, confHV.mhei);
        //right middle
        this.drawMyTexture(sp, texture, confHV.lw + confHV.cw, confHV.th, confHV.rw, confHV.mh, confHV.lw + confHV.cwid, confHV.th, confHV.rw, confHV.mhei);
        //center middle
        this.drawMyTexture(sp, texture, confHV.lw, confHV.th, confHV.cw, confHV.mh, confHV.lw, confHV.th, confHV.cwid, confHV.mhei);
    };
    //指定精灵和texture绘制
    Tools.drawMyTexture = function (sp, texture, x, y, w, h, dx, dy, dw, dh) {
        var tex = Laya.Texture.createFromTexture(texture, x, y, w, h);
        sp.graphics.drawTexture(tex, dx, dy, dw, dh);
    };
    //通过http完整路径获取头名字
    Tools.getHttpName = function (url) {
        var idx = url.indexOf("://");
        if (idx != -1) {
            //包含
            var h = url.substring(0, idx);
            return h;
        }
        else {
            //不包含
        }
        return "http";
    };
    //提取文件名和扩展名
    Tools.getFileNameExt = function (str) {
        var lastPoint = str.lastIndexOf(".");
        var name = str.substring(0, lastPoint);
        var ext = str.substring(lastPoint, str.length);
        return { "name": name, "ext": ext };
    };
    //提取当前目录地址
    Tools.getCurDirPath = function (str) {
        //先检查str是否含有http
        var httpIdx = str.indexOf("http");
        if (httpIdx != -1) {
            //含有，说明是完整路径，就不再拼接了
            return str;
        }
        var url2 = document.URL;
        // Debug.trace("getCurDirPath url2:"+url2);
        //在url中找出最后一个斜杠
        var lastEnd = url2.lastIndexOf("/");
        // Debug.trace("getCurDirPath lastEnd:"+lastEnd);
        // 提取出最后一个斜杠之前的所有字符串
        var frontStr = url2.substring(0, lastEnd);
        // Debug.trace("getCurDirPath frontStr:"+frontStr);
        var newurl = "";
        //如果前面的末尾没有斜杠，后段的开始没有斜杠，中间加一个斜杠。
        if (!this.isHaveXiegang(frontStr, frontStr.length - 1) && !this.isHaveXiegang(str, 0)) {
            newurl = frontStr + "/" + str;
        }
        else {
            newurl = frontStr + str;
        }
        // Debug.trace('getCurDirPath newurl:'+newurl);
        return newurl;
    };
    //检查指定位置是否有斜杠
    Tools.isHaveXiegang = function (str, pos) {
        var cut = str.substring(pos, pos + 1);
        // Debug.trace("isHaveXiegang pos:"+pos+" str:"+str+" cut:"+cut);
        if (cut == "/") {
            return true;
        }
        return false;
    };
    //提取当前根地址
    Tools.getCurRootPath = function (str) {
        //先检查str是否含有http
        var httpIdx = str.indexOf("http");
        if (httpIdx != -1) {
            //含有，说明是完整路径，就不再拼接了
            return str;
        }
        // var url0 = window.location.href;
        // var url1 = self.location.href;
        var url2 = document.URL;
        // var url3 = document.location;
        // Debug.trace("url0:"+url0);
        // Debug.trace("url1:"+url1);
        Debug.trace("url2:" + url2);
        // Debug.trace("url3:"+url3);
        var httpName = Tools.getHttpName(url2);
        Debug.trace("httpName:" + httpName);
        var hostname = location.hostname;
        var port = location.port;
        if (port) {
            return httpName + "://" + hostname + ":" + port + "/" + str;
        }
        return httpName + "://" + hostname + "/" + str;
    };
    //获取当前域名
    Tools.getCurHost = function (fullpath) {
        var url4 = window.location.host;
        // Debug.trace("url4:"+url4);
        //检查完整路径里面是否有http，有就取出来用
        var idxHttp = fullpath.indexOf("http");
        var idxHttps = fullpath.indexOf("https");
        if (idxHttps == 0) {
            //直接拼
            return "https://" + url4;
        }
        else if (idxHttp == 0) {
            return "http://" + url4;
        }
        return url4;
    };
    //提取当前完整路径
    Tools.getCurFullPath = function () {
        var url2 = document.URL;
        // Debug.trace("url2:"+url2);
        // var url3 = window.location;
        // Debug.trace("url3:"+url3);
        // var url4 = window.location.host;
        // Debug.trace("url4:"+url4);
        return url2;
    };
    //提取当前子游戏模块资源加载地址
    Tools.getResRootPath = function (str) {
        // var url0 = window.location.href;
        // var url1 = self.location.href;
        var url2 = document.URL;
        // var url3 = document.location;
        // Debug.trace("url0:"+url0);
        // Debug.trace("url1:"+url1);
        Debug.trace("url2:" + url2);
        // Debug.trace("url3:"+url3);
        var httpName = Tools.getHttpName(url2);
        Debug.trace("httpName:" + httpName);
        var hostname = location.hostname;
        var port = location.port;
        if (port) {
            return httpName + "://" + hostname + ":" + port + "/" + str;
        }
        return httpName + "://" + hostname + "/" + str;
    };
    //使用哪个rewrite地址
    /*
    public static whichRewrite_():any
    {
        var hostname = location.hostname;
        var port:string = location.port;

        // Debug.trace('hostname:'+hostname+" port:"+port);
        if( port == "90" )// || port == "8900" )
        {
            //dev 环境
            return Common.confObj.rewrite90;
        }else if( port == "89" )// || port == "8900" )
        {
            //sit load module
            return Common.confObj.rewrite89;
        }else if( port == "88" )// || port == "8900" )
        {
            //sit lobby v2
            return Common.confObj.rewrite88;
        }else if( port == "8900" )
        {
            //sit lobby v2 local
            return Common.confObj.rewrite8900;
        }

        //sit 环境
        return Common.confObj.rewrite;
    }
    */
    /*
    //将任意一个路径转换为可用地址
    public static filterUrl2rewrite(arr:any,str:string):string
    {
        //Common.confObj.rewrite
        //遍历所有需要rewrite的路径
        for( var k in arr )
        {
            var one = arr[k];

            if( str.indexOf(one.origin) != -1 )
            {
                //包含原生地址，需要替换
                return str.replace(one.origin,one.rewrite);
            }
        }

        return str;
    }
    */
    //切分中文字符到数组里
    Tools.substr_cn_2arr = function (str, len) {
        var s = str; //'我1234567890';
        // var reg=/.{4}/g;
        // var reg = eval("/.{"+ len + "}/g");
        var reg = new RegExp(".{" + len + "}", "g");
        var rs = new Array();
        try {
            rs = s.match(reg);
            rs.push(s.substring(rs.join('').length));
        }
        catch (e) {
            Debug.trace(e);
        }
        // alert(rs)
        // Debug.trace('rs len:'+rs.length);
        // Debug.trace(rs);
        return rs;
    };
    Tools.substr_cn = function (str, n) {
        var r = /[^\x00-\xff]/g;
        if (str.replace(r, "mm").length <= n) {
            return str;
        }
        var m = Math.floor(n / 2);
        for (var i = m; i < str.length; i++) {
            if (str.substr(0, i).replace(r, "mm").length >= n) {
                return str.substr(0, i); //+"...";
            }
        }
        return str;
    };
    //给精灵设定灰色滤镜
    Tools.setSpriteGrayFilter = function (sp) {
        //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，灰图
        var grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0];
        //创建一个颜色滤镜对象，灰图
        var grayscaleFilter = new Laya.ColorFilter(grayscaleMat);
        // 设定灰度
        sp.filters = [grayscaleFilter];
    };
    //判断变量是否数值
    Tools.isNumber = function (v) {
        if (typeof (v) === "number" && v !== Infinity && !isNaN(v)) {
            return true;
        }
        return false;
    };
    /**
     * 判断字符串是否为空
     * @param data
     */
    Tools.isEmpty = function (data) {
        if (data == null || data.length == 0) {
            return true;
        }
        return false;
    };
    /**
     * 获得请求过来的html参数
     * @param variable
     */
    Tools.getQueryVariable = function (variable) {
        var query = window.location.search.substring(1);
        // Debug.trace('getQueryVariable query:'+query);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        // Debug.trace('query variable %s not found', variable);
        return undefined;
    };
    /**
     * 获得字符串的hash值
     * @param str 需要被hash的字符串
     */
    Tools.hash = function (str) {
        var hash = 0, i, chr;
        if (str.length === 0)
            return hash;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
    //根据昵称转换头像id
    Tools.transNickname2id = function (str) {
        var hashCode = Tools.hash(str);
        var headerIndex = hashCode % 8; //12;
        if (headerIndex < 0) {
            headerIndex = -headerIndex;
        }
        headerIndex += 1;
        var strHeaderIndex = Tools.FormatNumber(headerIndex, 2);
        // this.setIcon("head/header" + headerIndex + ".png");
        // this.data.headerIndex = headerIndex;
        return strHeaderIndex;
    };
    //是否发生点击判断
    Tools.isClick = function (posDown, posUp) {
        var dis = Tools.distanceBy2Point(posDown.x, posDown.y, posUp.x, posUp.y);
        if (dis >= 20) {
            return false;
        }
        return true;
    };
    //是否发生碰撞
    Tools.isCollision = function (sp, pos) {
        return (pos.x >= sp.x && pos.y <= sp.x + sp.width) && (pos.y >= sp.y && pos.y <= sp.y + sp.height);
    };
    //分析资源类型
    Tools.getLoadingType = function (typename) {
        switch (typename) {
            case "ATLAS":
                return Laya.Loader.ATLAS;
            case "BUFFER":
                return Laya.Loader.BUFFER;
            case "FONT": //位图字体
                return Laya.Loader.FONT;
            case "IMAGE":
                return Laya.Loader.IMAGE;
            case "JSON":
                return Laya.Loader.JSON;
            case "SOUND":
                return Laya.Loader.SOUND;
            case "TEXT":
                return Laya.Loader.TEXT;
            case "XML":
                return Laya.Loader.XML;
            case "TTF": //字体
                return Laya.Loader.TTF;
        }
        return Laya.Loader.IMAGE;
    };
    //计算两点间距离
    Tools.distanceBy2Point = function (x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        // return 0;
    };
    //绘制方块
    Tools.drawRect = function (sp, x, y, w, h, color) {
        sp.graphics.drawRect(x, y, w, h, color); //,"#ff0000",2);
    };
    Tools.drawRectWithAlpha = function (sp, x, y, w, h, color, alpha) {
        if (alpha === void 0) { alpha = 1; }
        if (alpha != 1) {
            // sp.graphics.alpha(alpha);
            sp.graphics.setAlpha(alpha);
        }
        sp.graphics.drawRect(x, y, w, h, color);
        // sp.graphics.drawRect(x,y,w,h,color,"#ff0000",2);
        if (alpha != 1) {
            // sp.graphics.alpha(1);
            sp.graphics.setAlpha(1);
        }
    };
    //绘制圆角矩形，自定义路径
    Tools.RoundRect = function (sp, x, y, w, h, r, fillcolor, alpha) {
        // sp.graphics.drawPath(400, 310, [
        //     ["moveTo", 5, 0],
        //     ["lineTo", 105, 0],
        //     ["arcTo", 110, 0, 110, 5, 5],
        //     ["lineTo", 110, 55],
        //     ["arcTo", 110, 60, 105, 60, 5],
        //     ["lineTo", 5, 60],
        //     ["arcTo", 0, 60, 0, 55, 5],
        //     ["lineTo", 0, 5],
        //     ["arcTo", 0, 0, 5, 0, 5],
        //     ["closePath"]
        // ],
        // {
        //     fillStyle: "#00ffff"
        // });
        if (alpha === void 0) { alpha = 1; }
        // sp.graphics.drawPath(
        // 		x, y, 
        // [
        //     ["moveTo", arc, 0],
        //     ["lineTo", w-arc, 0],
        //     ["arcTo", w, 0, w, arc, arc],
        //     ["lineTo", w, h-arc],
        //     ["arcTo", w, h, w-arc, h, arc],
        //     ["lineTo", arc, h],
        //     ["arcTo", 0, h, 0, h-arc, arc],
        //     ["lineTo", 0, arc],
        //     ["arcTo", 0, 0, arc, 0, arc],
        //     ["closePath"]
        // ],
        // {
        //     fillStyle: color//"#00ffff"
        // });
        if (alpha != 1) {
            sp.graphics.setAlpha(alpha);
        }
        sp.graphics.drawPath(x, y, [
            ["moveTo", r, 0],
            ["lineTo", w - r, 0],
            ["arcTo", w + r, 0, w + r, r, r],
            ["lineTo", w + r, h - r],
            ["arcTo", w + r, h + r, w - r, h + r, r],
            ["lineTo", r, h + r],
            ["arcTo", 0, h + r, 0, h - r, r],
            ["lineTo", 0, r],
            ["arcTo", 0, 0, r, 0, r],
            ["closePath"]
        ], {
            fillStyle: fillcolor
        });
        if (alpha != 1) {
            sp.graphics.setAlpha(1);
        }
        sp.size(w, h);
    };
    //当前时间戳
    Tools.getTime = function () {
        var myDate = new Date();
        var MS = myDate.getTime();
        return MS;
    };
    //当前时间
    Tools.nowTime = function () {
        var myDate = new Date();
        // var sY = myDate.getYear();        //获取当前年份(2位)
        var Y = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        var M = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
        var D = myDate.getDate(); //获取当前日(1-31)
        // var DD = myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
        // var MS = myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
        var H = myDate.getHours(); //获取当前小时数(0-23)
        var I = myDate.getMinutes(); //获取当前分钟数(0-59)
        var S = myDate.getSeconds(); //获取当前秒数(0-59)
        var MS = myDate.getMilliseconds(); //获取当前毫秒数(0-999)
        // myDate.toLocaleDateString();     //获取当前日期
        // var mytime=myDate.toLocaleTimeString();     //获取当前时间
        // myDate.toLocaleString( );        //获取日期与时间
        return {
            "Y": Y,
            "M": M,
            "D": D,
            "H": H,
            "I": I,
            "S": S,
            "MS": MS
        };
    };
    //将时间转换为可读字符串
    Tools.getTimeStr = function (times) {
        var s = Math.floor(times / 100);
        var ss = Math.floor(times % 100);
        var m = Math.floor(s / 60);
        var s = Math.floor(s % 60);
        var m_s = m >= 10 ? "" + m : "0" + m;
        var s_s = s >= 10 ? "" + s : "0" + s;
        var ss_s = ss >= 10 ? "" + ss : "0" + ss;
        // return ""+m+":"+s+":"+ss;
        return m_s + ":" + s_s + ":" + ss_s;
    };
    //往node里面添加一个input
    Tools.addInput = function (node, conf) {
        // Debug.trace("addInput conf:");
        // Debug.trace(conf);
        var input = Tools.newInput(conf.skin, conf.size.w, conf.size.h, conf.sizegrid, conf.fontsize, conf.color, conf.font, conf.bold, conf.align, conf.underline);
        input.pos(conf.pos.x, conf.pos.y);
        if (conf.type) {
            input.type = conf.type;
        }
        if (conf.prompt) {
            input.prompt = conf.prompt;
        }
        node.addChild(input);
        return input;
    };
    //新建一个输入框
    Tools.newInput = function (skin, w, h, sizeGrid, fontSize, color, font, bold, align, underline) {
        if (sizeGrid === void 0) { sizeGrid = "0,0,0,0"; }
        if (fontSize === void 0) { fontSize = 20; }
        if (color === void 0) { color = "#000000"; }
        if (font === void 0) { font = "Arial"; }
        if (bold === void 0) { bold = false; }
        if (align === void 0) { align = "left"; }
        if (underline === void 0) { underline = false; }
        var ti = new Laya.TextInput();
        ti.skin = skin;
        ti.size(w, h); // ti.size(300, 50);
        // 数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。 例如："4,4,4,4,1"
        ti.sizeGrid = sizeGrid; //"0,40,0,40";  //背景图边距
        ti.font = Common.normalFont; //font;//"Arial";
        ti.fontSize = fontSize; //30;
        ti.bold = bold; //true;
        ti.color = color; //"#606368";
        ti.align = align;
        ti.underline = underline;
        // Laya.stage.addChild(ti);
        return ti;
    };
    //添加一个文本框
    Tools.addText = function (node, conf, caller, callback) {
        var txt = Tools.newText(conf.value, conf.size.w, conf.size.h, conf.font.size, conf.font.color, conf.font.align, conf.font.valign, conf.font.wordWrap, conf.font.leading, conf.font.overflow, caller, callback);
        node.addChild(txt);
        if (conf.pos) {
            txt.pos(conf.pos.x, conf.pos.y);
        }
        if (conf.font.borderColor) {
            txt.borderColor = conf.font.borderColor;
        }
        return txt;
    };
    //新建一个多行文本框
    Tools.newText = function (str, width, height, //x:number,y:number,
    fontsize, color, align, valign, wordWrap, leading, overflow, scrollCaller, scrollCallback) {
        if (color === void 0) { color = "#ffffff"; }
        if (align === void 0) { align = "center"; }
        if (valign === void 0) { valign = "middle"; }
        if (wordWrap === void 0) { wordWrap = true; }
        if (leading === void 0) { leading = 2; }
        if (overflow === void 0) { overflow = Laya.Text.SCROLL; }
        if (scrollCaller === void 0) { scrollCaller = null; }
        if (scrollCallback === void 0) { scrollCallback = null; }
        var txt = new Laya.Text();
        txt.text = str;
        // txt.width = width;
        txt.size(width, height);
        txt.fontSize = fontsize;
        txt.font = Common.normalFont; //
        txt.color = color;
        txt.overflow = overflow;
        //设置文本为多行文本
        txt.wordWrap = wordWrap; //true;
        txt.leading = leading;
        txt.align = align;
        txt.valign = valign;
        // txt.x = x;//Laya.stage.width - txt.textWidth >> 1;
        // txt.y = y;//Laya.stage.height - txt.textHeight >> 1;
        if (scrollCaller && scrollCallback) {
            txt.on(Laya.Event.MOUSE_DOWN, scrollCaller, scrollCallback);
            txt.on(Laya.Event.MOUSE_UP, scrollCaller, scrollCallback);
            txt.on(Laya.Event.MOUSE_MOVE, scrollCaller, scrollCallback);
            txt.on(Laya.Event.MOUSE_OUT, scrollCaller, scrollCallback);
        }
        return txt;
    };
    Tools.addLabels = function (node, conf) {
        if (!conf) {
            return null;
        }
        var lb = Tools.newLabels(conf);
        node.addChild(lb);
        if (conf.font.overflow) {
            lb.overflow = conf.font.overflow;
        }
        return lb;
    };
    Tools.newLabels = function (conf) {
        var lb = Tools.newLabel(conf.font.text, conf.size.w, conf.size.h, conf.font.size, conf.font.color, conf.font.align, conf.font.valign, conf.font.name, conf.font.wrap, conf.font.underline);
        lb.pos(conf.pos.x, conf.pos.y);
        if (conf.font.borderColor) {
            lb.borderColor = conf.font.borderColor;
        }
        return lb;
    };
    Tools.newLabel = function (text, w, h, fontSize, fontColor, align, valign, font, wordWrap, underline) {
        if (fontSize === void 0) { fontSize = 20; }
        if (fontColor === void 0) { fontColor = "#ffffff"; }
        if (align === void 0) { align = "center"; }
        if (valign === void 0) { valign = "middle"; }
        if (font === void 0) { font = "Microsoft YaHei"; }
        if (wordWrap === void 0) { wordWrap = true; }
        if (underline === void 0) { underline = false; }
        var lb = new Laya.Label();
        lb.font = Common.normalFont; //font;
        lb.text = text;
        lb.fontSize = fontSize;
        lb.color = fontColor;
        lb.underline = underline;
        // lb.borderColor = "#00ff00";
        // lb.stroke = 2;
        // lb.strokeColor = "#00ff00";
        lb.align = align;
        lb.valign = valign;
        if (w != 0) {
            lb.width = w;
        }
        if (h != 0) {
            lb.height = h;
        }
        // lb.stroke = 3;
        // lb.strokeColor = "#ffffff";
        lb.wordWrap = wordWrap;
        return lb;
    };
    //对字符串进行格式化 0% 表示第一个参数 n% 表示第n个参数
    Tools.FormatString = function (format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var str = format;
        //从format中替换掉所有n%
        for (var i = 0; i < args.length; i++) {
            // Debug.trace('args i:'+i+" = "+args[i]);
            str = str.replace(i + "%", args[i]);
        }
        return str;
    };
    //固定字符串长度，不足的后面补rep
    Tools.FormatStringLen = function (str, len, rep) {
        // Debug.trace("FormatStringLen str:"+str+" len:"+len+" rep:"+rep);
        while (str.length < len) {
            str += rep;
        }
        // Debug.trace("FormatStringLen str:"+str);
        return str;
    };
    //数字限定长度 不足在前面补0
    Tools.FormatNumber = function (num, length) {
        return (Array(length).join('0') + num).slice(-length);
    };
    //金额管制 以万为单位，万以下以元为单位
    Tools.FormatMoney = function (num, len) {
        var r = "";
        if (num >= 10000) {
            //超过一万
            var n = num / 10000;
            // r = n.toFixed(len);
            var tt = n.toFixed(len + 1);
            var pointPos = tt.indexOf("."); //点在字符串tt的哪里
            //点的后面截取len+1位
            r = tt.substring(0, pointPos + len + 1);
        }
        else {
            // return num.toFixed(len);
            var data = "" + Math.floor(num * Math.pow(10, len)) / Math.pow(10, len);
            return data;
        }
        return r + "万";
    };
    //计算两点角度
    Tools.getL = function (p1, p2) {
        var x = p1.x - p2.x;
        var y = p1.y - p2.y;
        var l = Math.atan(y / x);
        return l;
    };
    //转换弧度为角度
    Tools.getAngle = function (p1, p2) {
        var l = this.getL(p1, p2);
        var a = this.transl2Angle(l);
        var b = this.transAngle2Positive(a, p1, p2);
        return b;
    };
    //弧度转角度
    Tools.transl2Angle = function (l) {
        //180 -- pi
        //x ---- l
        // l = ( x * pi )/180;
        // x = ( 180 * l )/pi
        // return ( angle * Math.PI )/180;	//角度转弧度
        return (180 * l) / Math.PI; //弧度转角度
    };
    //检查角度是否为负，如果为负，则转换为正
    Tools.transAngle2Positive = function (angle, p1, p2) {
        //先检查p2在p1的哪个象限
        /*   	  +-90
                    |	-90
            90-	180	|	0-90
        0  --------------------   -0
            180-270	|	270-360
                    |
                  +-90
        */
        //1
        if (p2.x > p1.x && p2.y > p1.y) {
            if (angle >= 0) {
                angle = 360 - angle;
            }
            else {
                angle = 270 - angle;
            }
        }
        //2
        else if (p2.x < p1.x && p2.y > p1.y) {
            if (angle >= 0) {
                angle = 180 + angle;
            }
            else {
                angle = 180 - angle;
            }
        }
        //3
        else if (p2.x < p1.x && p2.y < p1.y) {
            if (angle >= 0) {
                angle = 180 - angle;
            }
            else {
                angle = angle;
            }
        }
        //4
        else if (p2.x > p1.x && p2.y < p1.y) {
            if (angle >= 0) {
                angle = angle;
            }
            else {
                angle = angle * -1;
            }
        }
        return angle;
    };
    //生成一个Sprite的剪影
    Tools.newSketch = function (sp, x, y, w, h) {
        var sp_mask = new Laya.Sprite();
        Tools.drawRect(sp_mask, x, y, w, h, "#000000");
        sp_mask.mask = sp;
        return sp_mask;
    };
    //检测当前平台信息--不能正确获取，废弃
    Tools.platformInfo_0 = function () {
        var platformInfo = {};
        var agent = navigator.userAgent.toLowerCase();
        var sUserAgent = navigator.userAgent;
        var regStr_ie = /msie [\d.]+;/gi;
        var regStr_ff = /firefox\/[\d.]+/gi;
        var regStr_chrome = /chrome\/[\d.]+/gi;
        var regStr_saf = /safari\/[\d.]+/gi;
        //IE
        if (agent.indexOf("msie") > 0) {
            platformInfo.browser = agent.match(regStr_ie);
        }
        //firefox
        if (agent.indexOf("firefox") > 0) {
            platformInfo.browser = agent.match(regStr_ff);
        }
        //Chrome
        if (agent.indexOf("chrome") > 0) {
            platformInfo.browser = agent.match(regStr_chrome);
        }
        //Safari
        if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
            platformInfo.browser = agent.match(regStr_saf);
        }
        var sUserAgent = navigator.userAgent;
        var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
        var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        if (isMac)
            platformInfo.os = "Mac";
        var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
        if (isUnix)
            platformInfo.os = "Unix";
        var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
        // var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";
        var bIsAndroid = sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('Adr') > -1;
        if (isLinux) {
            if (bIsAndroid)
                platformInfo.os = "Android";
            else
                platformInfo.os = "Linux";
        }
        if (isWin) {
            var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
            if (isWin2K)
                platformInfo.os = "Win2000";
            var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
            sUserAgent.indexOf("Windows XP") > -1;
            if (isWinXP)
                platformInfo.os = "WinXP";
            var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
            if (isWin2003)
                platformInfo.os = "Win2003";
            var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
            if (isWinVista)
                platformInfo.os = "WinVista";
            var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
            if (isWin7)
                platformInfo.os = "Win7";
            var isWin8 = sUserAgent.indexOf("windows nt6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
            if (isWin8)
                platformInfo.os = "Win8";
        }
        platformInfo.os = "其他";
        var agent = navigator.userAgent.toLowerCase();
        var sUserAgent = navigator.userAgent;
        var sUserAgent = navigator.userAgent;
        var is64 = sUserAgent.indexOf("WOW64") > -1;
        if (is64) {
            platformInfo.digits = "64";
        }
        else {
            platformInfo.digits = "32";
        }
        return platformInfo;
    };
    //全屏
    Tools.addFullScreenListener = function () {
        var c = document.getElementsByTagName("canvas")[0];
        var pf = MyUid.getPlatform();
        if (pf == MyUid.KEY_P_PC || pf == MyUid.KEY_P_MAC) {
            c.addEventListener("click", Tools.screenFull);
        }
        else {
            c.addEventListener("touchend", Tools.screenFull);
        }
    };
    Tools.screenFull = function (e) {
        // Debug.trace('screenFull e:');
        if (BottomMenus.bClickFullscreen) {
            //检查当前是否全屏状态
            var bFull = false;
            try {
                bFull = window['screenfull'].isFullscreen;
                // Debug.trace('screenFull:'+bFull);
                if (bFull) //已经全屏了，就退出全屏
                 {
                    window['screenfull'].exit();
                }
                else { //尚未全屏，就执行全屏
                    window['screenfull'].request();
                }
            }
            catch (e) {
                Debug.trace(e);
            }
            BottomMenus.bClickFullscreen = false;
        }
        //同时要复制字符串内容到剪贴板
        // Debug.trace('copy string:'+Tools.copy_content);
        if (Tools.copy_content.length > 0) {
            Tools.Copy2Clip(Tools.copy_content);
            Tools.copy_content = "";
        }
    };
    Tools.doFullscreen = function () {
        BottomMenus.bClickFullscreen = true;
    };
    //复制到剪贴板
    Tools.copy2clip_win = function (lb) {
        Debug.trace('copy2clip win lb text:' + lb.text);
        try {
            // Tools.copy2clip(lb.text);
            // Tools.copyMessage(lb.text);
            // Tools.Copy2Clip(lb.text);
            Tools.copy_content = lb.text;
        }
        catch (e) {
            Debug.trace('copy2clip win error');
            Debug.trace(e);
        }
    };
    Tools.Copy2Clip = function (url) {
        Debug.trace('document:' + document);
        var lis = function (e) {
            Debug.trace('url:' + url);
            e.clipboardData.setData('text/plain', url);
            e.preventDefault();
            document.removeEventListener('copy', lis, false);
        };
        document.addEventListener('copy', lis, false);
        // document.addEventListener('copy', (e: ClipboardEvent) => {
        //     Debug.trace('url:'+url);
        //     e.clipboardData.setData('text/plain', url);
        //     e.preventDefault();
        //     document.removeEventListener('copy');
        // });
        var bcopy = document.execCommand('copy');
        Debug.trace('bcopy:' + bcopy);
    };
    ;
    //复制消息
    Tools.copyMessage = function (val) {
        var selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        var bcopy = document.execCommand('copy');
        // Debug.trace('bcopy:'+bcopy);
        document.body.removeChild(selBox);
    };
    //复制文本内容到剪贴板
    //此方法仅用在用户主动点击dom按钮时，不适合小游戏
    //模拟点击也不行
    Tools.copy2clip1 = function (str) {
        // Debug.trace('str len:'+str.length);
        if (str.length <= 0) {
            // Debug.trace('no copy content');
            return;
        }
        var input = document.createElement('input'); //.getElementById("input");
        document.body.appendChild(input);
        input.value = str; // 修改文本框的内容
        // input.id = 'copyinput';
        input.focus();
        input.select();
        // var js:any = 
        input.setSelectionRange(0, input.value.length);
        // js=input.createTextRange();
        // Debug.trace('input:');
        // Debug.trace(input);
        try {
            // if( document.execCommand('copy',false,null) )
            // if( js.execCommand("Copy") )
            if (document.execCommand("Copy")) {
                Debug.trace('suc');
            }
            else {
                Debug.trace('fail');
            }
        }
        catch (err) {
            // Debug.trace('copy err:'+err);
        }
        input.remove();
    };
    //当前要复制到剪贴板的内容
    Tools.copy_content = "";
    return Tools;
}());
//# sourceMappingURL=Tools.js.map