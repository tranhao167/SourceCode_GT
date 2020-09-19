using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class PersonalInfomationDTO
    {
        [Display(Name = "ID")]
        public int CandID { get; set; }
        [Required]
        [Display(Name = "Candidate Name")]
        public string CandName { get; set; }
        [Required]
        [Display(Name = "Candidate Address")]
        public string CandAddress { get; set; }
        [Required]
        [Display(Name = "Candidate Gender")]
        public int CandGender { get; set; }
        [Required]
        [Display(Name = "Candidate Email")]
        public string Email { get; set; }
        [Required]
        [Display(Name = "Candidate Phone")]
        public string CandPhone { get; set; }
        [Required]
        [Display(Name = "Candidate Major")]
        public string CandMajor { get; set; }
        [Required]
        [Display(Name = "Candidate Birthday")]
        public DateTime CandBirthday { get; set; }
        [Required]
        [Display(Name = "Account Name")]
        public string AccName { get; set; }
        [Required]
        [Display(Name = "Password")]
        public string Password { get; set; }


    }
}
