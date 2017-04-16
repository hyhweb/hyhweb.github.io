<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MenuControl.ascx.cs" Inherits="Trade.Controls.MenuControl" %>
<asp:DataGrid ID="menuid"  runat="server"></asp:DataGrid>

<div class="menubox">
<asp:Repeater ID="menu" runat="server">
<ItemTemplate>
<div class="menu-item"><a href='<%#Eval("Url") %>'><%#Eval("Menu")%></a></div>
</ItemTemplate>
</asp:Repeater>
</div>