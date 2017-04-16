<%@ Page Language="C#" MasterPageFile="~/Admin.Master" AutoEventWireup="true" CodeBehind="AdminCatagory.aspx.cs" Inherits="Trade.AdminCatagory" Title="无标题页" %>
<%@ Register Src="~/Controls/CatagoryEditControl.ascx" TagName="CatagoryEditControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="TradeContentPlaceHolder" runat="server">
<Trade:CatagoryEditControl ID="catagoryeditcontrol" runat="server" />
</asp:Content>
