using HyAcademy.Data.EF;
using HyAcademy.Data.EF.Mutations;
using HyAcademy.Data.EF.Policies;
using HyAcademy.Data.EF.Queries;
using Microsoft.Extensions.DependencyInjection;

namespace HyAcademy.Data;

public static class EfExtensions
{
    public static IServiceCollection AddEf(this IServiceCollection services)
        => services
            .AddTransient<IProfileService, EfProfileService>()

            .AddTransient<IGetCoursesQuery, EfGetCoursesQuery>()
            .AddTransient<IGetMyCoursesQuery, EfGetMyCoursesQuery>()
            .AddTransient<IGetCourseQuery, EfGetCourseQuery>()

            .AddTransient<IAddCourseMutation, EfAddCourseMutation>()
            .AddTransient<IEnrollCourseMutation, EfEnrollCourseMutation>()

            .AddTransient<ICourseEnrollPolicy, EfCourseEnrollPolicy>()
        ;
}