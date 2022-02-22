namespace HyAcademy.Data.EF.Mutations;

public class EfAddCourseMutation : IAddCourseMutation
{
    private readonly AppDbContext context;

    public EfAddCourseMutation(AppDbContext context)
    {
        this.context = context;
    }

    public async Task<Course> ExecuteAsync(string userId, string title, string description)
    {
        if (string.IsNullOrWhiteSpace(title)) throw new ArgumentOutOfRangeException(nameof(title), title, $"Title is required!");
        if (string.IsNullOrWhiteSpace(description)) throw new ArgumentOutOfRangeException(nameof(description), description, $"Description is required!");

        var profile = context.Profiles.FirstOrDefault(o => o.UserId == userId);
        if (profile == null) throw new ArgumentOutOfRangeException(nameof(userId), userId, $"Cannot find profile with user ID {userId}!");

        using var transaction = context.Database.BeginTransaction();

        var course = new Course
        {
            Id = Guid.NewGuid(),
            Added = DateTime.UtcNow,
            Updated = DateTime.UtcNow,
            Title = title,
            Description = description,
            Visibility = CourseVisibility.Private,
        };
        var roleAssignment = new RoleAssignment
        {
            Id = Guid.NewGuid(),
            Course = course,
            Profile = profile,
        };
        context.Add(roleAssignment);
        context.Add(roleAssignment);

        await context.SaveChangesAsync();

        await transaction.CommitAsync();

        return course;
    }
}