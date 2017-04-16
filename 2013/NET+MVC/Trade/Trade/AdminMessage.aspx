<%@ Page Language="C#" MasterPageFile="~/Admin.Master" AutoEventWireup="true" CodeBehind="AdminMessage.aspx.cs" Inherits="Trade.AdminMessage" Title="无标题页" %>
<%@ Register Src="~/Controls/MessageControl.ascx" TagName="MessageControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="TradeContentPlaceHolder" runat="server">
 <Trade:MessageControl ID="messagebox" runat="server" />
</asp:Content>
