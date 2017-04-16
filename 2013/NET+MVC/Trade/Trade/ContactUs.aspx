<%@ Page Language="C#" MasterPageFile="~/Page.Master" AutoEventWireup="true" CodeBehind="ContactUs.aspx.cs" Inherits="Trade.ContactUs" Title="无标题页" %>
<%@ Register Src="~/Controls/CompanyControl.ascx" TagName="CompanyControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageContentPlaceHolder" runat="server">
  <Trade:CompanyControl ID="companybox1" runat="server" />
</asp:Content>
