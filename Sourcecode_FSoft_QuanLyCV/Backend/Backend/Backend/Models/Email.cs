using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class Email
    {
        public string to { get; set; }
        public string subject { get; set; }
        public string body { get; set; }
    }
}