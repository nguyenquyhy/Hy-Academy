namespace HyAcademy.Data;

public interface IGetCoursesQuery
{
    Task<IQueryable<Course>> Execute();
}