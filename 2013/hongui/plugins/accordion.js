(function ($) {
    $.fn.accordion = function(options) {
        return $.hongui.run.call(this,"accordion",options)
     
    };
    $.honguidefaults.accordion = {};
    $.honguimethods.accordion = { };
    $.hongui.controls.accordion =function(element,options){
        return $.hongui.controls.accordion.base.constructor.call(this,element,options);
    }
    $.hongui.controls.accordion.honguiextend($.hongui.core.uicomponent,{
        __getType: function () {
            return "accordion";
        },
        __idPrev: function () {
            return "accordion";
        },
        _extendmethods:function (){
          return $.hongui.controls.accordion;
        },
        _render: function (){
            var g = this, p = this.options;
            g.set(p);
            g.accordion = $(this.element);
           if(!g.accordion.hasClass("accordion")){g.accordion.addClass("accordion")};
            $("> div", g.accordion).each(function (i,item) {
                var title =  $(this).attr("title");
                $(this).addClass("accordion-cntent");
                if(!title) return;
               // debugger;
                var itemheader = $('<div class="item-header"></div>').html(title);
               itemheader.insertBefore( $(this));
            });
            $("> .item-header" ,g.accordion).each(function (i,item) {
                var currentconten =$(this).next(".accordion-cntent");
                currentconten.addClass("item-closed").hide();
                $(this).click(function () {
                    $(this).addClass("item-selected").siblings(".item-header").removeClass("item-selected");
                    if(!currentconten.hasClass("item-expand")){
                    currentconten.removeClass("item-closed");
                    currentconten.addClass("item-expand").slideDown();
                    currentconten.siblings(".accordion-cntent").removeClass("item-expand").addClass("item-closed").slideUp();}
                    else{
                    currentconten.addClass("item-closed");
                    currentconten.removeClass("item-expand").slideUp(); }
                    }).hover(function(){$(this).toggleClass("item-over")});
            })
         
        }
    });
})(jQuery);