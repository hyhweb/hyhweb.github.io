<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CompanyEditeControl.ascx.cs" Inherits="Trade.Controls.CompanyEditeControl" %>
<div class="edit_section">
<div><label>公司名称</label><input id="company" type="text" value="" runat="server" /></div>
<div><label>公司地址</label><input id="address" type="text" value="" runat="server"  /></div>
<div><label>公司所在城市</label><input id="city" type="text" value=""  runat="server" /></div>
<div><label>公司固话</label><input id="telephone" type="text" value="" runat="server"  /></div>
<div><label>公司移动电话</label><input id="mobilephone" type="text" value="" runat="server"  /></div>
<div><label>公司传真</label><input id="fax" type="text" value="" runat="server"  /></div>
<div><label>公司邮箱</label><input id="email" type="text" value="" runat="server"  /></div>
</div>
<asp:Repeater ID="companyedite" runat="server" 
        onitemcommand="companyedite_ItemCommand">
<HeaderTemplate>
<table>
<tr>
<td>公司名称</td>
<td>公司地址</td>
<td>公司所在城市</td>
<td>公司固话</td>
<td>公司移动电话</td>
<td>公司传真</td>
<td>公司邮箱</td>
</tr>

</HeaderTemplate>
<ItemTemplate>
<tr>
<td><%#Eval("Company")%></td>
<td><%#Eval("Address")%></td>
<td><%#Eval("City")%></td>
<td><%#Eval("Telephone")%></td>
<td><%#Eval("Mobilephone")%></td>
<td><%#Eval("Fax")%></td>
<td><%#Eval("Email")%></td>
<td><asp:LinkButton ID="editbtn" runat="server" Text="编辑" CommandName="edit" CommandArgument='<%#Eval("Id")%>'></asp:LinkButton></td>
</tr>
</ItemTemplate>
<FooterTemplate>
</table>
</FooterTemplate>
</asp:Repeater>