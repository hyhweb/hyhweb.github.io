<%@ Page Language="C#" MasterPageFile="~/Admin.Master" AutoEventWireup="true" CodeBehind="AdminProduct.aspx.cs" Inherits="Trade.AdminProduct" Title="无标题页" %>
<%@ Register Src="~/Controls/ProductEditControl.ascx"TagName="ProductEditControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="TradeContentPlaceHolder" runat="server">
<Trade:ProductEditControl ID="producteditcontrol" runat="server" />
</asp:Content>
