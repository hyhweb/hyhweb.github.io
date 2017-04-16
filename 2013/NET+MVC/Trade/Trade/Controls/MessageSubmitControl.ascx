<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MessageSubmitControl.ascx.cs" Inherits="Trade.Controls.MessageSubmitControl" %>
<div class="nav-box">
<div class="nav-header">Order</div>
<div class="nav-body">
<ul>
<li class="message-item"><label>*  Required information</label></li>
<li class="message-item"><label>*  Company Name :</label><input id="company" type="text" value="" runat="server" /></li>
<li class="message-item"><label>*  Country/Region :	</label><input id="country" type="text" value="" runat="server" /></li>
<li class="message-item"><label>*  Contact Person :</label><input id="contactperson" type="text" value="" runat="server" /></li>
<li class="message-item"><label>*  Phone :</label><input id="phone" type="text" value="" runat="server" /></li>
<li class="message-item"><label>*  Email :</label><input id="email" type="text" value="" runat="server" /></li>
<li class="message-item"><label>* Subject :</label><input id="messagetitle" type="text" value="" runat="server" /></li>
<li class="message-item"><label>* Message :</label><textarea id="messagetext"  runat="server" ></textarea></li>

</ul>
<asp:Button Text="Submit"  ID="submit" runat="server" onclick="submit_Click" style=" margin-left:200px" />
</div>
</div>