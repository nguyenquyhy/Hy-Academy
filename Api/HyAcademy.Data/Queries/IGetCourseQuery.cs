namespace HyAcademy.Data;

public interface IGetCourseQuery
{
    Task<Course?> ExecuteAsync(Guid id);
}