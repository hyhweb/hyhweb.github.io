<%@ Page Language="C#" MasterPageFile="~/Page.Master" AutoEventWireup="true" CodeBehind="NewsDetailById.aspx.cs" Inherits="Trade.NewsDetailById" Title="无标题页" %>
<%@ Register Src="~/Controls/NewsDetailControl.ascx" TagName="NewsDetailControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageContentPlaceHolder" runat="server">
<Trade:NewsDetailControl ID="newsdetailcontrol" runat="server" />
</asp:Content>
