namespace HyAcademy.Data.EF.Queries;

public class EfGetTeachingCoursesQuery : IGetTeachingCoursesQuery
{
    private readonly AppDbContext context;

    public EfGetTeachingCoursesQuery(AppDbContext context)
    {
        this.context = context;
    }

    public async Task<IQueryable<Course>> ExecuteAsync(string userId)
    {
        return context.Courses.Where(o => o.RoleAssignments.Any(r => r.Profile.UserId == userId)).AsQueryable();
    }
}