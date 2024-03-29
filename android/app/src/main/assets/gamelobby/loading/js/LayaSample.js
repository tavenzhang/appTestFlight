var WebGL = Laya.WebGL;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(0, 750, WebGL);
        GameMain.inst = this;
        // if (window["initVconsole"]) {
        //     window["initVconsole"]();
        // }
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.bgColor = "#000000";
        window.document.addEventListener("message", this.nativeMess, false);
        window.addEventListener("message", this.nativeMess, false);
        //设置Laya提供的worker.js路径
        Laya.WorkerLoader.workerPath = "libs/worker.js";
        //开启worker线程
        Laya.WorkerLoader.enable = true;
        //
        Laya.loader.load("res/atlas/update.atlas", Laya.Handler.create(this, this.initView));
    }
    GameMain.prototype.initView = function () {
        this.view = new view.UpdateView();
        Laya.stage.addChild(this.view);
        //通知native
        // window.top.postMessage(JSON.stringify({ action: "game_loading", data: { do: "loadInited" } }), "*");
    };
    GameMain.prototype.nativeMess = function (obj) {
        var data = JSON.parse(obj.data);
        if (!data)
            return;
        //注意：这里的作用域已发生变化,this指向了window
        switch (data.action) {
            case "game_loading": {
                GameMain.inst.showLoading(data.data);
                break;
            }
            case "showGame": { //显示游戏(由game发起)
                // if (window["showGame"]) {
                //     window["showGame"]();
                //     Laya.stage.removeChildren();
                // }
                break;
            }
        }
    };
    GameMain.prototype.showLoading = function (data) {
        if (this.view)
            this.view.showLoading(data);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map