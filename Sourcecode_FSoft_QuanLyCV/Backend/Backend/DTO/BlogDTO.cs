using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class BlogDTO
    {
        [Display(Name = "Blog ID")]
        public int BlogID { get; set; }
        [Display(Name = "Admin ID")]
        public int AdminID { get; set; }
        [Display(Name = "Image Main")]
        public string ImageMain { get; set; }
        [Display(Name = "Subject")]
        public string Subject { get; set; }
        [Display(Name = "Content")]
        public string ContentBlog { get; set; }
        [Display(Name = "Description")]
        public string Description { get; set; }
        [Display(Name = "Status")]
        public string Status { get; set; }
        [Display(Name = "CreatedBy")]
        public string CreatedBy { get; set; }
        [Display(Name = "Created")]
        public string Created { get; set; }
        [Display(Name = "ModifiedBy")]
        public string ModifiedBy { get; set; }
        [Display(Name = "Modified")]
        public string Modified { get; set; }
        [Display(Name = "HasDeleted")]
        public string HasDeleted { get; set; }
    }
}

