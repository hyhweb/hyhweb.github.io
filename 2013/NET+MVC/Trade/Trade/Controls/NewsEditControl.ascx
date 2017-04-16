<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="NewsEditControl.ascx.cs" Inherits="Trade.Controls.NewsEditControl" %>

<div class="edit-section">
<div><label>新闻标题</label><input class="" id="newstitle" runat="server" /></div>
<div><label>新闻标题</label><textarea class="" id="newstext" runat="server"></textarea></div>
<div><asp:Button ID="addnews" Text="新增" runat="server" onclick="addnews_Click" /></div>
</div>

<asp:Repeater ID="newsedit" runat="server" onitemcommand="newsshow_ItemCommand">
<HeaderTemplate>
<table  cellpadding="0" cellspacing="0">
<tr>
<td>新闻标题</td>
<td>新闻内容</td>
<td  colspan="2"></td>
</tr>
</HeaderTemplate>
<ItemTemplate>
<tr>
<td><%#Eval("NewsTitle")%></td>
<td><%#Eval("NewsText")%></td>
<td><asp:LinkButton ID="editbtn" runat="server" Text="编辑" CommandName="edit" CommandArgument='<%#Eval("Id")%>'></asp:LinkButton></td>
<td><asp:LinkButton ID="deletebtn" runat="server" Text="删除" CommandName="delete" CommandArgument='<%#Eval("Id")%>'></asp:LinkButton></td>
</tr>
</ItemTemplate>

<FooterTemplate>
</table>
</FooterTemplate>
</asp:Repeater>

