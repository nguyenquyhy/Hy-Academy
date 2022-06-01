namespace HyAcademy.Data;

public interface IEditLessonMutation
{
    Task<Lesson> ExecuteAsync(string userId, Guid courseId, Guid lessonId, string title, string description);
}