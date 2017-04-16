using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Model;
using SQLServerDAL;

namespace BLL
{
     public class CommentView
    {
         private static readonly Comment commentview = new Comment();
         public DataTable GetCommentById(int id) {
             return commentview.GetCommentById(id);
         }
    }
}
