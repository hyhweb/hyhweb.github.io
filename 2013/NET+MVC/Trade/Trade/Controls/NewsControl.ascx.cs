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
    public partial class NewsControl : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                main();
            }
        }

        public void main() {
            NewsView news = new NewsView();
            PagedDataSource pds = new PagedDataSource();
            pds.DataSource = news.GetNews().DefaultView;
            pds.AllowPaging = true;
            pds.PageSize = 6;
            newsshow.DataSource = pds;
            newsshow.DataBind();
        }
    }
}