/*global Modernizr: false */
var isIE = (/MSIE/.test(navigator.userAgent)),
    isAndroid = (/Android/.test(navigator.userAgent)),
    isChrome = (/Chrome/.test(navigator.userAgent)),
    demoBar = function(){
        var d = document;
        d.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>'+
        d.title +
        '<\/title><link rel="stylesheet" href="css/demobar.css"><\/head>' +
        '<body id="resize-bar-body">' +
        '<header>' +
        '<div id="size"><\/div>' +
        '<div id="devices">' +
        // '  <a href="#" class="tablet-landscape"><span>Tablet Landscape<\/span><\/a>' +
        '  <a href="#" class="tablet-portrait"><span>Tablet<\/span><\/a>' +
        // '  <a href="#" class="smartphone-landscape"><span>iPhone Landscape<\/span><\/a>' +
        '  <a href="#" class="smartphone-portrait"><span>Phone<\/span><\/a>' +
        '  <a href="#" id="desktop-view" class="auto active"><span>Desktop<\/span><\/a>' +
        '  <\/div><\/header><section><div id="wrapper"><iframe src="'+d.URL+'" onLoad="resbook.changeUrl(this.contentWindow.location,this.contentDocument.title);"><\/iframe><\/div><\/section>'+
        '<\/body><\/html>');
    };

$(function(){
  if ( parent.$("#devices").length <=0 && !Modernizr.touch && !isIE) {
    demoBar();

    window.resbook = {};

    (function (rb) {
        var d = document,
            w = window,
            url = d.URL,
            title = d.title,
            wrapper = null,
            devices = null,
            close = null,
            //keyboard = null,
            body = null,
            size = null,
            auto = true,
            isResized = false,
            isAnimated = false,
            sizes = {
              smartphonePortrait: [320, 480],
              smartphoneLandscape: [480, 320],
              tabletPortrait: [750, 1024],
              tabletLandscape: [1024, 768],
              auto: 'auto'
            },

            resize = function (w, h, f) {
              w = w || wrapper.clientWidth;
              //h = h || wrapper.clientHeight;
              f = f || "Desktop";
              size.innerHTML = f; //w + 'x' + h
            },

            setPosition = function (wh, t, cl, myTxt) {
              var width = (wh === 'auto') ? w.innerWidth : wh[0],
                  height = (wh === 'auto') ? w.innerHeight : wh[1],
                  style = 'width:' + width + 'px;';
              if (typeof (width) === 'undefined' || typeof (height) === 'undefined') { return false; }
              style += (wh === 'auto') ? 'margin-top:0;' : '';
              wrapper.setAttribute('style', style);
              wrapper.setAttribute('data-device', cl);
              body.setAttribute('style', 'min-width:' + width + 'px;');
              resize(width, height, myTxt);
              if (wh === 'auto' && !t) {
                isResized = false;
                setTimeout(function () {
                  wrapper.setAttribute('style', '');
                  body.setAttribute('style', '');
                  isAnimated = false;
                }, 260);
              }
              else {
                isAnimated = false;
              }
            },
            readyElement = function (id, callback) {
              var interval = setInterval(function () {
                if (d.getElementById(id)) {
                  callback(d.getElementById(id));
                  clearInterval(interval);
                }
              }, 60);
            };

        rb.changeUrl = function (u, t) {
          d.title = t;
          if (history.pushState) {
            try {
              history.pushState({}, "New Page", u);
            } catch (e) {}
          }
        };

        readyElement('wrapper', function () {
            wrapper = d.getElementById('wrapper');
            devices = d.getElementById('devices');
            size = d.getElementById('size');
            close = d.querySelector('.close a');
            //keyboard = d.querySelector('.keyboard a');
            body = d.querySelector('body');
            if (window.chrome || (window.getComputedStyle && !window.globalStorage && !window.opera)) {}
            [].forEach.call(document.querySelectorAll('#devices a'), function (el) {
              el.addEventListener('click', function (e) {
                [].forEach.call(document.querySelectorAll('#devices a'), function (el) {
                  el.classList.remove('active');
                });
                e.preventDefault();
                e.stopPropagation();
                var self = this;
                if ((self.classList.contains('auto') && isResized === false) || isAnimated === true) {
                  return false;
                }
                isAnimated = true;
                if (isResized === false) {
                  isResized = true;
                  setPosition(sizes.auto, true, 'auto', 'auto');
                }
                setTimeout(function () {
                  self.classList.add('active');
                  if (self.classList.contains('smartphone-portrait')) {
                    setPosition(sizes.smartphonePortrait, false, 'smartphonePortrait', "Phone");
                  }
                  // else if (self.classList.contains('smartphone-landscape')) {
                  //   setPosition(sizes.smartphoneLandscape, false, 'smartphoneLandscape', "Phone Landscape");
                  // }
                  else if (self.classList.contains('tablet-portrait')) {
                    setPosition(sizes.tabletPortrait, false, 'tabletPortrait', "Tablet");
                  }
                  // else if (self.classList.contains('tablet-landscape')) {
                  //   setPosition(sizes.tabletLandscape, false, 'tabletLandscape', "Tablet Landscape");
                  // }
                  else if (self.classList.contains('auto')) {
                    setPosition(sizes.auto, false, 'auto', "Desktop");
                  }
                }, 10);
              });
            });

            w.addEventListener('resize', function () {
              resize();
            }, false);

            w.addEventListener('keyup', function (e) {
              var key = e.keyCode ? e.keyCode : e.charCode,
                  keys = {
                    49: 'tabletPortrait',
                    50: 'tabletLandscape',
                    51: 'smartphonePortrait',
                    52: 'smartphoneLandscape',
                    53: 'auto'
                  };
              if (typeof (keys[key]) === 'undefined') { return false; }
              setPosition(sizes[keys[key]], false, keys[key], "auto");
            }, false);

            resize();

            size.style.minWidth = 0;

            // Enable animations now that the page has loaded
            document.getElementById('wrapper').classList.add('enableTransitions');

            // if (isNav == true) {
            //   $(".tablet-portrait")[0].click();
            // }

        });
    })(window.resbook);
  }
  else if (isIE || (isAndroid && !isChrome) ) {
    $("body").prepend('<div class="row hide-for-oldie"><div class="large-8 small-centered columns"><div class="alert-box radius" data-alert><h4>Non-Optimal Browser Detected</h4><p>To get the best demo experience, it\'s recommended that you use <a target="_parent" href="https://www.google.com/chrome/">Google Chrome</a><br>If you cannot upgrade your browser, you can resize your browser to experience it.</div></div></div>');
  }
});
