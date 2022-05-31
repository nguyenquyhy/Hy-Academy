namespace HyAcademy.Data;

public interface IGetTeachingCoursesQuery
{
    Task<IQueryable<Course>> ExecuteAsync(string userId);
}