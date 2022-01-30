namespace HyAcademy.Data;

public class FakeGetCoursesQuery : IGetCoursesQuery
{
    public Task<IQueryable<Course>> Execute()
    {
        return Task.FromResult(FakeData.Courses.AsQueryable());
    }
}