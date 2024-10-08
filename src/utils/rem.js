(function (designWidth, maxWidth) {
  if (window.innerWidth <= 750) {
    designWidth = maxWidth = 750
  }
  var doc = document,
    win = window;
  var docEl = doc.documentElement;
  var tid;
  var rootItem, rootStyle;

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    if (width > maxWidth) {
      width = maxWidth;
    }
    var rem = width * 100 / designWidth;
    rootStyle = 'html{font-size:' + rem + 'px !important}';
    rootItem = document.getElementById('rootsize') || document.createElement('style');
    if (!document.getElementById('rootsize')) {
      document.getElementsByTagName('head')[0].appendChild(rootItem);
      rootItem.id = 'rootsize';
    }
    if (rootItem.styleSheet) {
      rootItem.styleSheet.disabled || (rootItem.styleSheet.cssText = rootStyle)
    } else {
      try {
        rootItem.innerHTML = rootStyle
      } catch (f) {
        rootItem.innerText = rootStyle
      }
    }
    docEl.style.fontSize = rem + 'px';
  }
  refreshRem();

  win.addEventListener('resize', function () {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);

  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);

  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = '16px';
  } else {
    doc.addEventListener('DOMContentLoaded', function (e) {
      doc.body.style.fontSize = '16px';
    }, false);
  }
})(1920, 1920);
