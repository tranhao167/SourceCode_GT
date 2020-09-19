using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class EmailDTO 
    {
        public string to { get; set; }
        public string subject { get; set; }
        public string body { get; set; }
    }
}
