/*
* 游戏列表管理器
*/
var GameListManager = /** @class */ (function () {
    function GameListManager(listbox) {
        this.iconList = [];
        this.listBox = listbox;
        this.init();
    }
    //点击右侧箭头滚动
    GameListManager.prototype.doRightArrow = function (dist) {
        if (dist === void 0) { dist = 330; }
        if (this.dragBox)
            this.dragBox.tweenTo(dist, MoveDirect.left);
    };
    GameListManager.prototype.doLeftArrow = function (dist) {
        if (dist === void 0) { dist = 330; }
        if (this.dragBox)
            this.dragBox.tweenTo(dist, MoveDirect.right);
    };
    //重置滑动区域大小
    GameListManager.prototype.resetView = function () {
        if (this.dragBox) {
            var w = Laya.stage.width - this.dragBox.x;
            this.dragBox.resetScrollRect(w);
        }
    };
    GameListManager.prototype.init = function () {
        var _this = this;
        EventManager.register(EventType.GAME_UPDATE_INIT, this, this.onUpdateMsgInit);
        EventManager.register(EventType.GAME_UPDATE_PROGRESS, this, this.onUpdateProgress);
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.gamelist +
            "?pageSize=20&start=0&access_token=" + Common.access_token +
            "&channel=" + TempData.channel +
            "&device=" + Common.getLoginPlatform() +
            "&jump=" + Common.bNewlogin;
        HttpRequester.doRequest(url, null, null, this, function (suc, jobj) {
            if (suc) {
                Debug.trace("gameList:");
                Debug.trace(jobj);
                Common.gameInfo = jobj.datas;
                _this.addGameItems(jobj.datas);
                Laya.timer.once(500, _this, _this.onUpdateMsgInit);
            }
            else {
                //...
            }
        }, "get");
    };
    //游戏更新相关-----------------
    GameListManager.prototype.onUpdateMsgInit = function () {
        var _this = this;
        var msgArr = UpdateMsgHandle.updateInitMsg;
        if (msgArr) {
            msgArr.forEach(function (value) {
                var icon = _this.getGameIconByAlias(value.alias);
                if (icon) {
                    if (value.percent >= 0)
                        icon.doUpdateProgress(value.percent);
                    else
                        icon.setGameState(GameState.UPDATE);
                }
            });
        }
    };
    GameListManager.prototype.onUpdateProgress = function (data) {
        var _this = this;
        if (!data || data.length <= 0)
            return;
        data.forEach(function (value) {
            var icon = _this.getGameIconByAlias(value.alias);
            if (icon)
                icon.doUpdateProgress(value.percent);
        });
    }; //end-----------------------
    GameListManager.prototype.addGameItems = function (glist) {
        var icon;
        var iconGroup = new Laya.Sprite();
        iconGroup.mouseEnabled = true;
        var len = glist ? glist.length : 0;
        var gapX = 30; //x轴间隔
        var gapY = 30;
        var contentWidth = 0;
        for (var i = 0; i < len; i++) {
            icon = new view.UI.GameIconView();
            icon.index = i;
            icon.mouseEnabled = true;
            icon.readData(glist[i]);
            // icon.setGameState(GameState.UPDATE);//debugxxx(用于调试动画位置)
            icon.x = Math.floor(i / 2) * (icon.width + gapX);
            icon.y = (i % 2) * (icon.height + gapY);
            iconGroup.addChild(icon);
            this.iconList.push(icon);
        }
        if (icon) {
            var count = Math.floor(len / 2) + len % 2;
            contentWidth = (icon.width + gapX) * count;
        }
        if (len > 0) {
            //拖动容器的位置和拖动区域大小数据
            var ix = 430;
            var iy = 176;
            var iw = Laya.stage.width - ix;
            var ih = icon.height * 2 + gapY;
            var rect = new Laya.Rectangle(ix, iy, iw, ih);
            //创建拖动容器
            this.dragBox = new DragingBox(rect, true);
            this.dragBox.setFriction(0.95);
            this.dragBox.setBorderCallback(this, this.borderHandler);
            this.dragBox.setClickCallback(this, this.clickHandler);
            this.dragBox.addContent(iconGroup, contentWidth);
            this.listBox.addChild(this.dragBox);
        }
        else {
            if (this.leftArrowBtn)
                this.leftArrowBtn.visible = false;
            if (this.rightArrowBtn)
                this.rightArrowBtn.visible = false;
        }
    };
    //游戏图标点击
    GameListManager.prototype.clickHandler = function (evt) {
        if (evt.target instanceof view.UI.GameIconView) {
            evt.target.doClick();
        }
    };
    //控制箭头按钮的显示
    GameListManager.prototype.borderHandler = function (type) {
        switch (type) {
            case OutFlag.out_left: {
                if (this.leftArrowBtn && this.leftArrowBtn.visible)
                    this.leftArrowBtn.visible = false;
                if (this.rightArrowBtn && !this.rightArrowBtn.visible)
                    this.rightArrowBtn.visible = true;
                break;
            }
            case OutFlag.out_right: {
                if (this.leftArrowBtn && !this.leftArrowBtn.visible)
                    this.leftArrowBtn.visible = true;
                if (this.rightArrowBtn && this.rightArrowBtn.visible)
                    this.rightArrowBtn.visible = false;
                break;
            }
            case OutFlag.inside: {
                if (this.leftArrowBtn && !this.leftArrowBtn.visible)
                    this.leftArrowBtn.visible = true;
                if (this.rightArrowBtn && !this.rightArrowBtn.visible)
                    this.rightArrowBtn.visible = true;
                break;
            }
        }
    };
    /**
     * 根据alias获取游戏图标对象
     * @param alias
     */
    GameListManager.prototype.getGameIconByAlias = function (alias) {
        var arr = this.iconList.filter(function (value) { return value.alias == alias; });
        if (arr && arr.length > 0)
            return arr[0];
        return null;
    };
    GameListManager.prototype.pause = function () {
        if (this.iconList) {
            this.iconList.forEach(function (value) { return value.pause(); });
        }
    };
    GameListManager.prototype.resume = function () {
        if (this.iconList) {
            this.iconList.forEach(function (value) { return value.resume(); });
        }
    };
    /**
     * 销毁
     */
    GameListManager.prototype.destory = function () {
        EventManager.removeAllEvents(this);
        if (this.iconList) {
            this.iconList.forEach(function (value) { return value.destroy(); });
            this.iconList = null;
        }
        if (this.dragBox)
            this.dragBox.destroy();
    };
    return GameListManager;
}());
//# sourceMappingURL=GameListManager.js.map