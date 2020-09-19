using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
   public class Login
    {
        [Required]
        [Display(Name = "Account Name")]
        public string AccName { get; set; }
        [Required]
        [Display(Name = "Password")]
        public string Password { get; set; }
        [Display(Name = "Role ID")]
        public int RoleID { get; set; }
    }
}
