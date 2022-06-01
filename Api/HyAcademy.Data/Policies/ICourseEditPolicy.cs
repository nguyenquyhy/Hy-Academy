namespace HyAcademy.Data;

public interface ICourseEditPolicy
{
    Task<bool> AllowAsync(Guid courseId, string? userId);
}