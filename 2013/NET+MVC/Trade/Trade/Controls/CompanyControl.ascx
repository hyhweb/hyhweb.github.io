<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CompanyControl.ascx.cs" Inherits="Trade.Controls.CompanyControl" %>
<div class="nav-box">
<div class="nav-header">contact us</div>
<div class="nav-body">
<asp:Repeater ID="company" runat="server">
<ItemTemplate>
<ul>
<li>Company:<%#Eval("Company")%></li>
<li>Address:<%#Eval("Address")%></li>
<li>City:<%#Eval("City")%></li>
<li>Telephone:<%#Eval("Telephone")%></li>
<li>Mobilephone:<%#Eval("Mobilephone")%></li>
<li>Fax:<%#Eval("Fax")%></li>
<li>Email:<%#Eval("Email")%></li>
</ul>
</ItemTemplate>
</asp:Repeater>

</div>
</div>
