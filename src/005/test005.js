var Game = function () {
  function Game(width, height) {
    if (width === void 0) {
      width = 800;
    }

    if (height === void 0) {
      height = 600;
    }

    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = '#2d2d2d';
    this.context.fillRect(0, 0, width, height);
  }

  Game.prototype.drawImage = function (image, x, y) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    this.context.drawImage(image, x, y);
  };

  Game.prototype.draw = function (text) {
    this.context.fillStyle = '#ff0000';
    this.context.fillText(text, 10, 40);
    this.context.fillStyle = '#0000ff';
    this.context.fillText(text, 10, 20);
    this.context.fillStyle = '#ffff00';
    this.context.fillText(text, 10, 60);
  };

  Game.prototype.text = function (x, y, text) {
    this.context.fillStyle = '#00ff00';
    this.context.font = '16px Courier';
    this.context.fillText(text, x, y);
  };

  return Game;
}();

function isChrome() {
  var chrome = /Chrome\/(\d+)/.test(navigator.userAgent);
  var chromeVersion = chrome ? parseInt(RegExp.$1, 10) : 0;
  return {
    chrome: chrome,
    chromeVersion: chromeVersion
  };
}

function isEdge() {
  var edge = /Edge\/\d+/.test(navigator.userAgent);
  return {
    edge: edge
  };
}

