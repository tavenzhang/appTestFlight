/*
* 代理中心数据
*/
var AgentModel = /** @class */ (function () {
    function AgentModel() {
    }
    Object.defineProperty(AgentModel, "isUser", {
        //判断是否用户(非代理和非总代)
        get: function () {
            if (this.role != "AGENT" && this.role != "GENERAL_AGENT") {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取代理信息
     * @param caller
     * @param callback
     */
    AgentModel.getAgentInfo = function (caller, callback) {
        var _this = this;
        LayaMain.getInstance().showCircleLoading(true);
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.agentinfo, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                _this.agentInfo = jobj;
                _this.level = jobj.level;
                _this.role = jobj.role;
                _this.customerServiceUrl = jobj.agentCustomerServiceUrl || "";
                _this.todaysPerformance = jobj.todayTeamBet;
                _this.appShareUrl = jobj.appShareUrl || "";
                if (caller && callback) {
                    callback.call(caller);
                }
            }
        });
    };
    /**
     * 查询邀请码
     * @param caller
     * @param callback
     */
    AgentModel.searchAgentInvatCode = function (caller, callback, showloading) {
        var _this = this;
        if (showloading === void 0) { showloading = true; }
        if (showloading)
            LayaMain.getInstance().showCircleLoading(true);
        HttpRequester.postHttpData(ConfObjRead.getConfUrl().cmd.agentinvation, {}, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                _this.invationVo = jobj.datas || [];
                if (caller && callback) {
                    callback.call(caller);
                }
            }
        });
    };
    /**
     * 创建代理邀请码
     * @param caller
     * @param callback
     */
    AgentModel.creatAgentInvitCode = function (caller, callback) {
        var max = Math.floor(Math.random() * 12) + 4;
        var code = Math.random().toString(36).substr(2, max);
        var data = {
            affCode: code,
            memberType: "AGENT",
            prizeGroup: 1960,
            status: "ON"
        };
        HttpRequester.postHttpData(ConfObjRead.getConfUrl().cmd.agent_affiliates, data, this, function (suc, jobj) {
            if (suc) {
                if (caller && callback) {
                    callback.call(caller);
                }
            }
        });
    };
    /**
     * 获取直属列表
     * @param caller
     * @param callback
     */
    AgentModel.getSubList = function (data, caller, callback) {
        LayaMain.getInstance().showCircleLoading();
        var cmd = ConfObjRead.getConfUrl().cmd.agentchildren;
        var urlParams = "&pageSize=" + data.size;
        urlParams += "&start=" + data.start;
        urlParams += "&username=" + data.username;
        HttpRequester.getHttpData(cmd, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                if (caller && callback) {
                    callback.call(caller, jobj);
                }
            }
        }, urlParams);
    };
    /**
     * 获取我的业绩数据
     * @param data
     * @param caller
     * @param callback
     */
    AgentModel.getAchievement = function (data, caller, callback) {
        LayaMain.getInstance().showCircleLoading();
        var cmd = ConfObjRead.getConfUrl().cmd.agentachievement;
        var urlParams = "&username=" + Common.userInfo.username;
        urlParams += "&start=" + data.start;
        urlParams += "&pageSize=" + data.size;
        urlParams += "&dateType=" + data.type;
        HttpRequester.getHttpData(cmd, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                if (caller && callback) {
                    callback.call(caller, jobj);
                }
            }
        }, urlParams);
    };
    //检测并创建邀请码(用于活动分享)
    AgentModel.checkAndCreatAffcode = function () {
        var vo = this.invationVo;
        if (!vo) {
            this.reqCode();
        }
        else {
            this.readCode();
        }
    };
    AgentModel.readCode = function () {
        if (this.invationVo.length == 0) {
            AgentModel.creatAgentInvitCode(this, this.reqCode);
        }
    };
    AgentModel.reqCode = function () {
        AgentModel.searchAgentInvatCode(this, this.readCode, false);
    };
    //代理信息
    AgentModel.agentInfo = null;
    //邀请码
    AgentModel.invationVo = null;
    AgentModel.level = 0; //代理等级
    AgentModel.role = ""; //角色
    AgentModel.customerServiceUrl = ""; //客服服务
    AgentModel.todaysPerformance = 0;
    AgentModel.appShareUrl = "";
    return AgentModel;
}());
//# sourceMappingURL=AgentModel.js.map