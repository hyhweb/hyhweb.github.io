<%@ Page Language="C#" MasterPageFile="~/Page.Master" AutoEventWireup="true" CodeBehind="FAQS.aspx.cs" Inherits="Trade.Controls.FAQS" Title="无标题页" %>
<%@ Register Src="~/Controls/FAQSControl.ascx" TagName="FAQSControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageContentPlaceHolder" runat="server">
<Trade:FAQSControl ID="faqscontrolbox" runat="server" />
</asp:Content>
