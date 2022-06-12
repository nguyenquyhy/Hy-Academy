using Microsoft.Data.Sqlite;
using System.Threading;

namespace HyAcademy.Data.EF.Tests;

public abstract class BaseTest
{
    protected static IDbContextFactory<AppDbContext> CreateContextFactory()
    {
        var mock = new Mock<IDbContextFactory<AppDbContext>>();

        var connection = new SqliteConnection("Filename=:memory:");
        connection.Open();

        mock.Setup(o => o.CreateDbContext()).Returns(() =>
        {
            var context = new TestAppDbContext(
                new DbContextOptionsBuilder<AppDbContext>()
                    .UseSqlite(connection)
                    .Options
            );
            context.Database.EnsureCreated();
            return context;
        });
        return mock.Object;
    }

    public class TestAppDbContext : AppDbContext
    {
        public TestAppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // WORKAROUND: Sqlite driver doesn't seem to understand [DatabaseGenerated] for DateTime,
            // so we added default value for the fields.
            // https://github.com/dotnet/efcore/issues/17524
            foreach (var type in modelBuilder.Model.GetEntityTypes())
            {
                if (type.ClrType.IsAssignableTo(typeof(Base)))
                {
                    var addedProp = type.ClrType.GetProperty(nameof(Base.Added));
                    if (addedProp != null)
                    {
                        type.FindProperty(addedProp)?.SetDefaultValueSql("CURRENT_TIMESTAMP");
                    }
                    var updatedProp = type.ClrType.GetProperty(nameof(Base.Updated));
                    if (updatedProp != null)
                    {
                        type.FindProperty(updatedProp)?.SetDefaultValueSql("CURRENT_TIMESTAMP");
                    }
                }
            }
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            // WORKAROUND: Sqlite driver doesn't seem to understand [DatabaseGenerated(DatabaseGeneratedOption.Computed)],
            // so we set the value manually on update
            foreach (var entry in ChangeTracker.Entries())
            {
                if (entry.Entity is Base baseObj)
                {
                    if (entry.State == EntityState.Added || entry.State == EntityState.Modified)
                    {
                        baseObj.Updated = DateTime.UtcNow;
                    }
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}