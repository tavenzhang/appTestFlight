var GameData = /** @class */ (function () {
    function GameData() {
    }
    GameData.bClickFullscreen = false;
    //转移至version.json
    GameData.channel = "channel20181016";
    GameData.bindAward = 0; //绑定送金额度
    GameData.isGetBindAward = true; //是否领取过绑定送金奖励
    return GameData;
}());
/**
 * 游戏状态
 */
var GameState;
(function (GameState) {
    GameState[GameState["NORMAL"] = 0] = "NORMAL";
    GameState[GameState["PAUSE"] = 1] = "PAUSE";
    GameState[GameState["EXPECTATION"] = 2] = "EXPECTATION";
    GameState[GameState["UPDATE"] = 3] = "UPDATE";
})(GameState || (GameState = {}));
/**
 * 验证码类型
 */
var VerCodeType;
(function (VerCodeType) {
    VerCodeType[VerCodeType["MSG_LOGIN"] = 0] = "MSG_LOGIN";
    VerCodeType[VerCodeType["MSG_RESET_PWD"] = 1] = "MSG_RESET_PWD";
    VerCodeType[VerCodeType["MSG_BIND_MOBILE"] = 2] = "MSG_BIND_MOBILE";
})(VerCodeType || (VerCodeType = {}));
/**
 * 进入大厅类型
 */
var JoinLobbyType;
(function (JoinLobbyType) {
    JoinLobbyType[JoinLobbyType["loginJoin"] = 0] = "loginJoin";
    JoinLobbyType[JoinLobbyType["gameBank"] = 1] = "gameBank";
    JoinLobbyType[JoinLobbyType["backstage"] = 2] = "backstage";
})(JoinLobbyType || (JoinLobbyType = {}));
/**
 * 邮件状态
 */
var MailState;
(function (MailState) {
    MailState[MailState["UNREAD"] = 0] = "UNREAD";
    MailState[MailState["READ"] = 1] = "READ";
    MailState[MailState["UNCLAIMED"] = 2] = "UNCLAIMED";
    MailState[MailState["READUNCLAIMED"] = 3] = "READUNCLAIMED";
    MailState[MailState["RECEIVE"] = 4] = "RECEIVE";
})(MailState || (MailState = {}));
/**
 * 弹窗命令
 */
var DlgCmd;
(function (DlgCmd) {
    DlgCmd[DlgCmd["agentCenter"] = 0] = "agentCenter";
    DlgCmd[DlgCmd["activityCenter"] = 1] = "activityCenter";
    DlgCmd[DlgCmd["personCenter"] = 2] = "personCenter";
    DlgCmd[DlgCmd["recharge"] = 3] = "recharge";
    DlgCmd[DlgCmd["service"] = 4] = "service";
    DlgCmd[DlgCmd["email"] = 5] = "email";
    DlgCmd[DlgCmd["bindPhoneAct"] = 6] = "bindPhoneAct";
    DlgCmd[DlgCmd["bindPhone"] = 7] = "bindPhone";
})(DlgCmd || (DlgCmd = {}));
//# sourceMappingURL=GameVos.js.map