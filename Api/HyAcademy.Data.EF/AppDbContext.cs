using System.Text.Json;
using Microsoft.EntityFrameworkCore.ChangeTracking;

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
        modelBuilder.Entity<Course>()
            .ToTable(nameof(Course))
            .Property(e => e.DisplayOrders)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => string.IsNullOrEmpty(v) ? new List<DisplayOrder>() : 
                        JsonSerializer.Deserialize<List<DisplayOrder>>(v, (JsonSerializerOptions?)null) ?? new List<DisplayOrder>(),
                    new ValueComparer<IList<DisplayOrder>>(
                        (c1, c2) => (c1 == null && c2 == null) || (c1 != null && c2 != null && c1.SequenceEqual(c2)),
                        c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                        c => (IList<DisplayOrder>)c.ToList()
                    )
                );
        modelBuilder.Entity<Lesson>().ToTable(nameof(Lesson));
    }
}
