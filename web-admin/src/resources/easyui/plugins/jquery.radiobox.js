(function ($) {
    /**
     * create the checkbox component.
     */
    function init(target, options) {
        $(target).hide();
        var opts = options,
            data = opts.data;
        $(target).attr('radioboxName', opts.name);
        if (data) {
            var span = $('<span class="radiobox"></span>').insertAfter(target);
            if ($.isArray(data)) {
                var inner = $('<span class="radiobox-inner"></span>');
                $.each(data, function (key, val) {
                    var id = new Date().getTime() + key;
                    var item = $('<span class="radiobox-item"><input id="' + id + '" class="radiobox-item" type="radio" name="' + opts.name + '" value="' + val.value + '" /><label for="' + id + '" class="radiobox-text">' + val.text + '</label></span>')
                    if (opts.value && opts.value != "" && opts.value == val.value) {
                        item.find('input.radiobox-item').attr('checked', 'checked')
                    }
                    inner.append(item)
                })
                span.append(inner)
            }
        }
        return {
            radiobox: span
        };
    };

    function bindEvents(target) {
        var opts = $.data(target, 'radiobox').options;
        $(target).unbind('.radiobox');
        $(target).bind('keypress.radiobox', function (e) {
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
        }).bind('paste.radiobox', function () {
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
        }).bind('dragenter.radiobox', function () {
            return false;
        }).bind('change.radiobox', function () {
            opts.onChange(opts.value);
        });
    }

    /**
     * do the validate if necessary.
     */
    function validate(target) {
        if ($.fn.validatebox) {
            var opts = $.data(target, 'radiobox').options;
            $(target).validatebox(opts);
        }
    }

    function setDisabled(target, disabled) {
        var opts = $.data(target, 'radiobox').options;
        if (disabled) {
            opts.disabled = true;
            $(target).attr('disabled', true);
        } else {
            opts.disabled = false;
            $(target).removeAttr('disabled');
        }
    }

    function clear(target) {
        var radiobox = $.data(target, 'radiobox').radiobox;
        radiobox.find('input').val('');
    }


    function getValue(target) {
        var values = [];
        var radiobox = $.data(target, 'radiobox').radiobox;
        radiobox.find('input').each(function () {
            if ($(this).prop('checked') == true) {
                values.push($(this).val());
            }

        });
        return values.join(',');
    }

    function setValue(target, values) {
        var opts = $.data(target, 'radiobox').options;
        var oldValues = getValues(target);

        var radiobox = $.data(target, 'radiobox').radiobox;
        var name = $(target).attr('radioboxName');
        for (var i = 0; i < values.length; i++) {
            var input = $('input[name="' + radioboxName + '"][value="' + values[i] + '"]');
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


    $.fn.radiobox = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.radiobox.methods[options](this, param);
        }

        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'radiobox');

            if (state) {
                $.extend(state.options, options);
            } else {
                var r = init(this, options);
                state = $.data(this, 'radiobox', {
                    options: $.extend({}, $.fn.radiobox.defaults, $.fn.radiobox.parseOptions(this), options),
                    radiobox: r.radiobox
                });

                setDisabled(this, state.options.disabled);
                bindEvents(this);
                validate(this);
            }
        })
    };
    $.fn.radiobox.methods = {
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
    $.fn.radiobox.parseOptions = function (target) {
        var t = $(target);
        return {}
    };
    $.fn.radiobox.defaults = {
        disabled: false,
        onChange: function (values, oldValues) {

        }
    }
})(jQuery)