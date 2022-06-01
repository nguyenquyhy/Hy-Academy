namespace HyAcademy.Data;

public interface IAddLessonMutation
{
    Task<Lesson> ExecuteAsync(string userId, Guid courseId, string title, string description);
}