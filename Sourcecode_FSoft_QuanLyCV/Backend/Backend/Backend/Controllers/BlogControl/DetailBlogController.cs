using Backend.Models.EFModel;
using DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Backend.Controllers.BlogControl
{
    public class DetailBlogController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public DetailBlogController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        [HttpGet]
        public IHttpActionResult getdetail(int id)
        {
            var blogid = fsoft_taskDBEntities.Blogs.Where(a => a.BlogID == id).FirstOrDefault();
            if (blogid != null)
            {
                var blogdetail = new Blog()
                {
                    BlogID = id,
                    AdminID = blogid.AdminID,
                    Subject = blogid.Subject,
                    ImageMain = blogid.ImageMain,
                    ContentBlog = blogid.ContentBlog,
                    Description = blogid.Description,
                    Status = blogid.Status
                };
                return Json(blogdetail);
            }
            return BadRequest();
        }
        [HttpPost]
        public IHttpActionResult postnewBlog(BlogDTO blogDTO)
        {
            var blog = new Blog()
            {
                BlogID = blogDTO.BlogID,
                AdminID = blogDTO.AdminID,
                Subject = blogDTO.Subject,
                ImageMain = blogDTO.ImageMain,
                ContentBlog = blogDTO.ContentBlog,
                Description = blogDTO.Description,
                Status = blogDTO.Status,
                Created = DateTime.Now,
                CreatedBy = blogDTO.CreatedBy,
                Modified = null,
                ModifiedBy = null,
                HasDeleted = null
            };
            if (fsoft_taskDBEntities.Blogs.FirstOrDefault(a => a.BlogID == blogDTO.BlogID) == null)
            {
                fsoft_taskDBEntities.Entry(blog).State = EntityState.Added;
                fsoft_taskDBEntities.SaveChanges();

            }
            else { return BadRequest("User already exist"); }
            return Ok();
        }
        [HttpPut]
        public IHttpActionResult putDetail(BlogDTO blogDTO)
        {
            var findid = fsoft_taskDBEntities.Blogs.FirstOrDefault(a => a.BlogID == blogDTO.BlogID);
            if (findid != null)
            {
                findid.AdminID = blogDTO.AdminID;
                findid.Subject = blogDTO.Subject;
                findid.ImageMain = blogDTO.ImageMain;
                findid.ContentBlog = blogDTO.ContentBlog;
                findid.Description = blogDTO.Description;
                findid.Status = blogDTO.Status;
                findid.Modified = DateTime.Now;
                findid.ModifiedBy = blogDTO.ModifiedBy;
                fsoft_taskDBEntities.SaveChanges();
                return Ok();
            }
            else return BadRequest();
        }
    }
}
