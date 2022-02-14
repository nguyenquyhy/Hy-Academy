namespace HyAcademy.Data;

public interface IGetLessonsQuery
{
    Task<IQueryable<Lesson>> Execute();
    Task<IQueryable<Lesson>> Execute(Guid courseID);
}