<%@ Page Language="C#" MasterPageFile="~/Page.Master" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="Trade.Index" Title="无标题页" %>
<%@ Register Src="~/Controls/LoginControl.ascx" TagName="LoginControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/MenuControl.ascx" TagName="MenuControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/ProductControl.ascx" TagName="ProductControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/CatagoryControl.ascx" TagName="CatagoryControl"  TagPrefix="Trade" %>
<%@ Register Src="~/Controls/MessageControl.ascx" TagName="MessageControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/NewsControl.ascx" TagName="NewsControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/Comment.ascx" TagName="Comment" TagPrefix="Trade"%>
<%@ Register Src="~/Controls/Footer.ascx" TagName="Footer" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/SlideImg.ascx" TagName="SlideImg" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageContentPlaceHolder" runat="server">
<Trade:ProductControl ID="productbox" runat="server"/>
<Trade:Comment ID="comment" runat="server" />
<Trade:SlideImg ID="slidebox" runat="server" />
</asp:Content>
