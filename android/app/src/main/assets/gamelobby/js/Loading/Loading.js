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
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.duration = 2000;
        _this.loadingConfSrc = "";
        _this.assets_src_conf = "";
        _this.v = 0;
        _this.loadErr = [];
        return _this;
    }
    Loading.getObj = function (node, caller, callback, loadconf_src, assets_src) {
        if (node === void 0) { node = null; }
        if (caller === void 0) { caller = null; }
        if (callback === void 0) { callback = null; }
        if (loadconf_src === void 0) { loadconf_src = null; }
        if (assets_src === void 0) { assets_src = null; }
        if (!Loading.obj) {
            try {
                var a = new Loading();
                a.init(caller, callback, loadconf_src, assets_src);
                node.addChild(a);
            }
            catch (e) {
                Debug.trace("Loading init error:");
                Debug.trace(e);
            }
        }
        return Loading.obj;
    };
    Loading.prototype.destroy = function (b) {
        Loading.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    Loading.prototype.init = function (caller, callback, loadconf, assets_src) {
        this.caller = caller;
        this.callback = callback;
        Loading.obj = this;
        this.loadingConfSrc = loadconf;
        this.assets_src_conf = assets_src;
        // Debug.trace("this.loadingConfSrc:"+this.loadingConfSrc);
        // Debug.trace("this.assets_src_conf:"+this.assets_src_conf);
        // var temp = Tools.getResRootPath("gamelobby");
        // Debug.trace("temp path:"+temp);
        Laya.loader.retryNum = 0; //5;
        Laya.loader.load(this.loadingConfSrc, Laya.Handler.create(this, this.configLoaded, [this.loadingConfSrc]), null, Laya.Loader.JSON);
        // Laya.loader.on(Laya.Event.ERROR, this, this.onError);
    };
    Loading.prototype.show = function (b) {
        this.visible = b;
    };
    Loading.prototype.configLoaded = function (p) {
        this.loadConfObj = Laya.Loader.getRes(p);
        if (this.loadConfObj.preload) {
            this.startPreLoad();
        }
        else {
            this.showLoadProgress();
        }
    };
    Loading.prototype.startPreLoad = function () {
        var assets = [];
        var srcs = this.loadConfObj.preload; //this.confObj.assets.src;
        for (var i = 0; i < srcs.length; i++) {
            var urls = Tools.getSrc(srcs[i].url); // + "?v="+this.loadConfObj.version.value;
            var types = Tools.getLoadingType(srcs[i].type);
            var v = { url: urls, type: types };
            assets.push(v);
        }
        Laya.loader.load(assets, Laya.Handler.create(this, this.onPreLoadAssetsLoaded));
    };
    Loading.prototype.onPreLoadAssetsLoaded = function () {
        this.showLoadProgress();
    };
    Loading.prototype.showLoadProgress = function () {
        try {
            window['loadJsOver']();
        }
        catch (e) {
        }
        if (this.loadConfObj.Loading.bg) {
            if (this.loadConfObj.Loading.bg.anim) {
                this.bg = new MyBoneAnim();
                this.bg.init(this.loadConfObj.Loading.bg.anim);
                // var redMat = [
                // 	1,0,0,0,0,	//R
                // 	0,0,0,0,0,	//G
                // 	0,0,0,0,0,	//B
                // 	0,0,0,1,0,	//A
                // ];
                // var redfilter = new Laya.ColorFilter(redMat);
                // this.bg.filters = [redfilter];
            }
            else if (this.loadConfObj.LOading.bg.img) {
                this.bg = new Laya.Image(this.loadConfObj.Loading.bg.img.src);
                this.bg.pos(this.loadConfObj.Loading.bg.anim.pos.x, this.loadConfObj.Loading.bg.anim.pos.y);
            }
            this.addChild(this.bg);
            this.bg.playAnim(0, true);
        }
        if (this.loadConfObj.Loading.fireworks) {
            this.fireworks = new FireWorks();
            this.fireworks.init(this.loadConfObj.Loading.fireworks);
            this.addChild(this.fireworks);
        }
        this.pgbar = new PgBar(); //PgBarSaizi();//
        this.pgbar.init(this.loadConfObj.Loading.progressbar, this, this.onLoadOver);
        this.pgbar.initBg();
        // this.pgbar.createSaizi();
        this.pgbar.size(this.loadConfObj.Loading.progressbar.bg.rect.w, this.loadConfObj.Loading.progressbar.bg.rect.h);
        this.pgbar.pos(this.loadConfObj.Loading.progressbar.pos.x, this.loadConfObj.Loading.progressbar.pos.y);
        this.pgbar.pivot(this.loadConfObj.Loading.progressbar.pivot.x, this.loadConfObj.Loading.progressbar.pivot.y);
        this.addChild(this.pgbar);
        this.pgbar.setValue(0);
        this.pgbar.info("准备加载游戏资源");
        this.v = 0;
        if (this.loadConfObj.Loading.extinfo) {
            this.sp_ext = Tools.addSprite(this, this.loadConfObj.Loading.extinfo);
        }
        Laya.loader.load(this.assets_src_conf, Laya.Handler.create(this, this.AssetsConfLoaded, [this.assets_src_conf]), null, Laya.Loader.JSON);
    };
    Loading.prototype.AssetsConfLoaded = function (p) {
        this.assetsConfObj = Laya.Loader.getRes(p);
        this.startLoading();
    };
    Loading.prototype.startLoading = function () {
        var assets = [];
        var srcs = this.assetsConfObj.src; //this.confObj.assets.src;
        for (var i = 0; i < srcs.length; i++) {
            var urls = Tools.getSrc(srcs[i].url); // + "?v="+this.loadConfObj.version.value;
            var types = Tools.getLoadingType(srcs[i].type);
            var v = { url: urls, type: types };
            assets.push(v);
        }
        // Debug.trace(assets);
        Laya.loader.load(assets, Laya.Handler.create(this, this.onAssetLoaded), Laya.Handler.create(this, this.onLoading, null, false));
    };
    Loading.prototype.onAssetLoaded = function () {
        this.pgbar.info("资源加载完毕，正在构造游戏界面");
        this.callback.apply(this.caller, [this]);
    };
    Loading.prototype.LoginCallback = function (s) {
        if (s.error == 0) {
            // createGameLobby();
        }
        else {
            this.pgbar.info("登录失败，请检查网络并刷新重试");
        }
    };
    Loading.prototype.onLoading = function (progress) {
        // this.v += progress;
        // Debug.trace('onLoading progress:'+progress);
        this.pgbar.setValue(progress); //this.v);
    };
    Loading.prototype.onError = function (err) {
        try {
            // Debug.trace('Loading onError:'+err);
            this.loadErr.push(err);
            // Debug.trace('onError:'+err);
            this.pgbar.info("载入出错:" + err);
        }
        catch (e) {
            Debug.trace(e);
        }
    };
    Loading.prototype.onLoadOver = function () {
        // Laya.timer.clear(this,this.testLoading);
    };
    Loading.prototype.hide = function () {
        this.pos(Common.GM_SCREEN_W, 0); //SCREEN_WIDTH,0);
    };
    Loading.prototype.moveOut = function () {
        var xIn = Common.GM_SCREEN_W; //SCREEN_WIDTH;//this.posX + this.width*2;
        var yIn = 0; //this.posY;
        // Debug.trace("posX:"+this.posX+" posY:"+this.posY);
        // Debug.trace("px:"+this.posX+" py:"+this.posY+" x:"+this.x+" y:"+this.y+" xIn:"+xIn+" yIn:"+yIn);
        var tween = Laya.Tween.to(this, {
            x: xIn,
            y: yIn
        }, this.duration, Laya.Ease["backOut"]);
    };
    Loading.prototype.moveIn = function () {
        var xIn = 0; //this.posX;// + 500;
        var yIn = 0; //this.posY;
        // Debug.trace("posX:"+this.posX+" posY:"+this.posY);
        var tween = Laya.Tween.to(this, {
            x: xIn,
            y: yIn
        }, this.duration / 2, Laya.Ease["backIn"]);
    };
    Loading.obj = null;
    return Loading;
}(MySprite));
//# sourceMappingURL=Loading.js.map