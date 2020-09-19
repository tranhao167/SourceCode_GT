using Backend.Models.EFModel;
using DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;

namespace Backend.Controllers.Candidates
{
    public class CandidateCreateController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public CandidateCreateController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }


        [HttpPost]
        public IHttpActionResult PostnewCand(CandCreateDTO candCreateDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }
            MD5 md = MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(candCreateDTO.Password);
            byte[] hash = md.ComputeHash(inputBytes);
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("X2"));
            }
            string temp = sb.ToString();
            if (candCreateDTO.RetypePass!=candCreateDTO.Password)
            {
                return BadRequest("Invalid");
            }else if (fsoft_taskDBEntities.Accounts.SingleOrDefault(x => x.AccName == candCreateDTO.AccName) != null)
            {
                return BadRequest("Duplicate AccName");
            }
            else
            {
                var acc = new Account()
                {
                    AccName = candCreateDTO.AccName,
                    Password = temp,
                    RoleID = 3,
                    Created = DateTime.Now,
                    CreatedBy = candCreateDTO.CandName
                };
                fsoft_taskDBEntities.Entry(acc).State = EntityState.Added;
                fsoft_taskDBEntities.SaveChanges();
            }
            var inserted = new Candidate()
            {
               AccName=candCreateDTO.AccName,
               CandName=candCreateDTO.CandName,
               CandPhone=candCreateDTO.CandPhone,
               CandAddress=candCreateDTO.CandAddress,
               CandGender=candCreateDTO.CandGender,
               CandBirthday=candCreateDTO.CandBirthday,
               Email=candCreateDTO.CandEmail,
               CandMajor=candCreateDTO.CandMajor

            };
            fsoft_taskDBEntities.Entry(inserted).State = EntityState.Added;
            fsoft_taskDBEntities.SaveChanges();
            return Ok();
        }
        [HttpGet]
        public IHttpActionResult getallAcc()
        {
            IList<AccDTO> listCVs = new List<AccDTO>();
            var listCVS = fsoft_taskDBEntities.Accounts.Where(x => x.HasDeleted == null)
                           .Select(p => new AccDTO()
                           {
                               AccName=p.AccName

                           }).ToList();
            return Json(listCVS);
        }
    }
}
