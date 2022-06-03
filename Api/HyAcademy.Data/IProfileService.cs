namespace HyAcademy.Data;

public interface IProfileService
{
    Task<(bool isNew, Profile profile)> LoginAsync(string userId, string displayName);
}