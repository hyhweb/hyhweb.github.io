<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Comment.ascx.cs" Inherits="Trade.Controls.Comment" %>
<asp:Repeater ID="commentbox" runat="server">
<ItemTemplate>
<div class="nav-box commentbox">
<div class="nav-header">About <%#Eval("CommentTitle")%></div>
<div class="nav-body">
<div class="commenttext"><p>
<img  src='<%#Eval("CommentUrl")%>' />
<%#Eval("CommentText")%>
</p>
</div>

</div>
</div>
</ItemTemplate>

</asp:Repeater>