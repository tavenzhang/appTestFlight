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
        _this.loadingConfSrc = "";
        // public loadingRoot:string = "";
        _this.v = 0;
        _this.loadErr = [];
        return _this;
    }
    LoadingModule.prototype.init = function (src, caller, callback) {
        this.loadingConfSrc = src;
        this.caller = caller;
        this.callback = callback;
        var mod = Common.getModuleLoaded(this.loadingConfSrc);
        if (mod != null) {
            this.callback.apply(this.caller, [this, "loaded"]);
        }
        else {
            Laya.loader.load(this.loadingConfSrc, Laya.Handler.create(this, this.configLoaded, [this.loadingConfSrc]), null, Laya.Loader.JSON);
        }
    };
    LoadingModule.prototype.configLoaded = function (p) {
        this.loadConf = Laya.Loader.getRes(p);
        if (!this.loadConf) {
            Debug.trace("Laya.URL.basePath:" + Laya.URL.basePath);
            this.callback.apply(this.caller, [this.loadingConfSrc, "failed"]);
            return;
        }
        Laya.URL.basePath = Tools.getResRootPath(this.loadConf.root);
        Debug.trace("Laya.URL.basePath:" + Laya.URL.basePath);
        this.startLoading();
    };
    LoadingModule.prototype.startLoading = function () {
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
            this.onAssetLoaded();
            return;
        }
        // Debug.trace("Laya.URL.basePath:"+Laya.URL.basePath);
        Laya.loader.load(assets, Laya.Handler.create(this, this.onAssetLoaded), Laya.Handler.create(this, this.onLoading, null, false));
    };
    LoadingModule.prototype.onAssetLoaded = function () {
        this.loadAllJsFiles(this.loadConf.codes);
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
    LoadingModule.prototype.LoginCallback = function (s) {
        if (s.error == 0) {
            // createGameLobby();
        }
        else {
        }
    };
    LoadingModule.prototype.onLoading = function (progress) {
        // this.v += progress;
        // Debug.trace('onLoading progress:'+progress);
    };
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
        // Laya.timer.clear(this,this.testLoading);
    };
    LoadingModule.prototype.hide = function () {
        this.pos(Common.GM_SCREEN_W, 0); //SCREEN_WIDTH,0);
    };
    LoadingModule.prototype.loadJsOver = function () {
        Common.pushModule(this.loadingConfSrc, this.loadConf);
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