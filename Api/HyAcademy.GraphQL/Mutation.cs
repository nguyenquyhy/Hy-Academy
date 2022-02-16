using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HyAcademy.Data;
using Microsoft.AspNetCore.Http;

namespace HyAcademy.GraphQL;

public class Mutation
{
    [Authorize]
    public Course AddCourse(AddCourseInput input)
    {
        return null!;
    }

    [Authorize]
    public Course EditCourse(EditCourseInput input)
    {
        return null!;
    }

    [Authorize]
    public async Task<EnrollResult> Enroll(
        [Service] IHttpContextAccessor contextAccessor,
        [Service] IEnrollCourseMutation mutation,
        EnrollInput input
    )
    {
        var userId = contextAccessor.HttpContext.User.GetUserId() ?? throw new InvalidOperationException("Cannot get User ID");
        return new EnrollResult(await mutation.ExecuteAsync(input.courseId, userId));
    }
}

public record AddCourseInput(
    string title,
    string description,
    CourseVisibility visibility
);

public record EditCourseInput(
    Guid courseId,
    string title,
    string description,
    CourseVisibility visibility
);

public record EnrollInput(Guid courseId);
public record EnrollResult(Enrollment enrollment);