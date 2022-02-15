using Microsoft.Data.Sqlite;

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
            var context = new AppDbContext(
                new DbContextOptionsBuilder<AppDbContext>()
                    .UseSqlite(connection)
                    .Options
            );
            context.Database.EnsureCreated();
            return context;
        });
        return mock.Object;
    }
}