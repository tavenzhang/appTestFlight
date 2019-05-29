/*
* name;
*/
var RadioBox = /** @class */ (function () {
    function RadioBox(arr, caller, callback) {
        var _this = this;
        this.index = 0;
        this.group = arr;
        this.caller = caller;
        this.callback = callback;
        this.group.forEach(function (value) {
            value.selected = false;
            value.on(Laya.Event.CHANGE, _this, _this.changeState, [value]);
        });
    }
    RadioBox.prototype.changeState = function (item) {
        if (this.prev && this.prev != item) {
            this.prev.selected = false;
            this.prev.mouseEnabled = true;
        }
        item.mouseEnabled = false;
        this.prev = item;
        this.index = this.group.indexOf(item);
        if (this.caller && this.callback) {
            this.callback.apply(this.caller);
        }
    };
    Object.defineProperty(RadioBox.prototype, "selectIndex", {
        get: function () {
            return this.index;
        },
        set: function (value) {
            var cb = this.group[value];
            cb.selected = true;
        },
        enumerable: true,
        configurable: true
    });
    RadioBox.prototype.setGrayIndex = function (value, gray) {
        var cb = this.group[value];
        cb.mouseEnabled = !gray;
        cb.gray = gray;
        if (gray)
            cb.selected = false;
    };
    RadioBox.prototype.reset = function () {
        this.group.forEach(function (value) {
            value.selected = false;
            value.gray = false;
            value.mouseEnabled = true;
        });
        if (this.prev) {
            this.prev = null;
        }
    };
    RadioBox.prototype.destory = function () {
        var _this = this;
        this.group.forEach(function (value) {
            value.off(Laya.Event.CHANGE, _this, _this.changeState);
        });
        this.group = null;
    };
    return RadioBox;
}());
//# sourceMappingURL=RadioBox.js.map