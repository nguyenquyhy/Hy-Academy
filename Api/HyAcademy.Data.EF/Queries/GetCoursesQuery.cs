namespace HyAcademy.Data.EF;

public class EfGetCoursesQuery : IGetCoursesQuery
{
    private readonly AppDbContext context;

    public EfGetCoursesQuery(AppDbContext context)
    {
        this.context = context;
    }

    public Task<IQueryable<Course>> Execute()
    {
        return Task.FromResult(context.Courses.AsQueryable());
    }
}