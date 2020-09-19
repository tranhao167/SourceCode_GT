using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
   public class WorkExperienceDTO
    {
        [Display(Name = "ID")]
        public int ExpID { get; set; }
        [Required]
        [Display(Name = "Position")]
        public string Position { get; set; }
        [Required]
        [Display(Name = "Work Place")]
        public string WorkPlace { get; set; }
        [Required]
        [Display(Name = "Work Time")]
        public string WorkTime { get; set; }
        [Required]
        [Display(Name = "CandID")]
        public int CandID { get; set; }
    }
}
