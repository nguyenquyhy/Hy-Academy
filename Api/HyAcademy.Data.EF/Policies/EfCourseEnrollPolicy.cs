namespace HyAcademy.Data.EF.Policies;

public class EfCourseEnrollPolicy : ICourseEnrollPolicy
{
    private readonly AppDbContext context;

    public EfCourseEnrollPolicy(AppDbContext context)
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
        return Task.FromResult(
            !course.RoleAssignments.Any(o => o.Profile.UserId == userId) &&
            !course.Enrollments.Any(o => o.Student.UserId == userId)
        );
    }
}
