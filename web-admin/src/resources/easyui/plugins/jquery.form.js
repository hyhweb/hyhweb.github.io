/**
 * form - jQuery EasyUI
 *
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ]
 */
(function ($) {
    /**
     * submit the form
     */
    function ajaxSubmit(target, options) {
        options = options || {};

        if (options.onSubmit) {
            if (options.onSubmit.call(target) == false) {
                return;
            }
        }

        var form = $(target);
        if (options.url) {
            form.attr('action', options.url);
        }
        var frameId = 'easyui_frame_' + (new Date().getTime());
        var frame = $('<iframe id=' + frameId + ' name=' + frameId + '></iframe>')
            .attr('src', window.ActiveXObject ? 'javascript:false' : 'about:blank')
            .css({
                position: 'absolute',
                top: -1000,
                left: -1000
            });
        var t = form.attr('target'), a = form.attr('action');
        form.attr('target', frameId);
        try {
            frame.appendTo('body');
            frame.bind('load', cb);
            form[0].submit();
        } finally {
            form.attr('action', a);
            t ? form.attr('target', t) : form.removeAttr('target');
        }

        var checkCount = 10;

        function cb() {
            frame.unbind();
            var body = $('#' + frameId).contents().find('body');
            var data = body.html();
            if (data == '') {
                if (--checkCount) {
                    setTimeout(cb, 100);
                    return;
                }
                return;
            }
            var ta = body.find('>textarea');
            if (ta.length) {
                data = ta.value();
            } else {
                var pre = body.find('>pre');
                if (pre.length) {
                    data = pre.html();
                }
            }
            if (options.success) {
                options.success(data);
            }
//			try{
//				eval('data='+data);
//				if (options.success){
//					options.success(data);
//				}
//			} catch(e) {
//				if (options.failure){
//					options.failure(data);
//				}
//			}
            setTimeout(function () {
                frame.unbind();
                frame.remove();
            }, 100);
        }
    }

    /**
     * load form data
     * if data is a URL string type load from remote site,
     * otherwise load from local data object.
     */
    function load(target, data) {
        if (typeof data == 'string') {
            $.ajax({
                url: data,
                dataType: 'json',
                success: function (data) {
                    _load(data);
                }
            });
        } else {
            _load(data);
        }

        function _load(data) {
            var options = $.data(target,'form').options;
            var form = $(target);

            for (var name in data) {
                var val = data[name];
                var controller = options.controller[name];
               if(controller == undefined){
                   $('input[name=' + name + ']', form).val(val);
                   $('textarea[name=' + name + ']', form).val(val);
                   $('select[name=' + name + ']', form).val(val);
               }else{
                   var type = controller.column.type,
                       element = controller.element;
                   if(type == "validatebox"){
                       element.val(val)
                   }else if(type == "combobox"){
                       if(controller.column.multiple == true){
                           var valArr = val.split(',');
                           element[type]('setValues',valArr);
                       }else{
                           element[type]('setValue',val);
                       }
                   } else{
                       element[type]('setValue',val);

                   }
               }

                /*$('input[name=' + name + ']', form).val(val);
                $('textarea[name=' + name + ']', form).val(val);
                $('select[name=' + name + ']', form).val(val);*/
            }
        }
    }

    /**
     * clear the form fields
     */
    function clear(target) {
        $('input,select,textarea', target).each(function () {
            var t = this.type, tag = this.tagName.toLowerCase();
            if (t == 'text' || t == 'password' || tag == 'textarea')
                this.value = '';
            else if (t == 'checkbox' || t == 'radio')
                this.checked = false;
            else if (tag == 'select')
                this.selectedIndex = -1;

        });
    }

    /**
     * set the form to make it can submit with ajax.
     */
    function setForm(target) {
        var options = $.data(target, 'form').options;
        var form = $(target);
        form.panel(options);
        form.unbind('.form').bind('submit.form', function () {
            ajaxSubmit(target, options);
            return false;
        });
    }

    /**
     * render form
     * @param target
     * @param data
     */
    function render(target, param) {
        var data = param.data,
            className = param.class?param.class:'',
            inputClass = param.inputClass?param.inputClass:'',
            labelWidth = param.labelWidth?param.labelWidth:'auto';
        if (!$.data(target, 'form')) {
            $.data(target, 'form', {
                options: $.extend({}, $.fn.form.defaults,{columns:data})
            });
        }

        var form = $(target);
        form.addClass(className)
        if (data) {
            var formInner = $('<div class="form-inner"></div>');
            if ($.isArray(data)) {
                $.each(data, function (key, val) {
                    renderFormItem(form,formInner,key,val)
                })
            }
            form.append(formInner);
            if(param.complete){
                param.complete();
            }

        }

        function renderFormItem(form,formInner,key,val) {
            var formItem = $('<div class="form-item" ></div>');

            if(val.label){
                var labelItem = $('<label class="form-item-text" style="width:'+labelWidth+'">' + val.label + '</label>');
            }
            if(val.type =="linkbutton"){
                var inputItem = $('<a></a>');
            } else if(val.type =="radiobox"){
                var inputItem = $('<input type="radio" />');
            }
            else if(val.type =="checkbox"){
                var inputItem = $('<input type="checkbox" />');
            }else if(val.type =="radiobox"){
                var inputItem = $('<input type="radio" />');
            }
            else{
                var inputItem = $('<input type="text" name="' + val.name + '" value="' + val.value + '" />');
            }
            if(labelItem){
                formItem.append(labelItem);
            }
            if(inputItem){
                inputItem.addClass('form-item-value');
                if(val.type !="linkbutton"){

                    inputItem.addClass(inputClass);
                }


                formItem.append(inputItem);
            }

            formInner.append(formItem);
            var controller = inputItem[val.type]($.extend({},$.fn[val.type].defaults?$.fn[val.type].defaults:{},val))
            //var elem = $.data(controller[0], val.type)

            var options = $.data(target, 'form').options;
            var name = val.name;
            options.controller[name] = {element:controller,column:val}
            $.data(form, 'form', {
                options: $.extend({}, $.fn.form.defaults,options)
            });

        }
    }

    function getFormData(target) {
        var options = $.data(target,'form').options,
            form = $(target),
            result = {};
           $('[name]',form).each(function (key,val) {
               var name = $(val).attr('name'),
                   type = $(val).attr('type'),
                    value = "";
               var controller = options.controller[name];
               if(controller == undefined){
                   if(type == "input"){

                   }else if(type=="select"){

                   }
                   /*$('input[name=' + name + ']', form).val(val);
                   $('textarea[name=' + name + ']', form).val(val);
                   $('select[name=' + name + ']', form).val(val);*/
               }else{
                   var controllerType = controller.column.type,
                       element = controller.element;
                   if(controllerType == "validatebox" || controllerType == "numberbox"){
                       value = element.val();
                   }else if(controllerType == "combobox"){
                       if(controller.column.multiple == true){
                           valueArr =   element[controllerType]('getValues');
                           value = valueArr.join(',');
                       }else{
                           value =  element[controllerType]('getValue');
                       }
                   } else{
                       value =  element[controllerType]('getValue');

                   }
               }
               result[name] = value;
           })
            return result;
    }

    $.fn.form = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.form.methods[options];
            if (method){
                return method(this, param);
            } else {
                return this.panel(options, param);
            }
        }

        options = options || {};
        return this.each(function () {
            if (!$.data(this, 'form')) {
                $.data(this, 'form', {
                    options: $.extend({},$.fn.panel.defaults, $.fn.form.defaults, options)
                });
            }
            setForm(this);
            render(this,options)

        });
    };
    $.fn.form.methods = {
        submit: function (jq, param) {
            return  ajaxSubmit(jq, $.extend({}, $.fn.form.defaults, param || {}));
        },
        load: function (jq, param) {
            return load(jq[0], param);
        },
        clear: function (jq) {
            return  clear(jq);
        },
        render: function (jq, param) {
            return render(jq, param);
        },
        getFormData: function (jq) {
            return getFormData(jq[0]);

        }
    }
    $.fn.form.defaults = {
        url: null,
        class:'order-form',
        inputClass:'column2',
        labelWidth:'100px',
        data:[],
        controller:{},
        collapsible: true,
        cls:'form-box',
        onSubmit: function () {
        },
        success: function (data) {
        }
    };
})(jQuery);