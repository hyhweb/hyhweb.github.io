<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Trade._Default"  %>
<%@ Register Src="~/Controls/LoginControl.ascx" TagName="LoginControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/MenuControl.ascx" TagName="MenuControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/ProductControl.ascx" TagName="ProductControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/CatagoryControl.ascx" TagName="CatagoryControl"  TagPrefix="Trade" %>
<%@ Register Src="~/Controls/MessageControl.ascx" TagName="MessageControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/NewsControl.ascx"TagName="NewsControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/FileUpload.ascx" TagName="FileUploadControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/CompanyControl.ascx" TagName="CompanyControl" TagPrefix="Trade" %>
<%@ Register Src="~/Controls/Comment.ascx" TagName="Comment" TagPrefix="Trade"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>无标题页</title>
    <link href="App_Themes/theme/main.css" type="text/css" rel="Stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
      <Trade:LoginControl ID="loginbox" runat="server"  />
      <Trade:MenuControl ID="menubox" runat="server" />
      <Trade:ProductControl ID="productbox" runat="server" />
      <Trade:CatagoryControl ID="catagorybox" runat="server" />
      <Trade:MessageControl ID="messagebox" runat="server" />
      <Trade:NewsControl ID="newsbox" runat="server" />
      <Trade:FileUploadControl ID="fileuploadbox" runat="server" />
      <Trade:CompanyControl ID="companybox" runat="server" />
      <Trade:Comment ID="commentbox1" runat="server" />
      
     
      
      
      
      
      
    </div>
    </form>
    
</body>
</html>
