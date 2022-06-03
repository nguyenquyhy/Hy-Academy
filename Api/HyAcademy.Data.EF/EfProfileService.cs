namespace HyAcademy.Data.EF;

public class EfProfileService : IProfileService
{
    private readonly AppDbContext context;

    public EfProfileService(AppDbContext context)
    {
        this.context = context;
    }

    public async Task<(bool isNew, Profile profile)> LoginAsync(string userId, string displayName)
    {
        using var transaction = context.Database.BeginTransaction();

        var profile = context.Profiles.FirstOrDefault(o => o.UserId == userId);
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
            context.Profiles.Add(profile);
            await context.SaveChangesAsync();
        }
        else
        {
            profile.DisplayName = displayName;
            await context.SaveChangesAsync();
        }

        await transaction.CommitAsync();

        return (isNew, profile);
    }
}