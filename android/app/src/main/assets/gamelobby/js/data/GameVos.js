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
 * 内部跳转命令(用于轮播图)
 */
var InnerJumpCmd;
(function (InnerJumpCmd) {
    InnerJumpCmd[InnerJumpCmd["agentCenter"] = 0] = "agentCenter";
    InnerJumpCmd[InnerJumpCmd["activityCenter"] = 1] = "activityCenter";
    InnerJumpCmd[InnerJumpCmd["personCenter"] = 2] = "personCenter";
    InnerJumpCmd[InnerJumpCmd["recharge"] = 3] = "recharge";
    InnerJumpCmd[InnerJumpCmd["service"] = 4] = "service";
    InnerJumpCmd[InnerJumpCmd["email"] = 5] = "email";
})(InnerJumpCmd || (InnerJumpCmd = {}));
//# sourceMappingURL=GameVos.js.map