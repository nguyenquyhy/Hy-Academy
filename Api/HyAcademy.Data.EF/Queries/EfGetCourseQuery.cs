namespace HyAcademy.Data.EF.Queries;

public class EfGetCourseQuery : IGetCourseQuery
{
    private readonly AppDbContext context;

    public EfGetCourseQuery(AppDbContext context)
    {
        this.context = context;
    }

    public async Task<Course?> ExecuteAsync(Guid id)
    {
        return await context.Courses.FindAsync(id);
    }
}