using HotChocolate.AspNetCore.Authorization;
using HyAcademy.Data;

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
    public Enrollment Enroll(EnrollInput input)
    {
        return null!;
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
