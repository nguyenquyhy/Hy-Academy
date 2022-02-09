namespace HyAcademy.Data;

public interface IProfileService
{
    Task<Profile> CreateOrGetAsync(string userId);
}