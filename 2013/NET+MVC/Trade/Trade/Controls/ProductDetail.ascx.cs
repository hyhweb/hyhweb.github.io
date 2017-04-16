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
    public partial class ProductDetail : System.Web.UI.UserControl
    {
        public ProductView newproduct = new ProductView();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                main();
            }
        }
        protected void main() {

            string productid = Request.QueryString["id"];
            DataTable dt = SelectById(Convert.ToInt32(productid));
            productdetail.DataSource = dt;
            productdetail.DataBind();
        }

        protected DataTable SelectById(int id) {
          return   newproduct.GetProductById(id);
        }
        protected void ItemDataBound(object source, RepeaterItemEventArgs e)
        {
            Label tb = (Label)e.Item.FindControl("productprice");
            HiddenField hf = (HiddenField)e.Item.FindControl("pricetext");
            string value = Session["roleid"] != null ? Session["roleid"].ToString() : "";
            if (value == "1" ? true : false)
            {

                tb.Text = hf.Value;
            }
            else
            {
                tb.Text = "";
            }
           // Button btn = (Button)e.Item.FindControl("orderbtn");

          

        }

        protected void productdetail_ItemCommand(object source, RepeaterCommandEventArgs e)
        {
            Button btn =(Button) e.Item.FindControl("orderbtn");
            btn.PostBackUrl = "../Order.aspx";
           
        }

       
        

    }
}