using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class AccDTO
    {
        [Display(Name = "Account Name")]
        public string AccName { get; set; }
    }
}
