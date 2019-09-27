(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {exports: {}};
            t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }

    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function (require, module, exports) {
        var config;

        config = {
            DEBUG_MODE: false,
            DEBUG_OPENING_MODE: false,
            STATS_MODE: false,
            DEVELOP_CLEAR_OPENING_CACHE: false,
            STATS_FPS: 30,
            THROTTLE_MS: 50,
            TOUCH_SUPPORT: false,
            TABLET_WIN_W: 960,
            MOBILE_WIN_W: 640,
            GRID_COL: 12,
            COMMON_EASING: "easeInOutCubic",
            KEY_COLOR_GRAY: "#3e3c3a",
            KEY_COLOR_WHITE: "#ffffff",
            BLEND: {
                multiply: "multiply",
                screen: "screen",
                overlay: "overlay",
                darken: "darken",
                lighten: "lighten",
                colorDodge: "color-dodge",
                colorBurn: "color-burn",
                hardLight: "hard-light",
                softLight: "soft-light",
                difference: "difference",
                exclusion: "exclusion",
                hue: "hue",
                saturation: "saturation",
                color: "color",
                luminosity: "luminosity",
                normal: "normal"
            }
        };

        module.exports = config;


    }, {}],
    2: [function (require, module, exports) {
        var Base, Window, c, log;

        c = require("../_config");

        log = require("../_helpers/log");

        Window = require("../_views/_format/Window");

        module.exports = Base = (function () {
            Base.prototype.w = null;

            function Base() {
                log.stats();
                this.w = new Window({
                    resizeThrottleMs: c.THROTTLE_MS,
                    scrollThrottleMs: c.THROTTLE_MS,
                    wheelThrottleMs: c.THROTTLE_MS
                });
                this.w.addListener();
                if (c.TOUCH_SUPPORT) {
                    this.w.addTouchListener();
                }
                return;
            }

            return Base;

        })();


    }, {"../_config": 1, "../_helpers/log": 17, "../_views/_format/Window": 27}],
    3: [function (require, module, exports) {
        var Pjax, Router, c, history, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../_config");

        log = require("../_helpers/log");

        history = require("../_helpers/history");

        Pjax = require("../_helpers/Pjax");

        module.exports = Router = (function () {
            Router.prototype.path = null;

            Router.prototype.query = null;

            Router.prototype.page = null;

            Router.prototype.rootDirNum = 1;

            Router.prototype.DEV_DIR_NAME = "static";

            function Router(w, advance, initTop, initOther, listener) {
                this.w = w;
                this.advance = advance;
                this.initTop = initTop;
                this.initOther = initOther;
                this.listener = listener;
                this.isQuestions = bind(this.isQuestions, this);
                this.isFeedback = bind(this.isFeedback, this);
                this.isAbout = bind(this.isAbout, this);
                this.isTop = bind(this.isTop, this);
                this.load = bind(this.load, this);
                this.judgment = bind(this.judgment, this);
                this.judgment();
                $(document).ready(this.advance);
                $(window).load(this.load);
                return;
            }

            Router.prototype.judgment = function () {
                this.path = history.getPaths();
                this.query = history.getQuery("order");
                if (this.path[1] === this.DEV_DIR_NAME) {
                    this.rootDirNum = 2;
                }
                this.page = this.path[this.rootDirNum];
                if (!this.page) {
                    this.page = "top";
                }
                this.pageSubDir1 = this.path[this.rootDirNum + 1];
                this.pageSubDir2 = this.path[this.rootDirNum + 2];
                this.pageSubDir3 = this.path[this.rootDirNum + 3];
                log.trace("Router.judgment =>\n@rootDirNum: " + this.rootDirNum + ",\n@page: " + this.page + ",\n@pageSubDir1: " + this.pageSubDir1 + ",\n@pageSubDir2: " + this.pageSubDir2 + ",\n@pageSubDir3: " + this.pageSubDir3 + ",\n@query: " + this.query);
            };

            Router.prototype.load = function () {
                if (this.isTop()) {
                    this.initTop();
                } else {
                    this.initOther();
                }
                this.listener();
            };

            Router.prototype.isTop = function () {
                return this.page === "top" || this.page === "index.html" || this.page === "index.php";
            };

            Router.prototype.isQuestions = function () {
                return this.page === "questions" && !this.pageSubDir1 || this.page === "questions" && this.pageSubDir1 === "index.html" || this.page === "questions" && this.pageSubDir1 === "index.php";
            };
            Router.prototype.isFeedback = function () {
                return this.page === "feedback" && !this.pageSubDir1 || this.page === "feedback" && this.pageSubDir1 === "index.html" || this.page === "feedback" && this.pageSubDir1 === "index.php";
            };
            Router.prototype.isAbout = function () {
                return this.page === "about" && !this.pageSubDir1 || this.page === "about" && this.pageSubDir1 === "index.html" || this.page === "about" && this.pageSubDir1 === "index.php";
            };
            return Router;

        })();


    }, {"../_config": 1, "../_helpers/Pjax": 6, "../_helpers/history": 15, "../_helpers/log": 17}],
    4: [function (require, module, exports) {
        var Article, Base, BubbleHover, Contents, FadeObj, Footer, Fv, Header, HowItWorks, Loader, Modal, Opening,
            Project, Questions, Feedback, About3Carousel, Router, StepCarousel, button, c, cj, cmn, detect, display,
            fitImg,
            history, image, log, math,

            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            },
            extend = function (child, parent) {
                for (var key in parent) {
                    if (hasProp.call(parent, key)) child[key] = parent[key];
                }

                function ctor() {
                    this.constructor = child;
                }

                ctor.prototype = parent.prototype;
                child.prototype = new ctor();
                child.__super__ = parent.prototype;
                return child;
            },
            hasProp = {}.hasOwnProperty;

        c = require("../_config");

        log = require("../_helpers/log");

        cmn = require("../_helpers/common");

        detect = require("../_helpers/detect");

        history = require("../_helpers/history");

        button = require("../_helpers/button");

        image = require("../_helpers/image");

        fitImg = require("../_helpers/fitImg");

        math = require("../_helpers/math");

        display = require("../_helpers/display");

        cj = require("../_helpers/createjs");

        Base = require("./Base");

        Router = require("./Router");

        Modal = require("../_views/_modules/Modal");

        FadeObj = require("../_views/_modules/FadeObj");

        BubbleHover = require("../_views/_modules/BubbleHover");

        Loader = require("../_views/_format/Loader");

        Header = require("../_views/_format/Header");

        Article = require("../_views/_format/Article");

        Contents = require("../_views/_format/Contents");

        Footer = require("../_views/_format/Footer");

        Fv = require("../_views/_top/Fv");

        Opening = require("../_views/_top/Opening");

        HowItWorks = require("../_views/_top/HowItWorks");

        StepCarousel = require("../_views/_top/StepCarousel");

        Questions = require("../_views/_pages/Questions");

        Feedback = require("../_views/_pages/Feedback");

        About3Carousel = require("../_views/_about/About3Carousel");

        Project = (function (superClass) {
            extend(Project, superClass);

            Project.prototype.isLogin = false;

            function Project() {
                this._onscroll = bind(this._onscroll, this);
                this._onresized = bind(this._onresized, this);
                this._onresizing = bind(this._onresizing, this);
                this._renderNickName = bind(this._renderNickName, this);
                this._setLoginState = bind(this._setLoginState, this);
                this._testLoginState = bind(this._testLoginState, this);
                this.listener = bind(this.listener, this);
                this.initOther = bind(this.initOther, this);
                this.initTop = bind(this.initTop, this);
                this.advance = bind(this.advance, this);
                Project.__super__.constructor.call(this);
                cj.initTicker(c.STATS_FPS);
                this.router = new Router(this.w, this.advance, this.initTop, this.initOther, this.listener);
                return;
            }

            Project.prototype.advance = function () {
                this.loader = new Loader(this.w);
                this.footer = new Footer(this.w);
                this.contents = new Contents(this.w, this.footer);
                this.header = new Header(this.w, this.contents);
                this.article = new Article(this.w);
                this.bubbleHover = new BubbleHover(this.w);
                this._setLoginState();
                this._renderNickName();
            };

            Project.prototype.initTop = function () {
                log.trace("project.initTop");
                this.opening = new Opening(this.w, this.contents);
                this.fadeObj = new FadeObj(this.w);
                this.fv = new Fv(this.w);
                this.howItWorks = new HowItWorks(this.w, this.header);
                this.stepCarousel = new StepCarousel(this.w);
                this.stepCarousel.init();
                this.contents.loaded((function (_this) {
                    return function () {
                        _this._onresizing();
                        _this._onscroll();
                        fitImg.init();
                        _this.loader.hide();
                        return _this.opening.start(function () {
                            return _this.fv.carousel.init();
                        });
                    };
                })(this));
            };

            Project.prototype.initOther = function () {
                log.trace("project.initOther");
                this.fadeObj = new FadeObj(this.w);
                if (this.router.isQuestions()) {
                    this.questions = new Questions(this.w, this.contents);
                }
                if (this.router.isFeedback()) {
                    this.feedback = new Feedback(this.w, this.contents);
                }
                if (this.router.isAbout()) {
                    this.about3Carousel = new About3Carousel(this.w);
                    this.about3Carousel.init();
                }
                this.contents.loaded((function (_this) {
                    return function () {
                        _this._onresizing();
                        _this._onscroll();
                        fitImg.init();
                        _this.loader.hide();
                        return _this.contents.toRelative();
                    };
                })(this));
            };

            Project.prototype.listener = function () {
                this.w.off("RESIZING", this._onresizing);
                this.w.on("RESIZING", this._onresizing);
                this.w.off("RESIZED", this._onresized);
                this.w.on("RESIZED", this._onresized);
                this.w.off("SCROLL", this._onscroll);
                this.w.on("SCROLL", this._onscroll);
                this._onresizing();
                this._onresized();
                this._onscroll();
            };

            Project.prototype._testLoginState = function () {
                this.isLogin = history.getQuery("login");
                if (this.isLogin) {
                    $(".js-only-logout").remove();
                } else {
                    $(".js-only-login").remove();
                }
            };

            Project.prototype._setLoginState = function () {
                if ($.cookie("member_id") === void 0) {
                    $(".js-only-login").remove();
                } else {
                    $(".js-only-logout").remove();
                }
            };

            Project.prototype._renderNickName = function () {
                var _nickname;
                if (!$(".js-userName")[0]) {
                    return;
                }
                _nickname = $.cookie("nickname");
                if (_nickname === void 0) {
                    $(".js-userName").html("YOU");
                } else {
                    $(".js-userName").html(_nickname);
                }
            };

            Project.prototype._onresizing = function () {
                var ref, ref1, ref2;
                this.header.resize();
                this.contents.resize();
                if ((ref = this.opening) != null) {
                    ref.resize();
                }
                if ((ref1 = this.fv) != null) {
                    ref1.resize();
                }
                if ((ref2 = this.questions) != null) {
                    ref2.resize();
                }
                if ((ref2 = this.feedback) != null) {
                    ref2.resize();
                }
                fitImg.resize();
            };

            Project.prototype._onresized = function () {
                var ref;
                if ((ref = this.questions) != null) {
                    ref.resized();
                }
                if ((ref = this.feedback) != null) {
                    ref.resized();
                }
                fitImg.resize();
            };

            Project.prototype._onscroll = function () {
                var ref, ref1;
                if (this.router.isTop()) {
                    this.contents.setBgOpacity();
                }
                this.contents.setScrollTop();
                if ((ref = this.fadeObj) != null) {
                    ref.scrollFire();
                }
                if ((ref1 = this.howItWorks) != null) {
                    ref1.overlapHeader();
                }
            };

            return Project;

        })(Base);

        module.exports = new Project;

//↓AboutPage用修正
    }, {
        "../_config": 1,
        "../_helpers/button": 8,
        "../_helpers/common": 10,
        "../_helpers/createjs": 11,
        "../_helpers/detect": 12,
        "../_helpers/display": 13,
        "../_helpers/fitImg": 14,
        "../_helpers/history": 15,
        "../_helpers/image": 16,
        "../_helpers/log": 17,
        "../_helpers/math": 18,
        "../_views/_format/Article": 22,
        "../_views/_format/Contents": 23,
        "../_views/_format/Footer": 24,
        "../_views/_format/Header": 25,
        "../_views/_format/Loader": 26,
        "../_views/_modules/BubbleHover": 28,
        "../_views/_modules/FadeObj": 29,
        "../_views/_modules/Modal": 30,
        "../_views/_pages/Questions": 33,
        "../_views/_pages/Feedback": 50,
        "../_views/_top/Fv": 42,
        "../_views/_top/HowItWorks": 44,
        "../_views/_top/Opening": 45,
        "../_views/_top/StepCarousel": 47,
        "../_views/_about/About3Carousel": 48,
        "./Base": 2,
        "./Router": 3
    }],
    5: [function (require, module, exports) {
        var EventObserver,
            slice = [].slice;

        module.exports = EventObserver = (function () {
            function EventObserver() {
            }

            EventObserver.prototype.on = function (ev, callback) {
                var base, evs, j, len, name;
                if (this._callbacks == null) {
                    this._callbacks = {};
                }
                evs = ev.split(' ');
                for (j = 0, len = evs.length; j < len; j++) {
                    name = evs[j];
                    (base = this._callbacks)[name] || (base[name] = []);
                    this._callbacks[name].push(callback);
                }
                return this;
            };

            EventObserver.prototype.once = function (ev, callback) {
                this.on(ev, function () {
                    this.off(ev, arguments.callee);
                    return callback.apply(this, arguments);
                });
                return this;
            };

            EventObserver.prototype.trigger = function () {
                var args, callback, ev, j, len, list, ref;
                args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                ev = args.shift();
                list = (ref = this._callbacks) != null ? ref[ev] : void 0;
                if (!list) {
                    return;
                }
                for (j = 0, len = list.length; j < len; j++) {
                    callback = list[j];
                    if (callback.apply(this, args) === false) {
                        break;
                    }
                }
                return this;
            };

            EventObserver.prototype.off = function (ev, callback) {
                var cb, evs, i, j, k, len, len1, list, name, ref;
                if (!ev) {
                    this._callbacks = {};
                    return this;
                }
                evs = ev.split(' ');
                for (j = 0, len = evs.length; j < len; j++) {
                    name = evs[j];
                    list = (ref = this._callbacks) != null ? ref[name] : void 0;
                    if (list) {
                        if (callback) {
                            for (i = k = 0, len1 = list.length; k < len1; i = ++k) {
                                cb = list[i];
                                if (!(cb === callback)) {
                                    continue;
                                }
                                list = list.slice();
                                list.splice(i, 1);
                                this._callbacks[name] = list;
                            }
                        } else {
                            delete this._callbacks[name];
                        }
                    }
                }
                return this;
            };

            return EventObserver;

        })();


    }, {}],
    6: [function (require, module, exports) {
        var Pjax, c, detect, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../_config");

        log = require("../_helpers/log");

        detect = require("../_helpers/detect");

        module.exports = Pjax = (function () {
            Pjax.prototype.el = ".js-contents";

            Pjax.prototype.PJAX_IGNORE_CLASS = "not-pjax";

            Pjax.prototype.PJAX_TRIGGER_CLASS = "a:not(.not-pjax)";

            function Pjax(w) {
                this.w = w;
                this.initListener = bind(this.initListener, this);
                this.removeListener = bind(this.removeListener, this);
                return;
            }

            Pjax.prototype.removeListener = function () {
                $(this.PJAX_TRIGGER_CLASS).off("click.pjax").on("click.pjax", (function (_this) {
                    return function (ev) {
                        return false;
                    };
                })(this));
            };

            Pjax.prototype.initListener = function (args) {
                var _href, _pjaxStackReplace, _timeout;
                _timeout = 10000;
                _pjaxStackReplace = false;
                _href = "";
                $(this.PJAX_TRIGGER_CLASS).off("click.pjax").on("click.pjax", (function (_this) {
                    return function (ev) {
                        ev.preventDefault();
                        _href = $(ev.currentTarget).attr("href");
                        if (_href === "#") {
                            return;
                        }
                        _this.removeListener();
                        return args.begin().done(function () {
                            $.pjax({
                                url: _href,
                                container: _this.el,
                                fragment: _this.el,
                                timeout: _timeout,
                                replace: _pjaxStackReplace
                            });
                        });
                    };
                })(this));
                $(document).off().on({
                    "pjax:popstate": (function (_this) {
                        return function () {
                            log.trace("◆pjax:popstate");
                            window.location.href = _href;
                            args.popstate();
                        };
                    })(this),
                    "pjax:end": (function (_this) {
                        return function (xhr, options) {
                            log.trace("◆pjax:end");
                            _this.w.startOffsetMove(0, 0);
                            args.complete();
                        };
                    })(this),
                    "pjax:timeout": (function (_this) {
                        return function (xhr, options) {
                            log.trace("◆pjax:timeout");
                            window.location.href = _href;
                        };
                    })(this)
                });
            };

            return Pjax;

        })();


    }, {"../_config": 1, "../_helpers/detect": 12, "../_helpers/log": 17}],
    7: [function (require, module, exports) {
        var Throttle,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        module.exports = Throttle = (function () {
            var _timeStamp, _timerId;

            Throttle.minInterval = 100;

            _timerId = null;

            _timeStamp = 0;

            function Throttle(minInterval) {
                this.minInterval = minInterval;
                this.exec = bind(this.exec, this);
            }

            Throttle.prototype.exec = function (func) {
                var delta, now;
                now = +(new Date);
                delta = now - _timeStamp;
                clearTimeout(_timerId);
                if (delta >= this.minInterval) {
                    _timeStamp = now;
                    func();
                } else {
                    _timerId = setTimeout((function (_this) {
                        return function () {
                            return _this.exec(func);
                        };
                    })(this), this.minInterval - delta);
                }
            };

            return Throttle;

        })();


    }, {}],
    8: [function (require, module, exports) {
        var $htmlbody, BODY_SCROLL_SPEED, BTN_FADE_SPEED, BTN_OPACITY, addListener, anchorScroll, detect, hoverAlpha,
            hoverBgColor, hoverColor, log, removeListener;

        log = require("../_helpers/log");

        detect = require("../_helpers/detect");

        $htmlbody = $("html,body");

        BODY_SCROLL_SPEED = 500;

        BTN_FADE_SPEED = 300;

        BTN_OPACITY = 0.5;

        addListener = function (args) {
            if (!$(args.el)[0]) {
                return;
            }
            if (!detect.isPc()) {
                return;
            }
            log.trace("button.addListener", args.el);
            $(args.el).on({
                "mouseenter": function (ev) {
                    var $ect;
                    $ect = $(ev.currentTarget);
                    return typeof args.onOver === "function" ? args.onOver($ect) : void 0;
                },
                "mouseleave": function (ev) {
                    var $ect;
                    $ect = $(ev.currentTarget);
                    return typeof args.onOut === "function" ? args.onOut($ect) : void 0;
                },
                "click": function (ev) {
                    var $ect;
                    $ect = $(ev.currentTarget);
                    return typeof args.onClick === "function" ? args.onClick($ect) : void 0;
                }
            });
        };

        removeListener = function (args) {
            if (!$(args.el)[0]) {
                return;
            }
            if (!detect.isPc()) {
                return;
            }
            log.trace("button.removeListener", args.el);
            $(args.el).off();
        };

        hoverAlpha = function (args) {
            if (!$(args.el)[0]) {
                return;
            }
            if (!detect.isPc()) {
                return;
            }
            log.trace("button.hoverAlpha", args.el);
            if (!args.alpha) {
                args.alpha = BTN_OPACITY;
            }
            $(args.el).on({
                "mouseenter": function (ev) {
                    var $ect;
                    $ect = $(ev.currentTarget);
                    $ect.stop().velocity({
                        "opacity": args.alpha
                    }, 0);
                    return typeof args.onOver === "function" ? args.onOver($ect) : void 0;
                },
                "mouseleave": function (ev) {
                    var $ect;
                    $ect = $(ev.currentTarget);
                    $ect.stop().velocity({
                        "opacity": 1.0
                    }, BTN_FADE_SPEED);
                    return typeof args.onOut === "function" ? args.onOut($ect) : void 0;
                }
            });
        };

        hoverColor = function (args) {
            if (!$(args.el)[0]) {
                return;
            }
            if (!detect.isPc()) {
                return;
            }
            log.trace("button.hoverColor", args.el);
            $(args.el).on({
                "mouseenter": function (ev) {
                    var $ect;
                    $ect = $(ev.currentTarget);
                    $ect.stop().velocity({
                        "color": args.onColor
                    }, 0);
                    return typeof args.onOver === "function" ? args.onOver($ect) : void 0;
                },
                "mouseleave": function (ev) {
                    var $ect;
                    $ect = $(ev.currentTarget);
                    $ect.stop().velocity({
                        "color": args.outColor
                    }, BTN_FADE_SPEED);
                    return typeof args.onOut === "function" ? args.onOut($ect) : void 0;
                }
            });
        };

        hoverBgColor = function (args) {
            if (!$(args.el)[0]) {
                return;
            }
            if (!detect.isPc()) {
                return;
            }
            log.trace("button.hoverBgColor", args.el);
            $(args.el).on({
                "mouseenter": function (ev) {
                    var $ect;
                    $ect = $(ev.currentTarget);
                    $ect.stop().velocity({
                        "backgroundColor": args.onColor
                    }, 0);
                    return typeof args.onOver === "function" ? args.onOver($ect) : void 0;
                },
                "mouseleave": function (ev) {
                    var $ect;
                    $ect = $(ev.currentTarget);
                    $ect.stop().velocity({
                        "backgroundColor": args.outColor
                    }, BTN_FADE_SPEED);
                    return typeof args.onOut === "function" ? args.onOut($ect) : void 0;
                }
            });
        };

        anchorScroll = function (el) {
            if (!$(el)[0]) {
                return;
            }
            $(el + " a[href^=#]").click(function (ev) {
                var $target, href;
                href = $(ev.currentTarget).attr("href");
                log.trace("href", href);
                $target = $(href === "#" || href === "" ? "html" : href);
                $htmlbody.stop().animate({
                    scrollTop: $target.offset().top
                }, BODY_SCROLL_SPEED, "easeOutExpo");
                return false;
            });
        };

        module.exports = {
            addListener: addListener,
            removeListener: removeListener,
            hoverAlpha: hoverAlpha,
            hoverColor: hoverColor,
            hoverBgColor: hoverBgColor,
            anchorScroll: anchorScroll
        };


    }, {"../_helpers/detect": 12, "../_helpers/log": 17}],
    9: [function (require, module, exports) {
        var STR_ASCII, getBite, hasNotASCII, isASCII, isAlphabetic, isAlphanumeric, isEm, isHiragana, isKatakana,
            isLowerAlphabetic, isNumeric, isUpperAlphabetic, isZenkaku, overflow;

        STR_ASCII = "abcdefghijklmnopqrstuvwxyz!#$%&'()[]@";

        isZenkaku = function (str) {
            if (str.match(/^[^\x01-\x7E\xA1-\xDF]+$/)) {
                return true;
            } else {
                return false;
            }
        };

        isHiragana = function (str) {
            if (str.match(/^[\u3041-\u3096]+$/)) {
                return true;
            } else {
                return false;
            }
        };

        isKatakana = function (str) {
            if (str.match(/^[\u30a1-\u30f6]+$/)) {
                return true;
            } else {
                return false;
            }
        };

        isAlphanumeric = function (str) {
            if (str.match(/^[0-9a-zA-Z]+$/)) {
                return true;
            } else {
                return false;
            }
        };

        isNumeric = function (str) {
            if (str.match(/^[0-9]+$/)) {
                return true;
            } else {
                return false;
            }
        };

        isAlphabetic = function (str) {
            if (str.match(/^[a-zA-Z]+$/)) {
                return true;
            } else {
                return false;
            }
        };

        isUpperAlphabetic = function (str) {
            if (str.match(/^[A-Z]+$/)) {
                return true;
            } else {
                return false;
            }
        };

        isLowerAlphabetic = function (str) {
            if (str.match(/^[a-z]+$/)) {
                return true;
            } else {
                return false;
            }
        };

        isEm = function (str) {
            if (str.match(/^[^ -~｡-ﾟ]*$/)) {
                return true;
            } else {
                return false;
            }
        };

        isASCII = function (str) {
            if (str.match(/^[\x20-\x7E]+$/)) {
                return true;
            } else {
                return false;
            }
        };

        hasNotASCII = function (str) {
            if (str.match(/^[^ -~｡-ﾟ]*$/)) {
                return true;
            } else {
                return false;
            }
        };

        getBite = function (str) {
            return encodeURI(str).replace(/%[0-9A-F]{2}/g, '*').length;
        };

        overflow = function (str, len, endStr) {
            if (str.length < len) {
                return str;
            }
            str = str.substr(0, len - endStr.length);
            return str += endStr;
        };

        module.exports = {
            isZenkaku: isZenkaku,
            isHiragana: isHiragana,
            isKatakana: isKatakana,
            isAlphanumeric: isAlphanumeric,
            isNumeric: isNumeric,
            isAlphabetic: isAlphabetic,
            isUpperAlphabetic: isUpperAlphabetic,
            isLowerAlphabetic: isLowerAlphabetic,
            isEm: isEm,
            isASCII: isASCII,
            hasNotASCII: hasNotASCII,
            getBite: getBite,
            overflow: overflow
        };


    }, {}],
    10: [function (require, module, exports) {
        var appendCssInline, cf, fps;

        cf = require("../_config");

        fps = cf.TIMER_FPS || 30;

        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                return window.setTimeout(callback, 1000 / fps);
            };
        })();

        window.cancelAnimFrame = (function () {
            return window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame || window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame || function (callback) {
                return window.clearTimeout(callback, 1000 / fps);
            };
        })();

        appendCssInline = function (text) {
            var head, rule, style;
            head = document.getElementsByTagName("head").item(0);
            style = document.createElement("style");
            rule = document.createTextNode(text);
            style.media = "screen";
            style.type = "text/css";
            style.appendChild(rule);
            head.appendChild(style);
        };

        module.exports = {
            appendCssInline: appendCssInline
        };


    }, {"../_config": 1}],
    11: [function (require, module, exports) {
        var _setStroke, addTicker, createContainer, createPoint, createShapeCircle, createShapeEllipse, createShapeRect,
            createStage, drawCurveCircle, fitFullsizeObject, fitFullsizeStage, initTicker, log, math, removeTicker,
            removeTickerAll, setCenter;

        log = require("../_helpers/log");

        math = require("../_helpers/math");

        initTicker = function (fps) {
            var default_fps;
            default_fps = 60;
            if (!fps) {
                fps = default_fps;
            }
            createjs.Ticker.setFPS(fps);
        };

        addTicker = function (func) {
            createjs.Ticker.addEventListener("tick", func);
        };

        removeTicker = function (func) {
            createjs.Ticker.removeEventListener("tick", func);
        };

        removeTickerAll = function () {
            createjs.Ticker.removeAllEventListeners("tick");
        };

        createStage = function (id) {
            var stage;
            stage = new createjs.Stage(id);
            if (createjs.Touch.isSupported()) {
                createjs.Touch.enable(stage);
            }
            return stage;
        };

        createContainer = function (wrapper) {
            var container;
            container = new createjs.Container();
            wrapper.addChild(container);
            return container;
        };

        fitFullsizeStage = function (w, stage) {
            stage.canvas.width = w.w();
            stage.canvas.height = w.h();
            return stage;
        };

        fitFullsizeObject = function (w, object, margin) {
            if (!margin) {
                margin = 0;
            }
            object.graphics.command.w = w.w() - margin;
            object.graphics.command.h = w.h() - margin;
            return object;
        };

        setCenter = function (w, object) {
            object.x = w.w() / 2;
            object.y = w.h() / 2;
            return object;
        };

        createPoint = function (args) {
            var point;
            point = new createjs.Point();
            point.x = args.x || args.stage.canvas.width / 2;
            point.y = args.y || args.stage.canvas.height / 2;
            return point;
        };

        _setStroke = function (g, args) {
            if (args.strokeColor) {
                args.strokeStyle = args.strokeStyle || 1;
                g.setStrokeStyle(args.strokeStyle).beginStroke(args.strokeColor);
            }
            return g;
        };

        createShapeCircle = function (args) {
            var g, shape;
            shape = new createjs.Shape();
            shape.g = g = shape.graphics;
            if (args.color) {
                g.beginFill(args.color);
            }
            _setStroke(g, args);
            g.drawCircle(args.x, args.y, args.r);
            args.stage.addChild(shape);
            return shape;
        };

        createShapeEllipse = function (args) {
            var shape;
            shape = new createjs.Shape();
            shape.graphics.setStrokeStyle(args.weight).beginStroke(args.color).drawEllipse(args.x, args.y, args.w, args.h);
            args.stage.addChild(shape);
            return shape;
        };

        drawCurveCircle = function (args) {
            var anchorX, anchorY, angle, controlX, controlY, g, i, j, ref, shape, theta;
            shape = new createjs.Shape();
            g = shape.graphics;
            _setStroke(g, args);
            args.segments = args.segments || 8;
            angle = 2 * Math.PI / args.segments;
            g.moveTo(args.x + args.r, args.y);
            for (i = j = 0, ref = args.segments; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
                theta = i * angle;
                anchorX = args.r * Math.cos(theta);
                anchorY = args.r * Math.sin(theta);
                controlX = anchorX + args.r * Math.tan(angle / 2) * Math.cos(theta - Math.PI / 2);
                controlY = anchorY + args.r * Math.tan(angle / 2) * Math.sin(theta - Math.PI / 2);
                g.quadraticCurveTo(controlX + args.x, controlY + args.y, anchorX + args.x, anchorY + args.y);
            }
            g.closePath();
            args.stage.addChild(shape);
            return shape;
        };

        createShapeRect = function (args) {
            var shape;
            shape = new createjs.Shape();
            shape.graphics.beginFill(args.color).rect(args.x, args.y, args.w, args.h);
            args.stage.addChild(shape);
            return shape;
        };

        module.exports = {
            initTicker: initTicker,
            addTicker: addTicker,
            removeTicker: removeTicker,
            removeTickerAll: removeTickerAll,
            createStage: createStage,
            createContainer: createContainer,
            fitFullsizeStage: fitFullsizeStage,
            fitFullsizeObject: fitFullsizeObject,
            setCenter: setCenter,
            createPoint: createPoint,
            createShapeCircle: createShapeCircle,
            createShapeEllipse: createShapeEllipse,
            drawCurveCircle: drawCurveCircle,
            createShapeRect: createShapeRect
        };


    }, {"../_helpers/log": 17, "../_helpers/math": 18}],
    12: [function (require, module, exports) {
        var _indexOfAV, _indexOfPF, _indexOfUA, isAndroid, isAndroidVer, isChrome, isEdge, isFirefox, isIe, isIeUnder,
            isIeVer, isIos, isIosVer, isIpad, isPc, isSafari, isSmt, isWin, isWin10, lowerAV, lowerPF, lowerUA, pureAV,
            purePF, pureUA;

        pureUA = window.navigator.userAgent;

        pureAV = window.navigator.appVersion;

        purePF = window.navigator.platform;

        lowerUA = pureUA.toLowerCase();

        lowerAV = pureAV.toLowerCase();

        lowerPF = purePF.toLowerCase();

        _indexOfUA = function (Ua) {
            var ua;
            ua = Ua.toLowerCase();
            return lowerUA.indexOf(ua);
        };

        _indexOfAV = function (Av) {
            var av;
            av = Av.toLowerCase();
            return lowerAV.indexOf(av);
        };

        _indexOfPF = function (Pf) {
            var pf;
            pf = Pf.toLowerCase();
            return lowerPF.indexOf(pf);
        };

        isIeVer = function () {
            var ver;
            ver = 0;
            if (lowerUA.match(/(msie|MSIE)/) || lowerUA.match(/(T|t)rident/)) {
                ver = lowerUA.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3];
                ver = parseInt(ver);
            }
            return ver;
        };

        isIeUnder = function (ver) {
            return isIeVer() <= ver && isIeVer() !== 0;
        };

        isIe = function (ver) {
            return isIeVer() === ver && isIeVer() !== 0;
        };

        isSmt = function () {
            return _indexOfUA("iphone") > 0 || _indexOfUA("ipod") > 0 || _indexOfUA("android") > 0;
        };

        isIos = function () {
            return _indexOfUA("ipad") > 0 || _indexOfUA("iphone") > 0 || _indexOfUA("ipod") > 0;
        };

        isIosVer = function () {
            var ios, ver;
            ios = pureAV.match(/OS (\d+)_(\d+)_?(\d+)?/);
            ver = /(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
            return parseInt(ios[1], 10);
        };

        isIpad = function () {
            return _indexOfUA("ipad") > 0;
        };

        isAndroid = function () {
            return _indexOfUA("android") > 0;
        };

        isAndroidVer = function (ver) {
            var isVer;
            if (!_indexOfUA("android") > 0) {
                return;
            }
            isVer = /(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(lowerUA);
            if (isVer == null) {
                return;
            }
            isVer = isVer[0].split(" ")[1];
            return isVer === ver;
        };

        isWin = function () {
            return _indexOfPF("win") !== -1;
        };

        isWin10 = function () {
            return _indexOfUA("nt 10") > 0;
        };

        isChrome = function () {
            return _indexOfUA("chrome") > 0;
        };

        isFirefox = function () {
            return _indexOfUA("firefox") !== -1;
        };

        isSafari = function () {
            return _indexOfUA("safari") !== -1 && _indexOfUA("chrome") === -1 && _indexOfUA("edge") === -1;
        };

        isEdge = function () {
            return _indexOfUA("edge") !== -1;
        };

        isPc = function () {
            return !isSmt() && !isIpad();
        };

        module.exports = {
            isIeVer: isIeVer,
            isIeUnder: isIeUnder,
            isIe: isIe,
            isSmt: isSmt,
            isIos: isIos,
            isIosVer: isIosVer,
            isIpad: isIpad,
            isAndroid: isAndroid,
            isAndroidVer: isAndroidVer,
            isWin: isWin,
            isWin10: isWin10,
            isChrome: isChrome,
            isFirefox: isFirefox,
            isSafari: isSafari,
            isEdge: isEdge,
            isPc: isPc
        };


    }, {}],
    13: [function (require, module, exports) {
        var getHighestHeight, log, setInnerHighestHeight, setSquareHeight, transform3d_value;

        log = require("../_helpers/log");

        getHighestHeight = function ($el) {
            var maxH;
            if (!$el[0]) {
                return;
            }
            maxH = 0;
            $el.each((function (_this) {
                return function (i, o) {
                    if ($(o).height() > maxH) {
                        return maxH = $(o).height();
                    }
                };
            })(this));
            return maxH;
        };

        setSquareHeight = function ($el) {
            if (!$el[0]) {
                return;
            }
            $el.each((function (_this) {
                return function (i, o) {
                    return $(o).height($(o).width());
                };
            })(this));
        };

        setInnerHighestHeight = function ($el) {
            if (!$el[0]) {
                return;
            }
            $el.each((function (_this) {
                return function (i, o) {
                    var hh;
                    hh = 0;
                    $(o).find("*").each(function (ii, oo) {
                        log.trace(i, ($(oo).height()) + " > hh(" + hh + ")", oo);
                        if ($(oo).height() > hh) {
                            return hh = $(oo).height();
                        }
                    });
                    return $(o).height(hh);
                };
            })(this));
        };

        transform3d_value = function ($el, prop) {
            var matrix, values;
            values = $el.css("transform");
            values = values.split('(')[1];
            values = values.split(')')[0];
            values = values.split(', ');
            matrix = {
                "scale-x": values[0],
                "rotate-z-p": values[1],
                "rotate-y-p": values[2],
                "perspective1": values[3],
                "rotate-z-m": values[4],
                "scale-y": values[5],
                "rotate-x-p": values[6],
                "perspective2": values[7],
                "rotate-y-m": values[8],
                "rotate-x-m": values[9],
                "scale-z": values[10],
                "perspective3": values[11],
                "translate-x": values[12],
                "translate-y": values[13],
                "translate-z": values[14],
                "perspective4": values[15]
            };
            if (prop) {
                return matrix[prop];
            } else {
                return matrix;
            }
        };

        module.exports = {
            getHighestHeight: getHighestHeight,
            setInnerHighestHeight: setInnerHighestHeight,
            setSquareHeight: setSquareHeight,
            transform3d_value: transform3d_value
        };


    }, {"../_helpers/log": 17}],
    14: [function (require, module, exports) {
        var _trimming, c, image, init, log, resize;

        c = require("../_config");

        log = require("../_helpers/log");

        image = require("../_helpers/image");

        _trimming = function (i, $img, isPc) {
            var _adjustX, _adjustY, _cutH, _cutW, _imgAspect, _imgH, _imgOrg, _imgW, _noImage, _parentAspect, _parentH,
                _parentW, _setSize;
            _imgW = 0;
            _imgH = 0;
            _parentW = 0;
            _parentH = 0;
            _imgAspect = 0;
            _parentAspect = 0;
            _imgOrg = image.getOrgSize($img);
            _noImage = function () {
                return _imgOrg.w === null || _imgOrg.h === null;
            };
            if (isPc) {
                _adjustX = Number($img.attr("data-pcX"));
                _adjustY = Number($img.attr("data-pcY"));
            } else {
                _adjustX = Number($img.attr("data-spX"));
                _adjustY = Number($img.attr("data-spY"));
            }
            if (!_adjustX) {
                _adjustX = 0;
            }
            if (!_adjustY) {
                _adjustY = 0;
            }
            _setSize = function () {
                _imgW = $img.width();
                _imgH = $img.height();
                _parentW = $img.parent().width();
                _parentH = $img.parent().height();
                _imgAspect = _imgW / _imgH;
                _parentAspect = _parentW / _parentH;
            };
            _cutW = function () {
                var left;
                $img.css({
                    "width": "auto",
                    "height": "100%"
                });
                _setSize();
                left = Math.floor((($img.width() - $img.parent().width()) / 2) - _adjustX);
                $img.css({
                    "left": "-" + left + "px",
                    "top": "0%"
                });
            };
            _cutH = function () {
                var top;
                $img.css({
                    "width": "100%",
                    "height": "auto"
                });
                _setSize();
                top = Math.floor((($img.height() - $img.parent().height()) / 2) + _adjustY);
                $img.css({
                    "top": "-" + top + "px",
                    "left": "0%"
                });
            };
            _setSize();
            if (_noImage()) {
                log.trace(i, "fitImg._trimming => NO IMAGE");
            } else if (_imgAspect >= _parentAspect) {
                _cutW();
            } else if (_imgAspect < _parentAspect) {
                _cutH();
            } else {
                _cutW();
            }
        };

        init = function () {
            var $img, isPc;
            $img = $(".js-fitImg");
            if (!$img[0]) {
                return;
            }
            isPc = $(window).width() >= c.TABLET_WIN_W;
            $img.each(function (i, o) {
                return $(o).imagesLoaded(function () {
                    $(o).parent().css({
                        "position": "relative",
                        "overflow": "hidden"
                    });
                    $(o).css({
                        "position": "absolute",
                        "display": "block"
                    });
                    return _trimming(i, $(o), isPc);
                });
            });
        };

        resize = function () {
            var $img, isPc;
            $img = $(".js-fitImg");
            if (!$img[0]) {
                return;
            }
            isPc = $(window).width() >= c.TABLET_WIN_W;
            $img.each(function (i, o) {
                return _trimming(i, $(o), isPc);
            });
        };

        module.exports = {
            init: init,
            resize: resize
        };


    }, {"../_config": 1, "../_helpers/image": 16, "../_helpers/log": 17}],
    15: [function (require, module, exports) {
        var getPaths, getQuery, h, log, match, pushState, replaceState, setTitle, supported, w;

        log = require("./log");

        w = window;

        h = w.history;

        supported = function () {
            return h && h.pushState;
        };

        pushState = function (dir) {
            if (!supported()) {
                return;
            }
            h.replaceState("index", null, null);
            h.pushState(dir, null, dir);
        };

        replaceState = function (dir) {
            if (!supported()) {
                return;
            }
            h.replaceState(null, null, dir);
        };

        setTitle = function (title) {
            document.title = title;
            $("title").text(title);
        };

        match = function (str) {
            var _result;
            _result = location.pathname.indexOf(str) !== -1;
            log.trace("match:", _result);
            return _result;
        };

        getPaths = function (level) {
            var _label, _paths;
            _label = "history.getPaths => ";
            _paths = location.pathname.split("/");
            if (level != null) {
                log.trace(_label, _paths[level]);
                return _paths[level];
            } else {
                log.trace(_label, _paths);
                return _paths;
            }
        };

        getQuery = function (key) {
            var qs, regex;
            key = key.replace(/[€[]/, "€€€[").replace(/[€]]/, "€€€]");
            regex = new RegExp("[€€?&]" + key + "=([^&#]*)");
            qs = regex.exec(w.location.href);
            if (qs === null) {
                return "";
            } else {
                return qs[1];
            }
        };

        module.exports = {
            supported: supported,
            pushState: pushState,
            replaceState: replaceState,
            setTitle: setTitle,
            match: match,
            getPaths: getPaths,
            getQuery: getQuery
        };


    }, {"./log": 17}],
    16: [function (require, module, exports) {
        var getOrgSize, log;

        log = require("../_helpers/log");

        getOrgSize = function ($img) {
            var img, size;
            size = {};
            img = new Image;
            img.src = $img.attr('src');
            size.w = img.width;
            size.h = img.height;
            return size;
        };

        module.exports = {
            getOrgSize: getOrgSize
        };


    }, {"../_helpers/log": 17}],
    17: [function (require, module, exports) {
        var assert, c, debug, error, fatal, info, stats, time, trace, warn;

        c = require("../_config");

        if (c.DEBUG_MODE) {
            assert = console.assert.bind(console);
            trace = console.log.bind(console, '[TRACE]');
            debug = console.debug.bind(console, '[DEBUG]');
            info = console.info.bind(console, '[INFO]');
            warn = console.warn.bind(console, '[WARN]');
            error = console.error.bind(console, '[ERROR]');
            fatal = console.error.bind(console, '[FATAL]');
            time = function () {
                return "【" + (new Date().toISOString()) + "】";
            };
        } else {
            assert = (function (_this) {
                return function () {
                };
            })(this);
            trace = (function (_this) {
                return function () {
                };
            })(this);
            debug = (function (_this) {
                return function () {
                };
            })(this);
            info = (function (_this) {
                return function () {
                };
            })(this);
            warn = (function (_this) {
                return function () {
                };
            })(this);
            error = (function (_this) {
                return function () {
                };
            })(this);
            fatal = (function (_this) {
                return function () {
                };
            })(this);
            time = (function (_this) {
                return function () {
                };
            })(this);
        }

        stats = function (fps) {
            if (!c.STATS_MODE) {
                return;
            }
            if (c.STATS_FPS) {
                fps = c.STATS_FPS;
            } else {
                fps = 60;
            }
            stats = new Stats();
            stats.domElement.style.position = "fixed";
            stats.domElement.style.left = "0px";
            stats.domElement.style.top = "0px";
            stats.domElement.style.zIndex = "9999";
            document.body.appendChild(stats.domElement);
            $("#fpsText").css({
                "letter-spacing": "0px"
            });
            setInterval(function () {
                return stats.update();
            }, 1000 / fps);
        };

        module.exports = {
            assert: assert,
            trace: trace,
            debug: debug,
            info: info,
            warn: warn,
            error: error,
            fatal: fatal,
            time: time,
            stats: stats
        };


    }, {"../_config": 1}],
    18: [function (require, module, exports) {
        var getDegree, getDiagonal, getDistance, getMaxIntRandom, getMaxRandom, getRadian, getRandomArrayValue,
            getRangeIntRandom, getRangeRandom, getVx, getVy, randomOfAdd, randomOfMulti, randomOfNormal, randomOfSqrt,
            randomOfSquare, randomOfUniform;

        getDiagonal = function (w, h) {
            return Math.sqrt(w * w + h * h);
        };

        getDistance = function (x1, y1, x2, y2) {
            var dx, dy;
            dx = x1 - x2;
            dy = y1 - y2;
            return Math.sqrt(dx * dx + dy * dy);
        };

        getVx = function (radians, speed) {
            return Math.cos(radians) * speed;
        };

        getVy = function (radians, speed) {
            return Math.sin(radians) * speed;
        };

        getRadian = function (degree) {
            return degree * Math.PI / 180;
        };

        getDegree = function (radian) {
            return radian / Math.PI * 180;
        };

        randomOfUniform = function () {
            return Math.random();
        };

        randomOfAdd = function () {
            return (Math.random() + Math.random()) / 2;
        };

        randomOfMulti = function () {
            return Math.random() * Math.random();
        };

        randomOfSquare = function () {
            var _r;
            _r = Math.random();
            return _r * _r;
        };

        randomOfSqrt = function () {
            return Math.sqrt(Math.random());
        };

        randomOfNormal = function () {
            var _r, calc;
            calc = function () {
                var r, r1, r2;
                r1 = Math.random();
                r2 = Math.random();
                r = Math.sqrt(-2.0 * Math.log(r1)) * Math.sin(2.0 * Math.PI * r2);
                return (r + 3) / 6;
            };
            while (true) {
                _r = calc();
                if (0 <= _r && _r < 1) {
                    break;
                }
            }
            return _r;
        };

        getMaxRandom = function (max, algorithm) {
            if (!algorithm) {
                algorithm = Math.random;
            }
            return algorithm() * max;
        };

        getMaxIntRandom = function (max, algorithm) {
            return Math.floor(getMaxRandom(max, algorithm));
        };

        getRangeRandom = function (min, max, algorithm) {
            if (!algorithm) {
                algorithm = Math.random;
            }
            return (algorithm() * (max - min)) + min;
        };

        getRangeIntRandom = function (min, max, algorithm) {
            return Math.floor(getRangeRandom(min, max, algorithm));
        };

        getRandomArrayValue = function (arr) {
            return arr[getMaxIntRandom(arr.length)];
        };

        module.exports = {
            getDiagonal: getDiagonal,
            getDistance: getDistance,
            getVx: getVx,
            getVy: getVy,
            getRadian: getRadian,
            getDegree: getDegree,
            randomOfUniform: randomOfUniform,
            randomOfAdd: randomOfAdd,
            randomOfMulti: randomOfMulti,
            randomOfSquare: randomOfSquare,
            randomOfSqrt: randomOfSqrt,
            randomOfNormal: randomOfNormal,
            getMaxRandom: getMaxRandom,
            getMaxIntRandom: getMaxIntRandom,
            getRangeRandom: getRangeRandom,
            getRangeIntRandom: getRangeIntRandom,
            getRandomArrayValue: getRandomArrayValue
        };


    }, {}],
    19: [function (require, module, exports) {
        (function () {
            require("./_controller/project");
        })();

    }, {"./_controller/project": 4}],
    20: [function (require, module, exports) {
        var HeaderHam, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        module.exports = HeaderHam = (function () {
            function HeaderHam(w) {
                this.w = w;
                this.resize = bind(this.resize, this);
                this.toggle = bind(this.toggle, this);
                this.$el = $(".js-headerHam");
                return;
            }

            HeaderHam.prototype.toggle = function () {
                this.$el.toggleClass("active");
            };

            HeaderHam.prototype.resize = function () {
            };

            return HeaderHam;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17}],
    21: [function (require, module, exports) {
        var HeaderLogo, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        module.exports = HeaderLogo = (function () {
            function HeaderLogo(w) {
                this.w = w;
                this.resize = bind(this.resize, this);
                this.$el = $(".js-headerLogo");
                return;
            }

            HeaderLogo.prototype.resize = function () {
            };

            return HeaderLogo;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17}],
    22: [function (require, module, exports) {
        var Article, c, log;

        c = require("../../_config");

        log = require("../../_helpers/log");

        module.exports = Article = (function () {
            function Article(w) {
                this.w = w;
                this.$el = $(".js-article");
                return;
            }

            return Article;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17}],
    23: [function (require, module, exports) {
        var Contents, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        module.exports = Contents = (function () {
            Contents.prototype.saveScrollTop = 0;

            Contents.prototype.isScrollTop = 0;

            Contents.prototype.isHeaderOpened = false;

            function Contents(w, footer) {
                this.w = w;
                this.footer = footer;
                this.resize = bind(this.resize, this);
                this.setBgOpacity = bind(this.setBgOpacity, this);
                this.setScrollTop = bind(this.setScrollTop, this);
                this.setInnerHeight = bind(this.setInnerHeight, this);
                this.toFixed = bind(this.toFixed, this);
                this.toRelative = bind(this.toRelative, this);
                this.toggle = bind(this.toggle, this);
                this.loaded = bind(this.loaded, this);
                this.$el = $(".js-contents");
                this.$bg = $(".js-contents__bg");
                this.$inner = $(".js-contents__inner, .js-minInnerHeight");
                return;
            }

            Contents.prototype.loaded = function (done) {
                this.$el.imagesLoaded().always(function (o) {
                    return log.trace("Contents.loaded.always");
                }).done(function (o) {
                    log.trace("Contents.loaded.done");
                    return typeof done === "function" ? done() : void 0;
                }).fail(function (o) {
                    return log.trace("Contents.loaded.fail");
                }).progress(function (o, image) {
                    var result;
                    return result = image.isLoaded ? "loaded" : "broken";
                });
            };

            Contents.prototype.toggle = function () {
                this.$el.toggleClass("active");
                if (this.$el.hasClass("active")) {
                    this.w.startOffsetMove(this.saveScrollTop, 0);
                } else {
                    this.saveScrollTop = this.isScrollTop;
                }
            };

            Contents.prototype.toRelative = function () {
                this.$el.addClass("active");
            };

            Contents.prototype.toFixed = function () {
                this.$el.removeClass("active");
            };

            Contents.prototype.setInnerHeight = function () {
                if (!this.$inner[0]) {
                    return;
                }
                this.$inner.css({
                    "min-height": (this.w.h() - this.footer.getHeight()) + "px"
                });
            };

            Contents.prototype.setScrollTop = function () {
                if (this.isHeaderOpened) {
                    return;
                }
                this.isScrollTop = this.w.t();
            };

            Contents.prototype.setBgOpacity = function () {
                var bgH, toggleY;
                bgH = this.$inner.css("margin-bottom");
                bgH = Number(bgH.split("px")[0]);
                toggleY = this.$el.height() - (bgH + $(".js-footer").height());
                if (toggleY > this.w.b() && this.isBgShowed) {
                    this.$bg.css({
                        "opacity": 0
                    });
                    this.isBgShowed = false;
                } else if (toggleY <= this.w.b() && !this.isBgShowed) {
                    this.$bg.css({
                        "opacity": 1
                    });
                    this.isBgShowed = true;
                }
            };

            Contents.prototype.resize = function () {
                this.setInnerHeight();
            };

            return Contents;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17}],
    24: [function (require, module, exports) {
        var Footer, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        module.exports = Footer = (function () {
            function Footer(w) {
                this.w = w;
                this.resize = bind(this.resize, this);
                this.getHeight = bind(this.getHeight, this);
                this.$el = $(".js-footer");
                this.$pagetop = $(".js-footer__pagetop");
                this.$pagetop.on("click", (function (_this) {
                    return function () {
                        return _this.w.startOffsetMove(0, 400);
                    };
                })(this));
                return;
            }

            Footer.prototype.getHeight = function () {
                return this.$el.height();
            };

            Footer.prototype.resize = function () {
            };

            return Footer;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17}],
    25: [function (require, module, exports) {
        var Header, HeaderHam, HeaderLogo, Modal, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        Modal = require("../_modules/Modal");

        HeaderLogo = require("../_common/HeaderLogo");

        HeaderHam = require("../_common/HeaderHam");

        module.exports = Header = (function () {
            function Header(w, contents) {
                this.w = w;
                this.contents = contents;
                this.resize = bind(this.resize, this);
                this.toBlack = bind(this.toBlack, this);
                this.toWhite = bind(this.toWhite, this);
                this.toggle = bind(this.toggle, this);
                this.$el = $(".js-header");
                this.logo = new HeaderLogo(this.w);
                this.ham = new HeaderHam(this.w);
                this.gnav = new Modal(this.w, "gnav");
                this.ham.$el.on("click", this.toggle);
                return;
            }

            Header.prototype.toggle = function () {
                if (c.DEVELOP_CLEAR_OPENING_CACHE) {
                    $.removeCookie("access");
                }
                this.ham.toggle();
                this.gnav.toggle((function (_this) {
                    return function () {
                        return _this.$el.toggleClass("not-blend");
                    };
                })(this));
                this.contents.toggle();
                $(".js-headerLogo").toggleClass("active");
                this.$el.toggleClass("active");
            };

            Header.prototype.toWhite = function () {
                this.$el.addClass("type-white");
            };

            Header.prototype.toBlack = function () {
                this.$el.removeClass("type-white");
            };

            Header.prototype.resize = function () {
                this.gnav.resize();
            };

            return Header;

        })();


    }, {
        "../../_config": 1,
        "../../_helpers/log": 17,
        "../_common/HeaderHam": 20,
        "../_common/HeaderLogo": 21,
        "../_modules/Modal": 30
    }],
    26: [function (require, module, exports) {
        var Loader, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        module.exports = Loader = (function () {
            Loader.prototype.loopFlg = true;

            function Loader(w) {
                this.w = w;
                this.resize = bind(this.resize, this);
                this.hide = bind(this.hide, this);
                this.show = bind(this.show, this);
                this.loopLineAnim = bind(this.loopLineAnim, this);
                this.$el = $(".js-loader");
                this.$line = $(".js-loader-underline");
                this.show();
                return;
            }

            Loader.prototype.loopLineAnim = function () {
                if (!this.loopFlg) {
                    return;
                }
                this.$line.css({
                    "left": "0",
                    "right": "auto"
                }).velocity({
                    width: "88%"
                }, {
                    duration: 300,
                    easing: "easeInExpo",
                    complete: (function (_this) {
                        return function () {
                            return _this.$line.css({
                                "left": "auto",
                                "right": "12%"
                            }).velocity({
                                width: "0%"
                            }, {
                                duration: 300,
                                easing: "easeOutExpo",
                                complete: function () {
                                    return _.delay(_this.loopLineAnim, 200);
                                }
                            });
                        };
                    })(this)
                });
            };

            Loader.prototype.show = function () {
                this.$el.css({
                    "display": "flex"
                });
                this.$el.velocity({
                    "opacity": 1
                }, 300);
                this.loopFlg = true;
                this.loopLineAnim();
            };

            Loader.prototype.hide = function (complete) {
                this.loopFlg = false;
                this.$el.velocity({
                    "opacity": 0
                }, 300, (function (_this) {
                    return function () {
                        _this.$el.css({
                            "display": "none"
                        });
                        return typeof complete === "function" ? complete() : void 0;
                    };
                })(this));
            };

            Loader.prototype.resize = function () {
            };

            return Loader;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17}],
    27: [function (require, module, exports) {
        var EO, Throttle, Window, c, detect,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            },
            extend = function (child, parent) {
                for (var key in parent) {
                    if (hasProp.call(parent, key)) child[key] = parent[key];
                }

                function ctor() {
                    this.constructor = child;
                }

                ctor.prototype = parent.prototype;
                child.prototype = new ctor();
                child.__super__ = parent.prototype;
                return child;
            },
            hasProp = {}.hasOwnProperty;

        c = require("../../_config");

        EO = require("../../_helpers/EventObserver");

        Throttle = require("../../_helpers/Throttle");

        detect = require("../../_helpers/detect");

        module.exports = Window = (function (superClass) {
            var EVENT_END_LAG, _resizeThrottle, _resizeTimer, _scrollThrottle, _scrollTimer, _touchTimer,
                _wheelThrottle, _wheelTimer;

            extend(Window, superClass);

            Window.prototype.el = window;

            Window.prototype.$el = $(window);

            Window.prototype.$document = $(document);

            Window.prototype.$html = $("html");

            Window.prototype.$body = $("body");

            Window.prototype.$htmlbody = $("html,body");

            _resizeTimer = false;

            _scrollTimer = false;

            _wheelTimer = false;

            _touchTimer = false;

            _resizeThrottle = null;

            _scrollThrottle = null;

            _wheelThrottle = null;

            Window.prototype.resizeThrottleMs = 50;

            Window.prototype.scrollThrottleMs = 50;

            Window.prototype.wheelThrottleMs = 50;

            Window.startScrollY = null;

            Window.endScrollY = null;

            Window.startPageX = null;

            Window.startPageY = null;

            Window.endPageX = null;

            Window.endPageY = null;

            Window.scrollDirection = null;

            Window.swipeDirection = null;

            EVENT_END_LAG = 200;

            function Window(opt) {
                this.supportMixBlendMode = bind(this.supportMixBlendMode, this);
                this.checkSupportCSS = bind(this.checkSupportCSS, this);
                this.isTablet = bind(this.isTablet, this);
                this.isTabletW = bind(this.isTabletW, this);
                this.isMobileW = bind(this.isMobileW, this);
                this.getBodyHeight = bind(this.getBodyHeight, this);
                this.stopOffsetMove = bind(this.stopOffsetMove, this);
                this.startOffsetVelocity = bind(this.startOffsetVelocity, this);
                this.startOffsetMove = bind(this.startOffsetMove, this);
                this.onorientationchange = bind(this.onorientationchange, this);
                this.onpopstate = bind(this.onpopstate, this);
                this.ontouchend = bind(this.ontouchend, this);
                this.ontouchmove = bind(this.ontouchmove, this);
                this.ontouchstart = bind(this.ontouchstart, this);
                this.onmousewheel = bind(this.onmousewheel, this);
                this.onscroll = bind(this.onscroll, this);
                this.onscrollOnce = bind(this.onscrollOnce, this);
                this.onresize = bind(this.onresize, this);
                this.b = bind(this.b, this);
                this.r = bind(this.r, this);
                this.l = bind(this.l, this);
                this.t = bind(this.t, this);
                this.h = bind(this.h, this);
                this.w = bind(this.w, this);
                this.removeTouchListener = bind(this.removeTouchListener, this);
                this.removeListener = bind(this.removeListener, this);
                this.addTouchListener = bind(this.addTouchListener, this);
                this.addListener = bind(this.addListener, this);
                this.currentWidth = this.el.innerWidth;
                if ((opt != null ? opt.resizeThrottleMs : void 0) != null) {
                    this.resizeThrottleMs = opt.resizeThrottleMs;
                }
                if ((opt != null ? opt.scrollThrottleMs : void 0) != null) {
                    this.scrollThrottleMs = opt.scrollThrottleMs;
                }
                if ((opt != null ? opt.wheelThrottleMs : void 0) != null) {
                    this.wheelThrottleMs = opt.wheelThrottleMs;
                }
                _resizeThrottle = new Throttle(this.resizeThrottleMs);
                _scrollThrottle = new Throttle(this.scrollThrottleMs);
                _wheelThrottle = new Throttle(this.wheelThrottleMs);
                this.checkSupportCSS();
                return;
            }

            Window.prototype.addListener = function () {
                this.el.addEventListener("resize", this.onresize);
                this.el.addEventListener("scroll", this.onscroll);
                this.$el.on("mousewheel", this.onmousewheel);
                this.$el.on("orientationchange", this.onorientationchange);
            };

            Window.prototype.addTouchListener = function () {
                this.$el.on("touchstart", this.ontouchstart);
                this.$el.on("touchmove", this.ontouchmove);
            };

            Window.prototype.removeListener = function () {
                this.$el.off("resize", this.onresize);
                this.$el.off("scroll", this.onscroll);
                this.$el.off("mousewheel", this.onmousewheel);
                this.$el.off("orientationchange", this.onorientationchange);
            };

            Window.prototype.removeTouchListener = function () {
                this.$el.off("touchstart", this.ontouchstart);
                this.$el.off("touchmove", this.ontouchmove);
            };

            Window.prototype.w = function () {
                return this.$el.width();
            };

            Window.prototype.h = function () {
                return this.$el.height();
            };

            Window.prototype.t = function () {
                return this.$el.scrollTop();
            };

            Window.prototype.l = function () {
                return this.$el.scrollLeft();
            };

            Window.prototype.r = function () {
                return this.$el.scrollLeft() + this.$el.width();
            };

            Window.prototype.b = function () {
                return this.$el.scrollTop() + this.$el.height();
            };

            Window.prototype.onresize = function (ev) {
                if (this.currentWidth === this.el.innerWidth) {
                    return;
                }
                this.currentWidth = this.el.innerWidth;
                this.trigger("RESIZE");
                _resizeThrottle.exec((function (_this) {
                    return function () {
                        return _this.trigger("RESIZING");
                    };
                })(this));
                if (_resizeTimer !== false) {
                    clearTimeout(_resizeTimer);
                }
                _resizeTimer = setTimeout((function (_this) {
                    return function () {
                        return _this.trigger("RESIZED");
                    };
                })(this), EVENT_END_LAG);
            };

            Window.prototype.onscrollOnce = function (ev) {
                var ref;
                this.trigger("SCROLL_START");
                if ((ev != null ? (ref = ev.currentTarget) != null ? ref.scrollY : void 0 : void 0) != null) {
                    this.endScrollY = ev.currentTarget.scrollY;
                }
            };

            Window.prototype.onscroll = function (ev) {
                this.trigger("SCROLL");
                _scrollThrottle.exec((function (_this) {
                    return function () {
                        return _this.trigger("SCROLLING");
                    };
                })(this));
                if (_scrollTimer !== false) {
                    clearTimeout(_scrollTimer);
                }
                _scrollTimer = setTimeout((function (_this) {
                    return function () {
                        var ref;
                        if ((ev != null ? (ref = ev.currentTarget) != null ? ref.scrollY : void 0 : void 0) != null) {
                            _this.startScrollY = ev.currentTarget.scrollY;
                        }
                        if (_this.startScrollY < _this.endScrollY) {
                            _this.scrollDirection = "up";
                        } else if (_this.startScrollY > _this.endScrollY) {
                            _this.scrollDirection = "down";
                        }
                        _this.$el.one("scroll", _this.onscrollOnce);
                        return _this.trigger("SCROLLED");
                    };
                })(this), EVENT_END_LAG);
            };

            Window.prototype.onmousewheel = function (ev) {
                var delta;
                delta = ev.originalEvent.deltaY ? -ev.originalEvent.deltaY : ev.originalEvent.wheelDelta ? ev.originalEvent.wheelDelta : -ev.originalEvent.detail;
                this.trigger("WHEEL", delta);
                _wheelThrottle.exec((function (_this) {
                    return function () {
                        return _this.trigger("WHEELING", delta);
                    };
                })(this));
                if (_wheelTimer !== false) {
                    clearTimeout(_wheelTimer);
                }
                _wheelTimer = setTimeout((function (_this) {
                    return function () {
                        return _this.trigger("WHEELED", delta);
                    };
                })(this), EVENT_END_LAG);
            };

            Window.prototype.ontouchstart = function (ev) {
                this.startPageX = ev.originalEvent.changedTouches[0].pageX;
                this.startPageY = ev.originalEvent.changedTouches[0].pageY;
                this.trigger("TOUCH_START");
            };

            Window.prototype.ontouchmove = function (ev) {
                this.endPageX = ev.originalEvent.changedTouches[0].pageX;
                this.endPageY = ev.originalEvent.changedTouches[0].pageY;
                this.swipeRangeY = this.startPageY - this.endPageY;
                this.swipeRangeX = this.startPageX - this.endPageX;
                if (this.startPageX === this.endPageX || this.startPageY === this.endPageY) {
                    return;
                }
                if (this.startPageY < this.endPageY) {
                    this.swipeDirection = "up";
                    this.trigger("SWIPING_UP", this.swipeRangeY);
                } else if (this.startPageY > this.endPageY) {
                    this.swipeDirection = "down";
                    this.trigger("SWIPING_DOWN", this.swipeRangeY);
                } else if (this.startPageX < this.endPageX) {
                    this.swipeDirection = "left";
                    this.trigger("SWIPING_LEFT", this.swipeRangeX);
                } else if (this.startPageX > this.endPageX) {
                    this.swipeDirection = "right";
                    this.trigger("SWIPING_RIGHT", this.swipeRangeX);
                }
                this.trigger("TOUCH_MOVE", ev);
                if (_touchTimer !== false) {
                    clearTimeout(_touchTimer);
                }
                _touchTimer = setTimeout((function (_this) {
                    return function () {
                        _this.trigger("TOUCHED", ev);
                        return _this.ontouchend(ev);
                    };
                })(this), 200);
            };

            Window.prototype.ontouchend = function (ev) {
                this.endPageX = ev.originalEvent.changedTouches[0].pageX;
                this.endPageY = ev.originalEvent.changedTouches[0].pageY;
                if (this.startPageX === this.endPageX || this.startPageY === this.endPageY) {
                    return;
                }
                if (this.startPageY < this.endPageY) {
                    this.swipeDirection = "up";
                    this.trigger("SWIPED_UP");
                } else if (this.startPageY > this.endPageY) {
                    this.swipeDirection = "down";
                    this.trigger("SWIPED_DOWN");
                } else if (this.startPageX < this.endPageX) {
                    this.swipeDirection = "left";
                    this.trigger("SWIPED_LEFT");
                } else if (this.startPageX > this.endPageX) {
                    this.swipeDirection = "right";
                    this.trigger("SWIPED_RIGHT");
                }
                this.trigger("TOUCH_END");
            };

            Window.prototype.onpopstate = function (ev) {
                this.trigger("POPSTATE", ev);
            };

            Window.prototype.onorientationchange = function (ev) {
                var direction;
                if (Math.abs(this.el.orientation === 90)) {
                    this.trigger("LANDSCAPE");
                    direction = "LANDSCAPE";
                } else {
                    this.trigger("PORTRAIT");
                    direction = "PORTRAIT";
                }
                this.trigger("ORIENTATION", direction);
                this.trigger("RESIZING");
            };

            Window.prototype.startOffsetMove = function (distance, speed, callback) {
                if (distance == null) {
                    distance = 0;
                }
                if (speed == null) {
                    speed = 1000;
                }
                if (detect.isSafari() || detect.isEdge()) {
                    $("body").stop().animate({
                        scrollTop: distance
                    }, speed, "easeInOutExpo", (function (_this) {
                        return function () {
                            return typeof callback === "function" ? callback() : void 0;
                        };
                    })(this));
                } else {
                    this.$htmlbody.stop().animate({
                        scrollTop: distance
                    }, speed, "easeInOutExpo", (function (_this) {
                        return function () {
                            return typeof callback === "function" ? callback() : void 0;
                        };
                    })(this));
                }
            };

            Window.prototype.startOffsetVelocity = function ($el, speed, offset, callback) {
                if (speed == null) {
                    speed = 1000;
                }
                if (offset == null) {
                    offset = 0;
                }
                $el.velocity("scroll", {
                    duration: speed,
                    easing: "easeOutExpo",
                    offset: offset,
                    complete: (function (_this) {
                        return function () {
                            if (callback != null) {
                                return callback();
                            }
                        };
                    })(this)
                });
            };

            Window.prototype.stopOffsetMove = function () {
                this.$htmlbody.stop();
            };

            Window.prototype.getBodyHeight = function () {
                return Math.max.apply(null, [document.body.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight]);
            };

            Window.prototype.isMobileW = function () {
                return this.el.innerWidth < c.MOBILE_WIN_W;
            };

            Window.prototype.isTabletW = function () {
                return this.el.innerWidth < c.TABLET_WIN_W;
            };

            Window.prototype.isTablet = function () {
                return !detect.isPc() || this.el.innerWidth < c.TABLET_WIN_W;
            };

            Window.prototype.checkSupportCSS = function () {
                if ("CSS" in this.el && "supports" in this.el.CSS) {
                    if (this.el.CSS.supports("mix-blend-mode", "soft-light")) {
                        document.documentElement.classList.add("mix-blend-mode");
                    }
                }
            };

            Window.prototype.supportMixBlendMode = function () {
                return this.$html.hasClass("mix-blend-mode");
            };

            return Window;

        })(EO);


    }, {
        "../../_config": 1,
        "../../_helpers/EventObserver": 5,
        "../../_helpers/Throttle": 7,
        "../../_helpers/detect": 12
    }],
    28: [function (require, module, exports) {
        var BubbleHover, c, log, math,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        math = require("../../_helpers/math");

        module.exports = BubbleHover = (function () {
            BubbleHover.prototype.els = [];

            BubbleHover.prototype.ICO_OPACITY = 0.4;

            BubbleHover.prototype.ICO_MIN_SCALE = 1;

            BubbleHover.prototype.ICO_MAX_SCALE = 5;

            BubbleHover.prototype.ICO_RADIUS = 25;

            BubbleHover.prototype.DURATION = 1000;

            function BubbleHover(w) {
                this.w = w;
                this.fire = bind(this.fire, this);
                this.reset = bind(this.reset, this);
                this.setOffset = bind(this.setOffset, this);
                this.remove = bind(this.remove, this);
                this.$el = $(".js-bubbleHover");
                this.$el.each((function (_this) {
                    return function (i, o) {
                        _this.els[i] = {};
                        _this.els[i].$el = $(o).parent().addClass("m-bubbleHover");
                        _this.els[i].$target = $(o).addClass("m-bubbleHover__target");
                        _this.els[i].$el.prepend("<span class='m-bubbleHover__circle ico'></span>");
                        _this.els[i].$ico = _this.els[i].$el.find(".ico");
                        _this.reset(i);
                        $(o).on("mousemove", function (ev) {
                            return _this.setOffset(i, ev);
                        });
                        return $(o).on("mouseenter", function () {
                            return _this.fire(i);
                        });
                    };
                })(this));
                return;
            }

            BubbleHover.prototype.remove = function () {
                this.$el.each((function (_this) {
                    return function (i, o) {
                        $(o).off("mousemove");
                        return $(o).off("mouseenter");
                    };
                })(this));
            };

            BubbleHover.prototype.setOffset = function (i, ev) {
                if (this.w.isTabletW()) {
                    return;
                }
                this.els[i].ox = ev.offsetX - this.ICO_RADIUS;
                this.els[i].oy = ev.offsetY - this.ICO_RADIUS;
            };

            BubbleHover.prototype.reset = function (i) {
                this.els[i].$ico.stop().velocity({
                    "opacity": this.ICO_OPACITY,
                    "scale": 0
                }, 0);
            };

            BubbleHover.prototype.fire = function (i) {
                if (this.w.isTabletW()) {
                    return;
                }
                this.reset(i);
                _.delay((function (_this) {
                    return function () {
                        var randomScale;
                        randomScale = math.getRangeRandom(_this.ICO_MIN_SCALE, _this.ICO_MAX_SCALE);
                        log.trace("BubbleHover.fire", i, randomScale, _this.els[i].$ico, _this.els[i].ox, _this.els[i].oy);
                        _this.els[i].$ico.css({
                            "left": _this.els[i].ox,
                            "top": _this.els[i].oy
                        });
                        _this.els[i].$ico.stop().velocity({
                            "opacity": 0,
                            "scale": randomScale
                        }, _this.DURATION, "easeOutExpo", function () {
                            return _this.reset(i);
                        });
                        return _this.els[i].$target.stop().velocity({
                            "opacity": 0
                        }, 0, function () {
                            return _this.els[i].$target.stop().velocity({
                                "opacity": 1
                            }, _this.DURATION / 2);
                        });
                    };
                })(this), 10);
            };

            return BubbleHover;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17, "../../_helpers/math": 18}],
    29: [function (require, module, exports) {
        var FadeObj, c, detect,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        detect = require("../../_helpers/detect");

        module.exports = FadeObj = (function () {
            FadeObj.prototype.els = [];

            FadeObj.prototype.isAllActived = false;

            FadeObj.prototype.PC_SCROLL_FIRE_DIFF_Y = 100;

            FadeObj.prototype.SP_SCROLL_FIRE_DIFF_Y = 30;

            FadeObj.prototype.SHOW_BEGIN_Y = 100;

            FadeObj.prototype.SHOW_SPEED = 1000;

            FadeObj.prototype.SHOW_EASE = "easeOutCubic";

            function FadeObj(w) {
                this.w = w;
                this.scrollFire = bind(this.scrollFire, this);
                this.show = bind(this.show, this);
                this.init = bind(this.init, this);
                this.$el = $(".js-fadeObj");
                this.isAllActived = false;
                this.els = [];
                this.init();
                return;
            }

            FadeObj.prototype.init = function () {
                if (!detect.isPc()) {
                    return;
                }
                this.$el.each((function (_this) {
                    return function (i, o) {
                        _this.els[i] = {};
                        _this.els[i].id = i;
                        _this.els[i].$el = $(o);
                        _this.els[i].isActive = false;
                        if ($(o).attr("data-delay")) {
                            _this.els[i].delay = $(o).attr("data-delay");
                        } else {
                            _this.els[i].delay = 0;
                        }
                        return $(o).velocity({
                            "opacity": 0,
                            "translateY": _this.SHOW_BEGIN_Y
                        }, 0);
                    };
                })(this));
            };

            FadeObj.prototype.show = function (current, delay) {
                if (!detect.isPc()) {
                    return;
                }
                if (!delay) {
                    delay = 0;
                }
                _.delay((function (_this) {
                    return function () {
                        return _this.$el.eq(current).velocity({
                            "opacity": 1,
                            "translateY": 0
                        }, _this.SHOW_SPEED, _this.SHOW_EASE);
                    };
                })(this), delay);
            };

            FadeObj.prototype.scrollFire = function () {
                var el, j, len, ref;
                if (!detect.isPc()) {
                    return;
                }
                if (this.isAllActived) {
                    return;
                }
                ref = this.els;
                for (j = 0, len = ref.length; j < len; j++) {
                    el = ref[j];
                    this.isAllActived = el.isActive;
                }
                this.$el.each((function (_this) {
                    return function (i, o) {
                        var diff;
                        if (_this.els[i].isActive) {
                            return;
                        }
                        if (detect.isPc()) {
                            diff = _this.PC_SCROLL_FIRE_DIFF_Y;
                        } else {
                            diff = _this.SP_SCROLL_FIRE_DIFF_Y;
                        }
                        if (_this.w.b() > _this.els[i].$el.offset().top + diff) {
                            _this.show(_this.els[i].id, _this.els[i].delay);
                            return _this.els[i].isActive = true;
                        }
                    };
                })(this));
            };

            return FadeObj;

        })();


    }, {"../../_config": 1, "../../_helpers/detect": 12}],
    30: [function (require, module, exports) {
        var EO, Modal, c, detect, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            },
            extend = function (child, parent) {
                for (var key in parent) {
                    if (hasProp.call(parent, key)) child[key] = parent[key];
                }

                function ctor() {
                    this.constructor = child;
                }

                ctor.prototype = parent.prototype;
                child.prototype = new ctor();
                child.__super__ = parent.prototype;
                return child;
            },
            hasProp = {}.hasOwnProperty;

        c = require("../../_config");

        EO = require("../../_helpers/EventObserver");

        log = require("../../_helpers/log");

        detect = require("../../_helpers/detect");

        module.exports = Modal = (function (superClass) {
            extend(Modal, superClass);

            Modal.prototype.isOpened = false;

            Modal.prototype.TRANSLATE_Y = 30;

            Modal.prototype.OPEN_ANGLE_X = 10;

            Modal.prototype.OPEN_ANGLE_Y = 10;

            Modal.prototype.CLOSE_ANGLE_X = -10;

            Modal.prototype.CLOSE_ANGLE_Y = -10;

            Modal.prototype.OPEN_SPEED = 600;

            Modal.prototype.OPEN_SPEED_DIFF = 300;

            Modal.prototype.CLOSE_SPEED = 600;

            function Modal(w, id, closed) {
                this.w = w;
                this.id = id;
                this.closed = closed;
                this.resize = bind(this.resize, this);
                this.setMinHeight = bind(this.setMinHeight, this);
                this.close = bind(this.close, this);
                this.open = bind(this.open, this);
                this.toggle = bind(this.toggle, this);
                $(".js-modal").each((function (_this) {
                    return function (i, o) {
                        if ($(o).data("id") === _this.id) {
                            _this.$el = $(o);
                            _this.$bg = _this.$el.find(".js-modal__bg");
                            _this.$unit = _this.$el.find(".js-modal__unit");
                            return _this.$close = _this.$el.find(".js-modal__close");
                        }
                    };
                })(this));
                if (detect.isSafari()) {
                    this.OPEN_SPEED_DIFF = 0;
                }
                this.$unit.stop().velocity({
                    translateY: this.TRANSLATE_Y
                }, 0);
                this.$bg.stop().velocity({
                    translateY: this.TRANSLATE_Y
                }, 0);
                if (this.$close[0]) {
                    this.$close.on("click", this.close);
                }
                return;
            }

            Modal.prototype.toggle = function (callback) {
                if (this.isOpened) {
                    this.close(callback);
                } else {
                    this.open(callback);
                }
            };

            Modal.prototype.open = function (begin) {
                if (this.isOpened) {
                    return;
                }
                if (typeof begin === "function") {
                    begin();
                }
                this.isOpened = true;
                this.trigger("OPEN");
                this.$el.css({
                    "display": "block"
                });
                this.$close.css({
                    "opacity": 1
                });
                this.$unit.stop().velocity({
                    opacity: 1,
                    translateY: this.TRANSLATE_Y
                }, 0);
                this.$unit.stop().velocity({
                    translateY: 0
                }, {
                    duration: this.OPEN_SPEED - this.OPEN_SPEED_DIFF,
                    easing: "easeOutExpo"
                });
                this.$bg.stop().velocity({
                    opacity: 1,
                    translateY: this.TRANSLATE_Y
                }, 0);
                this.$bg.stop().velocity({
                    translateY: 0
                }, {
                    duration: this.OPEN_SPEED + this.OPEN_SPEED_DIFF,
                    easing: "easeOutExpo",
                    complete: (function (_this) {
                        return function () {
                            return _this.$el.css({
                                "position": "relative"
                            });
                        };
                    })(this)
                });
            };

            Modal.prototype.close = function (complete) {
                if (!this.isOpened) {
                    return;
                }
                this.isOpened = false;
                this.$el.css({
                    "position": "fixed"
                });
                this.$close.css({
                    "opacity": 0
                });
                _.delay((function (_this) {
                    return function () {
                        _this.$unit.stop().velocity({
                            opacity: 0
                        }, 100);
                        return _this.$bg.stop().velocity({
                            opacity: 0
                        }, 100);
                    };
                })(this), 150);
                _.delay((function (_this) {
                    return function () {
                        return typeof complete === "function" ? complete() : void 0;
                    };
                })(this), 250);
                this.$unit.stop().velocity({
                    translateY: this.TRANSLATE_Y
                }, {
                    duration: this.CLOSE_SPEED,
                    easing: "easeOutExpo"
                });
                this.$bg.stop().velocity({
                    translateY: this.TRANSLATE_Y
                }, {
                    duration: this.CLOSE_SPEED,
                    easing: "easeOutExpo",
                    complete: (function (_this) {
                        return function () {
                            _this.$el.css({
                                "display": "none"
                            });
                            _this.trigger("CLOSE");
                            return typeof _this.closed === "function" ? _this.closed() : void 0;
                        };
                    })(this)
                });
            };

            Modal.prototype.setMinHeight = function () {
                this.$el.css({
                    "min-height": this.w.h()
                });
                this.$unit.css({
                    "min-height": this.w.h(),
                    "height": this.w.h()
                });
            };

            Modal.prototype.resize = function () {
                this.setMinHeight();
            };

            return Modal;

        })(EO);


    }, {"../../_config": 1, "../../_helpers/EventObserver": 5, "../../_helpers/detect": 12, "../../_helpers/log": 17}],
    31: [function (require, module, exports) {
        var OneLetter, c, log, math,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        math = require("../../_helpers/math");

        module.exports = OneLetter = (function () {
            OneLetter.prototype.titles = [];

            OneLetter.prototype.isAllActived = false;

            OneLetter.prototype.PC_SCROLL_FIRE_DIFF_Y = 100;

            OneLetter.prototype.SP_SCROLL_FIRE_DIFF_Y = 30;

            function OneLetter(w, $el) {
                this.w = w;
                this.$el = $el;
                this.scrollFire = bind(this.scrollFire, this);
                this.show = bind(this.show, this);
                this.addSpanTag = bind(this.addSpanTag, this);
                this.isAllActived = false;
                this.titles = [];
                this.addSpanTag();
                return;
            }

            OneLetter.prototype.addSpanTag = function () {
                this.$el.each((function (_this) {
                    return function (i, o) {
                        var j, n, ref, spanStr, str;
                        _this.titles[i] = {};
                        _this.titles[i].id = i;
                        _this.titles[i].$el = $(o);
                        _this.titles[i].isActive = false;
                        if ($(o).attr("data-delay")) {
                            _this.titles[i].delay = $(o).attr("data-delay");
                        } else {
                            _this.titles[i].delay = 0;
                        }
                        _this.titles[i].orghtml = str = $(o).html();
                        str = str.split("<br>");
                        for (n = j = 0, ref = str.length; 0 <= ref ? j < ref : j > ref; n = 0 <= ref ? ++j : --j) {
                            spanStr = "";
                            str[n].split("").forEach(function (c) {
                                if (c === " ") {
                                    return spanStr += "<span class='space'>" + c + "</span>";
                                } else {
                                    return spanStr += "<span>" + c + "</span>";
                                }
                            });
                            _this.titles[i].html += spanStr + "<br>";
                        }
                        _this.titles[i].html = _this.titles[i].html.replace(/undefined/g, "");
                        _this.titles[i].html = _this.titles[i].html.slice(0, -4);
                        return $(o).html(_this.titles[i].html);
                    };
                })(this));
            };

            OneLetter.prototype.show = function (current) {
                var $spans;
                if (!current) {
                    current = 0;
                }
                $spans = this.titles[current].$el.find("span");
                $spans.removeClass("is-active");
                _.delay((function (_this) {
                    return function () {
                        return $spans.each(function (i, o) {
                            return _.delay(function () {
                                return $(o).addClass("is-active");
                            }, i * 60);
                        });
                    };
                })(this), this.titles[current].delay);
            };

            OneLetter.prototype.scrollFire = function () {
                var j, len, ref, title;
                if (this.isAllActived) {
                    return;
                }
                ref = this.titles;
                for (j = 0, len = ref.length; j < len; j++) {
                    title = ref[j];
                    this.isAllActived = title.isActive;
                }
                this.$el.each((function (_this) {
                    return function (i, o) {
                        var diff;
                        if (_this.titles[i].isActive) {
                            return;
                        }
                        if (detect.isPc()) {
                            diff = _this.PC_SCROLL_FIRE_DIFF_Y;
                        } else {
                            diff = _this.SP_SCROLL_FIRE_DIFF_Y;
                        }
                        if (_this.w.b() > _this.titles[i].$el.offset().top + diff) {
                            _this.show(_this.titles[i].id);
                            return _this.titles[i].isActive = true;
                        }
                    };
                })(this));
            };

            return OneLetter;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17, "../../_helpers/math": 18}],
    32: [function (require, module, exports) {
        var QuestionWaiting, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        module.exports = QuestionWaiting = (function () {
            QuestionWaiting.prototype.COMPLETE_TIME = (location.host == 'localhost:8082') ? 2 : 7000;

            QuestionWaiting.prototype.TXT_LOOP_INTERVAL = 10;

            QuestionWaiting.prototype.per = 0;

            QuestionWaiting.prototype.count = 0;

            QuestionWaiting.prototype.dotChangeLength = 0;

            function QuestionWaiting(w) {
                this.w = w;
                this.reset = bind(this.reset, this);
                this.loopDot = bind(this.loopDot, this);
                this.load = bind(this.load, this);
                this.$el = $(".js-questionWaiting");
                if (!this.$el[0]) {
                    return;
                }
                this.$dot = $(".js-questionWaiting__title_dot");
                this.$ill = $(".js-questionWaiting__ill li");
                this.$num = $(".js-questionWaitingIndicator__per_num");
                this.$line = $(".js-questionWaitingIndicator__bar_line");
                return;
            }

            QuestionWaiting.prototype.load = function (complete) {
                this.$el.addClass("active");
                this.loopDot();

                _.delay((function (_this) {
                    return function () {
                        return _this.$num.countTo(100, {
                            "duration": 5,
                        });
                    };
                })(this), 900);

                var duration = 1000;

                _.delay((function (_this) {
                    return function () {
                        _this.$ill.eq(0).addClass("active");
                    };
                })(this), 0);

                _.delay((function (_this) {
                    return function () {
                        _this.$ill.eq(0).removeClass("active");
                    };
                })(this), this.COMPLETE_TIME / 3 - duration);
                _.delay((function (_this) {
                    return function () {
                        _this.$ill.eq(1).addClass("active");
                    };
                })(this), this.COMPLETE_TIME / 3);

                _.delay((function (_this) {
                    return function () {
                        _this.$ill.eq(1).removeClass("active");
                    };
                })(this), this.COMPLETE_TIME / 3 * 2 - duration);
                _.delay((function (_this) {
                    return function () {
                        _this.$ill.eq(2).addClass("active");
                    };
                })(this), this.COMPLETE_TIME / 3 * 2);

                var self = this;
                this.$line.velocity({
                    "fontSize": "100px",
                }, {
                    duration: this.COMPLETE_TIME,
                    progress: function (elements, complete, remaining, start, tweenValue) {
                        self.$line.css("background-size", (complete * 100.0) + "% 100%");
                    },
                    complete: function () {
                        typeof complete === "function" ? complete() : void 0;
                    },
                });
            };

            QuestionWaiting.prototype.loopDot = function () {
                requestAnimFrame(this.loopDot);
                this.count++;
                if (this.count < this.TXT_LOOP_INTERVAL) {
                    return;
                }
                this.count = 0;
                if (this.dotChangeLength === 0) {
                    this.$dot.html("");
                    this.dotChangeLength = 1;
                } else if (this.dotChangeLength === 1) {
                    this.$dot.html(".");
                    this.dotChangeLength = 2;
                } else if (this.dotChangeLength === 2) {
                    this.$dot.html("..");
                    this.dotChangeLength = 3;
                } else if (this.dotChangeLength === 3) {
                    this.$dot.html("...");
                    this.dotChangeLength = 0;
                }
            };

            QuestionWaiting.prototype.reset = function () {
            };

            return QuestionWaiting;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17}],
    33: [function (require, module, exports) {
        var Modal, QuestionWaiting, Questions, QuestionsBalls, QuestionsData, QuestionsFrame, QuestionsName,
            QuestionsDamage, QuestionsNum, QuestionsRadio, QuestionsTheme, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        Modal = require("../_modules/Modal");

        QuestionsData = require("./QuestionsData");

        QuestionsNum = require("./QuestionsNum");

        QuestionsFrame = require("./QuestionsFrame");

        QuestionsRadio = require("./QuestionsRadio");

        QuestionsBalls = require("./QuestionsBalls");

        QuestionsTheme = require("./QuestionsTheme");

        QuestionsName = require("./QuestionsName");

        QuestionsDamage = require("./QuestionsDamage");

        QuestionWaiting = require("./QuestionWaiting");

        module.exports = Questions = (function () {
            function Questions(w, contents) {
                this.w = w;
                this.contents = contents;
                this.resized = bind(this.resized, this);
                this.resize = bind(this.resize, this);
                this.closed = bind(this.closed, this);
                this.submit = bind(this.submit, this);
                this.open = bind(this.open, this);
                this.onEnd = bind(this.onEnd, this);
                this.onNext = bind(this.onNext, this);
                this.$el = $(".js-questions");
                if (!this.$el[0]) {
                    return;
                }
                this.modal = new Modal(this.w, "questions", this.closed);
                this.data = new QuestionsData(this.w);
                this.num = new QuestionsNum(this.w);
                this.frame = new QuestionsFrame(this.w, this.num);
                this.radio = new QuestionsRadio(this.w, this.data);
                this.balls = new QuestionsBalls(this.w, this.data);
                this.theme = new QuestionsTheme(this.w, this.data);
                this.name = new QuestionsName(this.w, this.data);
                this.damage = new QuestionsDamage(this.w, this.data);
                this.waiting = new QuestionWaiting(this.w);
                this.$startButton = $(".js-questions__start_button");
                this.$startButton.on("click", this.open);
                this.frame.on("NEXT", this.onNext);
                this.frame.on("END", this.onEnd);

                // enterで送信しないように
                $("#question-form input").keydown(function (e) {
                    return !((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13));
                });
                return;
            }

            Questions.prototype.onNext = function () {
                this.balls.resize();
                $(window).scrollTop(0);
            };

            Questions.prototype.onEnd = function () {
                this.data.addCookie();
                this.frame.hide();
                this.num.hide();
                $(".js-modal__close.type-questions").css({
                    "display": "none"
                });

                if ($("#question-form").attr("data-waiting") === "false") {
                    this.submit();
                } else {
                    var self = this;
                    this.waiting.load((function (_this) {
                        return function () {
                            self.submit();
                        };
                    })(this));
                }
            };

            Questions.prototype.submit = function () {
                this.name.enter();
                $("#question-form").submit();
            };

            Questions.prototype.open = function () {
                this.modal.open();
                this.contents.toFixed();
                this.frame.to(0);
                this.balls.resize();
            };

            Questions.prototype.closed = function () {
                this.contents.toRelative();
                this.frame.to(0);
                this.balls.reset();
                this.name.reset();
                this.theme.init();
            };

            Questions.prototype.resize = function () {
                this.modal.resize();
                this.balls.resize();
            };

            Questions.prototype.resized = function () {
            };

            return Questions;

        })();


    }, {
        "../../_config": 1,
        "../../_helpers/log": 17,
        "../_modules/Modal": 30,
        "./QuestionWaiting": 32,
        "./QuestionsBalls": 34,
        "./QuestionsData": 36,
        "./QuestionsFrame": 37,
        "./QuestionsName": 38,
        "./QuestionsDamage": 49,
        "./QuestionsNum": 39,
        "./QuestionsRadio": 40,
        "./QuestionsTheme": 41
    }],
    34: [function (require, module, exports) {
        var QuestionsBalls, QuestionsBallsCircle, c, cj, log, math,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        math = require("../../_helpers/math");

        cj = require("../../_helpers/createjs");

        QuestionsBallsCircle = require("./QuestionsBallsCircle");

        module.exports = QuestionsBalls = (function () {
            QuestionsBalls.prototype.SIZE = 75;

            QuestionsBalls.prototype.stage = null;

            QuestionsBalls.prototype.stageW = null;

            QuestionsBalls.prototype.stageH = null;

            QuestionsBalls.prototype.select1 = null;

            QuestionsBalls.prototype.select2 = null;

            QuestionsBalls.prototype.select3 = null;

            QuestionsBalls.prototype.collection = [];

            QuestionsBalls.prototype.selectedCurrent = 0;

            // ==> balls
            // QuestionsBalls.prototype.name = [
            //     {
            //         label: "つやつや",
            //         slug: "glossy"
            //     }, {
            //         label: "まとまり",
            //         slug: "clump"
            //     }, {
            //         label: "しっとり",
            //         slug: "moist"
            //     }, {
            //         label: "やわらか",
            //         slug: "soft"
            //     }, {
            //         label: "ふんわり",
            //         slug: "fluffy"
            //     }, {
            //         label: "さらさら",
            //         slug: "smooth"
            //     }, {
            //         label: "しなやか",
            //         slug: "limber"
            //     }, {
            //         label: "うるおい",
            //         slug: "moisture"
            //     }, {
            //         label: "ハリコシ",
            //         slug: "elasticity"
            //     }
            // ];

            function QuestionsBalls(w, data) {
                this.w = w;
                this.data = data;
                this.resize = bind(this.resize, this);
                this.getBalls = bind(this.getBalls, this);
                this.collisionCheck = bind(this.collisionCheck, this);
                this.velocity = bind(this.velocity, this);
                this.render = bind(this.render, this);
                this.generate = bind(this.generate, this);
                this.isAllSelected = bind(this.isAllSelected, this);
                this.onclick = bind(this.onclick, this);
                this.reset = bind(this.reset, this);
                this.onmouseout = bind(this.onmouseout, this);
                this.onmouseover = bind(this.onmouseover, this);
                this.setCurrentCaption = bind(this.setCurrentCaption, this);
                this.checkRadio = bind(this.checkRadio, this);
                this.canNext = bind(this.canNext, this);
                this.disabledNext = bind(this.disabledNext, this);
                this.name = this.getBalls();
                this.total = this.name.length;
                this.id = "cvs-questionsBalls";
                this.$el = $(".js-questionsForm__canvas");
                if (!this.$el[0]) {
                    return;
                }
                this.$captions = $(".js-questionsForm__captions li");
                this.$reset = $(".js-questionsForm__reset");
                this.$next = $("#question-form-ideal .js-questionsFrame__next");
                if (!this.$next[0]) {
                    this.$next = $("#feedback-form-ideal .js-questionsFrame__next");
                }
                this.$reset.on("click", this.reset);
                this.browserX = window.screenX;
                this.browserY = window.screenY;
                this.stage = cj.createStage(this.id);
                this.stage.enableMouseOver();
                this.resize();
                this.generate();
                this.disabledNext();
                cj.addTicker(this.render);
                return;
            }

            QuestionsBalls.prototype.getBalls = function () {
                var balls = [];

                var $elements = $(".js-questionsForm__captions li");
                $elements.each((i, element) => {
                    var $element = $(element);

                    if ($element.attr("data-ideal-id")) {
                        balls.push({
                            label: $element.attr("data-ideal-label"),
                            slug: $element.attr("data-ideal-id"),
                        });
                    }
                });

                return balls;
            };

            QuestionsBalls.prototype.disabledNext = function () {
                this.$next.addClass("type-disabled");
            };

            QuestionsBalls.prototype.canNext = function () {
                this.$next.removeClass("type-disabled");
            };

            QuestionsBalls.prototype.setCurrentCaption = function (slug) {
                this.$captions.each((function (_this) {
                    return function (i, o) {
                        $(o).removeClass("active-sp");
                        if (slug === $(o).attr("data-ideal-id")) {
                            return $(o).addClass("active-sp");
                        }
                    };
                })(this));
            };

            QuestionsBalls.prototype.onmouseover = function (target) {
                var _isSlug;
                _isSlug = target.name.slug;
                this.$captions.removeClass("active");
                this.$captions.each((function (_this) {
                    return function (i, o) {
                        if (_isSlug === $(o).attr("data-ideal-id")) {
                            return $(o).addClass("active");
                        }
                    };
                })(this));
            };

            QuestionsBalls.prototype.onmouseout = function (target) {
                this.$captions.removeClass("active");
                this.$captions.each((function (_this) {
                    return function (i, o) {
                        if ($(o).hasClass("default")) {
                            return $(o).addClass("active");
                        }
                    };
                })(this));
            };

            QuestionsBalls.prototype.reset = function () {
                var i, k, ref;
                for (i = k = 0, ref = this.collection.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
                    this.collection[i].deselect();
                }
                this.disabledNext();
                this.select1 = null;
                this.select2 = null;
                this.select3 = null;
                this.data.set("ideal1st", void 0);
                this.data.set("ideal2nd", void 0);
                this.data.set("ideal3rd", void 0);
                this.selectedCurrent = 0;
                this.$captions.removeClass("active-sp");
                this.$captions.each((function (_this) {
                    return function (i, o) {
                        if ($(o).hasClass("default")) {
                            return $(o).addClass("active-sp");
                        }
                    };
                })(this));
            };

            QuestionsBalls.prototype.onclick = function (target) {
                var _len, _slug;
                log.trace("QuestionsBalls.selected =>", target.index, target.name);
                _slug = target.name.slug;
                _len = target.index - 1;
                if (this.selectedCurrent >= 3) {
                    return;
                }
                if (this.selectedCurrent === 0) {
                    this.select1 = _slug;
                    this.setCurrentCaption(_slug);
                    this.collection[_len].zoom1();
                    this.data.set("ideal1st", this.select1);
                    this.selectedCurrent = 1;
                    this.checkRadio(0, _slug);
                } else if (this.selectedCurrent === 1) {
                    this.select2 = _slug;
                    this.setCurrentCaption(_slug);
                    if (this.select2 === this.select1) {
                        return;
                    }
                    this.collection[_len].zoom2();
                    this.data.set("ideal2nd", this.select2);
                    this.selectedCurrent = 2;
                    this.checkRadio(1, _slug);
                } else if (this.selectedCurrent === 2) {
                    this.select3 = _slug;
                    this.setCurrentCaption(_slug);
                    if (this.select3 === this.select1) {
                        return;
                    }
                    if (this.select3 === this.select2) {
                        return;
                    }
                    this.collection[_len].zoom3();
                    this.data.set("ideal3rd", this.select3);
                    this.selectedCurrent = 3;
                    this.checkRadio(2, _slug);
                    this.isAllSelected();
                }
                log.trace("ideal1st: " + this.select1 + ", ideal2nd: " + this.select2 + ", ideal3rd: " + this.select3);
            };

            QuestionsBalls.prototype.checkRadio = function (idealIndex, idealId) {
                var $radios = $(".js-quiz-ideal-radio-container[data-ideal-index=" + idealIndex + "] > input");

                $radios.each(function (i, radio) {
                    var $radio = $(radio);
                    var checked = $radio.attr("data-ideal-id") == idealId;
                    $radio.prop("checked", checked);
                });
            };

            QuestionsBalls.prototype.isAllSelected = function () {
                var i, k, ref;
                for (i = k = 0, ref = this.collection.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
                    this.collection[i].cantSelect();
                }
                this.canNext();
            };

            QuestionsBalls.prototype.generate = function () {
                var _ball, i;
                i = 0;
                while (i < this.total) {
                    _ball = {};
                    _ball.index = i + 1;
                    _ball.stage = this.stage;
                    _ball.name = this.name[i];
                    _ball.bounce = .5 + Math.random() * .5;
                    _ball.size = this.SIZE - (_ball.bounce * 25);
                    _ball.vx = Math.random() * 50 - 25;
                    _ball.vy = Math.random() * 50 - 25;
                    _ball.x = Math.random() * this.stageW;
                    _ball.y = Math.random() * this.stageH;
                    this.collection[this.collection.length] = new QuestionsBallsCircle(this.w, _ball);
                    this.collection[i].on("CLICK", this.onclick);
                    this.collection[i].on("MOUSEOVER", this.onmouseover);
                    this.collection[i].on("MOUSEOUT", this.onmouseout);
                    i++;
                }
            };

            QuestionsBalls.prototype.render = function () {
                var _diffX, _diffY, _isChange, j;
                _isChange = this.browserX !== window.screenX || this.browserY !== window.screenY;
                if (_isChange) {
                    _diffX = this.browserX - window.screenX;
                    _diffY = this.browserY - window.screenY;
                    this.browserX = window.screenX;
                    this.browserY = window.screenY;
                }
                j = this.collection.length;
                while (--j > -1) {
                    this.velocity(this.collection[j]);
                    if (_isChange) {
                        this.collection[j].vx += _diffX * .05;
                        this.collection[j].vy += _diffY * .1;
                    }
                    this.collection[j].draw();
                }
                this.stage.update();
            };

            QuestionsBalls.prototype.velocity = function (ball) {
                var _drag, _gravity;
                this.collisionCheck();
                _gravity = .1;
                _drag = .98;
                ball.x += ball.vx;
                ball.y += ball.vy;
                if (ball.x + ball.size > this.stageW) {
                    ball.x = this.stageW - ball.size;
                    ball.vx = -ball.vx * ball.bounce;
                } else if (ball.x - ball.size < 0) {
                    ball.x = 0 + ball.size;
                    ball.vx = -ball.vx * ball.bounce;
                }
                if (ball.y + ball.size > this.stageH) {
                    ball.y = this.stageH - ball.size;
                    ball.vy = -ball.vy * ball.bounce;
                } else if (ball.y - ball.size < 0) {
                    ball.y = 0 + ball.size;
                    ball.vy = -ball.vy * ball.bounce;
                }
                ball.vx = ball.vx * _drag;
                ball.vy = ball.vy * _drag + _gravity;
            };

            QuestionsBalls.prototype.collisionCheck = function () {
                var _ax, _ay, _ball0, _ball1, _dist, _dx, _dy, _i, _j, _minDist, _spring, _tx, _ty, angle;
                _spring = .1;
                _i = 0;
                while (_i < this.total - 1) {
                    _ball0 = this.collection[_i];
                    _j = _i + 1;
                    while (_j < this.total) {
                        _ball1 = this.collection[_j];
                        _dx = _ball1.x - _ball0.x;
                        _dy = _ball1.y - _ball0.y;
                        _dist = Math.sqrt(_dx * _dx + _dy * _dy);
                        _minDist = _ball0.size + _ball1.size;
                        if (_dist < _minDist) {
                            angle = Math.atan2(_dy, _dx);
                            _tx = _ball0.x + _dx / _dist * _minDist;
                            _ty = _ball0.y + _dy / _dist * _minDist;
                            _ax = _tx - _ball1.x;
                            _ay = _ty - _ball1.y;
                            _ball0.x -= _ax;
                            _ball0.y -= _ay;
                            _ball1.x += _ax;
                            _ball1.y += _ay;
                            _ball0.vx -= _ax * _spring;
                            _ball0.vy -= _ay * _spring;
                            _ball1.vx += _ax * _spring;
                            _ball1.vy += _ay * _spring;
                        }
                        ++_j;
                    }
                    ++_i;
                }
            };

            QuestionsBalls.prototype.resize = function () {
                var i, k, ref;
                if (!this.$el[0]) {
                    return;
                }
                this.stage.canvas.width = 0;
                this.stage.canvas.height = 0;
                this.stageW = this.stage.canvas.width = this.$el.width();
                this.stageH = this.stage.canvas.height = this.$el.height();
                for (i = k = 0, ref = this.collection.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
                    this.collection[i].resize();
                }
                this.stage.update();
            };

            return QuestionsBalls;

        })();


    }, {
        "../../_config": 1,
        "../../_helpers/createjs": 11,
        "../../_helpers/log": 17,
        "../../_helpers/math": 18,
        "./QuestionsBallsCircle": 35
    }],
    35: [function (require, module, exports) {
        var EO, QuestionsBallsCircle, c, cj, log, math,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            },
            extend = function (child, parent) {
                for (var key in parent) {
                    if (hasProp.call(parent, key)) child[key] = parent[key];
                }

                function ctor() {
                    this.constructor = child;
                }

                ctor.prototype = parent.prototype;
                child.prototype = new ctor();
                child.__super__ = parent.prototype;
                return child;
            },
            hasProp = {}.hasOwnProperty;

        c = require("../../_config");

        log = require("../../_helpers/log");

        EO = require("../../_helpers/EventObserver");

        math = require("../../_helpers/math");

        cj = require("../../_helpers/createjs");

        module.exports = QuestionsBallsCircle = (function (superClass) {
            extend(QuestionsBallsCircle, superClass);

            QuestionsBallsCircle.prototype.PADDING = 1;

            QuestionsBallsCircle.prototype.SP_SCALE = 0.57;

            QuestionsBallsCircle.prototype.ZOOM_SIZE1 = 50;

            QuestionsBallsCircle.prototype.ZOOM_SIZE2 = 25;

            QuestionsBallsCircle.prototype.ZOOM_SIZE3 = 10;

            QuestionsBallsCircle.prototype.isZoom1 = false;

            QuestionsBallsCircle.prototype.isZoom2 = false;

            QuestionsBallsCircle.prototype.isZoom3 = false;

            QuestionsBallsCircle.prototype.labelFontStylePC = "bold 14px sans-serif";

            QuestionsBallsCircle.prototype.labelFontStyleSP = "bold 10px sans-serif";

            QuestionsBallsCircle.prototype.num1FontStylePC = "bold 200px Montserrat";

            QuestionsBallsCircle.prototype.num1FontStyleSP = "bold 100px Montserrat";

            QuestionsBallsCircle.prototype.num2FontStylePC = "bold 130px Montserrat";

            QuestionsBallsCircle.prototype.num2FontStyleSP = "bold 75px Montserrat";

            QuestionsBallsCircle.prototype.num3FontStylePC = "bold 100px Montserrat";

            QuestionsBallsCircle.prototype.num3FontStyleSP = "bold 50px Montserrat";

            function QuestionsBallsCircle(w, args) {
                this.w = w;
                this.onmouseout = bind(this.onmouseout, this);
                this.onmouseover = bind(this.onmouseover, this);
                this.onclick = bind(this.onclick, this);
                this.setTextPos = bind(this.setTextPos, this);
                this.drawBall = bind(this.drawBall, this);
                this.draw = bind(this.draw, this);
                this.resize = bind(this.resize, this);
                this.zoom3 = bind(this.zoom3, this);
                this.zoom2 = bind(this.zoom2, this);
                this.zoom1 = bind(this.zoom1, this);
                this.cantSelect = bind(this.cantSelect, this);
                this.deselect = bind(this.deselect, this);
                this.index = args.index || this.index;
                this.stage = args.stage || this.stage;
                this.name = args.name || this.name;
                this.bounce = args.bounce || this.bounce;
                this.size = args.size || this.size;
                this.vx = args.vx || this.vx;
                this.vy = args.vy || this.vy;
                this.x = args.x || this.x;
                this.y = args.y || this.y;
                this.orgSize = this.size;
                this.fillBase = new createjs.Shape();
                this.fillBase.cursor = "pointer";
                this.fillBaseG = this.fillBase.graphics;
                this.stage.addChild(this.fillBase);
                this.select1 = new createjs.Container();
                this.fillNum1 = new createjs.Shape();
                this.fillNum1G = this.fillNum1.graphics;
                this.textNum1 = new createjs.Text("1", this.num1FontStylePC, "white");
                this.select1.alpha = 0;
                this.select1.addChild(this.fillNum1);
                this.select1.addChild(this.textNum1);
                this.stage.addChild(this.select1);
                this.select2 = new createjs.Container();
                this.fillNum2 = new createjs.Shape();
                this.fillNum2G = this.fillNum2.graphics;
                this.textNum2 = new createjs.Text("2", this.num2FontStylePC, "white");
                this.select2.alpha = 0;
                this.select2.addChild(this.fillNum2);
                this.select2.addChild(this.textNum2);
                this.stage.addChild(this.select2);
                this.select3 = new createjs.Container();
                this.fillNum3 = new createjs.Shape();
                this.fillNum3G = this.fillNum3.graphics;
                this.textNum3 = new createjs.Text("3", this.num3FontStylePC, "white");
                this.select3.alpha = 0;
                this.select3.addChild(this.fillNum3);
                this.select3.addChild(this.textNum3);
                this.stage.addChild(this.select3);
                this.hover = new createjs.Container();
                this.fillHover = new createjs.Shape();
                this.fillHoverG = this.fillHover.graphics;
                this.fillHover.alpha = 0;
                this.hover.addChild(this.fillHover);
                this.stage.addChild(this.hover);
                this.label = new createjs.Text(this.name.label, this.labelFontStylePC, "#3e3c3a");
                this.stage.addChild(this.label);
                this.fillBase.addEventListener("mouseover", this.onmouseover);
                this.fillBase.addEventListener("mouseout", this.onmouseout);
                this.fillBase.addEventListener("click", this.onclick);
                return;
            }

            QuestionsBallsCircle.prototype.deselect = function () {
                this.isZoom1 = false;
                this.isZoom2 = false;
                this.isZoom3 = false;
                this.resize();
                this.hover.alpha = 1;
                this.fillBase.cursor = "pointer";
                createjs.Tween.get(this.select1).to({
                    alpha: 0
                }, 0);
                createjs.Tween.get(this.select2).to({
                    alpha: 0
                }, 0);
                createjs.Tween.get(this.select3).to({
                    alpha: 0
                }, 0);
            };

            QuestionsBallsCircle.prototype.cantSelect = function () {
                this.hover.alpha = 0;
                this.fillBase.cursor = "default";
            };

            QuestionsBallsCircle.prototype.zoom1 = function () {
                this.isZoom1 = true;
                this.resize();
                this.cantSelect();
                createjs.Tween.get(this.select1).to({
                    alpha: 1
                }, 100);
            };

            QuestionsBallsCircle.prototype.zoom2 = function () {
                this.isZoom2 = true;
                this.resize();
                this.cantSelect();
                createjs.Tween.get(this.select2).to({
                    alpha: 1
                }, 100);
            };

            QuestionsBallsCircle.prototype.zoom3 = function () {
                this.isZoom3 = true;
                this.resize();
                this.cantSelect();
                createjs.Tween.get(this.select3).to({
                    alpha: 1
                }, 100);
            };

            QuestionsBallsCircle.prototype.resize = function () {
                if (this.w.isMobileW()) {
                    if (this.isZoom1) {
                        this.size = (this.orgSize + this.ZOOM_SIZE1) * this.SP_SCALE;
                    } else if (this.isZoom2) {
                        this.size = (this.orgSize + this.ZOOM_SIZE2) * this.SP_SCALE;
                    } else if (this.isZoom3) {
                        this.size = (this.orgSize + this.ZOOM_SIZE3) * this.SP_SCALE;
                    } else {
                        this.size = this.orgSize * this.SP_SCALE;
                    }
                    this.label.font = this.labelFontStyleSP;
                    this.textNum1.font = this.num1FontStyleSP;
                    this.textNum2.font = this.num2FontStyleSP;
                    this.textNum3.font = this.num3FontStyleSP;
                } else {
                    if (this.isZoom1) {
                        this.size = this.orgSize + this.ZOOM_SIZE1;
                    } else if (this.isZoom2) {
                        this.size = this.orgSize + this.ZOOM_SIZE2;
                    } else if (this.isZoom3) {
                        this.size = this.orgSize + this.ZOOM_SIZE3;
                    } else {
                        this.size = this.orgSize;
                    }
                    this.label.font = this.labelFontStylePC;
                    this.textNum1.font = this.num1FontStylePC;
                    this.textNum2.font = this.num2FontStylePC;
                    this.textNum3.font = this.num3FontStylePC;
                }
            };

            QuestionsBallsCircle.prototype.draw = function () {
                this.drawBall(this.fillBaseG, "#c1c1c1", "white");
                this.drawBall(this.fillNum1G, "#c6c7cf", "#c6c7cf");
                this.drawBall(this.fillNum2G, "#c6c7cf", "#c6c7cf");
                this.drawBall(this.fillNum3G, "#c6c7cf", "#c6c7cf");
                this.drawBall(this.fillHoverG, "#3e3c3a");
                this.setTextPos(this.textNum1, 35, -5, 14, 0);
                this.setTextPos(this.textNum2, 37, -3, 18, -2);
                this.setTextPos(this.textNum3, 27, -6, 13, -5);
                this.setTextPos(this.label, 27, 0, 6, 1);
            };

            QuestionsBallsCircle.prototype.drawBall = function (shape, strokeColor, fillColor) {
                shape.clear();
                shape.setStrokeStyle(1);
                shape.beginStroke(strokeColor);
                if (fillColor) {
                    shape.beginFill(fillColor);
                }
                shape.drawCircle(this.x, this.y, this.size - this.PADDING);
            };

            QuestionsBallsCircle.prototype.setTextPos = function (text, negativeMarginLeft, negativeMarginTop, sp_diffX, sp_diffY) {
                if (!this.w.isMobileW()) {
                    sp_diffX = 0;
                    sp_diffY = 0;
                }
                text.x = Math.floor(this.x - negativeMarginLeft + sp_diffX);
                text.y = Math.floor(this.y - negativeMarginTop + sp_diffY);
                text.textBaseline = "middle";
            };

            QuestionsBallsCircle.prototype.onclick = function () {
                this.trigger("CLICK", this);
            };

            QuestionsBallsCircle.prototype.onmouseover = function () {
                this.trigger("MOUSEOVER", this);
                createjs.Tween.get(this.fillHover).to({
                    alpha: 1
                }, 100);
            };

            QuestionsBallsCircle.prototype.onmouseout = function () {
                this.trigger("MOUSEOUT", this);
                createjs.Tween.get(this.fillHover).to({
                    alpha: 0
                }, 100);
            };

            return QuestionsBallsCircle;

        })(EO);


    }, {
        "../../_config": 1,
        "../../_helpers/EventObserver": 5,
        "../../_helpers/createjs": 11,
        "../../_helpers/log": 17,
        "../../_helpers/math": 18
    }],
    36: [function (require, module, exports) {
        var QuestionsData, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        module.exports = QuestionsData = (function () {
            QuestionsData.prototype.table = {};

            function QuestionsData(w) {
                this.w = w;
                this.addCookie = bind(this.addCookie, this);
                this.set = bind(this.set, this);
                return;
            }

            QuestionsData.prototype.set = function (key, val) {
                this.table[key] = val;
            };

            QuestionsData.prototype.get = function (key) {
                return this.table[key];
            };

            QuestionsData.prototype.addCookie = function () {
                // var key, ref, val;
                // var now = new Date();
                // ref = this.table;
                // var siteDomain = (document.domain == 'medulla.co.jp') ? 'medulla.co.jp' : 'localhost';
                // for (key in ref) {
                //     val = ref[key];
                //     $.cookie(key, val, {path: "/", domain: siteDomain});
                //     // $.cookie(key, val);
                //     console.log(key);
                //     console.log(val);
                // }
                // log.trace("QuestionsData.addCookie", this.table);
            };

            return QuestionsData;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17}],
    37: [function (require, module, exports) {
        var EO, OneLetter, QuestionsFrame, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            },
            extend = function (child, parent) {
                for (var key in parent) {
                    if (hasProp.call(parent, key)) child[key] = parent[key];
                }

                function ctor() {
                    this.constructor = child;
                }

                ctor.prototype = parent.prototype;
                child.prototype = new ctor();
                child.__super__ = parent.prototype;
                return child;
            },
            hasProp = {}.hasOwnProperty;

        c = require("../../_config");

        log = require("../../_helpers/log");

        EO = require("../../_helpers/EventObserver");

        OneLetter = require("../_modules/OneLetter");

        module.exports = QuestionsFrame = (function (superClass) {
            extend(QuestionsFrame, superClass);

            QuestionsFrame.prototype.item = [];

            QuestionsFrame.prototype.numCurrent = 0;

            QuestionsFrame.prototype.numNext = 1;

            QuestionsFrame.prototype.numTotal = null;

            QuestionsFrame.prototype.HIDE_SCALE = 0.8;

            QuestionsFrame.prototype.startNo = 0;

            function QuestionsFrame(w, num) {
                this.w = w;
                this.num = num;
                this.resize = bind(this.resize, this);
                this.next = bind(this.next, this);
                this.to = bind(this.to, this);
                this.end = bind(this.end, this);
                this.setNum = bind(this.setNum, this);
                this.hide = bind(this.hide, this);
                this.setStartNo = bind(this.setStartNo, this);
                this.$el = $(".js-questionsFrame");
                if (!this.$el[0]) {
                    return;
                }
                this.$el.each((function (_this) {
                    return function (i, o) {
                        _this.item[i] = {};
                        _this.item[i].$el = $(o);
                        _this.item[i].$title = $(o).find(".js-questionsFrame__heading_title");
                        _this.item[i].title = new OneLetter(_this.w, _this.item[i].$title);
                        _this.item[i].$next = $(o).find(".js-questionsFrame__next");
                        _this.item[i].$next.on("click", _this.next);
                        _this.item[i].$back = $(o).find(".js-questionsFrame__back");
                        _this.item[i].$back.on("click", _this.next);
                        return _this.numTotal++;
                    };
                })(this));
                return;
            }

            QuestionsFrame.prototype.hide = function () {
                this.$el.removeClass("active");
            };

            QuestionsFrame.prototype.setNum = function ($ect) {
                this.numCurrent = Number($ect.attr("data-current"));
                this.numNext = Number($ect.attr("data-next"));
                log.trace("QuestionsFrame.setNum => @numCurrent:" + this.numCurrent + ", @numNext:" + this.numNext);
            };

            QuestionsFrame.prototype.to = function (current) {
                var i, j, ref;
                this.numCurrent = Number(current);
                this.numNext = Number(current) + 1;
                this.num.init(current);
                for (i = j = 0, ref = this.numTotal; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
                    this.item[i].$el.velocity({
                        scale: this.HIDE_SCALE,
                        opacity: 0
                    }, 0);
                    this.item[i].$el.removeClass("active");
                }
                this.item[current].$el.velocity({
                    scale: 1,
                    opacity: 1
                }, 0);
                this.item[current].$el.addClass("active");
                this.item[current].title.show();

                if (this.numCurrent === this.startNo) {
                    this.item[current].$back.css("display", "none");
                } else {
                    this.item[current].$back.css("display", "inline-block");
                }


            };

            QuestionsFrame.prototype.end = function () {
                this.numNext = this.numTotal;
                this.trigger("END", this);
            };

            QuestionsFrame.prototype.next = function (ev) {
                var $c, $ect, $n;
                $ect = $(ev.currentTarget);
                if ($ect.hasClass("type-disabled")) {
                    return;
                }
                this.setNum($ect);
                if (this.numNext === this.numTotal) {
                    this.trigger("END", this);
                    return;
                }
                this.num.next(this.numNext);
                $c = this.item[this.numCurrent].$el;
                $n = this.item[this.numNext].$el;

                if ($(ev.currentTarget).hasClass("js-questionsFrame__next")) {
                    $n.find(".js-questionsFrame__back").attr("data-next", this.numCurrent);
                }

                $c.stop().velocity({
                    opacity: 0
                }, 100);
                $c.stop().velocity({
                    scale: this.HIDE_SCALE
                }, 300, "easeOutExpo", (function (_this) {
                    return function () {
                        $c.removeClass("active");
                        $n.addClass("active");
                        $n.stop().velocity({
                            opacity: 1
                        }, 400);
                        $n.stop().velocity({
                            scale: 1
                        }, 500, "easeOutExpo");
                        _this.item[_this.numNext].title.show();
                        return _this.trigger("NEXT", _this);
                    };
                })(this));
            };

            QuestionsFrame.prototype.resize = function () {
            };

            QuestionsFrame.prototype.setStartNo = function (no) {
                this.startNo = Number(no);
            };

            return QuestionsFrame;

        })(EO);


    }, {"../../_config": 1, "../../_helpers/EventObserver": 5, "../../_helpers/log": 17, "../_modules/OneLetter": 31}],
    38: [function (require, module, exports) {
        var QuestionsName, c, chara, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        chara = require("../../_helpers/chara");

        module.exports = QuestionsName = (function () {
            function QuestionsName(w, data) {
                this.w = w;
                this.data = data;
                this.canNext = bind(this.canNext, this);
                this.disabledNext = bind(this.disabledNext, this);
                this.reset = bind(this.reset, this);
                this.enter = bind(this.enter, this);
                this.checkUseStrings = bind(this.checkUseStrings, this);
                this.$el = $(".js-questionsName");
                if (!this.$el[0]) {
                    return;
                }
                this.$next = $("#question-form-name .js-questionsFrame__next");
                this.$el.on("input", this.checkUseStrings);
                this.reset();
                return;
            }

            QuestionsName.prototype.checkUseStrings = function (ev) {
                var str;
                str = $(ev.currentTarget).val();
                if (str.length > 0 && chara.isAlphabetic(str)) {
                    this.canNext(str);
                } else {
                    this.disabledNext();
                }
            };

            QuestionsName.prototype.reset = function () {
                this.$el.val("");
                this.$next.addClass("type-disabled");
                this.$el.removeClass("is-red");
                this.data.set("nickname", void 0);
            };

            QuestionsName.prototype.disabledNext = function () {
                this.$next.addClass("type-disabled");
                this.$el.addClass("is-red");
            };

            QuestionsName.prototype.canNext = function (str) {
                this.$next.removeClass("type-disabled");
                this.$el.removeClass("is-red");
                this.data.set("nickname", str);
            };

            QuestionsName.prototype.enter = function () {
                this.$el.val(this.data.get("nickname"));
            };

            return QuestionsName;

        })();


    }, {"../../_config": 1, "../../_helpers/chara": 9, "../../_helpers/log": 17}],
    39: [function (require, module, exports) {
        var QuestionsNum, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        module.exports = QuestionsNum = (function () {
            function QuestionsNum(w) {
                this.w = w;
                this.hide = bind(this.hide, this);
                this.next = bind(this.next, this);
                this.init = bind(this.init, this);
                this.format = bind(this.format, this);
                this.$el = $(".js-questionsNum");
                this.$current = $(".js-questionsNum__current");
                return;
            }

            QuestionsNum.prototype.init = function (i) {
                this.$current.html(this.format(1));
                this.$current.velocity({
                    rotateX: 0
                }, 0);
            };

            QuestionsNum.prototype.format = function (i) {
                return ('00' + Number(i)).slice(-2);
            }

            QuestionsNum.prototype.next = function (i) {
                this.$current.velocity({
                    rotateX: 90
                }, 400, (function (_this) {
                    return function () {
                        _this.$current.html(_this.format(Number(i) + 1));
                        return _this.$current.velocity({
                            rotateX: 0
                        }, 400);
                    };
                })(this));
            };

            QuestionsNum.prototype.hide = function () {
                this.$el.css({
                    "display": "none"
                });
            };

            return QuestionsNum;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17}],
    40: [function (require, module, exports) {
        var QuestionsRadio, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        module.exports = QuestionsRadio = (function () {
            QuestionsRadio.prototype.items = [];

            function QuestionsRadio(w, data) {
                this.w = w;
                this.data = data;
                this.setData = bind(this.setData, this);
                this.init = bind(this.init, this);
                this.$el = $(".js-questionsRadio");
                this.init();
                return;
            }

            QuestionsRadio.prototype.init = function () {
                this.$el.each((function (_this) {
                    return function (i, o) {
                        var $default;
                        _this.items[i] = {};
                        _this.items[i].name = $(o).find("input:radio").eq(0).attr("name");
                        _this.items[i].$input = $(o).find("input[name='" + _this.items[i].name + "']:radio");
                        _this.items[i].$input.change(function (ev) {
                            _this.items[i].selected = ev.currentTarget.id;
                            return _this.setData(_this.items[i].name, _this.items[i].selected);
                        });
                        $default = $(o).find("input:checked");
                        return _this.setData($default.attr("name"), $default.attr("id"));
                    };
                })(this));
            };

            QuestionsRadio.prototype.setData = function (name, val) {
                log.trace("QuestionsRadio.setData =>", name + "=" + val);
                this.data.set(name, val);
            };

            return QuestionsRadio;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17}],
    41: [function (require, module, exports) {
        var QuestionsTheme, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        module.exports = QuestionsTheme = (function () {
            QuestionsTheme.prototype.selected = null;

            function QuestionsTheme(w, data) {
                this.w = w;
                this.data = data;
                this.clear = bind(this.clear, this);
                this.setCurrent = bind(this.setCurrent, this);
                this.init = bind(this.init, this);
                this.$el = $(".js-questionsTheme");
                if (!this.$el[0]) {
                    return;
                }
                this.$focus = $(".js-questionsTheme__focus li");
                this.$buttons = $(".js-questionsTheme__buttons li");
                this.$buttons.each((function (_this) {
                    return function (i, o) {
                        return $(o).on("click", function (ev) {
                            return _this.setCurrent(ev, i);
                        });
                    };
                })(this));
                this.$inputs = $(".js-questionsTheme__buttons li input");
                this.init();
                return;
            }

            QuestionsTheme.prototype.init = function () {
                this.clear();

                var selectedIndex = 0;

                var value = this.$el.attr("data-value");
                if (value) {
                    var $input = $(".js-questionsTheme__buttons li input[value=" + value + "]");
                    if ($input[0]) {
                        selectedIndex = this.$inputs.index($input[0]);
                    }
                }

                this.$focus.eq(selectedIndex).addClass("active");
                this.$buttons.eq(selectedIndex).addClass("active");
                this.$inputs.eq(selectedIndex).prop("checked", true);
                this.selected = this.$buttons.eq(selectedIndex).attr("data-theme");

                this.data.set("theme", this.selected);
            };

            QuestionsTheme.prototype.setCurrent = function (ev, i) {
                this.clear();
                this.$focus.eq(i).addClass("active");
                $(ev.currentTarget).addClass("active");
                this.$inputs.eq(i).prop("checked", true)
                this.selected = $(ev.currentTarget).attr("data-theme");
                this.data.set("theme", this.selected);
            };

            QuestionsTheme.prototype.clear = function (ev, i) {
                this.$focus.removeClass("active");
                this.$buttons.removeClass("active");
                this.$inputs.each(function () {
                    $(this).prop("checked", false);
                });
            };

            return QuestionsTheme;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17}],
    42: [function (require, module, exports) {
        var Fv, FvCarousel, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        FvCarousel = require("./FvCarousel");

        module.exports = Fv = (function () {
            function Fv(w) {
                this.w = w;
                this.resize = bind(this.resize, this);
                this.setHeight = bind(this.setHeight, this);
                this.$el = $(".js-fv");
                this.carousel = new FvCarousel(this.w);
                return;
            }

            Fv.prototype.setHeight = function () {
                this.$el.css({
                    "height": this.w.h()
                });
            };

            Fv.prototype.resize = function () {
                this.setHeight();
                this.carousel.setHeight();
            };

            return Fv;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17, "./FvCarousel": 43}],
    43: [function (require, module, exports) {
        var FvCarousel, c, fitImg, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        fitImg = require("../../_helpers/fitImg");

        module.exports = FvCarousel = (function () {
            FvCarousel.prototype.ZOOM_IN_SCALE = 1.2;

            function FvCarousel(w) {
                this.w = w;
                this.setHeight = bind(this.setHeight, this);
                this.init = bind(this.init, this);
                this.tickCopy = bind(this.tickCopy, this);
                this.tickSpec = bind(this.tickSpec, this);
                this.$el = $(".js-fvCarousel");
                if (!this.$el[0]) {
                    return;
                }
                this.tickCopy();
                this.tickSpec();
                return;
            }

            FvCarousel.prototype.init = function () {
                this.$el.slick({
                    dots: true,
                    fade: true,
                    accessibility: false,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    pauseOnHover: false,
                    speed: 1000,
                    cssEase: "linear"
                });
                fitImg.resize();
                log.trace("FvCarousel.init");
            };

            FvCarousel.prototype.tickCopy = function () {
                var $copy1 = $(".js-fvCarousel__li").eq(0).find(".js-fvDesc__copy1");
                var $copy2 = $(".js-fvCarousel__li").eq(0).find(".js-fvDesc__copy2");
                $copy1.css({"opacity":0});
                $copy2.css({"opacity":0});
                _.delay(function(){
                    $copy1.css({"opacity":1});
                    new LetterTicker($copy1,{ step:3 });
                }, 500);
                _.delay(function(){
                    $copy2.css({"opacity":1});
                    new LetterTicker($copy2,{ step:3 });
                }, 1000);
            };

            FvCarousel.prototype.tickSpec = function () {
                $(".js-fvDesc__tick").each(function (i, o) {
                    new LetterTicker($(o));
                });
                $(".js-fvDesc__icon").velocity({ rotateZ:180, scale:0 }, 0);
                $(".js-fvDesc__icon").velocity({ rotateZ:0, scale:1 }, { delay:500, duration:700, easing:"easeOutExpo" });
                this.$el.on("beforeChange", function(ev, slick, currentSlide, nextSlide){
                    var $slide = $(ev.currentTarget);
                    $slide.find(".js-fvDesc__tick").each(function (i, o) {
                        new LetterTicker($(o));
                    });
                    $slide.find(".js-fvDesc__icon").velocity({ rotateZ:180, scale:0 }, 0);
                    $slide.find(".js-fvDesc__icon").velocity({ rotateZ:0, scale:1 }, { delay:500, duration:700, easing:"easeOutExpo" });
                    log.trace(nextSlide);
                });
            };

            FvCarousel.prototype.setHeight = function () {
                this.$el.find(".js-fvCarousel__li").css({
                    "height": this.w.h()
                });
            };

            return FvCarousel;

        })();


    }, {"../../_config": 1, "../../_helpers/fitImg": 14, "../../_helpers/log": 17}],
    44: [function (require, module, exports) {
        var HowItWorks, c, detect, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        detect = require("../../_helpers/detect");

        module.exports = HowItWorks = (function () {
            HowItWorks.prototype.isOverlapHeader = false;

            HowItWorks.prototype.heightDiff = 0;

            HowItWorks.prototype.PC_SCROLL_FIRE_DIFF_Y = 50;

            HowItWorks.prototype.SP_SCROLL_FIRE_DIFF_Y = 30;

            function HowItWorks(w, header) {
                this.w = w;
                this.header = header;
                this.overlapHeader = bind(this.overlapHeader, this);
                this.setHeightDiff = bind(this.setHeightDiff, this);
                this.$el = $(".js-howItWorks");
                return;
            }

            HowItWorks.prototype.setHeightDiff = function () {
                if (detect.isPc()) {
                    this.heightDiff = this.PC_SCROLL_FIRE_DIFF_Y;
                } else {
                    this.heightDiff = this.SP_SCROLL_FIRE_DIFF_Y;
                }
            };

            HowItWorks.prototype.overlapHeader = function () {
                var ot;
                if (this.w.supportMixBlendMode()) {
                    return;
                }
                this.setHeightDiff();
                ot = this.$el.offset().top - this.heightDiff;
                if (this.w.t() > ot && this.w.t() < ot + this.$el.height()) {
                    if (this.isOverlapHeader) {
                        return;
                    }
                    this.header.toWhite();
                    this.isOverlapHeader = true;
                } else {
                    if (!this.isOverlapHeader) {
                        return;
                    }
                    this.header.toBlack();
                    this.isOverlapHeader = false;
                }
            };

            return HowItWorks;

        })();


    }, {"../../_config": 1, "../../_helpers/detect": 12, "../../_helpers/log": 17}],
    45: [function (require, module, exports) {
        var OneLetter, Opening, OpeningLogo, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        OneLetter = require("../_modules/OneLetter");

        OpeningLogo = require("./OpeningLogo");

        module.exports = Opening = (function () {
            function Opening(w, contents) {
                this.w = w;
                this.contents = contents;
                this.resize = bind(this.resize, this);
                this.setLogoScale = bind(this.setLogoScale, this);
                this.hide = bind(this.hide, this);
                this.animate = bind(this.animate, this);
                this.start = bind(this.start, this);
                this.$el = $(".js-opening");
                this.$lead = $(".js-opening__heading_lead");
                this.lead = new OneLetter(this.w, this.$lead);
                this.$photo = $(".js-opening__photo");
                this.$photo.velocity({
                    opacity: 0,
                    translateY: 50,
                    scale: 1.5
                }, 0);
                this.$logo = $(".js-opening__logo");
                this.svgLogo = new OpeningLogo(this.w);
                return;
            }

            Opening.prototype.start = function (complete) {
                if (c.DEBUG_OPENING_MODE) {
                    this.animate((function (_this) {
                        return function () {
                            return typeof complete === "function" ? complete() : void 0;
                        };
                    })(this));
                    return;
                }
                if ($.cookie("access") === void 0) {
                    $.cookie("access", "onece");
                    this.animate((function (_this) {
                        return function () {
                            return typeof complete === "function" ? complete() : void 0;
                        };
                    })(this));
                } else {
                    this.hide((function (_this) {
                        return function () {
                            return typeof complete === "function" ? complete() : void 0;
                        };
                    })(this));
                }
            };

            Opening.prototype.animate = function (complete) {
                this.lead.show();
                this.$photo.velocity({
                    opacity: 1,
                    translateY: 0,
                    scale: 1.0
                }, {
                    delay: 0,
                    duration: 3000,
                    easing: "easeOutSine"
                });
                _.delay((function (_this) {
                    return function () {
                        return _this.svgLogo.show(function () {
                            if (typeof complete === "function") {
                                complete();
                            }
                            return _.delay(_this.hide, 1000);
                        });
                    };
                })(this), 2500);
            };

            Opening.prototype.hide = function (complete) {
                this.contents.toRelative();
                this.$el.velocity({
                    opacity: 0
                }, 1000, (function (_this) {
                    return function () {
                        _this.$el.css({
                            "display": "none"
                        });
                        return typeof complete === "function" ? complete() : void 0;
                    };
                })(this));
            };

            Opening.prototype.setLogoScale = function () {
                var scale;
                scale = 1 - (960 / this.w.h() - 1);
                if (scale < 0.5) {
                    scale = 0.5;
                }
                this.$logo.css({
                    "transform": "scale(" + scale + ")"
                });
            };

            Opening.prototype.resize = function () {
                this.setLogoScale();
            };

            return Opening;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17, "../_modules/OneLetter": 31, "./OpeningLogo": 46}],
    46: [function (require, module, exports) {
        var OpeningLogo, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        module.exports = OpeningLogo = (function () {
            OpeningLogo.prototype.svgId = "svg-openingLogo";

            function OpeningLogo(w) {
                this.w = w;
                this.show = bind(this.show, this);
                this.$el = $(".js-openingLogo");
                this.$fix = $(".js-openingLogo__fix");
                return;
            }

            OpeningLogo.prototype.show = function (complete) {
                this.$el.css({
                    "opacity": 1
                });
                this.$fix.velocity({
                    "opacity": 1
                }, {
                    delay: 500,
                    duration: 1000
                });
                new Vivus(this.svgId, {
                    type: "delayed",
                    start: "autostart",
                    duration: 100,
                    pathTimingFunction: Vivus.EASE_IN,
                    animTimingFunction: Vivus.EASE_OUT
                }, (function (_this) {
                    return function (obj) {
                        return typeof complete === "function" ? complete() : void 0;
                    };
                })(this));
            };

            return OpeningLogo;

        })();


    }, {"../../_config": 1, "../../_helpers/log": 17}],
    47: [function (require, module, exports) {
        var StepCarousel, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        module.exports = StepCarousel = (function () {
            function StepCarousel(w) {
                this.w = w;
                this.init = bind(this.init, this);
                this.$el = $(".js-stepCarousel");
                if (!this.$el[0]) {
                    return;
                }
                return;
            }

            StepCarousel.prototype.init = function () {
                this.$el.slick({
                    dots: true,
                    accessibility: false,
                    arrows: true,
                    infinite: true,
                    autoplay: false,
                    autoplaySpeed: 6000,
                    pauseOnHover: false,
                    speed: 500
                });
                log.trace("StepCarousel.init");
            };

            return StepCarousel;

        })();

//AboutPage用↓

    }, {"../../_config": 1, "../../_helpers/log": 17}],
    48: [
        function (require, module, exports) {
            var About3Carousel, c, log,
                bind = function (fn, me) {
                    return function () {
                        return fn.apply(me, arguments);
                    };
                };

            c = require("../../_config");

            log = require("../../_helpers/log");

            module.exports = About3Carousel = (function () {
                function About3Carousel(w) {
                    this.w = w;
                    this.init = bind(this.init, this);
                    this.$el = $(".js-about3Carousel");
                    if (!this.$el[0]) {
                        return;
                    }
                    return;
                }

                About3Carousel.prototype.init = function () {
                    this.$el.slick({
                        dots: true,
                        fade: true,
                        accessibility: false,
                        arrows: false,
                        infinite: true,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        pauseOnHover: false,
                        speed: 1000
                    });
                    log.trace("About3Carousel.init");
                };

                return About3Carousel;

            })();

// AboutPage用↑

        }, {"../../_config": 1, "../../_helpers/log": 17}
    ],
    49: [function (require, module, exports) {
        var QuestionsDamage, c, chara, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        chara = require("../../_helpers/chara");

        module.exports = QuestionsDamage = (function () {
            function QuestionsDamage(w, data) {
                this.w = w;
                this.data = data;
                this.reset = bind(this.reset, this);
                this.check = bind(this.check, this);

                this.$el = $("#question-form-damage");
                if (!this.$el) {
                    return;
                }

                this.$low = $("#damage-low");
                this.$middle = $("#damage-middle");
                this.$high = $("#damage-high");
                if (!this.$low || !this.$middle || !this.$high) {
                    return;
                }

                this.$el.change(this.check);
                this.$results = $(".question-damage-result");
                this.check();
                return;
            }

            QuestionsDamage.prototype.check = function (ev) {
                var checkedCount = $("#question-form-damage input[type=checkbox]:checked").length;


                this.$results.each(function () {
                    var $result = $(this);

                    var min = parseInt($result.attr("data-damage-min"), 10);
                    var max = parseInt($result.attr("data-damage-max"), 10);

                    const $gauge = $result.children(".question-damage-result-gauge");

                    if (min <= checkedCount) {
                        const rate = max === min ? 0 : (1 - (checkedCount - min) / (max - min)) * 100;
                        const clamped = Math.min(Math.max(0, rate), 100);
                        $gauge.css("right", `${clamped}%`);
                    } else {
                        $gauge.css("right", "100%");
                    }
                });
            };

            return QuestionsDamage;

        })();

    }, {"../../_config": 1, "../../_helpers/chara": 9, "../../_helpers/log": 17}],
    50: [function (require, module, exports) {
        var Modal, QuestionWaiting, Feedback, QuestionsBalls, QuestionsData, QuestionsFrame, QuestionsName,
            QuestionsDamage, QuestionsNum, QuestionsRadio, QuestionsTheme, QuestionsStar, QuestionsYesNo,
            QuestionsSelectionFrame, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        Modal = require("../_modules/Modal");

        QuestionsData = require("./QuestionsData");

        QuestionsNum = require("./QuestionsNum");

        QuestionsFrame = require("./QuestionsFrame");

        QuestionsRadio = require("./QuestionsRadio");

        QuestionsBalls = require("./QuestionsBalls");

        QuestionsTheme = require("./QuestionsTheme");

        QuestionsName = require("./QuestionsName");

        QuestionsDamage = require("./QuestionsDamage");

        QuestionWaiting = require("./QuestionWaiting");

        QuestionsStar = require("./QuestionsStar");

        QuestionsYesNo = require("./QuestionsYesNo");

        QuestionsSelection = require("./QuestionsSelection");

        module.exports = Feedback = (function () {
            function Feedback(w, contents) {
                this.w = w;
                this.contents = contents;
                this.resized = bind(this.resized, this);
                this.resize = bind(this.resize, this);
                this.closed = bind(this.closed, this);
                this.submit = bind(this.submit, this);
                this.open = bind(this.open, this);
                this.to = bind(this.to, this);
                this.onEnd = bind(this.onEnd, this);
                this.onNext = bind(this.onNext, this);
                this.select = bind(this.select, this);
                this.$el = $(".js-questions");
                if (!this.$el[0]) {
                    return;
                }
                this.modal = new Modal(this.w, "questions", this.closed);
                this.data = new QuestionsData(this.w);
                this.num = new QuestionsNum(this.w);
                this.frame = new QuestionsFrame(this.w, this.num);
                this.radio = new QuestionsRadio(this.w, this.data);
                this.balls = new QuestionsBalls(this.w, this.data);
                this.theme = new QuestionsTheme(this.w, this.data);
                this.damage = new QuestionsDamage(this.w, this.data);
                this.star = new QuestionsStar(this.w);
                this.yesNo = new QuestionsYesNo(this.w);
                this.selection = new QuestionsSelection(this.w);
                this.$startButton = $(".js-questions__start_button > .m-roundButton");
                this.$startButton.on("click", this.open);
                this.$startButton.addClass("type-disabled");
                this.frame.on("NEXT", this.onNext);
                this.frame.on("END", this.onEnd);
                this.$selections = $("#feedback-mode-selection-container .js-questionYesNoButton");
                this.$selections.on("click", this.select);

                var value = $("#feedback-mode-selection-container").attr("data-value");
                if (value) {
                    var $selections = $("#feedback-mode-selection-container [data-value=" + value + "]");
                    if ($selections[0]) {
                        this.select({currentTarget: $selections[0]});
                    }
                }

                return;
            }

            Feedback.prototype.onNext = function () {
                this.balls.resize();
                $(window).scrollTop(0);
            };

            Feedback.prototype.onEnd = function () {
                // this.data.addCookie();
                // this.frame.hide();
                // this.num.hide();
                $(".m-roundButton").addClass("type-disabled");
                $(".m-roundButton_back").addClass("type-disabled");

                $(".js-modal__close.type-questions").css({
                    "display": "none"
                });

                this.submit();
            };

            Feedback.prototype.submit = function () {
                $("#question-form").submit();
            };

            Feedback.prototype.open = function () {
                if (this.$startButton.hasClass("type-disabled")) {
                    return;
                }

                var $selected = undefined;
                this.$selections.each(function (index, element) {
                    var $selection = $(element);
                    if ($selection.hasClass("active")) {
                        $selected = $selection;
                    }
                });

                var target = $selected.attr("data-target");
                if (target === "finish") {
                    this.to();
                    this.onEnd();
                    return;
                }

                if (target === "skip") {
                    location.href = "/mypage/skip";
                    return;
                }
                if (target === "interval") {
                    location.href = "/mypage/change-course";
                    return;
                }

                this.modal.open();
                this.contents.toFixed();
                this.to();
                this.balls.resize();
            };

            Feedback.prototype.to = function () {
                var $selected = undefined;
                this.$selections.each(function (index, element) {
                    var $selection = $(element);
                    if ($selection.hasClass("active")) {
                        $selected = $selection;
                    }
                });

                if ($selected) {
                    // formのradioボタンをONにする
                    var value = $selected.attr("data-value");
                    var $radio = $("#fq-feedback-question-type > input[value=" + value + "]");
                    console.log($radio);
                    $radio.prop("checked", true);

                    var target = $selected.attr("data-target");
                    if (target === "finish") {
                        // 終了
                        this.frame.end();
                        return;
                    }

                    if (target) {
                        var $to = $("[data-frame-name=" + target + "]");
                        if ($to[0]) {
                            var no = $("[data-frame-name=" + target + "]").attr("data-current");
                            this.frame.setStartNo(no);
                            this.frame.to(no);
                            return;
                        }
                    }
                }

                this.frame.to(0);
            };

            Feedback.prototype.closed = function () {
                this.contents.toRelative();
                this.frame.to(0);
                this.balls.reset();
                this.theme.init();
            };

            Feedback.prototype.resize = function () {
                this.modal.resize();
                this.balls.resize();
            };

            Feedback.prototype.resized = function () {
            };

            Feedback.prototype.select = function (e) {
                var $selected = $(e.currentTarget);

                this.$selections.each(function (index, element) {
                    var $selection = $(element);
                    if ($selection.is($selected)) {
                        $selection.addClass("active");
                    } else {
                        $selection.removeClass("active");
                    }
                });

                this.$startButton.removeClass("type-disabled");
            };

            return Feedback;

        })();


    }, {
        "../../_config": 1,
        "../../_helpers/log": 17,
        "../_modules/Modal": 30,
        "./QuestionWaiting": 32,
        "./QuestionsBalls": 34,
        "./QuestionsData": 36,
        "./QuestionsFrame": 37,
        "./QuestionsName": 38,
        "./QuestionsDamage": 49,
        "./QuestionsNum": 39,
        "./QuestionsRadio": 40,
        "./QuestionsTheme": 41,
        "./QuestionsStar": 51,
        "./QuestionsYesNo": 52,
        "./QuestionsSelection": 53,
    }],
    51: [function (require, module, exports) {
        var QuestionsStar, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        var QuestionsStarFrame = (function () {
            function QuestionsStarFrame(w, frame) {
                this.w = w;
                this.init = bind(this.init, this);
                this.click = bind(this.click, this);
                this.update = bind(this.update, this);
                this.updateNextPage = bind(this.updateNextPage, this);
                this.$frame = $(frame);
                this.$starsContainer = this.$frame.find(".js-questionStarContainer");
                this.$stars = this.$frame.find(".js-questionsStar");
                this.$next = this.$frame.find(".js-questionsFrame__next");
                this.currentValue = 0;

                this.init();
            }

            QuestionsStarFrame.prototype.init = function () {
                this.$stars.on("click", this.click);
                this.$next.addClass("type-disabled");

                var value = this.$starsContainer.attr("data-value");

                var self = this;
                this.$stars.each(function (index, element) {
                    var $star = $(element);
                    if ($star.attr("data-star-value") === value) {
                        self.click({currentTarget: $star});
                    }
                });
            };

            QuestionsStarFrame.prototype.click = function (e) {
                var $star = $(e.currentTarget);
                var value = parseInt($star.attr("data-star-value"), 10);

                this.currentValue = value;

                this.update($star, value);

                var self = this;
                $star.siblings(".js-questionsStar").each(function (index, element) {
                    self.update(element, value);
                });

                // 条件分岐
                this.updateNextPage();
            };

            QuestionsStarFrame.prototype.update = function (element, value) {
                var $star = $(element);
                var starValue = parseInt($star.attr("data-star-value"), 10);

                if (starValue <= value) {
                    $star.addClass("active");
                } else {
                    $star.removeClass("active");
                }

                $star.children("input").prop("checked", starValue === value);

                this.$next.removeClass("type-disabled");
            };

            QuestionsStarFrame.prototype.updateNextPage = function (e) {
                var condition = parseInt(this.$frame.attr("data-transition-below"), 10);

                var to = "";
                if (this.currentValue <= condition) {
                    to = this.$frame.attr("data-transition-to");
                } else {
                    to = this.$frame.attr("data-transition-else");
                }

                var $to = $("[data-frame-name=" + to + "]");
                if ($to[0]) {
                    this.$next.attr("data-next", $("[data-frame-name=" + to + "]").attr("data-current"));
                }
            };

            return QuestionsStarFrame;
        })();


        module.exports = QuestionsStar = (function () {
            function QuestionsStar(w) {
                this.w = w;
                this.init = bind(this.init, this);
                this.init();
            }

            QuestionsStar.prototype.init = function () {
                this.frames = [];

                var self = this;
                $("[data-frame-type='review']").each(function (index, element) {
                    self.frames.push(new QuestionsStarFrame(self.w, element));
                });
            };

            return QuestionsStar;
        })();
    }, {"../../_config": 1, "../../_helpers/log": 17}],
    52: [function (require, module, exports) {
        var QuestionsYesNo, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        var QuestionsYesNoFrame = (function () {
            function QuestionsYesNoFrame(w, frame) {
                this.w = w;
                this.init = bind(this.init, this);
                this.click = bind(this.click, this);
                this.update = bind(this.update, this);
                this.updateNextPage = bind(this.updateNextPage, this);
                this.$frame = $(frame);
                this.$container = this.$frame.find(".js-questionYesNoContainer");
                this.$buttons = this.$frame.find(".js-questionYesNoButton");
                this.$next = this.$frame.find(".js-questionsFrame__next");
                this.yes = undefined;

                this.init();
            }

            QuestionsYesNoFrame.prototype.init = function () {
                this.$buttons.on("click", this.click);
                this.$next.addClass("type-disabled");

                var value = this.$container.attr("data-value");

                var self = this;
                this.$buttons.each(function (index, element) {
                    var $button = $(element);
                    if ($button.attr("data-value") === value) {
                        self.click({currentTarget: $button});
                    }
                });
            };

            QuestionsYesNoFrame.prototype.click = function (e) {
                var $clickedButton = $(e.currentTarget);

                this.$buttons.each(function (index, element) {
                    var $button = $(element);
                    if ($button.is($clickedButton)) {
                        $button.addClass("active");
                    } else {
                        $button.removeClass("active");
                    }

                    $button.children("input[type='radio']").prop("checked", $button.is($clickedButton));
                });

                this.yes = $clickedButton.attr("data-yes") === "true";

                this.$next.removeClass("type-disabled");

                this.updateNextPage();
            };

            QuestionsYesNoFrame.prototype.updateNextPage = function (e) {
                var to = "";
                if (this.yes) {
                    to = this.$frame.attr("data-transition-yes");
                } else {
                    to = this.$frame.attr("data-transition-no");
                }

                console.log(to);

                var $to = $("[data-frame-name=" + to + "]");
                console.log($to);
                if ($to[0]) {
                    var no = $("[data-frame-name=" + to + "]").attr("data-current");
                    this.$next.attr("data-next", no);
                }
            };

            return QuestionsYesNoFrame;
        })();


        module.exports = QuestionsYesNo = (function () {
            function QuestionsYesNo(w) {
                this.w = w;
                this.init = bind(this.init, this);
                this.init();
            }

            QuestionsYesNo.prototype.init = function () {
                this.frames = [];

                var self = this;
                $("[data-frame-type='yesNo']").each(function (index, element) {
                    self.frames.push(new QuestionsYesNoFrame(self.w, element));
                });
            };

            return QuestionsYesNo;
        })();
    }, {"../../_config": 1, "../../_helpers/log": 17}],
    53: [function (require, module, exports) {
        var QuestionsSelection, c, log,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

        c = require("../../_config");

        log = require("../../_helpers/log");

        var QuestionsSelectionFrame = (function () {
            function QuestionsSelectionFrame(w, frame) {
                this.w = w;
                this.init = bind(this.init, this);
                this.click = bind(this.click, this);
                this.update = bind(this.update, this);
                this.toggle = bind(this.toggle, this);
                this.setActive = bind(this.setActive, this);
                this.$frame = $(frame);
                this.$buttons = this.$frame.find(".js-questionSelectionButton");

                this.init();
            }

            QuestionsSelectionFrame.prototype.init = function () {
                this.$buttons.on("click", this.click);
            };

            QuestionsSelectionFrame.prototype.click = function (e) {
                var $clickedButton = $(e.currentTarget);
                this.toggle($clickedButton);

                var self = this;
                if ($clickedButton.hasClass("active")) {
                    if ($clickedButton.attr("data-all-off") === "true") {
                        this.$buttons.each(function (i, e) {
                            var $button = $(e);
                            if (!$button.is($clickedButton)) {
                                self.setActive($button, false);
                            }
                        });
                    } else {
                        this.$buttons.each(function (i, e) {
                            var $button = $(e);
                            if ($button.attr("data-all-off") === "true") {
                                self.setActive($button, false);
                            }
                        });
                    }
                }
            };

            QuestionsSelectionFrame.prototype.toggle = function (e) {
                this.setActive(e, !$(e).hasClass("active"));
            };

            QuestionsSelectionFrame.prototype.setActive = function (e, active) {
                var $button = $(e);

                if (active) {
                    $button.addClass("active");
                } else {
                    $button.removeClass("active");
                }

                var $checkbox = $button.children("input[type='checkbox']");
                if ($checkbox) {
                    $checkbox.prop("checked", active);
                }
            };

            return QuestionsSelectionFrame;
        })();


        module.exports = QuestionsSelection = (function () {
            function QuestionsSelection(w) {
                this.w = w;
                this.init = bind(this.init, this);
                this.init();
            }

            QuestionsSelection.prototype.init = function () {
                this.frames = [];

                var self = this;
                $("[data-frame-type='selection']").each(function (index, element) {
                    self.frames.push(new QuestionsSelectionFrame(self.w, element));
                });
            };

            return QuestionsSelection;
        })();
    }, {"../../_config": 1, "../../_helpers/log": 17}],
}, {}, [19]);

LetterTicker = (function() {
  var mergeOptions, randomChar;
  LetterTicker.prototype.step = 12;
  LetterTicker.prototype.fps = 24;
  LetterTicker.prototype.text = '';
  LetterTicker.prototype.callback = function() {};
  LetterTicker.prototype.str = [];
  LetterTicker.prototype.types = [];
  LetterTicker.prototype.nodes = null;

  function LetterTicker(selector, opts) {
    if (selector instanceof jQuery ) {
      this.nodes = selector;
    } else {
      this.nodes = document.querySelectorAll(selector);
    }
    if (!this.nodes) {
      return;
    }
    mergeOptions.call(this, opts);
    for (var i=0, _len=this.nodes.length; i<_len; i++) {
      var node = this.nodes[i];
      if (this.text) {
        this.str = this.text.split('');
      } else if (node.textContent) {
        this.str = node.textContent.split('');
      } else {
        continue;
      }
      this.types = [];
      for (var j=0,len=this.str.length; j<len; j++) {
        var ch = this.str[j];
        if (ch === ' ') {
          this.types[j] = 'space';
        } else {
          this.types[j] = 'symbol';
        }
      }
      node.innerHTML = '';
      this.shuffle(node, this.step * -1);
    }
  }

  mergeOptions = function(opts) {
    var key, value;
    for (key in opts) {
      value = opts[key];
      if (value) {
        this[key] = value;
      }
    }
    return this;
  };

  randomChar = function(type) {
    var pool;
    switch (type) {
      case 'symbol':
        pool = ',.?/\\(^)![]{}*&^%$#\'"';
        break;
      default:
        pool = '';
    }
    var arr = pool.split('');
    return arr[Math.floor(Math.random() * arr.length)];
  };

  LetterTicker.prototype.shuffle = function(node, start) {
    var len = this.str.length;
    var strCopy = this.str.slice(0);
    if (start > len) {
      this.callback.call(node);
      return;
    }
    for (var i=Math.max(start,0); i<len; i++) {
      if (i < start + this.step) {
        strCopy[i] = randomChar.call(this, this.types[i]);
        // strCopy[i] = '';
      } else {
        strCopy[i] = '';
      }
    }
    node.textContent = strCopy.join('');
    setTimeout((function(_this) {
      return function() {
        _this.shuffle(node, start + 1);
      };
    })(this), 1000 / this.fps);
    return this;
  };

  return LetterTicker;

})();
