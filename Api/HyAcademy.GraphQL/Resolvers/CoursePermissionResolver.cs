using HotChocolate;
using HyAcademy.Data;
using HyAcademy.GraphQL.GraphTypes;

namespace HyAcademy.GraphQL.Resolvers;

public class CoursePermissionResolver
{
    public async Task<CoursePermission> LoadAsync([Parent] Course course, [Service] IUserIdAccessor userIdAccessor, [Service] ICourseEnrollPolicy policy)
    {
        return new CoursePermission
        (
            canEdit: false,
            canEnroll: await policy.AllowAsync(course.Id, userIdAccessor.Get())
        );
    }
}