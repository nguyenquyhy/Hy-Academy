using Microsoft.EntityFrameworkCore;

namespace HyAcademy.Data.EF;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    public DbSet<Profile> Profiles { get; set; } = null!;
    public DbSet<Course> Courses { get; set; } = null!;
}
