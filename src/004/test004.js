function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function AddToDOM(element, parent) {
  var target;

  if (parent) {
    if (typeof parent === 'string') {
      target = document.getElementById(parent);
    } else if (typeof parent === 'object' && parent.nodeType === 1) {
      target = parent;
    }
  } else if (element.parentElement) {
    return element;
  }

  if (!target) {
    target = document.body;
  }

  target.appendChild(element);
  return element;
}

function isCordova() {
  return window.hasOwnProperty('cordova');
}

function DOMContentLoaded(callback) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    callback();
    return;
  }

  var check = () => {
    document.removeEventListener('deviceready', check, true);
    document.removeEventListener('DOMContentLoaded', check, true);
    window.removeEventListener('load', check, true);
    callback();
  };

  if (!document.body) {
    window.setTimeout(check, 20);
  } else if (isCordova()) {
    document.addEventListener('deviceready', check, true);
  } else {
    document.addEventListener('DOMContentLoaded', check, true);
    window.addEventListener('load', check, true);
  }
}

class Game {
  constructor(init) {
    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "isBooted", false);

    _defineProperty(this, "isRunning", false);

    _defineProperty(this, "_initCallback", void 0);

    this._initCallback = init;
    DOMContentLoaded(() => this.boot());
  }

  boot() {
    console.log('Phaser 4.0.0-alpha.3');
    this.isBooted = true;
    this.createDebugCanvas();
    AddToDOM(this.canvas);

    this._initCallback(this);
  }

  createDebugCanvas() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 800;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 600;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = '#2d2d2d';
    this.context.fillRect(0, 0, width, height);
  }

  drawImage(image) {
    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    this.context.drawImage(image, x, y);
  }

  draw(text) {
    this.context.fillStyle = '#ff0000';
    this.context.fillText(text, 10, 40);
    this.context.fillStyle = '#0000ff';
    this.context.fillText(text, 10, 20);
    this.context.fillStyle = '#ffff00';
    this.context.fillText(text, 10, 60);
  }

  text(x, y, text) {
    this.context.fillStyle = '#00ff00';
    this.context.font = '16px Courier';
    this.context.fillText(text, x, y);
  }

}

function isAndroid() {
  return /Android/.test(navigator.userAgent);
}

function isiOS() {
  var ua = navigator.userAgent;
  var result = {
    iOS: false,
    iOSVersion: 0,
    iPhone: false,
    iPad: false
  };

  if (/iP[ao]d|iPhone/i.test(ua)) {
    navigator.appVersion.match(/OS (\d+)/);
    result.iOS = true;
    result.iOSVersion = parseInt(RegExp.$1, 10);
    result.iPhone = ua.toLowerCase().indexOf('iphone') !== -1;
    result.iPad = ua.toLowerCase().indexOf('ipad') !== -1;
  }

  return result;
}

new Game(game => {
  var {
    iOS,
    iOSVersion,
    iPad,
    iPhone
  } = isiOS();
  game.text(10, 20, 'Phaser 4 Test 004');
  game.text(10, 60, 'Android: ' + isAndroid());
  game.text(10, 160, 'iOS: ' + iOS);
  game.text(10, 180, 'iOSVerion: ' + iOSVersion);
  game.text(10, 200, 'iPad: ' + iPad);
  game.text(10, 220, 'iPhone: ' + iPhone);
});
