namespace HyAcademy.Data;

public class FakeGetCourseQuery : IGetCourseQuery
{
    public Task<Course?> ExecuteAsync(Guid id)
    {
        return Task.FromResult(FakeData.Courses.FirstOrDefault(o => o.Id == id));
    }
}