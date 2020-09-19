using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ListCV
    {
        [Display(Name = "ID")]
        public int CandID { get; set; }
        [Required]
        [Display(Name = "Candidate Name")]
        public string CandName { get; set; }
        [Required]
        [Display(Name = "Major Expect")]
        public string CandMajor { get; set; }
        [Display(Name = "Start day")]
        public string Startday { get; set; }
        [Display(Name = "Email")]
        public string Email { get; set; }
        [Display(Name = "Status")]
        public string Status { get; set; }
        [Display(Name = "Update")]
        public string UpdateNew { get; set; }
        [Display(Name = "DeletedDay")]
        public string HasDeleted { get; set; }
        [Display(Name = "HasReject")]
        public string HasRejected{ get; set; }
    }
}
