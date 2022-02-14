using HyAcademy.Data.EF;
using HyAcademy.Data.EF.Queries;
using Microsoft.Extensions.DependencyInjection;

namespace HyAcademy.Data;

public static class EfExtensions
{
    public static IServiceCollection AddEf(this IServiceCollection services)
        => services
            .AddTransient<IProfileService, EfProfileService>()
            .AddTransient<IGetCoursesQuery, EfGetCoursesQuery>()
            .AddTransient<IGetCourseQuery, EfGetCourseQuery>();
}