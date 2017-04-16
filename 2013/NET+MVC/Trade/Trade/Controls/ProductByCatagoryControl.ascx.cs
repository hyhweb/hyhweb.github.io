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
    public partial class ProductByCatagoryControl : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                main();
            }

        }
        public void main() {
            ProductView newproductview = new ProductView();
            DataTable dt = newproductview.SelectByCatagory(Request.QueryString["Catagory"]);
            // DataTable dt = newproductview.SelectByCatagory("New arrivals");
            
            PagedDataSource pds = GetPds(dt, pageprev, pagenext, firstpage, lastpage, HyperLink1, HyperLink2, HyperLink3, HyperLink4, HyperLink5);
            product.DataSource = pds;
            product.DataBind();
            
            //productdatagrid.DataSource = newproductview.GetAllProducts();
            //productdatagrid.DataBind();
        }

        public PagedDataSource GetPds(DataTable dt, HyperLink prevpage, HyperLink nextpage, HyperLink firstpage, HyperLink lastpage, HyperLink page1, HyperLink page2, HyperLink page3, HyperLink page4, HyperLink page5)
        {
            PagedDataSource pds = new PagedDataSource();
            pds.DataSource = dt.DefaultView;
            pds.AllowPaging = true;
            pds.PageSize = 0;
            int currentpage;
            string catogoryparm = Request.QueryString["Catagory"];
            if (Request.QueryString["page"] != null)
            {
                currentpage = Convert.ToInt32(Request.QueryString["page"]);
            }
            else {
                currentpage = 1;
            }
            pds.CurrentPageIndex = currentpage;
            if (!pds.IsFirstPage) {
                prevpage.NavigateUrl = Request.CurrentExecutionFilePath + "?Catagory=" + catogoryparm + "&page=" + Convert.ToString(currentpage - 1);
            }
            if(!pds.IsLastPage){
                nextpage.NavigateUrl = Request.CurrentExecutionFilePath + "?Catagory=" + catogoryparm + "&page=" + Convert.ToString(currentpage + 1);
            }
            firstpage.NavigateUrl = Request.CurrentExecutionFilePath + "?Catagory=" + catogoryparm + "&page=" + Convert.ToString(0);
            lastpage.NavigateUrl = Request.CurrentExecutionFilePath + "?Catagory=" + catogoryparm + "&page=" + Convert.ToString(pds.PageCount - 1);

            if (!pds.IsFirstPage || !pds.IsLastPage||currentpage > 3 || currentpage < pds.PageCount - 3) {
                if (pds.PageCount - 1 <= currentpage) { currentpage = pds.PageCount - 5; };
                if (0 >= currentpage) { currentpage =0; };
                page1.Text = Convert.ToString(currentpage);
                page1.NavigateUrl = Request.CurrentExecutionFilePath + "?Catagory=" + catogoryparm + "&page=" + Convert.ToString(currentpage);

                page2.Text = Convert.ToString(currentpage +1);
                page2.NavigateUrl = Request.CurrentExecutionFilePath + "?Catagory=" + catogoryparm + "&page=" + Convert.ToString(currentpage + 1);
                page3.Text = Convert.ToString(currentpage + 2);
                page3.NavigateUrl = Request.CurrentExecutionFilePath + "?Catagory=" + catogoryparm + "&page=" + Convert.ToString(currentpage + 2);
                page4.Text = Convert.ToString(currentpage + 3);
                page4.NavigateUrl = Request.CurrentExecutionFilePath + "?Catagory=" + catogoryparm + "&page=" + Convert.ToString(currentpage + 3);
                page5.Text = Convert.ToString(currentpage + 4);
                page5.NavigateUrl = Request.CurrentExecutionFilePath + "?Catagory=" + catogoryparm + "&page=" + Convert.ToString(currentpage + 4);

            }
           

            
            return pds;
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

        }
    }
}