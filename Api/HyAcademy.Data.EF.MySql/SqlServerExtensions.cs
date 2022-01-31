using Microsoft.EntityFrameworkCore;

namespace HyAcademy.Data.EF;

public static class SqlServerExtensions
{
    public static DbContextOptionsBuilder UseAppSqlServer(this DbContextOptionsBuilder options, string connectionString, string version)
        => options.UseMySql(connectionString, ServerVersion.Parse(version),
            builder => builder.MigrationsAssembly("HyAcademy.Data.EF.MySql"));
}
