<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="banner.ascx.cs" Inherits="Trade.Controls.banner" %>
<script type="text/javascript">
$(function(){
$("#temp6").Slide({
		effect : "scroolY",
    	speed : "normal",
		timer : 4000
	});

});
</script>
  <div id="temp6" style="margin-top:10px;">
    <div class="JQ-content-box" style="width:1200px; height:250px;">
      <ul style="top: -144px;" class="JQ-slide-content">
        <li style="height:200px;"> <a href="" 
target="_blank"><img alt="" title="" 
src="ProductImgs/g1.jpg" 
width="1200" height="250"></a> </li>
        <li style="height:200px;"> <a href="" 
target="_blank"><img alt="" title="" 
src="ProductImgs/g2.jpg"
 width="1200" height="250"></a> </li>
        <li style="height:200px;"> <a href="" 
target="_blank"><img alt="" title="" 
src="ProductImgs/g3.jpg" 
width="1200" height="250"></a> </li>
      </ul>
      <ul class="JQ-slide-nav">
        <li class="">1</li>
        <li class="on">2</li>
        <li class="">3</li>
      </ul>
    </div>
  </div>