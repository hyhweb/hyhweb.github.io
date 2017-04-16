using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Model;

namespace IDAL
{
     public interface ICatagory
    {
         DataTable GetCatagorys();
         DataTable DeleteCatagorysById(int Id);
         DataTable UpdateCatagorysById(int Id, string Catagory, string Url);
         DataTable InsertCatagorysById(string Catagory, string Url);
    }
}
