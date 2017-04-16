using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Model;

namespace IDAL
{
    public interface IOtherPage
    {
        DataTable GetPageByName(string name);
        DataTable UpDatePageByName(string name, string pagetext);
    }
}
