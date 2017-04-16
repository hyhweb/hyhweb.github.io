<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ProductByCatagoryControl.ascx.cs" Inherits="Trade.Controls.ProductByCatagoryControl" %>
<div class="product-box">
<div class="product-header">product</div>
<div class="productbox">
<asp:Repeater ID="product" runat="server" OnItemDataBound="ItemDataBound">
<ItemTemplate>
<div class="product-item">
<div>
<a href='ProductDetailById.aspx?id=<%#Eval("Id")%>' >
<img class="product-img" alt='<%#Eval("ProductKeyWord")%>' title='<%#Eval("ProductTitle")%>' src='<%#Eval("ProductUrl")%>' />
</a>
</div>
<div>
<a href='ProductDetailById.aspx?id=<%#Eval("Id")%>' >
<span class="product-title"><%#Eval("ProductTitle")%></span>
</a>
<%--<span class="product-keyword"><%#Eval("ProductKeyWord")%></span>--%>
<span class="product-price"><asp:Label  Text="" ID="productprice" runat="server" ></asp:Label><asp:HiddenField ID="pricetext" runat="server" Value='<%#Eval("ProductPrice") %>'></asp:HiddenField></span>
</div>
</div>
</ItemTemplate>
</asp:Repeater>
</div>

<div class="page">
<asp:HyperLink ID="firstpage" Text="First" runat="server"></asp:HyperLink>
<asp:HyperLink ID="pageprev" Text="Prev" runat="server"></asp:HyperLink>

<asp:HyperLink ID="HyperLink1"  runat="server"></asp:HyperLink>
<asp:HyperLink ID="HyperLink2"  runat="server"></asp:HyperLink>
<asp:HyperLink ID="HyperLink3"  runat="server"></asp:HyperLink>
<asp:HyperLink ID="HyperLink4"  runat="server"></asp:HyperLink>
<asp:HyperLink ID="HyperLink5"  runat="server"></asp:HyperLink>

<asp:HyperLink ID="pagenext" Text="Next" runat="server"></asp:HyperLink>
<asp:HyperLink ID="lastpage" Text="Last" runat="server"></asp:HyperLink>
</div>
</div>

