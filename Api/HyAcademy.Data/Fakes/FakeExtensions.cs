using Microsoft.Extensions.DependencyInjection;

namespace HyAcademy.Data;

public static class FakeExtensions
{
    public static IServiceCollection AddFakes(this IServiceCollection services)
        => services
            .AddTransient<IProfileService, FakeProfileService>()
            .AddTransient<IGetCoursesQuery, FakeGetCoursesQuery>()
            .AddTransient<IGetCourseQuery, FakeGetCourseQuery>()
            .AddTransient<IGetAttendingCoursesQuery, FakeGetAttendingCoursesQuery>()
            .AddTransient<IGetTeachingCoursesQuery, FakeGetTeachingCoursesQuery>()

            .AddTransient<IAddCourseMutation, FakeAddCourseMutation>()
            .AddTransient<IEnrollCourseMutation, FakeEnrollCourseMutation>()

            .AddTransient<ICourseEnrollPolicy, FakeCourseEnrollPolicy>();
}