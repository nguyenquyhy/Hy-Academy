using HotChocolate;
using HyAcademy.Data;
using HyAcademy.GraphQL.GraphTypes;

namespace HyAcademy.GraphQL.Resolvers;

public class CoursePermissionResolver
{
    public async Task<CoursePermission> LoadAsync(
        [Parent] Course course, 
        [Service] IUserIdAccessor userIdAccessor, 
        [Service] ICourseEditPolicy editPolicy,
        [Service] ICourseEnrollPolicy enrollPolicy)
    {
        var userId = userIdAccessor.GetOrDefault();
        return new CoursePermission
        (
            canEdit: await editPolicy.AllowAsync(course.Id, userId),
            canEnroll: userId == null ? false : await enrollPolicy.AllowAsync(course.Id, userId)
        );
    }
}