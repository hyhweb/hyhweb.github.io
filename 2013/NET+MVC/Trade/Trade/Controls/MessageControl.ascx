<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MessageControl.ascx.cs" Inherits="Trade.Controls.MessageControl" %>

<div class="edit-section">
<label>联系人：</label><input id="personname" type="text" value="" runat="server" /><asp:Button Text="搜索" 
        ID="searchbtn" runat="server" onclick="searchbtn_Click" />
</div>
<asp:Repeater ID="messagedatagrid" runat="server" onitemcommand="messagedatagrid_ItemCommand">
<HeaderTemplate>
<table cellpadding="0" cellspacing="0">
<tr>
<td>Id</td>
<td>产品名称</td>
<td>留言标题</td>
<td>留言内容</td>
<td>公司名称</td>
<td>国家/地区</td>
<td>联系人</td>
<td>联系电话</td>
<td>联系邮箱</td>
<td  colspan="2"></td>
</tr>
</HeaderTemplate>
<ItemTemplate>
<tr>
<td><%#Eval("Id") %></td>
<td><%#Eval("Product") %></td>
<td><%#Eval("MessageTitle") %></td>
<td><%#Eval("MessageText") %></td>
<td><%#Eval("CompanyName")%></td>
<td><%#Eval("Country")%></td>
<td><%#Eval("ContactPerson")%></td>
<td><%#Eval("Phone")%></td>
<td><%#Eval("Email")%></td>
<td><asp:LinkButton ID="deletebtn" runat="server" Text="删除" CommandName="delete" CommandArgument='<%#Eval("Id") %>'></asp:LinkButton></td>
</tr>
</ItemTemplate>
<FooterTemplate>
</table>
</FooterTemplate>
</asp:Repeater>


<div class="page">
<asp:HyperLink ID="firstpage" Text="First" runat="server"></asp:HyperLink>
<asp:HyperLink ID="pageprev" Text="Prev" runat="server"></asp:HyperLink>

<asp:HyperLink ID="HyperLink1"  runat="server"></asp:HyperLink>
<asp:HyperLink ID="HyperLink2"  runat="server"></asp:HyperLink>
<asp:HyperLink ID="HyperLink3"  runat="server"></asp:HyperLink>
<asp:HyperLink ID="HyperLink4"  runat="server"></asp:HyperLink>
<asp:HyperLink ID="HyperLink5"  runat="server"></asp:HyperLink>

<asp:HyperLink ID="pagenext" Text="Next" runat="server"></asp:HyperLink>
<asp:HyperLink ID="lastpage" Text="Last" runat="server"></asp:HyperLink>
</div>






