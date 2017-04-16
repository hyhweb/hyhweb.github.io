<%@ Page Language="C#" MasterPageFile="~/Admin.Master" AutoEventWireup="true" CodeBehind="AdminMenu.aspx.cs" Inherits="Trade.AdminMenu" Title="无标题页" %>
<%@ Register Src="~/Controls/MenuEditeControl.ascx" TagName="MenuEditeControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="TradeContentPlaceHolder" runat="server">
<Trade:MenuEditeControl  ID="menueditecontrol" runat="server" />
</asp:Content>
