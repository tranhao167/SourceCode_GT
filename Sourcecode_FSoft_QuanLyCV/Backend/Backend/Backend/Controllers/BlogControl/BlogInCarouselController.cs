using Backend.Models.EFModel;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Backend.Controllers.BlogControl
{
    public class BlogInCarouselController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public BlogInCarouselController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        [HttpGet]
        public IHttpActionResult getallunCar()
        {
            IList<BlogDTO> blogDTOs = new List<BlogDTO>();
            var blogDTOS = fsoft_taskDBEntities.Blogs.Include("Administrator").Where(x => x.Status == "In Carousel")
                           .Select(p => new BlogDTO()
                           {
                               BlogID = p.BlogID,
                               AdminID = p.AdminID,
                               ImageMain = p.ImageMain,
                               Subject = p.Subject,
                               ContentBlog = p.ContentBlog,
                               Description = p.Description,
                               Status = p.Status,
                               Created = p.Created.ToString(),
                               CreatedBy = p.CreatedBy,
                               Modified = p.Modified.ToString(),
                               ModifiedBy = p.ModifiedBy,
                               HasDeleted = p.HasDeleted.ToString()

                           }).ToList();
            return Json(blogDTOS);
        }
    }
}
