/**
 * easyloader - jQuery EasyUI
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function(){
	var modules = {
		draggable:{
			js:'jquery.draggable.js'
		},
		droppable:{
			js:'jquery.droppable.js'
		},
		resizable:{
			js:'jquery.resizable.js'
		},
		linkbutton:{
			js:'jquery.linkbutton.js',
			css:'linkbutton.css'
		},
		progressbar:{
			js:'jquery.progressbar.js',
			css:'progressbar.css'
		},
		pagination:{
			js:'jquery.pagination.js',
			css:'pagination.css',
			dependencies:['linkbutton']
		},
		datagrid:{
			js:'jquery.datagrid.js',
			css:'datagrid.css',
			dependencies:['panel','resizable','linkbutton','pagination']
		},
		treegrid:{
			js:'jquery.treegrid.js',
			css:'tree.css',
			dependencies:['datagrid']
		},
		propertygrid:{
			js:'jquery.propertygrid.js',
			css:'propertygrid.css',
			dependencies:['datagrid']
		},
		panel: {
			js:'jquery.panel.js',
			css:'panel.css'
		},
		window:{
			js:'jquery.window.js',
			css:'window.css',
			dependencies:['resizable','draggable','panel']
		},
		dialog:{
			js:'jquery.dialog.js',
			css:'dialog.css',
			dependencies:['linkbutton','window']
		},
		messager:{
			js:'jquery.messager.js',
			css:'messager.css',
			dependencies:['linkbutton','window','progressbar']
		},
		layout:{
			js:'jquery.layout.js',
			css:'layout.css',
			dependencies:['resizable','panel']
		},
		form:{
			js:'jquery.form.js'},
		menu:{
			js:'jquery.menu.js',
			css:'menu.css'
		},
		tabs:{
			js:'jquery.tabs.js',
			css:'tabs.css',
			dependencies:['panel','linkbutton']
		},
		splitbutton:{
			js:'jquery.splitbutton.js',
			css:'splitbutton.css',
			dependencies:['linkbutton','menu']
		},
		menubutton:{
			js:'jquery.menubutton.js',
			css:'menubutton.css',
			dependencies:['linkbutton','menu']
		},
		accordion:{
			js:'jquery.accordion.js',
			css:'accordion.css',
			dependencies:['panel']
		},
		calendar:{
			js:'jquery.calendar.js',
			css:'calendar.css'
		},
        radiobox:{
            js:'jquery.radiobox.js',
            dependencies:['validatebox']
		},
        checkbox:{
			js:'jquery.checkbox.js',
            dependencies:['validatebox']
		},
		combo:{
			js:'jquery.combo.js',
			css:'combo.css',
			dependencies:['panel','validatebox']
		},
		combobox:{
			js:'jquery.combobox.js',
			css:'combobox.css',
			dependencies:['combo']
		},
		combotree:{
			js:'jquery.combotree.js',
			dependencies:['combo','tree']
		},
		combogrid:{
			js:'jquery.combogrid.js',
			dependencies:['combo','datagrid']
		},
		validatebox:{
			js:'jquery.validatebox.js',
			css:'validatebox.css'
		},
		numberbox:{
			js:'jquery.numberbox.js',
			dependencies:['validatebox']
		},
		searchbox:{
			js:'jquery.searchbox.js',
			css:'searchbox.css',
			dependencies:['menubutton']
		},
		spinner:{
			js:'jquery.spinner.js',
			css:'spinner.css',
			dependencies:['validatebox']
		},
		numberspinner:{
			js:'jquery.numberspinner.js',
			dependencies:['spinner','numberbox']
		},
		timespinner:{
			js:'jquery.timespinner.js',
			dependencies:['spinner']
		},
		tree:{
			js:'jquery.tree.js',
			css:'tree.css',
			dependencies:['draggable','droppable']
		},
		datebox:{
			js:'jquery.datebox.js',
			css:'datebox.css',
			dependencies:['calendar','combo']
		},
		datetimebox:{
			js:'jquery.datetimebox.js',
			dependencies:['datebox','timespinner']
		},
		slider:{
			js:'jquery.slider.js',
            css:'slider.css',
			dependencies:['draggable']
		},
		parser:{
			js:'jquery.parser.js'
		}
	};
	
	var locales = {
		'af':'easyui-lang-af.js',
		'bg':'easyui-lang-bg.js',
		'ca':'easyui-lang-ca.js',
		'cs':'easyui-lang-cs.js',
		'cz':'easyui-lang-cz.js',
		'da':'easyui-lang-da.js',
		'de':'easyui-lang-de.js',
		'en':'easyui-lang-en.js',
		'fr':'easyui-lang-fr.js',
		'nl':'easyui-lang-nl.js',
		'zh_CN':'easyui-lang-zh_CN.js',
		'zh_TW':'easyui-lang-zh_TW.js'
	};
	
	var queues = {};
	
	function loadJs(url, callback){
		var done = false;
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.language = 'javascript';
		script.src = url;
		script.onload = script.onreadystatechange = function(){
			if (!done && (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')){
				done = true;
				script.onload = script.onreadystatechange = null;
				if (callback){
					callback.call(script);
				}
			}
		}
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	
	function runJs(url, callback){
		loadJs(url, function(){
			document.getElementsByTagName("head")[0].removeChild(this);
			if (callback){
				callback();
			}
		});
	}
	
	function loadCss(url, callback){
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.media = 'screen';
		link.href = url;
		document.getElementsByTagName('head')[0].appendChild(link);
		if (callback){
			callback.call(link);
		}
	}
	
	function loadSingle(name, callback){
		queues[name] = 'loading';
		
		var module = modules[name];
		var jsStatus = 'loading';
		var cssStatus = (easyloader.css && module['css']) ? 'loading' : 'loaded';
		
		if (easyloader.css && module['css']){
			if (/^http/i.test(module['css'])){
				var url = module['css'];
			} else {
				var url = easyloader.base + 'themes/' + easyloader.theme + '/' + module['css'];
			}
			loadCss(url, function(){
				cssStatus = 'loaded';
				if (jsStatus == 'loaded' && cssStatus == 'loaded'){
					finish();
				}
			});
		}
		
		if (/^http/i.test(module['js'])){
			var url = module['js'];
		} else {
			var url = easyloader.base + 'plugins/' + module['js'];
		}
		loadJs(url, function(){
			jsStatus = 'loaded';
			if (jsStatus == 'loaded' && cssStatus == 'loaded'){
				finish();
			}
		});
		
		function finish(){
			queues[name] = 'loaded';
			easyloader.onProgress(name);
			if (callback){
				callback();
			}
		}
	}
	
	function loadModule(name, callback){
		var mm = [];
		var doLoad = false;
		
		if (typeof name == 'string'){
			add(name);
		} else {
			for(var i=0; i<name.length; i++){
				add(name[i]);
			}
		}
		
		function add(name){
			if (!modules[name]) return;
			var d = modules[name]['dependencies'];
			if (d){
				for(var i=0; i<d.length; i++){
					add(d[i]);
				}
			}
			mm.push(name);
		}
		
		function finish(){
			if (callback){
				callback();
			}
			easyloader.onLoad(name);
		}
		
		var time = 0;
		function loadMm(){
			if (mm.length){
				var m = mm[0];	// the first module
				if (!queues[m]){
					doLoad = true;
					loadSingle(m, function(){
						mm.shift();
						loadMm();
					});
				} else if (queues[m] == 'loaded'){
					mm.shift();
					loadMm();
				} else {
					if (time < easyloader.timeout){
						time += 10;
						setTimeout(arguments.callee, 10);
					}
				}
			} else {
				if (easyloader.locale && doLoad == true && locales[easyloader.locale]){
					var url = easyloader.base + 'locale/' + locales[easyloader.locale];
					runJs(url, function(){
						finish();
					});
				} else {
					finish();
				}
			}
		}
		
		loadMm();
	}
	
	easyloader = {
		modules:modules,
		locales:locales,
		
		base:'.',
		theme:'default',
		css:true,
		locale:'zh_CN',
		timeout:2000,
	
		load: function(name, callback){
			if (/\.css$/i.test(name)){
				if (/^http/i.test(name)){
					loadCss(name, callback);
				} else {
					loadCss(easyloader.base + name, callback);
				}
			} else if (/\.js$/i.test(name)){
				if (/^http/i.test(name)){
					loadJs(name, callback);
				} else {
					loadJs(easyloader.base + name, callback);
				}
			} else {
				loadModule(name, callback);
			}
		},

		onProgress: function(name){},
		onLoad: function(name){},
		onComplete:function (name) {
			
        }
	};

	var scripts = document.getElementsByTagName('script');
	for(var i=0; i<scripts.length; i++){
		var src = scripts[i].src;
		if (!src) continue;
		var m = src.match(/easyloader\.js(\W|$)/i);
		if (m){
			easyloader.base = src.substring(0, m.index);
		}
	}

	window.using = easyloader.load;
	
	if (window.jQuery){
		jQuery(function(){
			easyloader.load('parser', function(){
                easyloader.load(easyloader.base+'api.js');
                easyloader.load(easyloader.base+'themes/base.css');
                easyloader.load(easyloader.base+'themes/common.css');
                easyloader.load(easyloader.base+'themes/icon.css');
                jQuery.parser.parse($('body'),true);
                easyloader.onComplete = page.init;

			});
		});
	}
	
})();