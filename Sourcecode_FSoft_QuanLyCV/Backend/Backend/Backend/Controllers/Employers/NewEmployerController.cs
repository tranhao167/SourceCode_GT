using Backend.Models;
using Backend.Models.EFModel;
using DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Backend.Controllers.Employers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class NewEmployerController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public NewEmployerController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }

        
        [HttpPost]
        public IHttpActionResult PostnewEmp( EmployerDTO employerDTO)
        {   
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }
            MD5 md = MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(employerDTO.Password);
            byte[] hash = md.ComputeHash(inputBytes);
            StringBuilder sb = new StringBuilder();
            for(int i=0; i< hash.Length;i++)
            {
                sb.Append(hash[i].ToString("X2"));
            }
            string temp = sb.ToString();
            var acc = new Account()
            {
                AccName = employerDTO.AccName,
                Password = temp,
                RoleID = 1,
                Created = DateTime.Now,
                CreatedBy="Admin"
            };
            if (fsoft_taskDBEntities.Accounts.Where(a => a.AccName == employerDTO.AccName).FirstOrDefault() == null)
            {
                fsoft_taskDBEntities.Entry(acc).State = EntityState.Added;
                fsoft_taskDBEntities.SaveChanges();
               
            }
            else { return BadRequest("User already exist"); }
            
            var inserted = new Employer()
            {
                AccName = employerDTO.AccName,
                EmpName = employerDTO.EmpName,
                EmpEmail = employerDTO.EmpEmail,
                EmpPhone = employerDTO.EmpPhone

            };
            fsoft_taskDBEntities.Entry(inserted).State = EntityState.Added;
            fsoft_taskDBEntities.SaveChanges();
            return Ok();
        }
        [HttpPut]
        public IHttpActionResult ChangeInfor(EmployerDTO employerDTO)
        {
            var inserted = new Employer()
            {
                EmpID = employerDTO.EmpID,
                AccName = employerDTO.AccName,
                EmpName = employerDTO.EmpName,
                EmpEmail = employerDTO.EmpEmail,
                EmpPhone = employerDTO.EmpPhone

            };
            fsoft_taskDBEntities.Entry(inserted).State = EntityState.Modified;
            fsoft_taskDBEntities.SaveChanges();
            return Ok();
        }

    }
}
