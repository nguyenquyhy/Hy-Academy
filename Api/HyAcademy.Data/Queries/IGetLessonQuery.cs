namespace HyAcademy.Data;

public interface IGetLessonQuery
{
    Task<Lesson?> Execute(Guid id);
}