<%@ Page Language="C#" MasterPageFile="~/Page.Master" AutoEventWireup="true" CodeBehind="AboutUs.aspx.cs" Inherits="Trade.AboutUs" Title="无标题页" %>
<%@ Register Src="~/Controls/AboutUsControl.ascx" TagName="AboutUsControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageContentPlaceHolder" runat="server">
<Trade:AboutUsControl ID="aboutusbox" runat="server" />
</asp:Content>
