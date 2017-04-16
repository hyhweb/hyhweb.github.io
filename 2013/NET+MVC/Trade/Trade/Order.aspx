<%@ Page Language="C#" MasterPageFile="~/Page.Master" AutoEventWireup="true" CodeBehind="Order.aspx.cs" Inherits="Trade.Ord1" Title="无标题页" %>
<%@ Register Src="~/Controls/MessageSubmitControl.ascx" TagName="MessageSubmitControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageContentPlaceHolder" runat="server">
 <Trade:MessageSubmitControl ID="messagesubmit" runat="server"  />
</asp:Content>