function isFirefox() {
  var firefox = /Firefox\D+(\d+)/.test(navigator.userAgent);
  var firefoxVersion = firefox ? parseInt(RegExp.$1, 10) : 0;
  return {
    firefox: firefox,
    firefoxVersion: firefoxVersion
  };
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

function isMobileSafari() {
  var iOS = isiOS().iOS;
  var mobileSafari = /AppleWebKit/.test(navigator.userAgent) && iOS;
  return {
    mobileSafari: mobileSafari
  };
}

function isMSIE() {
  var ie = /MSIE (\d+\.\d+);/.test(navigator.userAgent);
  var ieVersion = ie ? parseInt(RegExp.$1, 10) : 0;
  return {
    ie: ie,
    ieVersion: ieVersion
  };
}

function isOpera() {
  var opera = /Opera/.test(navigator.userAgent);
  return {
    opera: opera
  };
}

function isWindowsPhone() {
  var ua = navigator.userAgent;
  return /Windows Phone/i.test(ua) || /IEMobile/i.test(ua);
}

function isSafari() {
  var ua = navigator.userAgent;
  var safari = /Safari/.test(ua) && !isWindowsPhone();
  var safariVersion = /Version\/(\d+)\./.test(ua) ? parseInt(RegExp.$1, 10) : 0;
  return {
    safari: safari,
    safariVersion: safariVersion
  };
}

function isSilk() {
  var silk = /Silk/.test(navigator.userAgent);
  return {
    silk: silk
  };
}

function isTrident() {
  var trident = /Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(navigator.userAgent);
  var tridentVersion = trident ? parseInt(RegExp.$1, 10) : 0;
  var tridentIEVersion = trident ? parseInt(RegExp.$3, 10) : 0;
  return {
    trident: trident,
    tridentVersion: tridentVersion,
    tridentIEVersion: tridentIEVersion
  };
}

function GetBrowser() {
  var _a = isChrome(),
      chrome = _a.chrome,
      chromeVersion = _a.chromeVersion;

  var edge = isEdge().edge;

  var _b = isFirefox(),
      firefox = _b.firefox,
      firefoxVersion = _b.firefoxVersion;

  var _c = isMSIE(),
      ie = _c.ie,
      ieVersion = _c.ieVersion;

  var mobileSafari = isMobileSafari().mobileSafari;
  var opera = isOpera().opera;

  var _d = isSafari(),
      safari = _d.safari,
      safariVersion = _d.safariVersion;

  var silk = isSilk().silk;

  var _e = isTrident(),
      trident = _e.trident,
      tridentVersion = _e.tridentVersion,
      tridentIEVersion = _e.tridentIEVersion;

  if (trident) {
    ie = true;
    ieVersion = tridentIEVersion;
  }

  var result = {
    chrome: chrome,
    chromeVersion: chromeVersion,
    edge: edge,
    firefox: firefox,
    firefoxVersion: firefoxVersion,
    ie: ie,
    ieVersion: ieVersion,
    mobileSafari: mobileSafari,
    opera: opera,
    safari: safari,
    safariVersion: safariVersion,
    silk: silk,
    trident: trident,
    tridentVersion: tridentVersion
  };
  return result;
}

function isAndroid() {
  return /Android/.test(navigator.userAgent);
}

function isChromeOS() {
  return /CrOS/.test(navigator.userAgent);
}

function isCordova() {
  return window.hasOwnProperty('cordova');
}

function isCrosswalk() {
  return /Crosswalk/.test(navigator.userAgent);
}

function isEjecta() {
  return window.hasOwnProperty('ejecta');
}

function isNode() {
  return typeof process !== 'undefined' && typeof process.versions === 'object' && process.versions.hasOwnProperty('node');
}

function isElectron() {
  return isNode() && !!process.versions['electron'];
}

function isKindle() {
  var ua = navigator.userAgent;
  return /Kindle/.test(ua) || /\bKF[A-Z][A-Z]+/.test(ua) || /Silk.*Mobile Safari/.test(ua);
}

function isLinux() {
  return /Linux/.test(navigator.userAgent);
}

function isMacOS() {
  var ua = navigator.userAgent;
  return /Mac OS/.test(ua) && !/like Mac OS/.test(ua);
}

function isNodeWebkit() {
  return isNode() && !!process.versions['node-webkit'];
}

function isWebApp() {
  return navigator.hasOwnProperty('standalone');
}

function isWindows() {
  return /Windows/.test(navigator.userAgent);
}

function GetOS() {
  var ua = navigator.userAgent;

  var _a = isiOS(),
      iOS = _a.iOS,
      iOSVersion = _a.iOSVersion,
      iPad = _a.iPad,
      iPhone = _a.iPhone;

  var result = {
    android: isAndroid(),
    chromeOS: isChromeOS(),
    cordova: isCordova(),
    crosswalk: isCrosswalk(),
    desktop: false,
    ejecta: isEjecta(),
    electron: isElectron(),
    iOS: iOS,
    iOSVersion: iOSVersion,
    iPad: iPad,
    iPhone: iPhone,
    kindle: isKindle(),
    linux: isLinux(),
    macOS: isMacOS(),
    node: isNode(),
    nodeWebkit: isNodeWebkit(),
    pixelRatio: 1,
    webApp: isWebApp(),
    windows: isWindows(),
    windowsPhone: isWindowsPhone()
  };

  if (result.windowsPhone) {
    result.android = false;
    result.iOS = false;
    result.macOS = false;
    result.windows = true;
  }

  var silk = /Silk/.test(ua);

  if (result.windows || result.macOS || result.linux && !silk || result.chromeOS) {
    result.desktop = true;
  }

  if (result.windowsPhone || /Windows NT/i.test(ua) && /Touch/i.test(ua)) {
    result.desktop = false;
  }

  return result;
}

var Device = {
  GetBrowser: GetBrowser,
  GetOS: GetOS,
  Browser: GetBrowser(),
  OS: GetOS()
};

var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };

  return _extendStatics(d, b);
};

function __extends(d, b) {
  _extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __values(o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator],
      i = 0;
  if (m) return m.call(o);
  return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}

var BaseLoaderState;

(function (BaseLoaderState) {
  BaseLoaderState[BaseLoaderState["IDLE"] = 0] = "IDLE";
  BaseLoaderState[BaseLoaderState["LOADING"] = 1] = "LOADING";
  BaseLoaderState[BaseLoaderState["PROCESSING"] = 2] = "PROCESSING";
  BaseLoaderState[BaseLoaderState["COMPLETE"] = 3] = "COMPLETE";
  BaseLoaderState[BaseLoaderState["SHUTDOWN"] = 4] = "SHUTDOWN";
  BaseLoaderState[BaseLoaderState["DESTROYED"] = 5] = "DESTROYED";
})(BaseLoaderState || (BaseLoaderState = {}));

var FileState;

