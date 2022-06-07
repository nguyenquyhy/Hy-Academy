namespace HyAcademy.Data;

public interface IEditCourseMutation
{
    Task<Course> ExecuteAsync(string userId, Guid courseId, string title, string description, CourseVisibility visibility);
}