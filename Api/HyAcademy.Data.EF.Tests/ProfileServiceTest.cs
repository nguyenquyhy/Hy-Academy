using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace HyAcademy.Data.EF.Tests;

[TestClass]
public class ProfileServiceTest
{
    private static AppDbContext CreateContext()
        => new AppDbContext(new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase($"Test_{Guid.NewGuid()}").Options);

    [TestMethod]
    public async Task TestCreate()
    {
        var context = CreateContext();

        var existingProfile = context.Profiles.FirstOrDefault(o => o.UserId == "test_id");

        existingProfile.Should().BeNull();

        var service = new EfProfileService(context);

        var profile = await service.CreateOrGetAsync("test_id");

        profile.Should().NotBeNull();
        profile.UserId.Should().Be("test_id");

        existingProfile = context.Profiles.FirstOrDefault(o => o.UserId == "test_id");

        existingProfile.Should().NotBeNull();
        existingProfile!.UserId.Should().Be("test_id");
    }
    
    [TestMethod]
    public async Task TestGet()
    {
        var context = CreateContext();

        context.Profiles.Add(new Profile
        {
            Id = new Guid("86fb9ccb-1476-44d2-bf46-615a77ab6b23"),
            UserId = "test_id"
        });
        await context.SaveChangesAsync();

        var service = new EfProfileService(context);

        var profile = await service.CreateOrGetAsync("test_id");

        profile.Should().NotBeNull();
        profile.Id.Should().Be(new Guid("86fb9ccb-1476-44d2-bf46-615a77ab6b23"));
        profile!.UserId.Should().Be("test_id");
    }
    
    [TestMethod]
    public async Task TestRepeat()
    {
        var context = CreateContext();
        var service = new EfProfileService(context);

        var profile = await service.CreateOrGetAsync("test_id");

        profile.Should().NotBeNull();

        var secondProfile = await service.CreateOrGetAsync("test_id");

        secondProfile.Should().NotBeNull();
        profile.Id.Should().Be(secondProfile.Id);
        secondProfile.UserId.Should().Be("test_id");
    }
}