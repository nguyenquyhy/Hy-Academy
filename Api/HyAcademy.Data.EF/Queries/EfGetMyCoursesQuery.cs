namespace HyAcademy.Data.EF.Queries;

public class EfGetMyCoursesQuery : IGetMyCoursesQuery
{
    private readonly AppDbContext context;

    public EfGetMyCoursesQuery(AppDbContext context)
    {
        this.context = context;
    }

    public async Task<IQueryable<Course>> ExecuteAsync(string userId)
    {
        return context.Courses.Where(o => o.Enrollments.Any(o => o.Student.UserId == userId)).AsQueryable();
    }
}
