namespace HyAcademy.Data.EF.Mutations;

public class EfAddLessonMutation : IAddLessonMutation
{
    private readonly AppDbContext context;

    public EfAddLessonMutation(AppDbContext context)
    {
        this.context = context;
    }

    public async Task<Lesson> ExecuteAsync(string userId, Guid courseId, string title, string description)
    {
        if (string.IsNullOrWhiteSpace(title)) throw new ArgumentOutOfRangeException(nameof(title), title, $"Title is required!");
        if (string.IsNullOrWhiteSpace(description)) throw new ArgumentOutOfRangeException(nameof(description), description, $"Description is required!");

        var profile = context.Profiles.FirstOrDefault(o => o.UserId == userId);
        if (profile == null) throw new ArgumentOutOfRangeException(nameof(userId), userId, $"Cannot find profile with user ID {userId}!");

        using var transaction = context.Database.BeginTransaction();

        var course = await context.Courses.FindAsync(courseId);
        if (course == null) throw new ArgumentOutOfRangeException(nameof(courseId), courseId, $"Cannot find course with ID {courseId}!");

        var roleAssignment = course.RoleAssignments.FirstOrDefault(r => r.Role == Role.Owner || r.Role == Role.Contributor);
        if (roleAssignment == null) throw new InvalidOperationException($"User ID {userId} is not allowed to edit this course!");

        
        var lesson = new Lesson
        {
            Id = Guid.NewGuid(),
            Course = course,
            Added = DateTime.UtcNow,
            Updated = DateTime.UtcNow,
            Title = title,
            Description = description,
        };
        context.Add(lesson);

        await context.SaveChangesAsync();

        await transaction.CommitAsync();

        return lesson;
    }
}