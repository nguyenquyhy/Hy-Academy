namespace HyAcademy.Data;

public interface IProfileService
{
    Task<Profile> LoginAsync(string userId, string displayName);
}