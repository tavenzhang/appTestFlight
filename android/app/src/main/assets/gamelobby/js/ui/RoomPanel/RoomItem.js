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
/**
 * 房间列表中的单个房间图标
 */
var RoomItem = /** @class */ (function (_super) {
    __extends(RoomItem, _super);
    function RoomItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //上次绘制的半径
        _this.lastR = 10;
        //步进半径
        _this.stepR = 10;
        //当前绘制的开始角度
        _this.nowStartAngle = 0;
        //当前步进绘制角度
        _this.stepAngle = 30;
        //最大半径
        _this.maxR = 1139;
        return _this;
    }
    RoomItem.prototype.init = function (conf, gp) {
        this.conf = conf;
        this.panel = gp;
        this.lastR = this.conf.lastR;
        this.stepR = this.conf.stepR;
        this.nowStartAngle = this.conf.nowStartAngle;
        this.stepAngle = this.conf.stepAngle;
        this.maxR = this.conf.maxR;
        this.btn_icon = new MyButton();
        this.btn_icon.init(this.conf.btnicon, this, this.onClickItem);
        this.btn_icon.pos(this.conf.btnicon.pos.x, this.conf.btnicon.pos.y);
        this.addChild(this.btn_icon);
        //初始进入，不得点击
        this.btn_icon.bclick = false;
        this.icon_src = this.conf.btnicon.src[0];
        // Debug.trace("this.icon_src:"+this.icon_src);
        if (this.conf.showbg) {
            Tools.drawRectWithAlpha(this.btn_icon, 0, 0, this.conf.btnicon.size.w, this.conf.btnicon.size.h, this.conf.showbg.color, this.conf.showbg.alpha);
        }
        // this.sp_pie = new Laya.Sprite();
        // this.sp_pie.pos(0,0);
        // this.addChild(this.sp_pie);
        //設定自己的坐標
        // this.size(this.sp_icon.width,this.sp_icon.height);
        // this.size(this.conf.btnicon.size.w,this.conf.btnicon.size.h);
        // this.setEnable(false);
        // this.btn_icon.bclick = b;
        // this.pos(this.conf.pos.x,this.conf.pos.y);
        // this.visible = false;
    };
    RoomItem.prototype.setIcon = function (src) {
        this.icon_src = src;
        // Debug.trace("roomitem setIcon this.icon_src:"+this.icon_src);
        //将相对地址转化为绝对地址,添加当前url根
        var srcs = Tools.getCurDirPath(src);
        Laya.loader.load(srcs, new Laya.Handler(this, this.iconLoaded, [srcs]));
    };
    RoomItem.prototype.iconLoaded = function (res, s) {
        // Debug.trace('icon loaded res:');
        // Debug.trace(res);
        // this.sp_icon.graphics.clear();
        // this.sp_icon.graphics.drawTexture(e, 0, 0,
        //     this.sp_icon.width,this.sp_icon.height
        //     );
        // this.btn_icon.setRes([res]);
        // this.visible = true;
        try {
            this.btn_icon.setRes([res]);
        }
        catch (e) {
            Debug.trace('roomitem icon loaded e:');
            Debug.trace(e);
            Debug.trace('icon loaded res:' + this.data.name);
            Debug.trace(res);
            Debug.trace('icon loaded s:');
            Debug.trace(s);
        }
    };
    RoomItem.prototype.onClickItem = function () {
        //发生点击了
        if (!this.btn_icon.bclick) {
            // Debug.trace("room onclick return");
            return;
        }
        //记录当前的房间id
        Common.roomId = this.data.id;
        Common.wsUrl = this.data.url;
        // Debug.trace("RoomItem.onClickItem roomData:");
        // Debug.trace(this.data);
        if (this.conf.sfx) {
            Laya.SoundManager.playSound(this.conf.sfx);
        }
        //游戏图标点击后，应该开始拉取当前该游戏的所有房间列表
        // Debug.trace('GameItem onClick');
        //调整深度，绘制弧面动画，切换到白屏
        // this.panel.setAllItemOrder(Common.IDX_BELOW_DRAW);
        // this.zOrder = Common.IDX_TOP_DRAW;
        // Laya.timer.loop(this.conf.dutimer,this,this.drawPie);
        //可以跳转吗？
        if (Common.canGoinGame(this.data)) {
            // Debug.trace("RoomItem.onClickItem panel:");
            // Debug.trace(this.panel);
            // Debug.trace("RoomItem.onClickItem panel.gamedata:");
            // Debug.trace(this.panel.gamedata);
            //直接跳转
            var url = this.panel.gamedata.url; // + "?token="+Common.access_token+"&id="+this.panel.gamedata.id;
            // Debug.trace('room item url:'+url);
            // if( this.panel.gamedata.jumpUrl == true )
            // {
            Tools.jump2game(url);
            // }else
            // {
            // lamain.loadModule(url);//+"/game.conf");//http://192.168.9.6:7070/g3/zgame/");
            // LayaMain.getInstance().loadModule(url);
            // Toast.showToast("hhhhhhhhh");
            // }
        }
        else {
            //不能跳，钱不够
            // Toast.showToast("金币不足");
            RechargeHintPad.showPad(null, this, this.closeRecharge);
        }
        //发生点击了，不得重复点击 如果是app 交给app控制
        // if(!Common.IS_NATIVE_APP)
        // {
        //     this.setEnable(false);
        // }
    };
    //关闭充值面板
    RoomItem.prototype.closeRecharge = function () {
        this.setEnable(true);
    };
    //设置数据
    RoomItem.prototype.setData = function (dt, id) {
        this.data = dt;
        //过滤233的路径为本地路径
        // var url = dt.icon;
        // if( url == null )
        // {
        //     this.setIcon(dt.icon);    
        // }else{
        //     this.setIcon(url);
        // }
        try {
            // this.icon_src = this.conf.iconsrc[id];
            this.setIcon(this.conf.iconsrc[id]);
        }
        catch (e) { }
        this.setEnable(true);
    };
    //设置是否可以点击
    RoomItem.prototype.setEnable_ = function (b) {
        if (this.data) {
            if (this.data.state == "NORMAL") {
                this.btn_icon.bclick = b;
            }
            else {
                Tools.setSpriteGrayFilter(this.btn_icon);
                this.btn_icon.bclick = false;
            }
        }
        else {
            this.btn_icon.bclick = b;
        }
    };
    RoomItem.prototype.setEnable = function (b) {
        if (this.data.state == "NORMAL") {
            this.btn_icon.bclick = b;
            this.showStatus();
        }
        else {
            //显示灰色
            this.showGray();
            // Tools.setSpriteGrayFilter(this.btn_icon);
            if (!this.sp_pause) {
                try {
                    this.sp_pause = Tools.addSprite(this, this.conf.statePause);
                }
                catch (e) { }
            }
            this.btn_icon.bclick = false;
        }
    };
    //显示灰色图片
    RoomItem.prototype.showGray = function () {
        // Debug.trace("this.icon_src:"+this.icon_src);
        var n = Tools.getFileNameExt(this.icon_src);
        var src = n.name + this.conf.btnicon.grayext + n.ext;
        var srcs = Tools.getCurDirPath(src);
        Laya.loader.load(srcs, new Laya.Handler(this, this.iconLoaded, [srcs]));
    };
    RoomItem.prototype.showStatus = function () {
        if (this.conf.statusNormal && !this.sp_status) {
            var status = -1; //this.data.iBusy;
            if (this.data.iBusy) {
                status = this.data.iBusy;
            }
            if (status >= 0) {
                this.sp_status = new Laya.Sprite();
                this.sp_status.loadImage(this.conf.statusNormal.status[status]);
                this.sp_status.pos(this.conf.statusNormal.pos.x, this.conf.statusNormal.pos.y);
                this.addChild(this.sp_status);
            }
        }
    };
    return RoomItem;
}(Laya.Sprite));
//# sourceMappingURL=RoomItem.js.map