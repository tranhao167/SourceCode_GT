using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class EducationDTO
    {
        [Display(Name = "ID")]
        public int EduID { get; set; }
        [Required]
        [Display(Name = "Major")]
        public string Major { get; set; }
        [Required]
        [Display(Name = "School")]
        public string School { get; set; }
        [Required]
        [Display(Name = "LevelEdu")]
        public string LevelEdu { get; set; }
        [Required]
        [Display(Name = "Startday")]
        public string Startday { get; set; }
        [Required]
        [Display(Name = "Endday")]
        public string Endday { get; set; }
        [Required]
        [Display(Name = "GPA")]
        public string GPA { get; set; }
        [Required]
        [Display(Name = "CandID")]
        public int CandID { get; set; }
    }
}
