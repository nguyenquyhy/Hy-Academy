namespace HyAcademy.Data;

public class FakeAddCourseMutation : IAddCourseMutation
{
    public Task<Course> ExecuteAsync(string userId, string title, string description)
    {
        var profile = FakeData.Profiles.FirstOrDefault(o => o.UserId == userId) ??
            throw new ArgumentException("Invalid userId", nameof(userId));
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
        course.RoleAssignments.Add(roleAssignment);
        profile.RoleAssignments.Add(roleAssignment);
        FakeData.Courses.Add(course);
        return Task.FromResult(course);
    }
}