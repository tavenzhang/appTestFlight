/*
* 用于请求http数据
*/
var HttpRequester = /** @class */ (function () {
    function HttpRequester() {
    }
    /**
     * 包括轮播图在内的玩家信息
     */
    HttpRequester.getPlayerMaterialInfo = function (caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        var api = "/gamecenter/player/material/info" + "?access_token=" + Common.access_token;
        url += api;
        var header = [
            "Accept", "application/json"
        ];
        NetManager.getObj().HttpConnect(url, this, function (data, state) {
            if (state == NetManager.STATE_COMPLETE) {
                if (caller && callback)
                    callback.call(caller, data);
            }
            else {
                console.error("player-material-info:error");
            }
        }, header, null, "get", "json");
    };
    /**
     * 修改密码
     * @param pwd
     * @param newpwd
     * @param confirmpwd
     */
    HttpRequester.setPassWord = function (pwd, newpwd, confirmpwd, caller, callback) {
        try {
            var url = ConfObjRead.getConfUrl().url.apihome;
            url += ConfObjRead.getConfUrl().cmd.changepwd;
            url += "?access_token=" + Common.access_token;
            var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
            var ePwd = window['SecretUtils'].rsaEncodePWD(pwd);
            var eNpwd = window['SecretUtils'].rsaEncodePWD(newpwd);
            var data = {
                mode: "PASSWORD",
                password: ePwd,
                newPassword: eNpwd
            };
            var jd = JSON.stringify(data);
            NetManager.getObj().HttpConnect(url, this, function (data, state, hr) {
                var num = hr.http.status;
                var suc; //标记是否修改成功
                if (num == 204)
                    suc = true;
                if (caller && callback)
                    callback.call(caller, [suc, hr]);
            }, header, jd, "POST", "JSON");
        }
        catch (e) { }
    };
    return HttpRequester;
}());
//# sourceMappingURL=HttpRequester.js.map