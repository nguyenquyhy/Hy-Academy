namespace HyAcademy.Data;

public interface ISearchCoursesQuery
{
    Task<IQueryable<Course>> ExecuteAsync(string? userId, string query);
}