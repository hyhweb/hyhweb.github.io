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
    public partial class NewsDetailControl : System.Web.UI.UserControl
    {
        public NewsView news = new NewsView();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                main();
            }
        }

        public void main() {
           
            //PagedDataSource pds = new PagedDataSource();
            //pds.DataSource = news.GetNews().DefaultView;
            //pds.AllowPaging = true;
            //pds.PageSize = 6;
            string newsid=Request.QueryString["id"];
            newsshowbox.DataSource = news.GetNewsById(Convert.ToInt32(newsid));
            newsshowbox.DataBind();
        }
    }
}