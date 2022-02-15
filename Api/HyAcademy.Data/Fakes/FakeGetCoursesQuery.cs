namespace HyAcademy.Data;

public class FakeGetCoursesQuery : IGetCoursesQuery
{
    public Task<IQueryable<Course>> ExecuteAsync()
    {
        return Task.FromResult(FakeData.Courses.AsQueryable());
    }
}