<%@ Page Language="C#" MasterPageFile="~/Page.Master" AutoEventWireup="true" CodeBehind="ProductByCatagory.aspx.cs" Inherits="Trade.ProductByCatagory1" Title="无标题页" %>
<%@ Register Src="~/Controls/LoginControl.ascx" TagName="LoginControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/MenuControl.ascx" TagName="MenuControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/ProductControl.ascx" TagName="ProductControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/CatagoryControl.ascx" TagName="CatagoryControl"  TagPrefix="Trade" %>
<%@ Register Src="~/Controls/MessageControl.ascx" TagName="MessageControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/NewsControl.ascx" TagName="NewsControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/ProductByCatagoryControl.ascx" TagName="ProductByCatagoryControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageContentPlaceHolder" runat="server">
<Trade:ProductByCatagoryControl ID="productbycatagory" runat="server" />
</asp:Content>
