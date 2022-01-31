namespace HyAcademy.Data.EF;

public class EfGetCourseQuery : IGetCourseQuery
{
    private readonly AppDbContext context;

    public EfGetCourseQuery(AppDbContext context)
    {
        this.context = context;
    }

    public async Task<Course?> Execute(Guid id)
    {
        return await context.Courses.FindAsync(id);
    }
}