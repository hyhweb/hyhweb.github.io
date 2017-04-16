<%@ Page Language="C#" MasterPageFile="~/Admin.Master" AutoEventWireup="true" CodeBehind="AdminCompany.aspx.cs" Inherits="Trade.AdminCompany" Title="无标题页" %>
<%@ Register Src="~/Controls/CompanyEditeControl.ascx" TagName="CompanyEditeControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="TradeContentPlaceHolder" runat="server">
<Trade:CompanyEditeControl ID="companyeditecontrol" runat="server" />
</asp:Content>
