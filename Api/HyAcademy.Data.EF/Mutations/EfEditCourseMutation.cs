namespace HyAcademy.Data.EF.Mutations;

public class EfEditCourseMutation : IEditCourseMutation
{
    private readonly AppDbContext context;
    private readonly ICourseEditPolicy editPolicy;

    public EfEditCourseMutation(AppDbContext context, ICourseEditPolicy editPolicy)
    {
        this.context = context;
        this.editPolicy = editPolicy;
    }

    public async Task<Course> ExecuteAsync(string userId, Guid courseId, string title, string description, CourseVisibility visibility)
    {
        if (string.IsNullOrWhiteSpace(title)) throw new ArgumentOutOfRangeException(nameof(title), title, $"Title is required!");
        if (string.IsNullOrWhiteSpace(description)) throw new ArgumentOutOfRangeException(nameof(description), description, $"Description is required!");

        var profile = context.Profiles.FirstOrDefault(o => o.UserId == userId);
        if (profile == null) throw new ArgumentOutOfRangeException(nameof(userId), userId, $"Cannot find profile with user ID {userId}!");
        
        if (!await editPolicy.AllowAsync(courseId, userId)) throw new InvalidOperationException($"User ID {userId} is not allowed to edit this course!");

        using var transaction = context.Database.BeginTransaction();

        var course = await context.Courses.FindAsync(courseId);
        if (course == null) throw new ArgumentOutOfRangeException(nameof(courseId), courseId, $"Cannot find course with ID {courseId}!");

        course.Title = title;
        course.Description = description;
        course.Visibility = visibility;
        await context.SaveChangesAsync();

        await transaction.CommitAsync();

        return course;
    }
}