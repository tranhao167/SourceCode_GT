using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DetailEmpDTO
    {
        [Display(Name = "ID")]
        public int EmpID { get; set; }
        [Required]
        [Display(Name = "Employer Name")]
        public string EmpName { get; set; }
        [Required]
        [Display(Name = "Phone")]
        public string EmpPhone { get; set; }
        [Required]
        [Display(Name = "Email")]
        public string EmpEmail { get; set; }
        [Required]
        [Display(Name = "Account Name")]
        public string AccName { get; set; }
        [Required]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}
