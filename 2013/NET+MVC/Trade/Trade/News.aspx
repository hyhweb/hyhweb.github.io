<%@ Page Language="C#" MasterPageFile="~/Page.Master" AutoEventWireup="true" CodeBehind="News.aspx.cs" Inherits="Trade.News" Title="无标题页" %>
<%@ Register Src="~/Controls/CompanyControl.ascx" TagName="CompanyControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/NewsControl.ascx"TagName="NewsControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/NewsAllControl.ascx" TagName="NewsAllControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageContentPlaceHolder" runat="server">
<Trade:NewsAllControl ID="newsallcontrol" runat="server" />
</asp:Content>
