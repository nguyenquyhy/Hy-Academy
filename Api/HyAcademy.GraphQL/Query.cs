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

    public Task<IQueryable<Course>> GetCourses([Service] IGetCoursesQuery query) => query.ExecuteAsync();

    public Task<Course?> GetCourse([Service] IGetCourseQuery query, Guid id) => query.ExecuteAsync(id);
}
