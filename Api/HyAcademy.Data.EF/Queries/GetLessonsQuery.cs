namespace HyAcademy.Data.EF;

public class EfGetLessonsQuery : IGetLessonsQuery
{
    private readonly AppDbContext context;

    public EfGetLessonsQuery(AppDbContext context)
    {
        this.context = context;
    }

    public Task<IQueryable<Lesson>> Execute()
    {
        return Task.FromResult(context.Lessons.AsQueryable());
    }

     public Task<IQueryable<Lesson>> Execute(Guid courseID)
    {
        return Task.FromResult(context.Lessons.Where( o => o.Course.Id == courseID));
    }
}