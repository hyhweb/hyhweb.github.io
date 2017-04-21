
var now = { row: 1, col: 1 }, last = { row: 0, col: 0 };
$(function () {

    var nowdata = getCookie("nowdata");
    if (nowdata != "" && nowdata != null) {
        $(".page-1-1").removeClass('page-current');
        $(".page-1-1").addClass("hide");
        $(".page-1-1").find("img").addClass("hide");
        $(".page-" + nowdata + "-1").removeClass("hide");
        $(".page-" + nowdata + "-1").addClass('page-current');
        $(".page-" + nowdata + "-1").find("img").removeClass("hide");
        now = { row: parseInt(nowdata), col: 1 };
    }
});

(function () {

var towards = { up:1, right:2, down:3, left:4};
var isAnimating = false;

var s=window.innerHeight/500;
var ss = 250 * (1 - s);
var outClass, inClass;

$('.wrap').css('-webkit-transform', 'scale(' + s + ',' + s + ') translate(0px,-' + ss + 'px)');

    
document.addEventListener('touchmove',function(event){
	event.preventDefault(); },false);

    $(document).swipeUp(function() {
        if (isAnimating) return;
        last.row = now.row;
        last.col = now.col;
        
        if (last.row != 16) {
            now.row = last.row + 1;
            now.col = 1;
            delCookie("nowdata");
            setCookie("nowdata", now.row);
var nowdata = getCookie("nowdata");
var a=nowdata;
            pageMove(towards.up);
        } //控制可以向下滑的页数。
    });

    $(document).swipeDown(function() {
        if (isAnimating) return;
        last.row = now.row;
        last.col = now.col;
       
        if (last.row != 1) {
            now.row = last.row - 1;
            now.col = 1;
            delCookie("nowdata");
            setCookie("nowdata", now.row);
            pageMove(towards.down);
        }
    });

/*$(document).swipeLeft(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row>1 && last.row<5 && last.col==1) { now.row = last.row; now.col = 2; pageMove(towards.left);}	
})*///如果横向页面大于等于2，控制向左滚动

/*$(document).swipeRight(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row>1 && last.row<5 && last.col==2) { now.row = last.row; now.col = 1; pageMove(towards.right);}	
})*///如果横向页面大于等于2，控制向右滚动

function pageMove(tw){
	var lastPage = ".page-"+last.row+"-"+last.col,
		nowPage = ".page-"+now.row+"-"+now.col;
	
	switch(tw) {
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case towards.right:
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
			break;
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
		case towards.left:
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	setTimeout(function(){
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(lastPage).find("img").addClass("hide");

		//$(nowPage).removeClass("hide");
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		$(nowPage).find("img").removeClass("hide");
		
		isAnimating = false;
	},600);
}
    


})();

function shareStar() {
    $(".page-29-1").removeClass('page-current');
    $(".page-29-1").removeClass('pt-page-moveToTop');
    $(".page-29-1").addClass("hide");
    $(".page-29-1").find("img").addClass("hide");
    $(".page-8-1").removeClass("hide");
    $(".page-8-1").addClass('page-current');
    $(".page-8-1").removeClass("pt-page-moveToTop");
    $(".page-8-1").find("img").removeClass("hide");
    now = { row: 8, col: 1 };
}
//写cookies 

function setCookie(name, value) {
    var Days = 8;
    var exp = new Date();
    exp.setTime(exp.getTime() +  10 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取cookies 
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

//删除cookies 
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}