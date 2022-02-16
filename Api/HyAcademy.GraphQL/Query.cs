using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using HyAcademy.Data;
using Microsoft.AspNetCore.Http;

namespace HyAcademy.GraphQL;

public class Query
{
    public int GetValue() => 1;

    [Authorize]
    public string GetAuthValue([Service] IHttpContextAccessor contextAccessor)
        => GetUserId(contextAccessor) ?? throw new InvalidOperationException("Cannot find user ID!");

    [UsePaging]
    public Task<IQueryable<Course>> GetCourses([Service] IGetCoursesQuery query) => query.ExecuteAsync();

    [Authorize]
    [UsePaging]
    public Task<IQueryable<Course>> GetMyCourses(
        [Service] IHttpContextAccessor contextAccessor,
        [Service] IGetMyCoursesQuery query
    )
    {
        var userId = GetUserId(contextAccessor) ?? throw new InvalidOperationException("Cannot find user ID!");
        return query.ExecuteAsync(userId);
    }

    public Task<Course?> GetCourse(
        [Service] IGetCourseQuery query,
        Guid id
    )
    {
        return query.ExecuteAsync(id);
    }

    private string? GetUserId(IHttpContextAccessor contextAccessor) => contextAccessor.HttpContext.User.GetUserId();
}
