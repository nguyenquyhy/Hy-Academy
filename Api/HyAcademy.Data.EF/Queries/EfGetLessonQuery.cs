namespace HyAcademy.Data.EF.Queries;

public class EfGetLessonQuery : IGetLessonQuery
{
    private readonly AppDbContext context;

    public EfGetLessonQuery(AppDbContext context)
    {
        this.context = context;
    }

    public async Task<Lesson?> ExecuteAsync(Guid courseId, Guid lessonId)
    {
        return await context.Lessons.FindAsync(lessonId);
    }
}