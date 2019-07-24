/*
* 声音音效播放器
*/
var SoundPlayer = /** @class */ (function () {
    function SoundPlayer() {
    }
    //非弹窗类按钮点击
    SoundPlayer.clickSound = function (isMutex) {
        if (isMutex === void 0) { isMutex = false; }
        this.play("assets/raw/click.mp3", isMutex);
    };
    // public static clicksfxSound() {
    //     this.play("assets/raw/click.mp3");
    // }
    //关闭小弹窗(非全屏弹窗)
    SoundPlayer.closeSound = function (isMutex) {
        if (isMutex === void 0) { isMutex = false; }
        this.play("assets/raw/close.mp3", isMutex);
    };
    SoundPlayer.enterbuySound = function (isMutex) {
        if (isMutex === void 0) { isMutex = false; }
        this.play("assets/raw/enterbuyClick.mp3", isMutex);
    };
    //进入游戏
    SoundPlayer.enterGameSound = function (isMutex) {
        if (isMutex === void 0) { isMutex = false; }
        this.play("assets/raw/enterGameClick.mp3", isMutex);
    };
    //打开弹窗
    SoundPlayer.enterPanelSound = function (isMutex) {
        if (isMutex === void 0) { isMutex = false; }
        this.play("assets/raw/enterPanelClick.mp3", isMutex);
    };
    //关闭全屏类弹窗
    SoundPlayer.returnLobbySound = function (isMutex) {
        if (isMutex === void 0) { isMutex = false; }
        this.play("assets/raw/returnLobbyClick.mp3", isMutex);
    };
    /**
     * 播放声音
     * @param url
     */
    SoundPlayer.play = function (url, isMutex) {
        var curMutex = this.curPlaySound[url];
        if (!curMutex) { //当前不互斥才能继续播放相同音效
            this.curPlaySound[url] = isMutex; //记录互斥标签
            Laya.SoundManager.playSound(url, 1, Laya.Handler.create(null, function () {
                delete SoundPlayer.curPlaySound[url];
            }));
        }
    };
    SoundPlayer.curPlaySound = {};
    return SoundPlayer;
}());
//# sourceMappingURL=SoundPlayer.js.map