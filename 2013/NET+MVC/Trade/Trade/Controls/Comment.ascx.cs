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
    public partial class Comment : System.Web.UI.UserControl
    {
        public CommentView newcommentview = new CommentView();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                main();
            }
        }
        protected void main(){
            commentbox.DataSource = newcommentview.GetCommentById(1);
            commentbox.DataBind();
        }
    }
}