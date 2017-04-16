<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FileUpload.ascx.cs" Inherits="Trade.Controls.FileUpload" %>
<asp:FileUpload ID="fileupload" runat="server" /><asp:Label ID="label" Text="" runat="server"></asp:Label>
<asp:Button ID="uploadbtn" Text="上传文件" runat="server" onclick="uploadbtn_Click" />
