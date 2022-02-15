namespace HyAcademy.Data.EF.Mutations;

public class EfEnrollCourseMutation : IEnrollCourseMutation
{
    private readonly AppDbContext context;

    public EfEnrollCourseMutation(AppDbContext context)
    {
        this.context = context;
    }

    public async Task<Enrollment> ExecuteAsync(Guid courseId, string userId)
    {
        var course = await context.Courses.FindAsync(courseId);
        if (course == null) throw new ArgumentOutOfRangeException(nameof(courseId), courseId, $"Cannot find course with ID {courseId}!");
        var profile = context.Profiles.FirstOrDefault(o => o.UserId == userId);
        if (profile == null) throw new ArgumentOutOfRangeException(nameof(userId), userId, $"Cannot find profile with user ID {userId}!");

        using var transaction = context.Database.BeginTransaction();

        var existingEnrollment = course.Enrollments.FirstOrDefault(o => o.Course == course && o.Student.UserId == userId);
        if (existingEnrollment != null)
        {
            return existingEnrollment;
        }

        var enrollment = new Enrollment
        {
            Id = Guid.NewGuid(),
            Added = DateTime.UtcNow,
            Updated = DateTime.UtcNow,
            Course = course,
            Student = profile
        };
        context.Add(enrollment);
        await context.SaveChangesAsync();

        await transaction.CommitAsync();

        return enrollment;
    }
}