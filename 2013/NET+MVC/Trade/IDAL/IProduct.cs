using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Model;

namespace IDAL
{
    public interface IProduct
    {
        DataTable GetProducts();
        DataTable DeleteById(int id);
        DataTable InsertProduct(string ProductUrl,string ProductTitle,string ProductKeyWord,string ProductPrice);
    }
}
