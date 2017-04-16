using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Model;
using SQLServerDAL;

namespace BLL
{
    public  class OtherPageView
    {
        public OtherPage otherpage = new OtherPage();
        public DataTable GetPageByName(string name) {
            return otherpage.GetPageByName(name);
        }
        public DataTable UpDatePageByName(string name, string pagetext) {
            return otherpage.UpDatePageByName(name, pagetext);
        }
    }
}
