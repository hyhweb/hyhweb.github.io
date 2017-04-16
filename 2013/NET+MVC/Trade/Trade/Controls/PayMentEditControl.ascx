<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PayMentEditControl.ascx.cs" Inherits="Trade.Controls.PayMentEditControl" %>

 <script type="text/javascript">

	var editor;
	KindEditor.ready(function(K) {
		editor = K.create('.KindEditor', {
			allowFileManager : true
		});
		});

</script>



<textarea name="content" id="content" runat="server" class="KindEditor" style="width:800px;height:400px;visibility:hidden;"></textarea>
<p><asp:Button ID="submit" Text="submit" runat="server" onclick="submit_Click1" /></p>