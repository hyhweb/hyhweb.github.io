using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;



namespace Trade
{
    public  class CommonHelp : System.Web.UI.Page
    {
        //上传文件函数
        public void  FileUpload(FileUpload fileupload, Label label)
        {
            if (fileupload.HasFile)
            {
                if (fileupload.PostedFile.ContentLength < 10485760)
                {
                    try {
                        fileupload.PostedFile.SaveAs(Server.MapPath("~/ProductImgs/") + fileupload.FileName);
                    }
                    catch(Exception) {
                        label.Text = "上传不成功！";
                    }
                }
                else {
                    label.Text = "上传图片不能大于10M";
                }
            }
            else {
                label.Text = "请选择上传文件！";
            }
           
            
        }
    }
}
