using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Model;

namespace IDAL
{
    public interface INews
    {
        DataTable GetNews();
        DataTable DeleteNewsById(int Id);
        DataTable UpdateNewsById(int Id, string NewsTitle, string NewsText);
        DataTable InsertNewsById(string NewsTitle, string NewsText);
    }
}
