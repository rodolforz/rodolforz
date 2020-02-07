/*! Resultados Digitais - Wed Nov 21 2018 09:44:17 GMT-0200 (-02) */
"use strict";function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function RDStationFormIntegration(n,t,e){RdIntegration.integrate(n,t,e)}var FormFields=function(){function n(n){for(var t=[],e=0;e<n.length;e+=1)t.push(n[e]);return t}function t(n){var t=jQuery(n).attr("name")||"",e=n.value,r=RDIntegrationCreditCard.validNumber(e);return!(u.indexOf(t.toLowerCase())>=0||r)}function e(e){var r=jQuery(e).find(":input").not(":password"),o=n(r),i=o.filter(t);return jQuery(i).serializeArray()}function r(n){return n.replace(/[\s_-]/g,"").toLowerCase().indexOf("email")>-1}function o(n){var t=!1,e=n.type;return e&&(t="email"===e),r(n.name)||t}function i(n){var t=!1;return jQuery.each(n,function(){if(o(this)&&""!==this.value)return this.name="email",t=!0,!1}),t}function a(e){return n(jQuery(e).find(":input").not(":password").not(":submit").not(":button").not(":reset").not(":checkbox").not(":radio")).filter(t)}var u=["captcha","_wpcf7","_wpcf7_version","_wpcf7_unit_tag","_wpnonce","_wpcf7_is_ajax_call","_wpcf7_locale","g-recaptcha-response","_viewstate","_previouspage","_viewstategenerator","payment.creditcardholdercpf","payment.creditcardexpirationmonth","payment.creditcardexpirationyear","payment.creditcardsecuritycode","payment.creditcardholder","payment.creditcardtype"];return{findEmail:i,singleFields:a,retrieveAllowedFields:e}}(),_createClass=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),RDErrorNotifier=function(){function n(t,e){_classCallCheck(this,n),this.requestStatus=t,this.requestBody=e}return _createClass(n,[{key:"notify",value:function(){var n=JSON.stringify({status:this.requestStatus,body:this.requestBody});jQuery.ajax({type:"POST",url:this.URL,data:n,dataType:"json",crossDomain:!0})}}]),n}();RDErrorNotifier.prototype.URL="https://qtmlugypw3.execute-api.us-east-1.amazonaws.com/production";var RDIntegrationCreditCard=function(){function n(n){var t,e,r,o=0,i=0;if("string"!=typeof n)return!1;if(e=n.replace(/\D/g,""),(r=e.length)<14)return!1;for(;r--;)t=parseInt(e.charAt(r),10)<<i,o+=t-9*(t>9),i^=1;return o%10==0&&o>0}return{validNumber:n}}();"undefined"!=typeof module&&module.hasOwnProperty("exports")&&(module.exports=RDIntegrationCreditCard);var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},FieldMapping=function(){function n(){f=[]}function t(n){var t=void 0,e=void 0,r=n.getAttribute("name"),o=/\[/g,i=/\]/g;return!!r&&(t=r.replace(o,"_"),e=t.replace(i,""),"checkbox"===n.type?e+"[]":e)}function e(n){var t=jQuery('label[for="'+n.id+'"]')[0],e=jQuery(n).closest("label")[0],r=t||e;return!!r&&r.innerText.trim()}function r(n,r){var o=r.getAttribute("type"),i="Field "+n+" "+o;return t(r)||e(r)||r.getAttribute("id")||i}function o(n){jQuery(n).map(function(n,t){return f.push({name:r(n,t),value:t.value,type:t.type}),!1})}function i(n){o(FormFields.singleFields(n[0]))}function a(n){var t=n.find(":checkbox:checked[name]").clone();t.each(function(n,t){t.name=t.name.split(".")[0]}),o(t)}function u(n){o(n.find(":radio:checked"))}function c(t){return n(),i(t),a(t),u(t),f}var f=[];return{mapFields:c}}(),RdIntegrationIdentifier=function(){function n(n){var t=n[0].action;return"object"===(void 0===t?"undefined":_typeof(t))?t.value:void 0!==t?t:""}function t(t){var e,r=!1,o=["squarespace.com","realty_ajax_shortcode_contact_form"];for(e=0;e<o.length;e+=1)n(t).indexOf(o[e])>-1&&(r=!0);return r}function e(n){return!t(n)&&n.attr("id")}function r(n){var t="/"===window.location.pathname?"home":window.location.pathname;return n.attr("name")||e(n)||t}return{identifier:r}}(),RdIntegration=function(){var n,t,e,r,o,i,a=function(n){"undefined"==typeof jQuery?f("https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js",n):n()},u=function(n,t,e){a(function(){i=jQuery,c(n,t,e),l(),k()})},c=function(n,o,i){r=i||{},t=n,e=o},f=function(n,t){var e=document.getElementsByTagName("head")[0],r=document.createElement("script");r.type="text/javascript",r.src=n,r.onload=t,r.onreadystatechange=function(){"complete"===this.readyState&&t()},e.appendChild(r)},l=function(){i(":submit").click(s)},s=function(t){if(o=h(),n=d(t.target)){var e=FormFields.retrieveAllowedFields(n);if(FormFields.findEmail(e)){var r=m(e);("function"!=typeof n[0].checkValidity||n[0].checkValidity())&&(x(r,v),t.preventDefault())}}},d=function(n){return i(n).closest("form:not([data-internal-rdstation-form])")},m=function(n){var t=p(n);return t.push(o.identifier,o.token,b()),t},p=function(n){return r.fieldMapping&&(n=y(n)),n},y=function(n){return i.each(n,function(){var n=r.fieldMapping[this.name];n&&(this.name=n)}),n},v=function(){g(n)?n.submit():n.find(":submit").unbind("click",s).click()},g=function(n){var t=n.attr("action");return void 0!==t&&""!==t.trim()},h=function(){return{identifier:{name:"identificador",value:e},token:{name:"token_rdstation",value:t}}},_=function(n){var t,e,r=document.cookie.split(";");for(n+="=",t=0;t<r.length;t++){for(e=r[t];" "===e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(n))return e.substring(n.length,e.length)}return null},b=function(){return{name:"query_params",value:location.search.substring(1)}},w=function(){var n=_("rdtrk");if(null!==n)return n=JSON.parse(unescape(n)),n.id},j=function(n){var t=w();return void 0!==t&&n.push({name:"client_id",value:t}),n},F=function(n){var t=_("__utmz"),e=_("__trf.src");return t&&n.push({name:"c_utmz",value:t}),e&&n.push({name:"traffic_source",value:e}),n},S=function(n,t){return n.push({name:"_is",value:t}),n},x=function(n,t,e){var r,o;e=e||3,r=10===e?"form-integrations":"conversions",n=j(n),n=F(n),n=S(n,e),a(function(){jQuery.ajax({type:"POST",url:"https://www.rdstation.com.br/api/1.3/"+r,data:n,crossDomain:!0,xhrFields:{withCredentials:!0},warn:function(n){console.log("ERROR - "),console.log(n)},complete:function(e,r){if(e.status>=500)return o=new RDErrorNotifier(e.status,n),void o.notify();t&&t(e,r)},beforeSend:function(){}})})},k=function(){!0===r.debugMode&&C()},C=function(){a(function(){i=jQuery,r=r||{},console.info("Iniciando");var n=i(_getElementSubmit()),t=d(n);0===n.length?console.warn("Nenhum botao de submit encontrado"):console.info("Botoes de submit encontrados: "+n.length),0===t.length?console.warn("Nenhum formulario encontrado"):console.info("Formularios encontrados: "+t.length),I(t),console.info("Finalizado")})},I=function(n){o=h(),i.each(n,function(n,t){var e=m(t),r=[];console.log(""),console.info(n+1+" formulario"),FormFields.findEmail(t)?console.info("Campo de email encontrado"):console.warn("Campo de email nao encontrado"),i.each(e,function(n,t){r.push(t.name)}),console.info("Campos mapeados: "+r.join(", "))}),console.log("")},R=function(n,e){r=e||{},t=n,a(function(){localStorage.getItem("RdIntegrationFormData")&&q(),Q()})},Q=function(){var n=jQuery('form:not(:has(input[name="_is"]))');jQuery(n).submit(D)},D=function(n){var t=jQuery(n.target).closest("form"),r=FieldMapping.mapFields(t);FormFields.findEmail(r)&&(e=RdIntegrationIdentifier.identifier(t),O(r))},O=function(n){n=E(n),N(n),x(n,function(n){A(n)},10)},E=function(n){return n.push({name:"identificador",value:e},{name:"token_rdstation",value:t},{name:"form_url",value:location.href.split("?")[0]},{name:"page_title",value:document.title}),n},N=function(n){localStorage.setItem("RdIntegrationFormData",JSON.stringify(n))},q=function(){var n=JSON.parse(localStorage.getItem("RdIntegrationFormData"));x(n,function(n){A(n)},10)},A=function(n){4===n.readyState&&localStorage.removeItem("RdIntegrationFormData")};return{integrate:u,post:x,analyse:C,integrateAll:R}}();