(function (_this) {
  
  _this.curry = function(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
    }
  }
  
  _this.getRandomNumber = function(min, max) {
    return Math.floor(Math.random() * max + min);
  }
  
})(Patchwork.Toolbelt = Patchwork.Toolbelt || {});