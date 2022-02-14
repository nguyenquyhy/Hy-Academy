namespace HyAcademy.Data;

public class FakeGetLessonsQuery : IGetLessonsQuery
{
    public Task<IQueryable<Lesson>> Execute()
    {
        return Task.FromResult(FakeData.Lessons.AsQueryable());
    }
     public Task<IQueryable<Lesson>> Execute(Guid courseID)
    {
        return Task.FromResult(FakeData.Lessons.Where(o=>o.Course.Id == courseID).AsQueryable());
    }
} 