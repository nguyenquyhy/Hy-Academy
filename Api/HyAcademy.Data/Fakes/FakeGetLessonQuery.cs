namespace HyAcademy.Data;

public class FakeGetLessonQuery : IGetLessonQuery
{
    public Task<Lesson?> Execute(Guid id)
    {
        return Task.FromResult(FakeData.Lessons.FirstOrDefault(o => o.Id == id));
    }
} 