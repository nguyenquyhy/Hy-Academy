namespace HyAcademy.Data;

public class FakeGetMyCoursesQuery : IGetMyCoursesQuery
{
    public Task<IQueryable<Course>> ExecuteAsync(string userId)
    {
        return Task.FromResult(FakeData.Courses.Where(o => o.Enrollments.Any(o => o.Student.UserId == userId)).AsQueryable());
    }
}