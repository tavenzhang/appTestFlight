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
var LoadingModule = /** @class */ (function (_super) {
    __extends(LoadingModule, _super);
    function LoadingModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.duration = 2000;
        //载入加载参数
        _this.loadingConfSrc = "";
        // public loadingRoot:string = "";
        _this.v = 0;
        //存储错误信息
        _this.loadErr = [];
        return _this;
    }
    LoadingModule.prototype.init = function (src, caller, callback) {
        this.loadingConfSrc = src;
        // this.loadingConfSrc = url + "game.conf";
        // this.loadingRoot = url;
        // Debug.trace('LoadingModule src:'+this.loadingConfSrc);
        this.caller = caller;
        this.callback = callback;
        // Debug.trace('loadingModule callback:');
        // Debug.trace(this.callback);
        // Debug.trace('loadingModule caller:');
        // Debug.trace(this.caller);
        // 无加载失败重试
        // Laya.loader.retryNum = 5;
        //检查是否已经加载
        var mod = Common.getModuleLoaded(this.loadingConfSrc);
        if (mod != null) {
            //加载完毕
            this.callback.apply(this.caller, [this, "loaded"]);
        }
        else {
            // Laya.URL.basePath = "";//this.loadingRoot;
            //加载配置
            Laya.loader.load(this.loadingConfSrc, 
            // "game.conf",
            Laya.Handler.create(this, this.configLoaded, [this.loadingConfSrc]), null, Laya.Loader.JSON);
            // Laya.loader.on(Laya.Event.ERROR, this, this.onError);
        }
    };
    //加载完毕
    LoadingModule.prototype.configLoaded = function (p) {
        this.loadConf = Laya.Loader.getRes(p);
        // this.loadConf = Laya.loader.getRes(p);
        // Debug.trace('loading json loaded:'+p);
        // Debug.trace(this.loadConf);
        // var loadConf2 = Laya.Loader.getRes(p);
        // Debug.trace('loading json loaded 2:'+p);
        // Debug.trace(loadConf2);
        // var loadConf2 = Laya.loader.getRes("game.conf");
        // Debug.trace('loading json loaded:game.conf');
        // Debug.trace(loadConf2);
        if (!this.loadConf) {
            //加载完毕
            // Debug.trace('load module failed');
            Debug.trace("Laya.URL.basePath:" + Laya.URL.basePath);
            this.callback.apply(this.caller, [this.loadingConfSrc, "failed"]);
            return;
        }
        Laya.URL.basePath = Tools.getResRootPath(this.loadConf.root);
        Debug.trace("Laya.URL.basePath:" + Laya.URL.basePath);
        //开始加载资源
        this.startLoading();
    };
    //开始加载
    LoadingModule.prototype.startLoading = function () {
        //先加载图片
        //根据配置，构造加载列表
        var assets = [];
        var srcs = this.loadConf.res;
        for (var i = 0; i < srcs.length; i++) {
            var urls = srcs[i].url;
            var types = Tools.getLoadingType(srcs[i].type);
            var v = { url: urls, type: types };
            assets.push(v);
        }
        // Debug.trace(assets);
        if (assets.length <= 0) {
            //没有要加载的资源，直接进入资源加载完成
            this.onAssetLoaded();
            return;
        }
        // Debug.trace("Laya.URL.basePath:"+Laya.URL.basePath);
        Laya.loader.load(assets, Laya.Handler.create(this, this.onAssetLoaded), Laya.Handler.create(this, this.onLoading, null, false));
        // 侦听加载失败
        // Laya.loader.on(Event.ERROR, this, this.onError);
    };
    //所有资源加载完毕
    LoadingModule.prototype.onAssetLoaded = function () {
        // Debug.trace('onAssetLoaded');
        //加载所有代码
        // if( this.loadConf.codes )
        // {
        //     for( var k in this.loadConf.codes )
        //     {
        //         this.loadJsFile(this.loadConf.root+this.loadConf.codes[k]);
        //     }
        // }
        // Debug.trace('onAssetLoaded load js file end');
        //将当前模块推入已加载记录
        // Common.pushModule(this.loadingConfSrc,this.loadConf);
        // Debug.trace('onAssetLoaded pushModule');
        //加载完毕
        // this.callback.apply(this.caller,[this,"loaded"]);
        this.loadAllJsFiles(this.loadConf.codes); //,this.loadJsOver);
    };
    LoadingModule.prototype.loadJsFile = function (filename) {
        var fileref = Laya.Browser.document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        // fileref.setAttribute("src", filename);
        fileref.src = filename + "?v=" + Common.loadConf.version.value;
        // fileref.loader = "laya";
        fileref.setAttribute("loader", "laya");
        // fileref.defer = false;
        fileref.setAttribute("defer", false);
        // trace(fileref);
        if (typeof fileref != "undefined") {
            // Laya.Browser.document.getElementsByTagName("head")[0].appendChild(fileref);
            Laya.Browser.document.getElementsByTagName("body")[0].appendChild(fileref);
        }
    };
    //登录成功的回调
    LoadingModule.prototype.LoginCallback = function (s) {
        if (s.error == 0) {
            //成功，进入大厅
            // createGameLobby();
        }
        else {
            //显示提示信息，刷新重试
        }
    };
    //当前加载进度
    // this.v = 0;
    //加载过程中
    LoadingModule.prototype.onLoading = function (progress) {
        // this.v += progress;
        // Debug.trace('onLoading progress:'+progress);
    };
    //加载出错
    LoadingModule.prototype.onError = function (err) {
        try {
            // Debug.trace('Loading onError:'+err);
            this.loadErr.push(err);
            // Debug.trace('onError:'+err);
        }
        catch (e) {
            Debug.trace(e);
        }
    };
    LoadingModule.prototype.onLoadOver = function () {
        //装载完毕了，移除loading界面，切换进入游戏主界面
        // Laya.timer.clear(this,this.testLoading);
    };
    LoadingModule.prototype.hide = function () {
        this.pos(Common.GM_SCREEN_W, 0); //SCREEN_WIDTH,0);
    };
    //动态加载js
    LoadingModule.prototype.loadJsOver = function () {
        //加载js文件完毕
        // Debug.trace('loadJsOver');
        //将当前模块推入已加载记录
        Common.pushModule(this.loadingConfSrc, this.loadConf);
        // Debug.trace('onAssetLoaded pushModule');
        // Debug.trace('loadingModule end callback:');
        // Debug.trace(this.callback);
        // Debug.trace('loadingModule end caller:');
        // Debug.trace(this.caller);
        //加载完毕
        // Debug.trace('loadJsOver src:'+this.loadingConfSrc);
        this.callback.apply(this.caller, [this.loadingConfSrc, "loaded"]);
    };
    // public loadAllJsFiles(list:any,callback:any):void
    LoadingModule.prototype.loadAllJsFiles = function (list) {
        // this.loadScript(list, callback);
        this.loadScript(list); //, callback);
    };
    // public loadScript(list:any, callback:any):void
    LoadingModule.prototype.loadScript = function (list) {
        var loaded = 0;
        this.loadNext(loaded, list); //,callback);
    };
    ;
    // public loadNext(loaded:number,list:any,callback:any):void
    LoadingModule.prototype.loadNext = function (loaded, list) {
        var that = this;
        this.loadSingleScript(list[loaded], function () {
            loaded++;
            if (loaded >= list.length) {
                // that.callback();
                that.loadJsOver();
            }
            else {
                // loadNext();
                that.loadNext(loaded, list); //,callback);
            }
        });
    };
    ;
    LoadingModule.prototype.loadSingleScript = function (src, callback) {
        var s = document.createElement('script');
        s.async = false;
        // s.src = this.loadConf.root + src;
        s.src = Laya.URL.basePath + src;
        s.addEventListener('load', function _listener() {
            s.parentNode.removeChild(s);
            // s.removeEventListener('load');
            // s.removeEventListener('load', arguments.callee, false);
            s.removeEventListener('load', _listener, false);
            callback();
        }, false);
        document.body.appendChild(s);
    };
    ;
    return LoadingModule;
}(Laya.Sprite));
//# sourceMappingURL=LoadingModule.js.map