<%@ Page Language="C#" MasterPageFile="~/Page.Master" AutoEventWireup="true" CodeBehind="Product.aspx.cs" Inherits="Trade.Product1" Title="无标题页" %>
<%@ Register Src="~/Controls/ProductControl.ascx" TagName="ProductControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageContentPlaceHolder" runat="server">
<Trade:ProductControl ID="productbox" runat="server" />
</asp:Content>
