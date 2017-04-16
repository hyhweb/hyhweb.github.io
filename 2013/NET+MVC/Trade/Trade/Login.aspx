<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Trade.Login" %>
<%@ Register Src="~/Controls/LoginControl.ascx" TagName="LoginControl" TagPrefix="Trade" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>无标题页</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <Trade:LoginControl ID="loginbox" runat="server"  />
    </div>
    </form>
</body>
</html>
