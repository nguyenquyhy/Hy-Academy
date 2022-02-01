using Microsoft.Extensions.DependencyInjection;

namespace HyAcademy.Data;

public static class FakeExtensions
{
    public static IServiceCollection AddFakes(this IServiceCollection services)
        => services
            .AddTransient<IGetCoursesQuery, FakeGetCoursesQuery>()
            .AddTransient<IGetCourseQuery, FakeGetCourseQuery>();
}