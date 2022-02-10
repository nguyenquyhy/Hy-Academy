using Microsoft.EntityFrameworkCore;

namespace HyAcademy.Data.EF;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    public DbSet<Profile> Profiles { get; set; } = null!;
    public DbSet<Course> Courses { get; set; } = null!;
    public DbSet<Lesson> Lessons { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Override table name for DbSet to ensure all table name use class name directly
        modelBuilder.Entity<Profile>().ToTable(nameof(Profile));
        modelBuilder.Entity<Course>().ToTable(nameof(Course));
    }
}
