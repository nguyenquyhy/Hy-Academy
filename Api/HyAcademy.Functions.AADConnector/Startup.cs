using HyAcademy.Data;
using HyAcademy.Data.EF;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using System;

[assembly: FunctionsStartup(typeof(HyAcademy.Functions.SignIn.Startup))]
namespace HyAcademy.Functions.SignIn;

public class Startup : FunctionsStartup
{
    public override void Configure(IFunctionsHostBuilder builder)
    {
        builder.Services.AddEf();

        builder.Services.AddDbContext<AppDbContext>(options =>
        {
            options.UseAppSqlServer(
                Environment.GetEnvironmentVariable("ConnectionStrings_Default", EnvironmentVariableTarget.Process),
                Environment.GetEnvironmentVariable("MySql_Version", EnvironmentVariableTarget.Process)
            );
        });
    }
}
