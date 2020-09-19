using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ChangeSta_sendmailDTO
    {
        [Display(Name = "ID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CandID { get; set; }
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
        [Required]
        [Display(Name = "Status")]
        public string Status { get; set; }
        [Display(Name = "ReReason")]
        public string ReReason { get; set; }
    }
}
