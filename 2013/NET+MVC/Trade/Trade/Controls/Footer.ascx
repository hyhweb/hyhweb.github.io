<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Footer.ascx.cs" Inherits="Trade.Controls.Footer" %>
<div class="footer-section">
<asp:Repeater ID="footermenu" runat="server">
<HeaderTemplate>
<ul class="footermenu">
</HeaderTemplate>
<ItemTemplate>
<li class="menu-item"><a href='<%#Eval("Url") %>'><%#Eval("Menu")%></a></li>
</ItemTemplate>
<FooterTemplate>
</ul>
</FooterTemplate>
</asp:Repeater>
<asp:Repeater ID="footercompany" runat="server">
<ItemTemplate>
<ul class="footercompany">
<li style="float:left;">Telephone:<%#Eval("Telephone")%></li>
<li style="float:left; padding-left:90px;">Mobilephone:<%#Eval("Mobilephone")%></li>
<li style=" clear:both;">Fax:<%#Eval("Fax")%></li>
<li>Address:<%#Eval("Address")%></li>

</ul>
</ItemTemplate>

</asp:Repeater>

</div>
<div class="copyright">donguan huibo stainless steel jewelry factory</div>