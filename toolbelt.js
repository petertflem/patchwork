(function (_this) {
  
  _this.curry = function(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
    }
  }
  
})(Patchwork.Toolbelt = Patchwork.Toolbelt || {});