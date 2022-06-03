using System.Linq;

namespace HyAcademy.Data.EF.Tests;

[TestClass]
public class ProfileServiceTest : BaseTest
{
    [TestMethod]
    public async Task TestCreate()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();

        var existingProfile = context.Profiles.FirstOrDefault(o => o.UserId == "test_id");

        existingProfile.Should().BeNull();

        var service = new EfProfileService(context);

        var (isNew, profile) = await service.LoginAsync("test_id", "Test Name");

        isNew.Should().BeTrue();
        profile.Should().NotBeNull();
        profile.UserId.Should().Be("test_id");
        profile.DisplayName.Should().Be("Test Name");

        existingProfile = context.Profiles.FirstOrDefault(o => o.UserId == "test_id");

        existingProfile.Should().NotBeNull();
        existingProfile!.UserId.Should().Be("test_id");
    }

    [TestMethod]
    public async Task TestGet()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();

        context.Profiles.Add(new Profile
        {
            Id = new Guid("86fb9ccb-1476-44d2-bf46-615a77ab6b23"),
            UserId = "test_id",
            DisplayName = "Test Name",
        });
        await context.SaveChangesAsync();

        var service = new EfProfileService(context);

        var (isNew, profile) = await service.LoginAsync("test_id", "Test New Name");

        isNew.Should().BeFalse();
        profile.Should().NotBeNull();
        profile.Id.Should().Be(new Guid("86fb9ccb-1476-44d2-bf46-615a77ab6b23"));
        profile.UserId.Should().Be("test_id");
        profile.DisplayName.Should().Be("Test New Name");
    }

    [TestMethod]
    public async Task TestRepeat()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();
        var service = new EfProfileService(context);

        var (isNew, profile) = await service.LoginAsync("test_id", "Test Name");

        isNew.Should().BeTrue();
        profile.Should().NotBeNull();

        var (isSecondNew, secondProfile) = await service.LoginAsync("test_id", "Test Name");

        isSecondNew.Should().BeFalse();
        secondProfile.Should().NotBeNull();
        profile.Id.Should().Be(secondProfile.Id);
        secondProfile.UserId.Should().Be("test_id");
        secondProfile.DisplayName.Should().Be("Test Name");
    }
}