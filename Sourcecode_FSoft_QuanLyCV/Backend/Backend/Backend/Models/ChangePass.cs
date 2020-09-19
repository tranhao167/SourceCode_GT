using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class ChangePass
    {
        public string accname { get; set; }
        public string password { get; set; }
        public string retypepass { get; set; }
    }
}