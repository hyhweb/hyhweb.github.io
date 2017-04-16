<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="AboutUsControl.ascx.cs" Inherits="Trade.Controls.AboutUsControl" %>
<div  class="nav-box">
<div class="nav-header">About Us</div>
<div class="nav-body">
<asp:Repeater ID="paymentbox" runat="server">
<ItemTemplate>
<div><%#Eval("PageText") %></div>
</ItemTemplate>
</asp:Repeater>
</div>
</div>
