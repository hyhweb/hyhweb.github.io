<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="NewsDetailControl.ascx.cs" Inherits="Trade.Controls.NewsDetailControl" %>
<div class="nav-box">
<div class="nav-header">news</div>
<div class="nav-body">
<asp:Repeater ID="newsshowbox" runat="server">
<ItemTemplate>

<div class="news-item" style="font-weight:bold; text-align:center;"><%#Eval("NewsTitle")%></div>
<div class="news-item"><%#Eval("NewsText")%></div>
</ItemTemplate>
</asp:Repeater>

</div>
</div>

