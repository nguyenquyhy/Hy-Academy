namespace HyAcademy.Data;

public class FakeProfileService : IProfileService
{
    public Task<Profile> LoginAsync(string userId, string displayName)
    {
        var profile = FakeData.Profiles.FirstOrDefault(o => o.UserId == userId);
        if (profile == null)
        {
            profile = new Profile
            {
                Id = Guid.NewGuid(),
                Added = DateTime.UtcNow,
                Updated = DateTime.UtcNow,
                UserId = userId,
                DisplayName = displayName,
            };
            FakeData.Profiles.Add(profile);
        }
        return Task.FromResult(profile);
    }
}