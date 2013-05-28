var getFlagPosition = function _getFlagPosition(elem) {
  var left = 0,
      top = 0;

  if (elem.offsetParent) {
    left = elem.offsetLeft;
    top = elem.offsetTop;
    while (elem = elem.offsetParent) {
      if (elem.nodeName === 'SECTION') { break; }
      left += elem.offsetLeft;
      top += elem.offsetTop;
    }
  }
  return [left,top];
};

// Flag zoom
var flag = {
  small: null,
  fuzzy: null,
  smallPos: null,
  finalPos: null,
  finalSize: null,
  clearImg: null,
  clearDiv: null
};

document.body.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 71) { // g
    flag.small = document.querySelector('.img-flag-outline img');

    if (flag.small && flag.small.parentNode.classList.contains('visible')) {
      flag.smallPos = getFlagPosition(flag.small);
      flag.fuzzyDiv = document.querySelector('.img-flag-fuzzy');
      flag.fuzzy = flag.fuzzyDiv.querySelector('img');
      flag.finalPos = getFlagPosition(flag.fuzzyDiv);
      flag.clearDiv = document.querySelector('.img-flag-clear');
      flag.clearImg = flag.clearDiv.querySelector('img');
      flag.finalSize = [flag.clearImg.clientWidth, flag.clearImg.clientHeight];

      // Show fuzzy image, small
      flag.fuzzy.style.WebkitTransition = 'none';
      flag.fuzzy.style.transition = 'none';
      flag.fuzzyDiv.style.WebkitTransition = 'none';
      flag.fuzzyDiv.style.transition = 'none';
      flag.fuzzy.style.width = (flag.small.clientWidth * 0.3129 * 0.95) + 'px';
      flag.fuzzy.style.height = (flag.small.clientHeight * 0.1892) + 'px';
      flag.fuzzyDiv.style.left = (flag.smallPos[0] + flag.small.clientWidth * 0.3399 + (flag.small.clientWidth * 0.3129 * 0.02)) + 'px';
      flag.fuzzyDiv.style.top = (flag.smallPos[1] + flag.small.clientHeight * 0.7526 * 0.87) + 'px';
      flag.fuzzyDiv.classList.add('visible');

      // Need timeout so the initial positioning can take effect first
      setTimeout(zoomFuzzy, 10);
    }
  }
}, false);

function zoomFuzzy() {
  // Zoom to full size
  flag.fuzzyDiv.style.WebkitTransition = 'all 500ms ease-in';
  flag.fuzzyDiv.style.transition = 'all 500ms ease-in';
  flag.fuzzy.style.WebkitTransition = 'all 500ms ease-in';
  flag.fuzzy.style.transition = 'all 500ms ease-in';
  flag.fuzzy.style.maxWidth = '100%';
  flag.fuzzy.style.maxHeight = '100%';
  flag.fuzzy.style.width = (flag.finalSize[0]) + 'px';
  flag.fuzzy.style.height = (flag.finalSize[1]) + 'px';
  flag.fuzzyDiv.style.width = (flag.clearDiv.clientWidth) + 'px';
  flag.fuzzyDiv.style.height = (flag.clearDiv.clientHeight) + 'px';
  flag.fuzzyDiv.style.left = flag.finalPos[0] + 'px';
  flag.fuzzyDiv.style.top = flag.finalPos[1] + 'px';
}

/*
Flag image outline proportions:

962x481 total size

hole: 301x91
hole begin: 327, 362
hole end: 628
right space: 334x

top = 362/481 = 0.7525987526 of height
left = 327/962 = 0.3399168399 of width
width = 301/962 = 0.3128898129 of width
height = 91/481 = 0.1891891892 of height
*/
