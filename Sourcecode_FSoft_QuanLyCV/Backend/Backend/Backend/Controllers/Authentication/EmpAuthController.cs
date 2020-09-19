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
    public class EmpAuthController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public EmpAuthController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        [HttpPost]
        public IHttpActionResult ValidLogin(Signin signin)
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
                var acc = fsoft_taskDBEntities.Accounts.Where(a => a.AccName == user && a.Password == temp && a.HasDeleted == null && a.RoleID == 2).FirstOrDefault();
                var accCand = fsoft_taskDBEntities.Accounts.Where(a => a.AccName == user && a.Password == temp && a.HasDeleted == null && a.RoleID == 3).FirstOrDefault();
                var auth = TokenManager.GenerateToken(user);
                if (acc != null)
                {
                    var getinf = new
                    {
                        authen = auth,
                        getacc = user,
                        roleid=acc.RoleID
                    };
                    return Json(new { getinf });
                }

                else if (accCand != null)
                {
                    var Cand = fsoft_taskDBEntities.Candidates.Where(c => c.AccName == user).FirstOrDefault();
                    var accountCand = new Account()
                    {
                        AccName = accCand.AccName,
                        RoleID = accCand.RoleID
                    };
                    var getinf = new
                    {
                        authen = auth,
                        getacc = user,
                        roleid = accCand.RoleID
                    };
                    return Json(new { getinf });
                }
                else
                {
                    return Ok("Invalid");
                }

            }
        }
        [HttpPut]
        public IHttpActionResult ChangePass(ChangePass changePass)
        {
            string accname = changePass.accname;
            string passNew = changePass.password;
            string retypePass = changePass.retypepass;
            using (fsoft_taskDBEntities)
            {
                MD5 md = MD5.Create();
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(passNew);
                byte[] hash = md.ComputeHash(inputBytes);
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < hash.Length; i++)
                {
                    sb.Append(hash[i].ToString("X2"));
                }
                string temp = sb.ToString();
                var accountname = fsoft_taskDBEntities.Accounts.Where(a => a.AccName == accname).FirstOrDefault();
                if (accountname != null && passNew == retypePass)
                {
                    accountname.Password = temp;
                    accountname.Modified = DateTime.Now;
                    accountname.ModifiedBy = accname;
                    fsoft_taskDBEntities.SaveChanges();
                    return Ok("Changed");
                }
                else if (accountname == null)
                {
                    return BadRequest("Don't have this account!");
                }
                else if (passNew != retypePass)
                {
                    return BadRequest("Retype password wasn't correct with Password");
                }
                else return BadRequest("Invalid");
            }

        }
        [HttpGet]
        public IHttpActionResult getInfo(string acc)
        {
            var accCand = fsoft_taskDBEntities.Accounts.Where(x => x.AccName == acc && x.RoleID == 3).FirstOrDefault();
            var infoCand = fsoft_taskDBEntities.Candidates.Where(a => a.AccName == acc).FirstOrDefault();
            var accEmp = fsoft_taskDBEntities.Accounts.Where(x => x.AccName == acc && x.RoleID == 2).FirstOrDefault();
            var infoEmp = fsoft_taskDBEntities.Employers.Where(a => a.AccName == acc).FirstOrDefault();

            if (accCand != null && accEmp == null)
            {
                var candidate = new Candidate()
                {
                    CandID = infoCand.CandID,
                    CandName = infoCand.CandName,
                    CandAddress = infoCand.CandAddress,
                    CandBirthday = infoCand.CandBirthday,
                    CandGender = infoCand.CandGender,
                    CandMajor = infoCand.CandMajor,
                    CandPhone = infoCand.CandPhone,
                    Status = infoCand.Status,
                    Image = infoCand.Image,
                    Email = infoCand.Email,
                    Startday = infoCand.Startday,
                    Link = infoCand.Link,
                    UpdateNew = infoCand.UpdateNew,
                    Interest = infoCand.Interest,
                    Objective = infoCand.Objective,
                    UpdateTimes=infoCand.UpdateTimes,
                    AccName = acc,
                    HasRejected=infoCand.HasRejected

                };
                var getCand = new
                {
                    inf = candidate,
                    role=accCand.RoleID
                };
                return Json(getCand);
            }else if (accCand == null && accEmp != null)
            {
                var employer = new Employer()
                {
                    EmpID = infoEmp.EmpID,
                    EmpName = infoEmp.EmpName,
                    EmpEmail = infoEmp.EmpEmail,
                    EmpPhone = infoEmp.EmpPhone,
                    AccName = acc,
                };
                var getEmp = new
                {
                    inf = employer,
                    role = accEmp.RoleID
                };
                return Json(getEmp);
            }
            return BadRequest("Invalid");
        }

    }
}
