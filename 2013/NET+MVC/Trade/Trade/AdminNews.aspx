<%@ Page Language="C#" MasterPageFile="~/Admin.Master" AutoEventWireup="true" CodeBehind="AdminNews.aspx.cs" Inherits="Trade.WebForm1" Title="无标题页" %>
<%@ Register Src="~/Controls/NewsEditControl.ascx" TagName="NewsEditControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="TradeContentPlaceHolder" runat="server">
  <Trade:NewsEditControl ID="newseditbox" runat="server" />

</asp:Content>
