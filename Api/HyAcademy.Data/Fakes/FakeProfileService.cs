namespace HyAcademy.Data;

public class FakeProfileService : IProfileService
{
    public Task<(bool isNew, Profile profile)> LoginAsync(string userId, string displayName)
    {
        var profile = FakeData.Profiles.FirstOrDefault(o => o.UserId == userId);
        var isNew = profile == null;
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
        return Task.FromResult((isNew, profile));
    }
}