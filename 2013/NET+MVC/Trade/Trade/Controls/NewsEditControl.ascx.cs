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
    public partial class NewsEditControl : System.Web.UI.UserControl
    {
        public NewsView news = new NewsView();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                main();
            }
        }

        public void main() {

            newsedit.DataSource = news.GetNews();
            newsedit.DataBind();
        }

        protected void newsshow_ItemCommand(object source, RepeaterCommandEventArgs e)
        {
            LinkButton lb = (LinkButton)e.Item.FindControl("editbtn");
            if (e.CommandName == "edit")
            {
                DataTable dt = news.GetNewsById(Convert.ToInt32(e.CommandArgument));
                
                newstitle.Value = dt.Rows[0]["NewsTitle"].ToString();
                newstext.Value = dt.Rows[0]["NewsText"].ToString();
               
                lb.Text = "确定";
                lb.CommandName = "update";
               
                

            } else if (e.CommandName == "update")
            {

                lb.Text = "编辑";
                lb.CommandName = "edit";
                DataTable dt = news.UpdateNewsById(Convert.ToInt32(e.CommandArgument), newstitle.Value, newstext.Value);
                newsedit.DataSource = dt;
                newsedit.DataBind();
                main();
                newstitle.Value = null;
                newstext.Value = null;
            }
            if(e.CommandName=="delete"){

                DataTable dt = news.DeleteNewsById(Convert.ToInt32(e.CommandArgument));
                newsedit.DataSource = dt;
                newsedit.DataBind();
                main();
            }
        }

        protected void addnews_Click(object sender, EventArgs e)
        {
            string title = newstitle.Value;
            string text = newstext.Value;
            if (title != "" || text != "") {
                DataTable dt = news.InsertNewsById(title, text);
                newsedit.DataSource = dt;
                newsedit.DataBind();
                main();
                newstitle.Value = null;
                newstext.Value = null;
            }
        }




         

    }
}