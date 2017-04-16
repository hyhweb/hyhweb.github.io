<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="NewsControl.ascx.cs" Inherits="Trade.Controls.NewsControl" %>
<div class="nav-box">
<div class="nav-header">news</div>
<div class="nav-body">
<asp:Repeater ID="newsshow" runat="server">
<ItemTemplate>

<div class="news-item"><a href='NewsDetailById.aspx?id=<%#Eval("Id")%>'><%#Eval("NewsTitle")%></a></div>

</ItemTemplate>
</asp:Repeater>

</div>
</div>

