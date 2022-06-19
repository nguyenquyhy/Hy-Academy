namespace HyAcademy.Data;

public interface IEditLessonOrderMutation
{
    Task<Course> ExecuteAsync(string userId, Guid courseId, Guid lessonId, Guid? lessonIdAfter);
}