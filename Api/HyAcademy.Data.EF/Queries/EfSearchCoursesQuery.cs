namespace HyAcademy.Data.EF.Queries;

public class EfSearchCoursesQuery : ISearchCoursesQuery
{
    private readonly AppDbContext context;

    public EfSearchCoursesQuery(AppDbContext context)
    {
        this.context = context;
    }

    public Task<IQueryable<Course>> ExecuteAsync(string? userId, string query)
    {
        return Task.FromResult(context.Courses.Where(c => c.Visibility == CourseVisibility.Public).Where(c => c.Title.Contains(query)));
    }
}