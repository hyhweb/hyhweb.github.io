<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ProductEditControl.ascx.cs" Inherits="Trade.Controls.ProductEditControl" %>
<%@ Register Src="~/Controls/FileUpload.ascx" TagName="FileUploadControl" TagPrefix="Trade" %>

<div class="edit-section">
    
<ul>
<li><label>产品图片：</label><asp:TextBox ID="filetext" style="display:none;" Text="" runat="server"></asp:TextBox><asp:FileUpload ID="fileupload"  runat="server" /><asp:Label ID="label" runat="server"></asp:Label></li>
<li><label>产品标题：</label><input type="text" id="producttitle" runat="server" /></li>
<li><label>产品类别：</label><input type="text" id="productcatagory" runat="server" /></li>
<li><label>产品关键词：</label><input type="text" id="productkeyword" runat="server" /></li>
<li><label>产品价格：</label><input type="text" id="productprice" runat="server" /></li>
<li><label>产品评价推广：</label><textarea id="productcomment" runat="server"></textarea>
<li><asp:Button ID="addbtn" Text="新增" runat ="server" onclick="addbtn_Click" /></li>
</ul>
</div>
<div class="productbox">
<asp:Repeater ID="adproductedit" runat="server" 
        onitemcommand="adproductedit_ItemCommand">
<HeaderTemplate>
<table cellpadding="0" cellspacing="0">
<tr>
<td>产品图片</td>
<td>产品标题</td>
<td>产品类别</td>
<td>产品关键词</td>
<td>产品价格</td>
<td  colspan="2"></td>
</tr>
</HeaderTemplate>
<ItemTemplate>
<tr>
<td><img class="product-img smallimg" alt='<%#Eval("ProductKeyWord")%>' title='<%#Eval("ProductTitle")%>' src='<%#Eval("ProductUrl")%>' /></td>
<td><%#Eval("ProductTitle")%></td>
<td><%#Eval("ProductCatagory")%></td>
<td><%#Eval("ProductKeyWord")%></td>
<td><%#Eval("ProductPrice")%></td>
<td><asp:LinkButton ID="editbtn" Text="编辑" runat="server" CommandName="edit" CommandArgument='<%#Eval("Id")%>'></asp:LinkButton></td>
<td><asp:LinkButton ID="deletebtn" Text="删除" runat="server" CommandName="delete" CommandArgument='<%#Eval("Id")%>'></asp:LinkButton></td>
</tr>
</ItemTemplate>
<FooterTemplate>
</table>
</FooterTemplate>

</asp:Repeater>

</div>

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
