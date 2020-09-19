using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
   public class EmployerDTO
    {
        [Display(Name = "ID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmpID { get; set; }
        [Required]
        [Display(Name = "Employer Name")]
        public string EmpName { get; set; }
        [Required]
        [Display(Name = "Email")]
        public string EmpEmail { get; set; }
        [Required]
        [Display(Name = "Phone")]
        public string EmpPhone { get; set; }
        [Display(Name = "Account Name")]
        public string AccName { get; set; }
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}
