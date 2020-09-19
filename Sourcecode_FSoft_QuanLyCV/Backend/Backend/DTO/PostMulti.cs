using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class PostMulti
    {
        public int CandID { get; set; }
        public DateTime Startday { get; set; }
        public DateTime Endday { get; set; }
        public float GPA { get; set; }
        public string Major { get; set; }
        public string LevelEdu { get; set; }
        public string School { get; set; }
        public int EduID { get; set; }

    }
}
