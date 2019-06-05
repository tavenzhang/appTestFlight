/*
* 声音音效播放器
*/
var SoundPlayer = /** @class */ (function () {
    function SoundPlayer() {
    }
    //非弹窗类按钮点击
    SoundPlayer.clickSound = function () {
        this.play("assets/raw/click.mp3");
    };
    // public static clicksfxSound() {
    //     this.play("assets/raw/click.mp3");
    // }
    //关闭小弹窗(非全屏弹窗)
    SoundPlayer.closeSound = function () {
        this.play("assets/raw/close.mp3");
    };
    SoundPlayer.enterbuySound = function () {
        this.play("assets/raw/enterbuyClick.mp3");
    };
    //进入游戏
    SoundPlayer.enterGameSound = function () {
        this.play("assets/raw/enterGameClick.mp3");
    };
    //打开弹窗
    SoundPlayer.enterPanelSound = function () {
        this.play("assets/raw/enterPanelClick.mp3");
    };
    //关闭全屏类弹窗
    SoundPlayer.returnLobbySound = function () {
        this.play("assets/raw/returnLobbyClick.mp3");
    };
    /**
     * 播放声音
     * @param url
     */
    SoundPlayer.play = function (url) {
        Laya.SoundManager.playSound(url);
    };
    return SoundPlayer;
}());
//# sourceMappingURL=SoundPlayer.js.map