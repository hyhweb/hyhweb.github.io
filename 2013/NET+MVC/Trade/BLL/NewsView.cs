using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Model;
using SQLServerDAL;

namespace BLL
{
    public class NewsView
    {
        private static readonly News news = new News();

        public DataTable GetNews() {
            return news.GetNews();
        }
        public DataTable DeleteNewsById(int Id) {
            return news.DeleteNewsById(Id);
        }
        public DataTable UpdateNewsById(int Id, string NewsTitle, string NewsText)
        {
            return news.UpdateNewsById(Id, NewsTitle, NewsText);
        }
        public DataTable GetNewsById(int Id) {
            return news.GetNewsById(Id);
        }
        public DataTable InsertNewsById(string NewsTitle, string NewsText)
        {
            return news.InsertNewsById(NewsTitle, NewsText);
        }


        public DataTable InsertNewsById()
        {
            throw new NotImplementedException();
        }
    }
}
