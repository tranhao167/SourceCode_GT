using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CVDTO
    {
        [Display(Name = "ID")]
        public int CandID { get; set; }
        [Display(Name = "Candidate Objective")]
        public string Objective { get; set; }
        [Required]
        [Display(Name = "Candidate Name")]
        public string CandName { get; set; }
        [Required]
        [Display(Name = "Candidate Address")]
        public string CandAddress { get; set; }
        [Required]
        [Display(Name = "Candidate Email")]
        public string Email { get; set; }
        [Required]
        [Display(Name = "Candidate Phone")]
        public string CandPhone { get; set; }
        [Required]
        [Display(Name = "Candidate Interest")]
        public string Interest { get; set; }
        [Required]
        [Display(Name = "Candidate Major")]
        public string CandMajor { get; set; }
        [Required]
        [Display(Name = "Candidate Birthday")]
        public DateTime CandBirthday { get; set; }
        [Required]
        [Display(Name = "Candidate Account Name")]
        public string AccName { get; set; }
        [Required]
        [Display(Name = "Candidate Gender")]
        public int CandGender { get; set; }
        [Required]
        [Display(Name = "Candidate Image Avatar")]
        public string Image { get; set; }


    }
}
