using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HyAcademy.Data;

namespace HyAcademy.GraphQL;

public class Mutation
{
    [Authorize]
    public async Task<AddCourseResult> AddCourse(
        [Service] IUserIdAccessor userIdAccessor,
        [Service] IAddCourseMutation addCourseMutation,
        AddCourseInput input
    )
    {
        var userId = userIdAccessor.Get();
        return new AddCourseResult(
            await addCourseMutation.ExecuteAsync(userId, input.title.Trim(), input.description.Trim())
        );
    }

    [Authorize]
    public Course EditCourse(EditCourseInput input)
    {
        return null!;
    }

    [Authorize]
    public async Task<EnrollResult> Enroll(
        [Service] IUserIdAccessor userIdAccessor,
        [Service] IEnrollCourseMutation mutation,
        EnrollInput input
    )
    {
        var userId = userIdAccessor.Get();
        return new EnrollResult(await mutation.ExecuteAsync(input.courseId, userId));
    }

    [Authorize]
    public async Task<AddLessonResult> AddLesson(
        [Service] IUserIdAccessor userIdAccessor,
        [Service] IAddLessonMutation addLessonMutation,
        AddLessonInput input
    )
    {
        var userId = userIdAccessor.Get();
        return new AddLessonResult(
            await addLessonMutation.ExecuteAsync(userId, input.courseId, input.title.Trim(), input.description.Trim())
        );
    }
}

public record AddCourseInput(
    string title,
    string description
);

public record AddCourseResult(
    Course course
);

public record EditCourseInput(
    Guid courseId,
    string title,
    string description
);

public record EnrollInput(Guid courseId);
public record EnrollResult(Enrollment enrollment);

public record AddLessonInput(
    Guid courseId,
    string title,
    string description
);

public record AddLessonResult(
    Lesson lesson
);