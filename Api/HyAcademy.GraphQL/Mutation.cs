using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HyAcademy.Data;

namespace HyAcademy.GraphQL;

public class Mutation
{
    [Authorize]
    public async Task<AddCourseResult> AddCourse(
        [Service] IUserIdAccessor userIdAccessor,
        [Service] IAddCourseMutation mutation,
        AddCourseInput input
    )
    {
        var userId = userIdAccessor.Get();
        return new AddCourseResult(
            await mutation.ExecuteAsync(userId, input.title.Trim(), input.description.Trim())
        );
    }

    [Authorize]
    public async Task<EditCourseResult> EditCourse(
        [Service] IUserIdAccessor userIdAccessor,
        [Service] IEditCourseMutation mutation,
        EditCourseInput input)
    {
        var userId = userIdAccessor.Get();
        return new EditCourseResult(
            await mutation.ExecuteAsync(userId, input.courseId, input.title.Trim(), input.description.Trim(), input.visibility)
        );
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
        [Service] IAddLessonMutation mutation,
        AddLessonInput input
    )
    {
        var userId = userIdAccessor.Get();
        return new AddLessonResult(
            await mutation.ExecuteAsync(userId, input.courseId, input.title.Trim(), input.description.Trim())
        );
    }

    [Authorize]
    public async Task<EditLessonResult> EditLesson(
        [Service] IUserIdAccessor userIdAccessor,
        [Service] IEditLessonMutation mutation,
        EditLessonInput input
    )
    {
        var userId = userIdAccessor.Get();
        return new EditLessonResult(
            await mutation.ExecuteAsync(userId, input.courseId, input.lessonId, input.title.Trim(), input.description.Trim())
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
    string description,
    CourseVisibility visibility
);

public record EditCourseResult(
    Course course
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

public record EditLessonInput(
    Guid courseId,
    Guid lessonId,
    string title,
    string description
);

public record EditLessonResult(
    Lesson lesson
);