(function (FileState) {
  FileState[FileState["PENDING"] = 0] = "PENDING";
  FileState[FileState["LOADING"] = 1] = "LOADING";
  FileState[FileState["LOADED"] = 2] = "LOADED";
  FileState[FileState["FAILED"] = 3] = "FAILED";
  FileState[FileState["PROCESSING"] = 4] = "PROCESSING";
  FileState[FileState["ERRORED"] = 5] = "ERRORED";
  FileState[FileState["COMPLETE"] = 6] = "COMPLETE";
  FileState[FileState["DESTROYED"] = 7] = "DESTROYED";
  FileState[FileState["POPULATED"] = 8] = "POPULATED";
  FileState[FileState["TIMED_OUT"] = 9] = "TIMED_OUT";
  FileState[FileState["ABORTED"] = 10] = "ABORTED";
})(FileState || (FileState = {}));

var BaseLoader = function () {
  function BaseLoader() {
    this.fileGroup = '';
    this.prefix = '';
    this.baseURL = '';
    this.path = '';
    this.maxParallelDownloads = 32;
    this.crossOrigin = '';
    this.state = BaseLoaderState.IDLE;
    this.progress = 0;
    this.totalToLoad = 0;
    this.totalFailed = 0;
    this.totalComplete = 0;
    this.list = new Set();
    this.inflight = new Set();
    this.queue = new Set();
    this._deleteQueue = new Set();
    this.state = BaseLoaderState.IDLE;
  }

  BaseLoader.prototype.setBaseURL = function (value) {
    if (value === void 0) {
      value = '';
    }

    if (value !== '' && value.substr(-1) !== '/') {
      value = value.concat('/');
    }

    this.baseURL = value;
    return this;
  };

  BaseLoader.prototype.setPath = function (value) {
    if (value === void 0) {
      value = '';
    }

    if (value !== '' && value.substr(-1) !== '/') {
      value = value.concat('/');
    }

    this.path = value;
    return this;
  };

  BaseLoader.prototype.setFileGroup = function (name) {
    if (name === void 0) {
      name = '';
    }

    this.fileGroup = name;
    return this;
  };

  BaseLoader.prototype.isLoading = function () {
    return this.state === BaseLoaderState.LOADING || this.state === BaseLoaderState.PROCESSING;
  };

  BaseLoader.prototype.isReady = function () {
    return this.state === BaseLoaderState.IDLE || this.state === BaseLoaderState.COMPLETE;
  };

  BaseLoader.prototype.addFile = function (file) {
    console.log('addFile');
    this.getURL(file);
    this.list.add(file);
    this.totalToLoad++;
    console.log(file);
    return new Promise(function (resolve, reject) {
      file.fileResolve = resolve;
      file.fileReject = reject;
    });
  };

  BaseLoader.prototype.start = function () {
    if (!this.isReady()) {
      return;
    }

    this.progress = 0;
    this.totalFailed = 0;
    this.totalComplete = 0;
    this.totalToLoad = this.list.size;

    if (this.totalToLoad === 0) {
      this.loadComplete();
    } else {
      this.state = BaseLoaderState.LOADING;
      this.inflight.clear();
      this.queue.clear();

      this._deleteQueue.clear();

      this.updateProgress();
      this.checkLoadQueue();
    }
  };

  BaseLoader.prototype.getURL = function (file) {
    if (file.url.match(/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/)) {
      return file;
    } else {
      file.url = this.baseURL + this.path + file.url;
    }
  };

  BaseLoader.prototype.updateProgress = function () {
    this.progress = 1 - (this.list.size + this.inflight.size) / this.totalToLoad;
  };

  BaseLoader.prototype.checkLoadQueue = function () {
    var e_1, _a;

    var _this = this;

    try {
      for (var _b = __values(this.list), _c = _b.next(); !_c.done; _c = _b.next()) {
        var entry = _c.value;

        if (entry.state === FileState.POPULATED || entry.state === FileState.PENDING && this.inflight.size < this.maxParallelDownloads) {
          this.inflight.add(entry);
          this.list.delete(entry);
          entry.load().then(function (file) {
            return _this.nextFile(file, true);
          }).catch(function (file) {
            return _this.nextFile(file, false);
          });
        }

        if (this.inflight.size === this.maxParallelDownloads) {
          break;
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };

  BaseLoader.prototype.nextFile = function (previousFile, success) {
    console.log('nextFile', previousFile, success);

    if (success) {
      this.queue.add(previousFile);
    } else {
      this._deleteQueue.add(previousFile);
    }

    this.inflight.delete(previousFile);

    if (this.list.size > 0) {
      console.log('nextFile - still something in the list');
      this.checkLoadQueue();
    } else if (this.inflight.size === 0) {
      console.log('nextFile calling finishedLoading');
      this.loadComplete();
    }
  };

  BaseLoader.prototype.loadComplete = function () {
    this.list.clear();
    this.inflight.clear();
    this.progress = 1;
    this.state = BaseLoaderState.COMPLETE;
  };

  return BaseLoader;
}();

function XHRLoader(file) {
  var e_1, _a;

  var xhr = new XMLHttpRequest();
  file.xhrLoader = xhr;
  var config = file.xhrSettings;
  xhr.open('GET', file.url, config.async, config.username, config.password);
  xhr.responseType = config.responseType;
  xhr.timeout = config.timeout;
  xhr.setRequestHeader('X-Requested-With', config.requestedWith);

  if (config.header && config.headerValue) {
    xhr.setRequestHeader(config.header, config.headerValue);
  }

  if (config.overrideMimeType) {
    xhr.overrideMimeType(config.overrideMimeType);
  }

  var onLoadStart = function onLoadStart(event) {
    return file.onLoadStart(event);
  };

  var onLoad = function onLoad(event) {
    return file.onLoad(event);
  };

  var onLoadEnd = function onLoadEnd(event) {
    return file.onLoadEnd(event);
  };

  var onProgress = function onProgress(event) {
    return file.onProgress(event);
  };

  var onTimeout = function onTimeout(event) {
    return file.onTimeout(event);
  };

  var onAbort = function onAbort(event) {
    return file.onAbort(event);
  };

  var onError = function onError(event) {
    return file.onError(event);
  };

  var eventMap = new Map([['loadstart', onLoadStart], ['load', onLoad], ['loadend', onLoadEnd], ['progress', onProgress], ['timeout', onTimeout], ['abort', onAbort], ['error', onError]]);

  try {
    for (var eventMap_1 = __values(eventMap), eventMap_1_1 = eventMap_1.next(); !eventMap_1_1.done; eventMap_1_1 = eventMap_1.next()) {
      var _b = __read(eventMap_1_1.value, 2),
          key = _b[0],
          value = _b[1];

      xhr.addEventListener(key, value);
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (eventMap_1_1 && !eventMap_1_1.done && (_a = eventMap_1.return)) _a.call(eventMap_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }

  file.resetXHR = function () {
    var e_2, _a;

    try {
      for (var eventMap_2 = __values(eventMap), eventMap_2_1 = eventMap_2.next(); !eventMap_2_1.done; eventMap_2_1 = eventMap_2.next()) {
        var _b = __read(eventMap_2_1.value, 2),
            key = _b[0],
            value = _b[1];

        xhr.removeEventListener(key, value);
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (eventMap_2_1 && !eventMap_2_1.done && (_a = eventMap_2.return)) _a.call(eventMap_2);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
  };

  xhr.send();
}

function XHRSettings(config) {
  if (config === void 0) {
    config = {
      responseType: 'blob',
      async: true,
      username: '',
      password: '',
      timeout: 0
    };
  }

  return {
    responseType: config.responseType,
    async: config.async,
    username: config.username,
    password: config.password,
    timeout: config.timeout,
    header: undefined,
    headerValue: undefined,
    requestedWith: 'XMLHttpRequest',
    overrideMimeType: undefined
  };
}

function File(key, url, type) {
  return {
    key: key,
    url: url,
    type: type,
    xhrLoader: undefined,
    xhrSettings: XHRSettings(),
    data: null,
    state: FileState.PENDING,
    bytesLoaded: 0,
    bytesTotal: 0,
    percentComplete: 0,
    load: function load() {
      var _this = this;

      console.log('File.load', this.key);
      this.state = FileState.PENDING;
      XHRLoader(this);
      return new Promise(function (resolve, reject) {
        _this.loaderResolve = resolve;
        _this.loaderReject = reject;
      });
    },
    onLoadStart: function onLoadStart(event) {
      console.log('onLoadStart');
      this.state = FileState.LOADING;
    },
    onLoad: function onLoad(event) {
      var _this = this;

      console.log('onLoad');
      var xhr = this.xhrLoader;
      var localFileOk = xhr.responseURL && xhr.responseURL.indexOf('file://') === 0 && xhr.status === 0;
      var success = !(event.target && xhr.status !== 200) || localFileOk;

      if (xhr.readyState === 4 && xhr.status >= 400 && xhr.status <= 599) {
        success = false;
      }

      this.onProcess().then(function () {
        return _this.onComplete();
      }).catch(function () {
        return _this.onError();
      });
    },
    onLoadEnd: function onLoadEnd(event) {
      console.log('onLoadEnd');
      this.resetXHR();
      this.state = FileState.LOADED;
    },
    onTimeout: function onTimeout(event) {
      console.log('onTimeout');
      this.state = FileState.TIMED_OUT;
    },
    onAbort: function onAbort(event) {
      console.log('onAbort');
      this.state = FileState.ABORTED;
    },
    onError: function onError(event) {
      console.log('onError');
      this.state = FileState.ERRORED;

      if (this.fileReject) {
        this.fileReject(this);
      }
    },
    onProgress: function onProgress(event) {
      console.log('onProgress');

      if (event.lengthComputable) {
        this.bytesLoaded = event.loaded;
        this.bytesTotal = event.total;
        this.percentComplete = Math.min(event.loaded / event.total, 1);
        console.log(this.percentComplete, '%');
      }
    },
    onProcess: function onProcess() {
      console.log('File.onProcess');
      this.state = FileState.PROCESSING;
      return new Promise(function (resolve, reject) {
        resolve();
      });
    },
    onComplete: function onComplete() {
      console.log('onComplete!');
      this.state = FileState.COMPLETE;

      if (this.fileResolve) {
        this.fileResolve(this);
      } else if (this.loaderResolve) {
        this.loaderResolve(this);
      }
    },
    onDestroy: function onDestroy() {
      this.state = FileState.DESTROYED;
    }
  };
}

function ImageFile(key, url) {
  if (!url) {
    url = key + '.png';
  }

  var file = File(key, url, 'image');
  file.xhrSettings.responseType = 'blob';

  file.onProcess = function () {
    console.log('ImageFile.onProcess');
    file.state = FileState.PROCESSING;
    var image = new Image();
    file.data = image;
    return new Promise(function (resolve, reject) {
      image.onload = function () {
        console.log('ImageFile.onload');
        image.onload = null;
        image.onerror = null;
        file.state = FileState.COMPLETE;
        resolve(file);
      };

      image.onerror = function (event) {
        console.log('ImageFile.onerror');
        image.onload = null;
        image.onerror = null;
        file.state = FileState.FAILED;
        reject(file);
      };

      console.log('ImageFile.set src', file.url);
      image.src = file.url;

      if (image.complete && image.width && image.height) {
        console.log('ImageFile.instant');
        image.onload = null;
        image.onerror = null;
        file.state = FileState.COMPLETE;
        resolve(file);
      }
    });
  };

  return file;
}

var LoaderPlugin = function (_super) {
  __extends(LoaderPlugin, _super);

  function LoaderPlugin() {
    return _super.call(this) || this;
  }

  LoaderPlugin.prototype.image = function (key, url) {
    if (url === void 0) {
      url = '';
    }

    return this.addFile(ImageFile(key, url));
  };

  return LoaderPlugin;
}(BaseLoader);

var game = new Game();
var browser = Device.Browser;
game.text(10, 20, 'Phaser 4 Test 5');
game.text(10, 60, 'Chrome: ' + browser.chrome);
game.text(200, 60, 'Version: ' + browser.chromeVersion);
game.text(10, 80, 'Firefox: ' + browser.firefox);
game.text(200, 80, 'Version: ' + browser.firefoxVersion);
game.text(10, 100, 'MSIE: ' + browser.ie);
game.text(200, 100, 'Version: ' + browser.ieVersion);
game.text(10, 120, 'Trident: ' + browser.trident);
game.text(200, 120, 'Version: ' + browser.tridentVersion);
game.text(10, 140, 'Safari: ' + browser.safari);
game.text(200, 140, 'Version: ' + browser.safariVersion);
game.text(10, 160, 'Edge: ' + browser.edge);
game.text(10, 180, 'Opera: ' + browser.opera);
game.text(10, 200, 'Silk: ' + browser.silk);
game.text(10, 220, 'Mobile Safari: ' + browser.mobileSafari);