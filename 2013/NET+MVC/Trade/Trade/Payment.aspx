<%@ Page Language="C#" MasterPageFile="~/Page.Master" AutoEventWireup="true" CodeBehind="Payment.aspx.cs" Inherits="Trade.Payment1" Title="无标题页" %>
<%@ Register Src="~/Controls/PayMentControl.ascx" TagName="PayMentControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageContentPlaceHolder" runat="server">
<Trade:PayMentControl ID="paymentbox" runat="server" />
</asp:Content>
