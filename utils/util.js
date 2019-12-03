function t(t) {
  return (t = t.toString())[1] ? t : "0" + t;
}

module.exports = {
  formatTime: function(e) {
    var n = e.getFullYear(),
      o = e.getMonth() + 1,
      r = e.getDate(),
      u = e.getHours(),
      i = e.getMinutes(),
      g = e.getSeconds();
    return [n, o, r].map(t).join("/") + " " + [u, i, g].map(t).join(":");
  }
};
// 防止重复点击
function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 3000
  }

  let _lastTime = null

  // 返回新的函数
  return function() {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments) //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}
module.exports = {
  throttle: throttle
}