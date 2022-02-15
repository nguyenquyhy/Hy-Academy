namespace HyAcademy.Data;

public interface ICourseEnrollPolicy
{
    Task<bool> AllowAsync(Guid courseId, string? userId);
}