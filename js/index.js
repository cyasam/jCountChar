/*
 * jCountChar - jQuery Character Count Plugin Demo Page
 *
 * Copyright 2016, CAGDAS ISIK
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * 9 November 2016
 */

$(document).ready(function(){

	"use strict";
	
	var jCountCharDemo = function(){

		var jCountDemoPriv = {
			create: function(_this){

				_this.find(".errorMessage").empty();

				var warningEl = _this.find(".warning"),
				criticalWarningEl = _this.find(".criticalWarning"),
				charLimitEl = _this.find(".charLimit");
				
				var warningVal = parseInt(warningEl.val());
				var criticalWarningVal = parseInt(criticalWarningEl.val());
				var charLimitVal = parseInt(charLimitEl.val());
				var success = true;
				var warning, criticalWarning, charLimit, typeVal;
				
				_this.find('input[type="number"]').removeClass("error");
				_this.append('<ul class="errorMessage"></ul>');
				
				if(_this.find(".type").val().length > 0) {
					typeVal = _this.find(".type").val();
				}
				
				if(warningEl.val().length > 0 && criticalWarningEl.val().length > 0){
					if ( warningVal > criticalWarningVal ){
						warning = warningVal;
						criticalWarning = criticalWarningVal;
					}
					else { 
						warningEl.addClass("error");
						criticalWarningEl.addClass("error");
						_this.find(".errorMessage").append("<li>Uyarı Limiti Kritik Uyarı Limitinden küçük olamaz.</li>");
						success = false;
					}
				}
				
				if(charLimitEl.val().length > 0 && warningEl.val().length > 0){
					
					if( charLimitVal > warningVal){
						charLimit = charLimitVal;
						warning = warningVal;	
					}
					else { 
						warningEl.addClass("error");
						charLimitEl.addClass("error");
						_this.find(".errorMessage").append("<li>Karakter Limiti Uyarı Limitinden küçük olamaz.</li>");
						success = false;
					}
				}
				
				else if(charLimitEl.val().length > 0 && warningEl.val().length === 0){
					charLimit = charLimitVal;
				}

				/* Callback Functions */

				var countCallbacks = {};

				if(_this.find(".custom-warning-text").is(":checked")){
					countCallbacks.onCountResult = function() {
			            $(this.charCountEl).html("Son "+this.amountChar()+" karakter");
			        };
		    	}

				if(_this.hasClass("with-callback")){
					var warningCallbackEl = _this.find(".warning-func"),
					cWarningCallbackEl = _this.find(".cwarning-func"),
					underZeroCallbackEl = _this.find(".underzero-func");

					if(warningCallbackEl.length>0){
						countCallbacks.onWarning = function() {
							$(this.charCountEl).html(this.settings.warning+" karakter.");
						};
					}

					if(cWarningCallbackEl.length>0){
						countCallbacks.onCriticalWarning = function() {
							$(this.charCountEl).html("Son "+this.settings.criticalWarning+" karakter.");
						};
					}

					if(underZeroCallbackEl.length>0){
				        countCallbacks.onUnderZero = function() {
				            $(this.charCountEl).html(this.settings.charLimit+"'den fazla karakter girdiniz.");
				        };
					}
				}

				
				if (success === true) {

					var demoOptions = {
					    type : typeVal,
						charLimit : charLimit,
						warning : warning,
						criticalWarning : criticalWarning
					};
					$.extend(demoOptions, countCallbacks);

					_this.parents(".demo-block").find(".text-area").countChar(demoOptions);
					_this.find(".errorMessage").remove();
				}

			},
			init:function(){

				var _this = jCountDemoPriv;

				$(".demo-block").each(function(){
					var form = $(this).find(".plugin-form");
					_this.create(form);
				});

				$(".plugin-form").on("submit", function(e){
					_this.create($(this));
					e.preventDefault();
				});
			}
		};

		return {
			init: jCountDemoPriv.init
		};

	};

	var _jCountCharDemo = new jCountCharDemo();
	_jCountCharDemo.init();	
	
});