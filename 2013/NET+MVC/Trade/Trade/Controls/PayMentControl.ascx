<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PayMentControl.ascx.cs" Inherits="Trade.Controls.PControl" %>
<div  class="nav-box">
<div class="nav-header">Payment</div>
<div class="nav-body">
<asp:Repeater ID="paymentbox" runat="server">
<ItemTemplate>
<div><%#Eval("PageText") %></div>
</ItemTemplate>
</asp:Repeater>
</div>
</div>
