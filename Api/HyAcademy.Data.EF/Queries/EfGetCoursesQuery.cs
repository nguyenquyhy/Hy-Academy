namespace HyAcademy.Data.EF.Queries;

public class EfGetCoursesQuery : IGetCoursesQuery
{
    private readonly AppDbContext context;

    public EfGetCoursesQuery(AppDbContext context)
    {
        this.context = context;
    }

    public Task<IQueryable<Course>> ExecuteAsync()
    {
        return Task.FromResult(context.Courses.AsQueryable());
    }
}