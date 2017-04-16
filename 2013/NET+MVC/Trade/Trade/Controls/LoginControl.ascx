<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LoginControl.ascx.cs" Inherits="Trade.Controls.LoginControl" %>
<div class="nav-box">
<div class="nav-header">login</div>
<div class="nav-body">
<div>
<label>MemberID：</label><asp:TextBox ID="loginuser" runat="server" Text="" Width="120px" Height="18px"></asp:TextBox>
</div>
<div>
<label>Password：</label><asp:TextBox ID="loginpwd" runat="server" Text="" Width="120px" Height="18px"></asp:TextBox>
</div>
<div>
<asp:Button ID="loginbtn" Text="Go" runat="server" style="margin-left:78px; padding:5px 20px;"  onclick="loginbtn_Click" />
</div>
</div>
</div>

