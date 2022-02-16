namespace HyAcademy.Data;

public class FakeEnrollCourseMutation : IEnrollCourseMutation
{
    public Task<Enrollment> ExecuteAsync(Guid courseId, string userId)
    {
        var profile = FakeData.Profiles.FirstOrDefault(o => o.UserId == userId) ??
            throw new ArgumentException("Invalid userId", nameof(userId));
        var course = FakeData.Courses.FirstOrDefault(o => o.Id == courseId) ??
            throw new ArgumentException("Invalid courseId", nameof(courseId));
        var enrollment = new Enrollment
        {
            Id = Guid.NewGuid(),
            Added = DateTime.UtcNow,
            Updated = DateTime.UtcNow,
            Course = course,
            Student = profile
        };
        FakeData.Enrollments.Add(enrollment);
        profile.Enrollments.Add(enrollment);
        course.Enrollments.Add(enrollment);
        return Task.FromResult(enrollment);
    }
}