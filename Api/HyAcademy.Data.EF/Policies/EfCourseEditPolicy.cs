namespace HyAcademy.Data.EF.Policies;

public class EfCourseEditPolicy : ICourseEditPolicy
{
    private readonly AppDbContext context;

    public EfCourseEditPolicy(AppDbContext context)
    {
        this.context = context;
    }

    public Task<bool> AllowAsync(Guid courseId, string? userId)
    {
        if (userId == null)
        {
            return Task.FromResult(false);
        }
        var course = context.Courses.FirstOrDefault(o => o.Id == courseId);
        if (course == null)
        {
            return Task.FromResult(false);
        }
        return Task.FromResult(course.RoleAssignments.Any(o => o.Profile.UserId == userId));
    }
}
