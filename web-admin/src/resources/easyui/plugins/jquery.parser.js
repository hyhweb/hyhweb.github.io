/**
 * parser - jQuery EasyUI
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ] 
 * 
 */

(function($){
	$.parser = {
		auto: true,
		onComplete: function(context){
			if(context){
				page.complete()
			}

		},
		plugins:['linkbutton','menu','menubutton','splitbutton','progressbar','form',
				 'tree','combobox','combotree','numberbox','validatebox','searchbox','checkbox','radiobox',
				 'numberspinner','timespinner','calendar','datebox','datetimebox','slider',
				 'layout','panel','datagrid','propertygrid','treegrid','tabs','accordion','window','dialog','messager'
		],
		parse: function(context,auto){
			var pluginsLength = 0;
			if(auto){
                for(var i=0; i<$.parser.plugins.length; i++) {
                    var name = $.parser.plugins[i];
                    easyloader.load(name, function(){
                        pluginsLength++;
                        $.parser.onComplete.call($.parser);
                        if(pluginsLength == $.parser.plugins.length){
                            easyloader.onComplete($.parser.plugins);
                        }
					});
                }
			}else{
                var aa = [];
                for(var i=0; i<$.parser.plugins.length; i++){
                    var name = $.parser.plugins[i];
                    var r = $('.easyui-' + name, context);
                    if (r.length){
                        if (r[name]){
                            r[name]();
                        } else {
                            aa.push({name:name,jq:r});
                        }
                    }
                }
                if (aa.length && window.easyloader){
                    var names = [];
                    for(var i=0; i<aa.length; i++){
                        names.push(aa[i].name);
                    }
                    easyloader.load(names, function(){
                        pluginsLength++;
                        for(var i=0; i<aa.length; i++){
                            var name = aa[i].name;
                            var jq = aa[i].jq;
                            jq[name]();
                        }
                        $.parser.onComplete.call($.parser, context);
                        if(pluginsLength == $.parser.plugins.length){
                            easyloader.onComplete($.parser.plugins);
                        }
                    });

                } else {
                    $.parser.onComplete.call($.parser, context);
                }
			}




		}
	};
	$(function(){
		if (!window.easyloader && $.parser.auto){
			$.parser.parse($('body'),true);

		}
	});
})(jQuery);