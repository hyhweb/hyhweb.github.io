<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ProductByCatagory1111.aspx.cs" Inherits="Trade.ProductByCatagory" %>
<%@ Register Src="~/Controls/ProductByCatagoryControl.ascx" TagName="ProductByCatagoryControl" TagPrefix="Trade" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>无标题页</title>
    <link href="App_Themes/theme/main.css" type="text/css" rel="Stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <Trade:ProductByCatagoryControl ID="productbycatagory" runat="server" />
    </div>
    </form>
</body>
</html>
