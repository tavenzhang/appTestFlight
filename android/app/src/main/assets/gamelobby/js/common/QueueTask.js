/**
 * 队列任务类型
 */
var QueueType;
(function (QueueType) {
    QueueType[QueueType["bindPhoneActiv"] = 0] = "bindPhoneActiv";
})(QueueType || (QueueType = {}));
/**
 * 任务队列,用于处理需要延迟执行的一些事务
 */
var QueueTask = /** @class */ (function () {
    function QueueTask() {
    }
    /**
     * 添加队列(注意：目前没有判断重复队列)
     */
    QueueTask.addQueue = function (type, params, obstruct) {
        if (!this.queueList[type]) {
            this.queueList[type] = [];
        }
        this.queueList[type].push({ type: type, params: params, obstruct: obstruct });
    };
    /**
     * 判断是否已存在任务
     */
    QueueTask.isQueue = function (type) {
        var list = this.queueList[type];
        return Boolean(list);
    };
    /**
     * 检测队列任务
     */
    QueueTask.checkQueue = function (types) {
        if (types) {
            for (var i = 0; i < types.length; i++) {
                var type = types[i];
                var list = this.queueList[type];
                if (list) {
                    var obstruct = false;
                    while (list.length > 0) {
                        var data = list.shift();
                        this.execute(data);
                        if (data.obstruct) {
                            obstruct = true;
                            break;
                        }
                    }
                    if (list.length == 0)
                        delete this.queueList[type];
                    if (obstruct)
                        break;
                }
            }
        }
    };
    QueueTask.execute = function (vo) {
        switch (vo.type) {
            case QueueType.bindPhoneActiv: {
                PageManager.showDlg(DlgCmd.bindPhoneAct);
                break;
            }
        }
    };
    QueueTask.queueList = [];
    return QueueTask;
}());
//# sourceMappingURL=QueueTask.js.map