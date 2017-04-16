<%@ Page Language="C#" MasterPageFile="~/Admin.Master" AutoEventWireup="true" CodeBehind="AdminOtherPage.aspx.cs" Inherits="Trade.AdminPayment" Title="无标题页" %>
<%@ Register Src="~/Controls/PayMentEditControl.ascx" TagName="PayMentEditControl" TagPrefix="Trade" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="TradeContentPlaceHolder" runat="server">

<Trade:PayMentEditControl ID="paymenteditcontrol" runat="server" />


</asp:Content>
