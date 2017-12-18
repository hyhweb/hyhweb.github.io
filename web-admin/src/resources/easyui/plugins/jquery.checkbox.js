(function ($) {
    /**
     * create the checkbox component.
     */
    function init(target, options) {
        $(target).hide();
        var opts = options,
            data = opts.data;
        $(target).attr('checkboxName', opts.name);
        if (data) {
            var span = $('<span class="checkbox"></span>').insertAfter(target);
            if ($.isArray(data)) {
                var inner = $('<span class="checkbox-inner"></span>');
                $.each(data, function (key, val) {
                    var id = new Date().getTime() + key;
                    var item = $('<span class="checkbox-item"><input id="' + id + '" class="checkbox-item" type="checkbox" name="' + opts.name + '" value="' + val.value + '" /></checkbox><label for="' + id + '" class="checkbox-text">' + val.text + '</label></span>')
                    if (opts.value && opts.value != "" && opts.value == val.value) {
                        item.find('input.checkbox-item').attr('checked', 'checked')
                    }
                    inner.append(item)
                })
                span.append(inner)
            }
        }
        return {
            checkbox: span
        };
    };

    function bindEvents(target) {
        var opts = $.data(target, 'checkbox').options;
        $(target).unbind('.checkbox');
        $(target).bind('keypress.checkbox', function (e) {
            if (e.which == 45) {	//-
                return true;
            }
            if (e.which == 46) {	//.
                return true;
            }
            else if ((e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false) || e.which == 0 || e.which == 8) {
                return true;
            } else if (e.ctrlKey == true && (e.which == 99 || e.which == 118)) {
                return true;
            } else {
                return false;
            }
        }).bind('paste.checkbox', function () {
            if (window.clipboardData) {
                var s = clipboardData.getData('text');
                if (!/\D/.test(s)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }).bind('dragenter.checkbox', function () {
            return false;
        }).bind('change.checkbox', function () {
            opts.onChange(opts.value);
        });
    }

    /**
     * do the validate if necessary.
     */
    function validate(target) {
        if ($.fn.validatebox) {
            var opts = $.data(target, 'checkbox').options;
            $(target).validatebox(opts);
        }
    }

    function setDisabled(target, disabled) {
        var opts = $.data(target, 'checkbox').options;
        if (disabled) {
            opts.disabled = true;
            $(target).attr('disabled', true);
        } else {
            opts.disabled = false;
            $(target).removeAttr('disabled');
        }
    }

    function clear(target) {
        var checkbox = $.data(target, 'checkbox').checkbox;
        checkbox.find('input').val('');
    }


    function getValue(target) {
        var values = [];
        var checkbox = $.data(target, 'checkbox').checkbox;
        checkbox.find('input').each(function () {
            if ($(this).prop('checked') == true) {
                values.push($(this).val());
            }

        });
        return values.join(',');
    }

    function setValue(target, values) {
        var opts = $.data(target, 'checkbox').options;
        var oldValues = getValues(target);

        var checkbox = $.data(target, 'checkbox').checkbox;
        var name = $(target).attr('checkboxName');
        for (var i = 0; i < values.length; i++) {
            var input = $('input[name="' + checkboxName + '"][value="' + values[i] + '"]');
            input.attr('checked', 'checked');
        }

        var tmp = [];
        for (var i = 0; i < oldValues.length; i++) {
            tmp[i] = oldValues[i];
        }
        var aa = [];
        for (var i = 0; i < values.length; i++) {
            for (var j = 0; j < tmp.length; j++) {
                if (values[i] == tmp[j]) {
                    aa.push(values[i]);
                    tmp.splice(j, 1);
                    break;
                }
            }
        }

        if (aa.length != values.length || values.length != oldValues.length) {
            opts.onChange.call(target, values, oldValues);

        }
    }


    $.fn.checkbox = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.checkbox.methods[options](this, param);
        }

        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'checkbox');

            if (state) {
                $.extend(state.options, options);
            } else {
                var r = init(this, options);
                state = $.data(this, 'checkbox', {
                    options: $.extend({}, $.fn.checkbox.defaults, $.fn.checkbox.parseOptions(this), options),
                    checkbox: r.checkbox
                });

                setDisabled(this, state.options.disabled);
                bindEvents(this);
                validate(this);
            }
        })
    };
    $.fn.checkbox.methods = {
        options: function (jq) {
            return $.data(jq[0], 'checkbox').checkbox;
        },

        disable: function (jq) {
            return jq.each(function () {
                setDisabled(this, true);
                bindEvents(this);
            });
        },
        enable: function (jq) {
            return jq.each(function () {
                setDisabled(this, false);
                bindEvents(this);
            });
        },
        clear: function (jq) {
            return jq.each(function () {
                clear(this);
            });
        },

        getValue: function (jq) {
            return getValue(jq[0]);
        },
        setValue: function (jq, value) {
            return jq.each(function () {
                setValue(this, value);
            });
        }
    };
    $.fn.checkbox.parseOptions = function (target) {
        var t = $(target);
        return {}
    };
    $.fn.checkbox.defaults = {
        disabled: false,
        onChange: function (values, oldValues) {

        }
    }
})(jQuery)