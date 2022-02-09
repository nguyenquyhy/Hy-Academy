namespace HyAcademy.Data.EF;

public class EfProfileService : IProfileService
{
    private readonly AppDbContext dbContext;

    public EfProfileService(AppDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<Profile> CreateOrGetAsync(string userId)
    {
        var profile = dbContext.Profiles.FirstOrDefault(o => o.UserId == userId);
        if (profile == null)
        {
            profile = new Profile
            {
                Id = Guid.NewGuid(),
                Added = DateTime.UtcNow,
                Updated = DateTime.UtcNow,
                UserId = userId
            };
            dbContext.Profiles.Add(profile);
            await dbContext.SaveChangesAsync();
        }
        return profile;
    }
}