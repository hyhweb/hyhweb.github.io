var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, '');
};
export default {
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    formatDate: {


        format: function (date, pattern) {
            if(!date) return '';
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        }
    },
    localStorage:{
        set:function(key,val){
            if(typeof(val)=="object"){
                localStorage.setItem(key,JSON.stringify(val))
            }else if(typeof(val)=="string"){
                 localStorage.setItem(key,val)
            }
        },
        get:function(key){
            let val = JSON.parse(localStorage.getItem(key))
            if(typeof(val)=="object"){
                return  val
            }else if(typeof(val)=="string"){
                return localStorage.getItem(key)
            }

        },
        clear:function(key){
        	localStorage.removeItem(key);
        }
    },
    validation:{
        // 箱号验证
       checkCabinetNo(strCode) {
        var reg = /^[A-Z]{4}\d{7}$/;
            if (reg.test(strCode))
                return true;
            else
                return false;
         /* var Charcode = "0123456789A?BCDEFGHIJK?LMNOPQRSTU?VWXYZ";
          if (strCode.length != 11) return false;
          var result = true;
          var num = 0;
          for (var i = 0; i < 10; i++) {
            var idx = Charcode.indexOf(strCode[i]);
            if (idx == -1 || Charcode[idx] == '?') {
              result = false;
              break;
            }
            idx = idx * Math.pow(2, i);
            num += idx;
          }
          num = (num % 11) % 10;
          return parseInt(strCode[10]) == num;*/
        },
        phone(str){
            var reg0 = /^((13[0-9])|(15([0-3]|[5-9]))|(18[0-9])|(17[0-9]))\d{8}$/,
             reg = /^(0\d{2,3}-\d{7,8}(-\d{3,5}){0,1})$/,
             reg1 = /(0\d{2,3}-\d{7,8}(-\d{3,5}){0,1})[,](((13[0-9])|(15([0-3]|[5-9]))|(18[0-9])|(17[0-9]))\d{8})$/,
             reg2 = /((13[0-9])|(15([0-3]|[5-9]))|(18[0-9])|(17[0-9]))\d{8}[,](0\d{2,3}-\d{7,8}(-\d{3,5}){0,1})$/,
             val = false;
            if(reg1.test(str) || reg2.test(str)){
                val = true;
            }else{
                if (reg.test(str)){
                    val = true;
                }else{
                    if (reg0.test(str)){
                        val = true;
                    }else{
                        val = false;
                    }
                }
            }
             return val

        },
/*        phoneandcell(str){
            var reg = /^(0\d{2,3}-\d{7,8}(-\d{3,5}){0,1})|(((13[0-9])|(15([0-3]|[5-9]))|(18[0-9])|(17[0-9]))\d{8})$/;
            if (reg.test(str))
                return true;
            else
                return false;
        },*/
        email(str){
            var reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (reg.test(str))
                return true;
            else
                return false;
        },
        number(str,required){
            if(required == undefined ){
                var reg = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
                if (reg.test(str))
                    return true;
                else
                    return false;
            }else{
                if(required == true){
                     var reg = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
                    if (reg.test(str))
                        return true;
                    else
                        return false;
                }else{
                    if(typeof(Number(str)) === "number"){
                        var reg = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
                        if (reg.test(str))
                            return true;
                        else
                            return false;
                    }
                }
            }
            return true;
            
        },
        idcard(str){
            var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
             if (reg.test(str))
                return true;
            else
                return false;
        },
        chinese(str){
            var reg = /^[\u4e00-\u9fa5]+$/
             if (reg.test(str))
                return true;
            else
                return false;
        },
    }

};
