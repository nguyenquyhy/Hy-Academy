namespace HyAcademy.Data.EF;

public class EfGetLessonQuery : IGetLessonQuery
{
    private readonly AppDbContext context;

    public EfGetLessonQuery(AppDbContext context)
    {
        this.context = context;
    }

    public async Task<Lesson?> Execute(Guid id)
    {
        return await context.Lessons.FindAsync(id);
    }
}