namespace HyAcademy.Data.EF.Queries;

public class EfGetAttendingCoursesQuery : IGetAttendingCoursesQuery
{
    private readonly AppDbContext context;

    public EfGetAttendingCoursesQuery(AppDbContext context)
    {
        this.context = context;
    }

    public Task<IQueryable<Course>> ExecuteAsync(string userId)
    {
        return Task.FromResult(context.Courses.Where(o => o.Enrollments.Any(o => o.Student.UserId == userId)).AsQueryable());
    }
}