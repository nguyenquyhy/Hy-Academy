namespace HyAcademy.Data;

public interface IGetAttendingCoursesQuery
{
    Task<IQueryable<Course>> ExecuteAsync(string userId);
}