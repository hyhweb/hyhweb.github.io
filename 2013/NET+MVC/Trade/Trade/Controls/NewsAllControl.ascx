<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="NewsAllControl.ascx.cs" Inherits="Trade.Controls.NewsAllControl" %>
<div class="nav-box">
<div class="nav-header">news</div>
<div class="nav-body">
<asp:Repeater ID="newsshowall" runat="server">
<ItemTemplate>

<div class="news-item"><a href='NewsDetailById.aspx?id=<%#Eval("Id")%>'><%#Eval("NewsTitle")%></a></div>

</ItemTemplate>
</asp:Repeater>

</div>
</div>

