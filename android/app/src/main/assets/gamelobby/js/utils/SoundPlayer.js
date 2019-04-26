/*
* 声音音效播放器
*/
var SoundPlayer = /** @class */ (function () {
    function SoundPlayer() {
    }
    SoundPlayer.clickSound = function () {
        this.play("assets/raw/click.mp3");
    };
    SoundPlayer.closeSound = function () {
        this.play("assets/raw/close.mp3");
    };
    SoundPlayer.enterbuySound = function () {
        this.play("assets/raw/enterbuyClick.mp3");
    };
    SoundPlayer.enterGameSound = function () {
        this.play("assets/raw/enterGameClick.mp3");
    };
    SoundPlayer.enterPanelSound = function () {
        this.play("assets/raw/enterPanelClick.mp3");
    };
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