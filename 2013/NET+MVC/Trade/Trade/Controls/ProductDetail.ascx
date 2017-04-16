<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ProductDetail.ascx.cs" Inherits="Trade.Controls.ProductDetail" %>
<asp:Repeater ID="productdetail" runat="server" OnItemDataBound="ItemDataBound" onitemcommand="productdetail_ItemCommand" 
  >
<ItemTemplate>
<div class="nav-box">
<div class="nav-header">Product Detail</div>
<div class="nav-body">
<div style=" display:inline-block; width:300px; vertical-align:top;">
<img class="product-img" alt='<%#Eval("ProductKeyWord")%>' title='<%#Eval("ProductTitle")%>' src='<%#Eval("ProductUrl")%>' />
</div>
<div style=" display:inline-block; width:500px;vertical-align:top;">
<div class="product-title"><%#Eval("ProductTitle")%></div>
<div class="product-title"><%#Eval("ProductKeyWord")%></div>
<div class="product-price"><asp:Label  Text="" ID="productprice" runat="server" ></asp:Label><asp:HiddenField ID="pricetext" runat="server" Value='<%#Eval("ProductPrice") %>'></asp:HiddenField></div>
<div><asp:Button ID="orderbtn" Text="Order" runat="server"  style=" margin:0px;"/>
</div>
</div>

</div>

</div>


<div class="nav-box">
<div class="nav-header">Product Comment</div>
<div class="nav-body">
<%#Eval("ProductComment")%>
</div>
</div>
</ItemTemplate>
 
</asp:Repeater>