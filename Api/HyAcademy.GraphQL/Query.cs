using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HyAcademy.Data;
using Microsoft.AspNetCore.Http;

namespace HyAcademy.GraphQL;

public class Query
{
    public int GetValue() => 1;

    [Authorize]
    public string GetAuthValue([Service] IHttpContextAccessor contextAccessor) 
        => contextAccessor.HttpContext.User.GetUserId() ?? throw new InvalidOperationException("Cannot find user ID!");

    public IQueryable<Course> GetCourses() => new List<Course>().AsQueryable();

    [Authorize]
    public IQueryable<Enrollment> GetEnrollments() => new List<Enrollment>().AsQueryable();
}
