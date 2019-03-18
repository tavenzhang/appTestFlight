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
/*
游戏图标
*/
var GameItem = /** @class */ (function (_super) {
    __extends(GameItem, _super);
    function GameItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sStatus = GameItem.STATUS_NORMAL;
        _this.iUpdateProgress = 0; //更新或下载进度
        _this.bInUpdate = false; //是否处于更新进程
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
        //我的坐标X
        _this.px = 0;
        return _this;
    }
    GameItem.prototype.init = function (conf, gp) {
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
        this.btn_icon.bclick = false;
        if (this.conf.name) {
            this.lb_name = Tools.newLabel(this.conf.name.font.text, this.conf.name.size.w, this.conf.name.size.h, this.conf.name.font.size, this.conf.name.font.color, this.conf.name.font.align, this.conf.name.font.valign, this.conf.name.font.name, this.conf.name.font.wordwrap);
            if (this.conf.name.font.borderColor) {
                this.lb_name.borderColor = this.conf.name.font.borderColor;
            }
            this.lb_name.pos(this.conf.name.pos.x, this.conf.name.pos.y);
            this.addChild(this.lb_name);
        }
        if (this.conf.hot) {
            this.sp_hot = Tools.addSprite(this, this.conf.hot);
            this.setHot(false);
        }
        this.sp_pie = new Laya.Sprite();
        this.sp_pie.pos(0, 0);
        this.addChild(this.sp_pie);
        //設定自己的坐標
        // this.size(this.sp_icon.width,this.sp_icon.height);
        this.size(this.conf.btnicon.size.w, this.conf.btnicon.size.h);
        this.pivot(this.conf.btnicon.size.w / 2, this.conf.btnicon.size.h / 2);
        // this.pos(this.conf.pos.x,this.conf.pos.y);
        if (this.conf.showbg) {
            var showbg = new Laya.Sprite();
            this.addChild(showbg);
            Tools.drawRectWithAlpha(showbg, this.x, this.y, this.conf.btnicon.size.w, this.conf.btnicon.size.h, this.conf.showbg.color, this.conf.showbg.alpha);
        }
        // this.y = this.conf.pos.y;
    };
    GameItem.prototype.getGraySrc = function (src) {
        var n = Tools.getFileNameExt(src);
        var srcDest = n.name + this.conf.btnicon.grayext + n.ext;
        return srcDest;
    };
    //显示灰色图片
    GameItem.prototype.showGray = function () {
        // var n = Tools.getFileNameExt(this.icon_src);
        // var src = n.name+this.conf.btnicon.grayext+n.ext;
        // var srcs = src;
        var srcs = this.getGraySrc(this.icon_src);
        // var srcs = Tools.getCurDirPath(src);
        // Debug.trace('GameItem.showGray n:'+n+' src:'+src+" srcs:"+srcs);
        // Laya.loader.load(srcs,new Laya.Handler(this,this.iconLoaded,[srcs]));
        this.iconLoaded(srcs, null);
    };
    GameItem.prototype.setIcon = function (src) {
        this.icon_src = src;
        var srcs = src;
        // var srcs = Tools.getCurDirPath(src);
        // Debug.trace('GameItem.setIcon '+' srcs:'+srcs);
        // Laya.loader.load(srcs,new Laya.Handler(this,this.iconLoaded,[srcs]));
        this.iconLoaded(srcs, null);
    };
    GameItem.prototype.iconLoaded = function (res, s) {
        // this.sp_icon.graphics.clear();
        // this.sp_icon.graphics.drawTexture(e, 0, 0,
        //     this.sp_icon.width,this.sp_icon.height
        //     );
        // this.btn_icon.redraw(e);
        // this.btn_icon.data = this.data;
        // this.btn_icon.redrawTexture(res,e);
        // Debug.trace("GameItem.iconLoaded res:"+res);
        res = Tools.isHaveHeadPoint(".", res, 1);
        try {
            this.btn_icon.setRes([res]);
        }
        catch (e) {
            Debug.trace('gameitem icon loaded e:');
            Debug.trace(e);
            Debug.trace('icon loaded res:' + this.data.name);
            Debug.trace(res);
            Debug.trace('icon loaded s:');
            Debug.trace(s);
        }
    };
    GameItem.prototype.setName = function (name) {
        if (this.lb_name) {
            this.lb_name.text = name;
        }
    };
    GameItem.prototype.onMouseEventX = function (e) {
        // Debug.trace('GameItem onMouseEvent');
        // Debug.trace(e);
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                //记录当前的按下坐标
                this.downPos = { x: e.stageX, y: e.stageY };
                break;
            case Laya.Event.MOUSE_MOVE:
                break;
            case Laya.Event.MOUSE_OUT:
                this.downPos = null;
                break;
            case Laya.Event.MOUSE_UP:
                //释放的时候检查，与按下的坐标对比，距离小于一定值，才算click
                if (this.downPos) {
                    var upPos = { x: e.stageX, y: e.stageY };
                    if (Tools.isClick(this.downPos, upPos)) {
                        this.onClickItem();
                    }
                }
                break;
        }
    };
    /*
    //绘制转圈圆弧，废弃
    public drawPieX():void
    {
        var x = this.conf.drawcenter.x;//0;//this.width/2;
        var y = this.conf.drawcenter.y;//0;//this.height/2;
        var r = this.stepR + this.lastR;
        var fc = "#ffffff";
        var lc = "#ffffff";
        var lw = 0;

        var start = this.nowStartAngle;
        var end = start + this.stepAngle;

        // this.sp_icon.graphics.drawPie(x,y,r,start,end,fc,lc,lw);
        this.sp_pie.graphics.drawPie(x,y,r,start,end,fc,lc,lw);

        this.nowStartAngle = end;
        if( this.nowStartAngle >= 360 )
        {
            this.nowStartAngle -= 360;
        }

        this.lastR = r;

        if( this.lastR >= this.maxR )
        {
            // Debug.trace('drawPie end');
            Laya.timer.clear(this,this.drawPieX);

            //跳转
            var url = this.data.url;// + "?token="+Common.access_token+"&id="+this.data.id;
            Tools.jump2game(url);
        }
    }
    */
    //点击图标
    GameItem.prototype.onClickItem = function () {
        Debug.trace("GameItem.onClickItem this.sStatus:" + this.sStatus);
        //发生点击了
        switch (this.sStatus) {
            case GameItem.STATUS_PAUSE:
            case GameItem.STATUS_COMING:
                //不能点
                break;
            case GameItem.STATUS_ONLINE:
                //在线玩
                this.onLaunchGame();
                break;
            case GameItem.STATUS_UPDATE:
                //需更新
                this.onStartUpdate();
                break;
            default:
                //一般状态，可以玩，点击进入
                this.onLaunchGame();
                break;
        }
    };
    //点击启动游戏
    GameItem.prototype.onLaunchGame = function () {
        Debug.trace("GameItem.onLaunchGame this.data.id:" + this.data.id + " this.data.url:" + this.data.url);
        //记录下当前选中的游戏id
        Common.gameId = this.data.id;
        Common.wsUrl = this.data.url;
        if (this.conf.sfx) {
            // Debug.trace("GameItem.onClickItem sfx:"+this.conf.sfx);
            Laya.SoundManager.playSound(this.conf.sfx);
        }
        //看配置成啥，配置成跳转到游戏的话，就去游戏，去房间列表的话，就去房间列表
        if (this.data.jumpUrl) {
            //跳转url
            var url = this.data.url;
            Tools.jump2game(url);
        }
        else {
            if (this.conf.actionOnClick) //进入房间列表
             {
                LayaMain.getInstance().initRoom(this.data);
            }
        }
    };
    //设置数据
    GameItem.prototype.setData = function (dt) {
        // Debug.trace("GameItem.setData dt:");
        // Debug.trace(dt);
        this.data = dt;
        this.icon_src = this.data.icon;
        // this.setEnable(true);
        if (this.data.state == "NORMAL") {
            this.sStatus = GameItem.STATUS_NORMAL;
        }
        else if (this.data.state == "PAUSE") {
            this.sStatus = GameItem.STATUS_PAUSE;
        }
        else if (this.data.state == "EXPECTATION") {
            this.sStatus = GameItem.STATUS_COMING;
        }
        //过滤233的路径为本地路径
        // var url = dt.icon;
        // this.setIcon(url);
        var src = ConfObjRead.getGameIconSrcByAlias(this.data.alias);
        // Debug.trace("GameItem.setData alias:"+this.data.alias+" src:"+src);
        if (src) {
            this.setIcon(src);
        }
        this.setName(dt.name);
        this.initAnim();
        this.setHot(dt.bhot);
        this.px = this.x;
    };
    //是否显示热门
    GameItem.prototype.setHot = function (b) {
        this.sp_hot.visible = b;
    };
    //初始化动画
    GameItem.prototype.initAnim = function () {
        this.animConf = ConfObjRead.getGameIconAnimByAlias(this.data.alias);
        if (this.animConf && !this.sp_anim) {
            this.sp_anim = new MyBoneAnim();
            this.sp_anim.init(this.animConf);
            this.addChild(this.sp_anim);
            this.sp_anim.playAnim(0, true);
        }
    };
    //设置本游戏图标的可用性，是否可以点击
    GameItem.prototype.setEnable = function (b) {
        // Debug.trace("GameItem.setEnable b:"+b+" this.btn_icon.bclick:"+this.btn_icon.bclick+" w:"+this.btn_icon.width+" h:"+this.btn_icon.height);
        if (this.data.state == "NORMAL") {
            // this.btn_icon.bclick = b;
            this.btn_icon.alpha = this.animConf.dAlpha;
            this.btn_icon.setEnabled(true);
        }
        else {
            //显示灰色
            this.sp_anim.alpha = 0;
            // Debug.trace("GameItem.setEnable b:"+b+" showGray");
            this.showGray();
            this.showPause();
            // Tools.setSpriteGrayFilter(this.btn_icon);
            // if( this.sp_anim )
            // {
            //     Debug.trace("GameItem.setEnable gray anim");
            //     Tools.setSpriteGrayFilter(this.sp_anim);
            // }
            // if( !this.sp_pause )
            // {
            //     var conf:any;
            //     if( this.data.state == "PAUSE" )
            //     {
            //         conf = this.conf.statePause;
            //     }else if( this.data.state == "EXPECTATION" ) {
            //         conf = this.conf.stateComing;
            //     }
            //     try{
            //         this.sp_pause = Tools.newSprite(conf);
            //         this.addChild(this.sp_pause);
            //     }catch(e){}
            // }
            //  this.btn_icon.bclick = false;
        }
        // if( this.sp_anim && !b )
        // {
        // Debug.trace("GameItem.setEnable gray anim");
        //     Tools.setSpriteGrayFilter(this.sp_anim);
        // }
    };
    //我正在移动，移动了nx
    GameItem.prototype.imMove_ = function (nx) {
        // Debug.trace('imMove nx:'+nx);
        this.px += nx;
        // if( this.px >= ( this.conf.btnicon.pos.x - 10) )
        if (this.px >= this.conf.btnicon.pos.x) {
            this.x = this.px;
        }
        else {
            //不再移动其坐标
        }
        // Debug.trace(this.data.name+' x:'+this.x + " w:"+this.width);
        //移动的过程中监控，我的坐标小于0多少？
        //比0小的程度就是我缩小的成都和alpha的程度
        //总的移动区间就是我的宽度
        if (this.px < this.conf.btnicon.pos.x) {
            var totalw = this.conf.btnicon.size.scaleW + this.conf.btnicon.pos.x;
            var dis = this.px - this.conf.btnicon.pos.x;
            var minusZ = totalw - Math.abs(dis);
            var scaleP = minusZ / totalw;
            var alphaP = scaleP;
            // Debug.trace('x:'+minusZ+" tw:"+totalw+" pscal:"+scaleP+" alp:"+alphaP);
            this.scale(scaleP, scaleP);
            this.alpha = alphaP;
        }
        else {
            if (this.scaleX != 1) {
                this.scale(1, 1);
            }
            if (this.alpha != 1) {
                this.alpha = 1;
            }
        }
    };
    GameItem.prototype.imMove = function (nx) {
        this.px += nx;
        this.x = this.px;
    };
    //显示更新按钮
    GameItem.prototype.showUpdateBtn = function () {
        if (!this.sp_Update) {
            this.sp_Update = Tools.addSprite(this, this.conf.spupdate);
        }
    };
    GameItem.prototype.showProgressText = function () {
        if (!this.lb_update) {
            this.lb_update = Tools.addLabels(this, this.conf.updateText);
        }
    };
    GameItem.prototype.showPause = function () {
        if (!this.sp_pause) {
            var conf;
            if (this.data.state == "PAUSE") {
                conf = this.conf.statePause;
            }
            else if (this.data.state == "EXPECTATION") {
                conf = this.conf.stateComing;
            }
            try {
                this.sp_pause = Tools.newSprite(conf);
                this.addChild(this.sp_pause);
            }
            catch (e) { }
        }
    };
    //刷新状态
    GameItem.prototype.refreshStatus = function () {
        // Debug.trace("GameItem.refreshStatus this.sStatus:"+this.sStatus);
        switch (this.sStatus) {
            case GameItem.STATUS_COMING:
                this.showPause();
                break;
            case GameItem.STATUS_NORMAL:
                this.sp_anim.alpha = 1;
                this.sp_anim.visible = true;
                this.btn_icon.alpha = this.animConf.dAlpha;
                this.btn_icon.setEnabled(true);
                // Debug.trace("GameItem.refreshStatus normal show anim hide icon");
                break;
            case GameItem.STATUS_PAUSE:
                this.showPause();
                break;
            case GameItem.STATUS_UPDATE:
                //需要更新
                //动画上显示更新标记
                this.showUpdateBtn();
                break;
        }
    };
    //设置状态
    GameItem.prototype.setStatus = function (st) {
        this.sStatus = st;
        //刷新状态呈现内容
        this.refreshStatus();
    };
    GameItem.prototype.onStartUpdate = function () {
        if (this.bInUpdate) {
            return;
        }
        this.bInUpdate = true;
        // Debug.trace("GameItem.onStartUpdate this.iUpdateProgress:"+this.iUpdateProgress);
        this.iUpdateProgress = 0.0;
        //隐藏动画，显示按钮
        this.sp_anim.visible = false;
        //当前按钮不可点击了
        this.btn_icon.setEnabled(false);
        this.btn_icon.alpha = 1;
        //不显示更新提示
        this.sp_Update.visible = false;
        this.showProgressText();
        //按钮渲染为不可用
        this.refreshUpdateProgress();
        //通知App，开始下载
        PostMHelp.startUpdate({ "gameId": this.data.id, "alias": this.data.alias });
    };
    //刷新进度
    GameItem.prototype.onUpdateProgress = function (n) {
        this.iUpdateProgress = n;
        this.refreshUpdateProgress();
    };
    //刷新进度图案效果
    GameItem.prototype.refreshUpdateProgress = function () {
        //计算当前进度，
        var nowHei = this.iUpdateProgress * this.btn_icon.height;
        //由总高度计算出灰图高度，剩余高度为亮图
        var lastHei = this.btn_icon.height - nowHei;
        //进行渲染
        this.renderPercent(nowHei, lastHei);
        //刷新文字提示内容
        if (this.lb_update) {
            var pct = this.iUpdateProgress * 100;
            var spct = Tools.FormatFloatNumber(pct, 2);
            this.lb_update.text = this.conf.updateText.font.pretext + spct + this.conf.updateText.font.endtext;
        }
        //如果完成了，不显示更新文本标签
        if (this.iUpdateProgress >= 1) {
            if (this.lb_update) {
                this.removeChild(this.lb_update);
                this.lb_update.destroy(true);
                this.lb_update = null;
            }
            // this.btn_icon.alpha = this.animConf.dAlpha;
            // this.sp_anim.alpha = 1;
            this.setStatus(GameItem.STATUS_NORMAL);
            this.bInUpdate = false;
        }
    };
    //渲染出加载过程百分比
    GameItem.prototype.renderPercent = function (bottomH, topH) {
        var btn = this.btn_icon.btn_ui;
        var texLight = Laya.loader.getRes(this.icon_src);
        // Debug.trace("GameItem.renderPercent this.icon_src:"+this.icon_src+" texLight:");
        // Debug.trace(texLight);
        var src_gray = this.getGraySrc(this.icon_src);
        var texGray = Laya.loader.getRes(src_gray);
        // Debug.trace("GameItem.renderPercent src_gray:"+src_gray+" textGray:");
        // Debug.trace(texGray);
        var xGray = 0;
        var yGray = 0;
        var wGray = btn.width;
        var hGray = topH;
        var xLight = 0;
        var yLight = topH;
        var wLight = btn.width;
        var hLight = bottomH;
        // Debug.trace("GameItem.renderPercent xLight:"+xLight+" yLight:"+yLight+" wLight:"+wLight+" hLight:"+hLight);
        // Debug.trace("GameItem.renderPercent xGray:"+xGray+" yGray:"+yGray+" wGray:"+wGray+" hGray:"+hGray);
        btn.graphics.clear();
        btn.graphics.save();
        btn.graphics.clipRect(xGray, yGray, wGray, hGray);
        btn.graphics.drawTexture(texGray);
        btn.graphics.restore();
        btn.graphics.save();
        btn.graphics.clipRect(xLight, yLight, wLight, hLight);
        btn.graphics.drawTexture(texLight);
        btn.graphics.restore();
    };
    GameItem.STATUS_UPDATE = "update";
    GameItem.STATUS_PAUSE = "pause";
    GameItem.STATUS_NORMAL = "normal";
    GameItem.STATUS_COMING = "coming";
    GameItem.STATUS_ONLINE = "online";
    return GameItem;
}(Laya.Sprite));
//# sourceMappingURL=GameItem.js.map