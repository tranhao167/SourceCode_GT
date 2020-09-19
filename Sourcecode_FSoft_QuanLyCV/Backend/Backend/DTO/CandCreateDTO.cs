using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CandCreateDTO
    {
        [Display(Name = "ID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CandID { get; set; }
        [Required]
        [Display(Name = "Candidate Name")]
        public string CandName { get; set; }
        [Required]
        [Display(Name = "Phone")]
        public string CandPhone { get; set; }
        [Required]
        [Display(Name = "Address")]
        public string CandAddress { get; set; }
        [Display(Name = "Email")]
        public string CandEmail { get; set; }
        [Display(Name = "Date of Birth")]
        public DateTime CandBirthday { get; set; }
        [Display(Name = "Gender")]
        public int CandGender { get; set; }
        [Display(Name = "CandMajor")]
        public string CandMajor { get; set; }
        [Display(Name = "Account name")]
        public string AccName { get; set; }
        [Display(Name = "Password")]
        public string Password { get; set; }
        [Display(Name = "Retype Password")]
        public string RetypePass { get; set; }
    }
}
