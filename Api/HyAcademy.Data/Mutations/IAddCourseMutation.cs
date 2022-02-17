namespace HyAcademy.Data;

public interface IAddCourseMutation
{
    Task<Course> ExecuteAsync(string userId, string title, string description);
}