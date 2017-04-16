using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using BLL;
using DBUtility;

namespace Trade.Controls
{
    public partial class MessageSubmitControl : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                main();
            }
        } 
        protected void main() { 
          

        }

        protected void submit_Click(object sender, EventArgs e)
        {
            if (messagetitle.Value != "" && messagetext.Value != "" && company.Value != "" && country.Value != "" && contactperson.Value != "" && phone.Value != "" &&
            email.Value != "")
            {
                MessageView messageview = new MessageView();
                DataTable dt = messageview.AddMessage(messagetitle.Value, messagetext.Value, company.Value, country.Value, contactperson.Value, phone.Value, email.Value);
                messagetitle.Value = null;
                messagetext.Value = null;
                company.Value = null;
                country.Value = null;
                contactperson.Value = null;
                phone.Value = null;
                email.Value = null;
                Response.Write("<script>alert('success')</script>");
            }
            else {
                Response.Write("<script>alert('requred item!')</script>");
            }
            
        }
    }
}