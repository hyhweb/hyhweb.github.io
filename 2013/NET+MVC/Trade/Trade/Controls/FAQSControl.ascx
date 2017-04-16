<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FAQSControl.ascx.cs" Inherits="Trade.Controls.FAQSControl" %>
<div  class="nav-box">
<div class="nav-header">FAQS</div>
<div class="nav-body">
<asp:Repeater ID="paymentbox" runat="server">
<ItemTemplate>
<div><%#Eval("PageText") %></div>
</ItemTemplate>
</asp:Repeater>
</div>
</div>
