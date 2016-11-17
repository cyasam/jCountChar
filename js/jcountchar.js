/*
 * jCountChar - jQuery Character Count Plugin Demo Page
 *
 * Copyright 2016, CAGDAS ISIK
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * 9 November 2016
 */

(function ($) {

    var jCharCount = function(elements, options) {
        
        var jCCount = {
            defaults: {
                type: "default",
                charLimit: 50,
                warning: 20,
                criticalWarning: 10,
                onUnderZero: null,
                onCriticalWarning: null,
                onWarning: null,
                onCountResult: null
            },
            amountChar:function(){
                var _this = this;
                return _this.settings.charLimit - _this.charFormEl.val().length;
            },
            countChar: function() {

                var _this = this;

                var _charFormEl = _this.charFormEl;
                var _charCountEl = _this.charCountEl;

                var _textareaLength = _this.amountChar();

                if (typeof _this.settings.onCountResult === "function"){
                    _this.settings.onCountResult.call(_this);
                }
                else {
                    _charCountEl.html(_textareaLength);
                }

                if (_textareaLength <= _this.settings.warning && _textareaLength > _this.settings.criticalWarning) {

                    _charCountEl.removeClass("superwarn").addClass("warn");

                    if(typeof _this.settings.onWarning === "function" ){
                        _this.settings.onWarning.call(_this);
                    }

                } else if (_textareaLength <= _this.settings.criticalWarning) {

                    _charCountEl.removeClass("warn").addClass("superwarn");

                    if(_textareaLength >= 0 && typeof _this.settings.onCriticalWarning === "function" ){
                        _this.settings.onCriticalWarning.call(_this);
                    }

                    if(_textareaLength < 0 && typeof _this.settings.onUnderZero === "function" ){
                        _this.settings.onUnderZero.call(_this);
                    }

                } else {
                    _charCountEl.removeClass("warn").removeClass("superwarn");
                }
            },
            effectChar: function() {
                var _this = this;
                var _textareaLength = _this.amountChar();

                if (_this.settings.type == "twitter") {

                    if (_textareaLength < _this.settings.warning) {

                        _this.showCount();

                    } else {

                        _this.hideCount();

                    }

                    _this.charFormEl.off("mouseover mouseleave");

                } else {

                    _this.showCount();
                    _this.charFormEl.off("mouseover mouseleave keyup");

                }
            },
            showCount: function(){
                var _this = this;
                _this.charCountEl.addClass("show");
            },
            hideCount: function(){
                var _this = this;
                _this.charCountEl.removeClass("show");
            },
            init: function() {
                jCCount.charFormEl = $(elements);
                jCCount.settings = {};

                jCCount.charFormEl.each(function(){
                    var $this = $(this);
                    var _charCountElData = $this.data("jchar-name");
                    var _charCountEl = $('[data-jchar-select="'+_charCountElData+'"]');
                    jCCount.charCountEl = _charCountEl;

                    jCCount.settings = $.extend({},jCCount.defaults, options);

                    jCCount.countChar();
                    jCCount.effectChar();

                    $this.on("keyup",function () {
                        jCCount.countChar();
                        if(jCCount.settings.type == "twitter"){
                            jCCount.effectChar();
                        }
                    });
                });
            }
        };

        return {
            defaults: jCCount.defaults,
            init: jCCount.init
        };

    };


    jQuery.fn.countChar = function (options) {
        return this.each(function (index, element) {
            var _jCharCount = new jCharCount(element, options);
            _jCharCount.init();
        });
    };


})(jQuery);