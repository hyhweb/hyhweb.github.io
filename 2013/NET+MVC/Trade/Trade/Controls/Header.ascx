<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Header.ascx.cs" Inherits="Trade.Controls.Header" %>
<div class="header-up">
<div class="logobox"><img src="../ProductImgs/2.jpg" width="50px" height="50px" />donguan huibo stainless steel jewelry factory</div>
<div class="header-left">
<asp:Repeater ID="headercompany" runat="server">
<ItemTemplate>
<ul class="headercompany" >
<li >Mobilephone:<%#Eval("Mobilephone")%></li>
<li >Fax:<%#Eval("Fax")%></li>
<li >Telephone:<%#Eval("Email")%></li>
</ul>
</ItemTemplate>

</asp:Repeater>
</div>
</div>