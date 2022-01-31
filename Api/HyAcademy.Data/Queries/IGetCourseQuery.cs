namespace HyAcademy.Data;

public interface IGetCourseQuery
{
    Task<Course?> Execute(Guid id);
}