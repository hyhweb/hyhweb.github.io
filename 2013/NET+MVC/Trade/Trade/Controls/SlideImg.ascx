<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SlideImg.ascx.cs" Inherits="Trade.Controls.SlideImg" %>
<script type="text/javascript">
$(function(){
	$("#temp4").Slide({
		effect : "scroolX",
    	speed : "normal",
		timer : 2000,
		steps:1,
		showNum:3
		
	});

});
</script>
<div class="nav-box">
<div class="nav-header">products Show</div>
<div class="nav-body" style="padding:0px;">


  <div id="slide-box" style="width:900px; overflow:hidden; margin:0px 20px; "> 
    <div class="" id="temp4" style=" height:250px; ">
      <div class="" style="">
        <ul style="width: 2040px;" class="JQ-slide-content ">
          <li><a href="" target="_blank"><img  class="product-img"
src="ProductImgs/s1.jpg" 
alt="" width="330" height="450"></a></li>
          <li><a href="" target="_blank"><img class="product-img"
alt="" 
src="ProductImgs/s2.jpg" 
width="330" height="450"></a></li>
          <li><a href="" target="_blank"><img class="product-img"
alt="" 
src="ProductImgs/s3.jpg" 
width="330" height="450"></a></li>
          <li><a href="" target="_blank"><img class="product-img"
alt="" 
src="ProductImgs/s4.jpg" 
width="330" height="450"></a></li>
          <li><a href="" target="_blank"><img class="product-img"
alt="" 
src="ProductImgs/s5.jpg" 
width="330" height="450"></a></li>
          <li><a href="" target="_blank"><img class="product-img"
alt="" 
src="ProductImgs/s6.jpg" 
width="330" height="450"></a></li>

        </ul>
      </div>
          <div class="JQ-slide-nav"> 
      <a class="prev" href="#"> <span>‹</span></a> 
<a class="next" href="#"><span>›</span></a> 
</div> 
    </div>
    
 


   </div>
     </div>

     </div>