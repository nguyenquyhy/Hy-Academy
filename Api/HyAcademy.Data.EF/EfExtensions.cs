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

            .AddTransient<ISearchCoursesQuery, EfSearchCoursesQuery>()

            .AddTransient<IGetCoursesQuery, EfGetCoursesQuery>()
            .AddTransient<IGetAttendingCoursesQuery, EfGetAttendingCoursesQuery>()
            .AddTransient<IGetTeachingCoursesQuery, EfGetTeachingCoursesQuery>()
            .AddTransient<IGetCourseQuery, EfGetCourseQuery>()

            .AddTransient<IAddCourseMutation, EfAddCourseMutation>()
            .AddTransient<IEditCourseMutation, EfEditCourseMutation>()
            .AddTransient<IEnrollCourseMutation, EfEnrollCourseMutation>()
            .AddTransient<IEditLessonOrderMutation, EfEditLessonOrderMutation>()

            .AddTransient<IGetLessonQuery, EfGetLessonQuery>()

            .AddTransient<IAddLessonMutation, EfAddLessonMutation>()
            .AddTransient<IEditLessonMutation, EfEditLessonMutation>()

            .AddTransient<ICourseEditPolicy, EfCourseEditPolicy>()
            .AddTransient<ICourseEnrollPolicy, EfCourseEnrollPolicy>()
        ;
}