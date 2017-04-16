<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MenuEditeControl.ascx.cs" Inherits="Trade.Controls.MenuEditeControl" %>


<div class="">

<div class="edit-section">
<ul>
<li><label>菜单名称：</label><input type="text" id="menuname" runat="server" value="" /></li>
<li><label>菜单链接：</label><input type="text" id="menuurl" runat="server" value="" /></li>
<li><asp:Button Text="新增" ID="submintbtn" runat="server" 
        onclick="submintbtn_Click" /></li>
</ul>
</div>


<asp:Repeater ID="menuedit" runat="server" onitemcommand="menuedit_ItemCommand">
<HeaderTemplate>
<table cellpadding="0" cellspacing="0">
<tr>
<td>菜单名称</td>
<td>菜单链接</td>
<td  colspan="2"></td>
</tr>
</HeaderTemplate>
<ItemTemplate>
<tr>
<td><asp:Label id="number" Text='<%#Eval("Id") %>' runat="server"><%#Eval("Id") %></asp:Label></td>
<td><%#Eval("Menu")%></td>
<td><%#Eval("Url") %></td>
<td><%#Eval("SortID") %></td>
<td><asp:LinkButton ID="menuedit" runat="server" Text="编辑" CommandName="edit" CommandArgument='<%#Eval("Id")%>' ></asp:LinkButton></td>
<td><asp:LinkButton ID="menudelete" runat="server" Text="删除" CommandName="delete" CommandArgument='<%#Eval("Id")%>' ></asp:LinkButton></td>
<td><asp:LinkButton ID="up" runat="server" Text="上移" CommandName="up" CommandArgument='<%#Eval("SortID")%>'></asp:LinkButton></td>
<td><asp:LinkButton ID="down" runat="server" Text="下移" CommandName="down" CommandArgument='<%#Eval("SortID")%>'></asp:LinkButton></td>
</tr>
</ItemTemplate>
<FooterTemplate>
</table>
</FooterTemplate>
</asp:Repeater>
</div>