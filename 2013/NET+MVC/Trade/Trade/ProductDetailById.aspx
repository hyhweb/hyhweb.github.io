<%@ Page Language="C#" MasterPageFile="~/Page.Master" AutoEventWireup="true" CodeBehind="ProductDetailById.aspx.cs" Inherits="Trade.ProductDetailById" Title="无标题页" %>
<%@ Register Src="~/Controls/ProductDetail.ascx" TagName="ProductDetail" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/SlideImg.ascx" TagName="SlideImg" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageContentPlaceHolder" runat="server">
<Trade:ProductDetail ID="productdetailbox" runat="server" />
<Trade:SlideImg ID="slidebox1" runat="server" />
</asp:Content>
