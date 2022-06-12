namespace HyAcademy.Data.EF.Mutations;

public class EfEditLessonMutation : IEditLessonMutation
{
    private readonly AppDbContext context;
    private readonly ICourseEditPolicy editPolicy;

    public EfEditLessonMutation(AppDbContext context, ICourseEditPolicy editPolicy)
    {
        this.context = context;
        this.editPolicy = editPolicy;
    }

    public async Task<Lesson> ExecuteAsync(string userId, Guid courseId, Guid lessonId, string title, string description)
    {
        if (string.IsNullOrWhiteSpace(title)) throw new ArgumentOutOfRangeException(nameof(title), title, $"Title is required!");
        if (string.IsNullOrWhiteSpace(description)) throw new ArgumentOutOfRangeException(nameof(description), description, $"Description is required!");

        var profile = context.Profiles.FirstOrDefault(o => o.UserId == userId);
        if (profile == null) throw new ArgumentOutOfRangeException(nameof(userId), userId, $"Cannot find profile with user ID {userId}!");

        if (!await editPolicy.AllowAsync(courseId, userId)) throw new InvalidOperationException($"User ID {userId} is not allowed to edit this course!");

        using var transaction = context.Database.BeginTransaction();

        var course = await context.Courses.FindAsync(courseId);
        if (course == null) throw new ArgumentOutOfRangeException(nameof(courseId), courseId, $"Cannot find course with ID {courseId}!");
        
        var lesson = await context.Lessons.FindAsync(lessonId);
        if (lesson == null) throw new ArgumentOutOfRangeException(nameof(lessonId), lessonId, $"Cannot find lesson with ID {lessonId}!");

        lesson.Title = title;
        lesson.Description = description;
        await context.SaveChangesAsync();

        await transaction.CommitAsync();

        return lesson;
    }
}