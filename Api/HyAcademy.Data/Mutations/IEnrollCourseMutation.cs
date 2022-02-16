namespace HyAcademy.Data;

public interface IEnrollCourseMutation
{
    Task<Enrollment> ExecuteAsync(Guid courseId, string userId);
}