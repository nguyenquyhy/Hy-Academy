using HotChocolate;
using HyAcademy.Data;
using HyAcademy.GraphQL.GraphTypes;
using Microsoft.AspNetCore.Http;

namespace HyAcademy.GraphQL.Resolvers;

public class CoursePermissionResolver
{
    public async Task<CoursePermission> LoadAsync([Parent] Course course, [Service] IHttpContextAccessor httpContext, [Service] ICourseEnrollPolicy policy)
    {
        return new CoursePermission
        (
            canEdit: false,
            canEnroll: await policy.AllowAsync(course.Id, httpContext.HttpContext.User.GetUserId())
        );
    }
}