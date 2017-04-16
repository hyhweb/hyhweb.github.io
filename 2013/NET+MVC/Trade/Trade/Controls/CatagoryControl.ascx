<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CatagoryControl.ascx.cs" Inherits="Trade.Controls.CatagoryControl" %>


<div class="nav-box">
<div class="nav-header">catagory</div>
<div class="nav-body">

<asp:Repeater ID="catagory" runat="server">
<ItemTemplate>
<div class="catagory-item"><a href='../ProductByCatagory.aspx?Catagory=<%#Eval("Catagory") %>' ><%#Eval("Catagory") %></a></div>
</ItemTemplate>
</asp:Repeater>
</div>
</div>