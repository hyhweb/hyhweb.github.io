<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AdminPayment.aspx.cs" Inherits="Trade.Payment" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>无标题页</title>
    <link href="Edition/themes/default/default.css" />
    <script charset="utf-8" src="Edition/kindeditor-min.js"></script>
	<script charset="utf-8" src="Edition/lang/zh_CN.js"></script>
	<script>
			var editor;
			KindEditor.ready(function(K) {
				editor = K.create('textarea[name="content"]', {
					allowFileManager : true
				});
				});
		</script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
       <textarea name="content" id="content" runat="server" style="width:800px;height:400px;visibility:hidden;">KindEditor</textarea>
	   <p><asp:Button ID="submit" Text="submit" runat="server" /></p>
    </div>
    </form>
</body>
</html>
