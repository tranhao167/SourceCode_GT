using Backend.Models;
using Backend.Models.EFModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;

namespace Backend.Controllers.Authentication
{
    public class AdminAuthController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public AdminAuthController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        [HttpPost]
        public IHttpActionResult ValidLogin(Signin signin )
        {
            string user = signin.userName;
            string pass = signin.password;
            using (fsoft_taskDBEntities)
            {
                MD5 md = MD5.Create();
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(pass);
                byte[] hash = md.ComputeHash(inputBytes);
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < hash.Length; i++)
                {
                    sb.Append(hash[i].ToString("X2"));
                }
                string temp = sb.ToString();
                var acc = fsoft_taskDBEntities.Accounts.Where(a => a.AccName == user && a.Password == temp &&a.HasDeleted==null && a.RoleID==1).FirstOrDefault();
               
                if (acc!=null)
                {
                    var auth = TokenManager.GenerateToken(user);
                    var getinf = new
                    {
                        authen = auth,
                        getacc = user
                    };
                    return Json(new { getinf });
                }
                else
                {
                    return BadRequest();
                }
            }
        }
        [HttpGet]
        public IHttpActionResult getIDbyAcc(string acc)
        {
            var id = fsoft_taskDBEntities.Administrators.FirstOrDefault(a => a.AccName == acc);
            if (id != null)
            {
                var admin = new Administrator()
                {
                    AdminID = id.AdminID,
                    AdminName = id.AdminName,
                    AccName = acc
                };
                return Json(admin);
            }
            else return BadRequest();
        }
    }
}
