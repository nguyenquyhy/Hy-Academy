namespace HyAcademy.Data;

public class FakeCourseEnrollPolicy : ICourseEnrollPolicy
{
    public Task<bool> AllowAsync(Guid courseId, string? userId)
    {
        if (userId == null) return Task.FromResult(false);

        var profile = FakeData.Profiles.FirstOrDefault(o => o.UserId == userId) ??
            throw new ArgumentException("Invalid userId", nameof(userId));
        var course = FakeData.Courses.FirstOrDefault(o => o.Id == courseId) ??
            throw new ArgumentException("Invalid courseId", nameof(courseId));

        var enrollment = FakeData.Enrollments.FirstOrDefault(o => o.Course == course && o.Student == profile);

        return Task.FromResult(enrollment == null);
    }
}