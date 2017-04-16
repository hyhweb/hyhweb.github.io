/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-13
 * Time: 下午11:10
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $.fn.DateEditor=function(options){
        var now,year,month,date,monthday,firstday;
        now=new Date();
        year=now.getFullYear();
        month=now.getMonth()+1;
        date=now.getDate();
        monthday=new Date(year,month,0).getDate();
        firstday=new Date(year,month-1,1).getDay();
        alert(firstday);
        var dateeditorHTML = "";
        dateeditorHTML += "<div class='l-box-dateeditor' >";
        dateeditorHTML += "    <div class='l-box-dateeditor-header'>";
        dateeditorHTML += "        <div class='l-box-dateeditor-header-btn l-box-dateeditor-header-prevyear'><span></span></div>";
        dateeditorHTML += "        <div class='l-box-dateeditor-header-btn l-box-dateeditor-header-prevmonth'><span></span></div>";
        dateeditorHTML += "        <div class='l-box-dateeditor-header-text'><a class='l-box-dateeditor-header-month'></a><a  class='l-box-dateeditor-header-year'></a></div>";
        dateeditorHTML += "        <div class='l-box-dateeditor-header-btn l-box-dateeditor-header-nextmonth'><span></span></div>";
        dateeditorHTML += "        <div class='l-box-dateeditor-header-btn l-box-dateeditor-header-nextyear'><span></span></div>";
        dateeditorHTML += "    </div>";
        dateeditorHTML += "    <div class='l-box-dateeditor-body'>";
        dateeditorHTML += "        <table cellpadding='0' cellspacing='0' border='0' class='l-box-dateeditor-calendar'>";
        dateeditorHTML += "            <thead>";
        dateeditorHTML += "                <tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr>";
        dateeditorHTML += "            </thead>";
        dateeditorHTML += "            <tbody>";
        dateeditorHTML += "                <tr class='l-first'><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr>";
        dateeditorHTML += "            </tbody>";
        dateeditorHTML += "        </table>";
        dateeditorHTML += "        <ul class='l-box-dateeditor-monthselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
        dateeditorHTML += "        <ul class='l-box-dateeditor-yearselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
        dateeditorHTML += "        <ul class='l-box-dateeditor-hourselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
        dateeditorHTML += "        <ul class='l-box-dateeditor-minuteselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
        dateeditorHTML += "    </div>";
        dateeditorHTML += "    <div class='l-box-dateeditor-toolbar'>";
        dateeditorHTML += "        <div class='l-box-dateeditor-time'></div>";
        dateeditorHTML += "        <div class='l-button l-button-today'></div>";
        dateeditorHTML += "        <div class='l-button l-button-close'></div>";
        dateeditorHTML += "        <div class='l-clear'></div>";
        dateeditorHTML += "    </div>";
        dateeditorHTML += "</div>";
        $(dateeditorHTML).appendTo("body");
        var prevMonthDayNum,monthDayNum
        prevMonthDayNum=new Date(year,month-1,0).getDate();
            monthDayNum=   new Date(year,month+1,0).getDate();
        $("tr", ".l-box-dateeditor-body").each(function (i, tr)
        {
            $("td", tr).each(function (j, td)
            {
                var id = i * 7 + (j - firstday);
                var showDay = id + 1;
                if (id < 0)
                {
                    showDay = prevMonthDayNum + showDay;
                    $(td).addClass("l-box-dateeditor-out")
                        .removeClass("l-box-dateeditor-selected");
                }
                else if (id > monthDayNum - 1)
                {
                    showDay = showDay - monthDayNum;
                    $(td).addClass("l-box-dateeditor-out")
                        .removeClass("l-box-dateeditor-selected");
                }
                $(td).html(showDay);
            });
        });


    };
})(jQuery);