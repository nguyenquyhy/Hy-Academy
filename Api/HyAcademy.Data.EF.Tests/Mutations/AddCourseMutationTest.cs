using HyAcademy.Data.EF.Mutations;

namespace HyAcademy.Data.EF.Tests;

[TestClass]
public class AddCourseMutationTest : BaseTest
{
    [TestMethod]
    public async Task TestAddCourse()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();

        context.Profiles.Add(new Profile
        {
            Id = new Guid("46bc8abb-2a5d-4176-91fe-c5b97e7e5c2b"),
            UserId = "TEST_USER"
        });
        await context.SaveChangesAsync();

        var mutation = new EfAddCourseMutation(context);

        var course = await mutation.ExecuteAsync("TEST_USER", "Test new project", "Test description");

        course.Title.Should().Be("Test new project");
        course.Description.Should().Be("Test description");

        var courseInDb = await context.Courses.FindAsync(course.Id);

        courseInDb.Should().NotBeNull();
        courseInDb!.Title.Should().Be("Test new project");
        courseInDb!.Description.Should().Be("Test description");
    }

    [TestMethod]
    public async Task TestAddCourse_RejectTitle()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();

        context.Profiles.Add(new Profile
        {
            Id = new Guid("46bc8abb-2a5d-4176-91fe-c5b97e7e5c2b"),
            UserId = "TEST_USER"
        });
        await context.SaveChangesAsync();

        var mutation = new EfAddCourseMutation(context);

        var action = () => mutation.ExecuteAsync("TEST_USER", "", "Test description");

        await action.Should().ThrowAsync<Exception>();
    }

    [TestMethod]
    public async Task TestAddCourse_RejectDescription()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();

        context.Profiles.Add(new Profile
        {
            Id = new Guid("46bc8abb-2a5d-4176-91fe-c5b97e7e5c2b"),
            UserId = "TEST_USER"
        });
        await context.SaveChangesAsync();

        var mutation = new EfAddCourseMutation(context);

        var action = () => mutation.ExecuteAsync("TEST_USER", "Test new project", "");

        await action.Should().ThrowAsync<Exception>();
    }
}