<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CatagoryEditControl.ascx.cs" Inherits="Trade.Controls.CatagoryEditControl" %>

<div class="edit-section">
<ul>
<li><label>类别名称：</label><input type="text" id="catagoryname" runat="server" value="" /></li>
<li><label>类别链接：</label><input type="text" id="catagoryurl" runat="server" value="" /></li>
<li><asp:Button Text="新增" ID="submintbtn" runat="server" 
        onclick="submintbtn_Click" /></li>
</ul>
</div>

<div class="catagorybox">
<asp:Repeater ID="catagory" runat="server" onitemcommand="catagory_ItemCommand">
<HeaderTemplate>
<table cellpadding="0" cellspacing="0" >
<tr>
<td>类别名称</td>
<td>类别链接</td>
<td  colspan="2"></td>
</tr>

</HeaderTemplate>
<ItemTemplate>
<tr>
<td><%#Eval("Catagory") %></td>
<td><%#Eval("Url") %></td>
<td><asp:LinkButton ID="catagoryedit" runat="server" Text="编辑" CommandName="edit" CommandArgument='<%#Eval("Id")%>' ></asp:LinkButton></td>
<td><asp:LinkButton ID="catagorydelete" runat="server" Text="删除" CommandName="delete" CommandArgument='<%#Eval("Id")%>' ></asp:LinkButton></td>
</tr>

</ItemTemplate>
<FooterTemplate>
</table>
</FooterTemplate>
</asp:Repeater>
</div>