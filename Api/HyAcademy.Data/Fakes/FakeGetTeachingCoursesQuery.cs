namespace HyAcademy.Data;

public class FakeGetTeachingCoursesQuery : IGetTeachingCoursesQuery
{
    public Task<IQueryable<Course>> ExecuteAsync(string userId)
    {
        return Task.FromResult(FakeData.Courses.Where(o => o.RoleAssignments.Any(o => o.Profile.UserId == userId)).AsQueryable());
    }
}