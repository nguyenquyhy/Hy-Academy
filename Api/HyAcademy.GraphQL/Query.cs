using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using HyAcademy.Data;

namespace HyAcademy.GraphQL;

public class Query
{
    public async Task<SearchCoursesResult> SearchCourses(
        [Service] IUserIdAccessor userIdAccessor,
        [Service] ISearchCoursesQuery query,
        SearchCoursesInput input
    ) => new(input.query, await query.ExecuteAsync(userIdAccessor.GetOrDefault(), input.query));

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

    public Task<Lesson?> GetLesson(
        [Service] IGetLessonQuery query,
        Guid courseId,
        Guid lessonId
    )
    {
        return query.ExecuteAsync(courseId, lessonId);
    }
}

public record SearchCoursesInput(
    string query
);

public record SearchCoursesResult(
    string query,
    IQueryable<Course> nodes
);
