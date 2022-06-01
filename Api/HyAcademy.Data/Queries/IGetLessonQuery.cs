namespace HyAcademy.Data;

public interface IGetLessonQuery
{
    Task<Lesson?> ExecuteAsync(Guid courseId, Guid lessonId);
}