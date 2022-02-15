namespace HyAcademy.Data;

public interface IGetMyCoursesQuery
{
    Task<IQueryable<Course>> ExecuteAsync(string userId);
}