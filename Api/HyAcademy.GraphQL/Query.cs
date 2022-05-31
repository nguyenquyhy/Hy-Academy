using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using HyAcademy.Data;

namespace HyAcademy.GraphQL;

public class Query
{
    [UsePaging]
    public Task<IQueryable<Course>> GetCourses([Service] IGetCoursesQuery query) => query.ExecuteAsync();

    [Authorize]
    [UsePaging]
    public Task<IQueryable<Course>> GetTeachingCourses(
        [Service] IUserIdAccessor userIdAccessor,
        [Service] IGetTeachingCoursesQuery query
    )
    {
        var userId = userIdAccessor.Get();
        return query.ExecuteAsync(userId);
    }

    [Authorize]
    [UsePaging]
    public Task<IQueryable<Course>> GetAttendingCourses(
        [Service] IUserIdAccessor userIdAccessor,
        [Service] IGetAttendingCoursesQuery query
    )
    {
        var userId = userIdAccessor.Get();
        return query.ExecuteAsync(userId);
    }

    public Task<Course?> GetCourse(
        [Service] IGetCourseQuery query,
        Guid id
    )
    {
        return query.ExecuteAsync(id);
    }
}
