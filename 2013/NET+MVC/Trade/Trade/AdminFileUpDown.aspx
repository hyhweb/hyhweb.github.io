<%@ Page Language="C#" MasterPageFile="~/Admin.Master" AutoEventWireup="true" CodeBehind="AdminFileUpDown.aspx.cs" Inherits="Trade.AdminFileUpDown" Title="无标题页" %>
<%@ Register Src="~/Controls/FileUpload.ascx" TagName="FileUploadControl" TagPrefix="Trade" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="TradeContentPlaceHolder" runat="server">
 <Trade:FileUploadControl ID="fileuploadbox" runat="server" />
</asp:Content>
