using HyAcademy.Data.EF.Mutations;
using System.Linq;

namespace HyAcademy.Data.EF.Tests;

[TestClass]
public class EnrollCourseMutationTest : BaseTest
{
    [TestMethod]
    public async Task TestCreateNewEnrollment()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();

        context.Courses.Add(new Course
        {
            Id = new Guid("b967053e-244b-4676-a057-7e4415855660"),
        });
        context.Profiles.Add(new Profile
        {
            Id = new Guid("46bc8abb-2a5d-4176-91fe-c5b97e7e5c2b"),
            UserId = "TEST_USER"
        });
        await context.SaveChangesAsync();

        var mutation = new EfEnrollCourseMutation(context);

        // ACT
        await mutation.ExecuteAsync(new Guid("b967053e-244b-4676-a057-7e4415855660"), "TEST_USER");

        var course = await context.Courses
            .Include(o => o.Enrollments).ThenInclude(o => o.Student)
            .FirstAsync(o => o.Id == new Guid("b967053e-244b-4676-a057-7e4415855660"));

        var enrollment = course!.Enrollments.FirstOrDefault(o => o.Student.UserId == "TEST_USER");

        enrollment.Should().NotBeNull();
    }

    [TestMethod]
    public async Task TestReturningExistingEnrollment()
    {
        var contextFactory = CreateContextFactory();
        await using var context = contextFactory.CreateDbContext();

        var course = new Course
        {
            Id = new Guid("b967053e-244b-4676-a057-7e4415855660"),
        };
        context.Courses.Add(course);
        var profile = new Profile
        {
            Id = new Guid("46bc8abb-2a5d-4176-91fe-c5b97e7e5c2b"),
            UserId = "TEST_USER"
        };
        context.Profiles.Add(profile);
        context.Add(new Enrollment
        {
            Id = new Guid("79a6c1d2-722c-4d06-a623-bbcece1251b9"),
            Course = course,
            Student = profile
        });
        await context.SaveChangesAsync();

        var mutation = new EfEnrollCourseMutation(context);

        // ACT
        await mutation.ExecuteAsync(new Guid("b967053e-244b-4676-a057-7e4415855660"), "TEST_USER");

        course = await context.Courses
            .Include(o => o.Enrollments).ThenInclude(o => o.Student)
            .FirstAsync(o => o.Id == new Guid("b967053e-244b-4676-a057-7e4415855660"));

        var enrollment = course!.Enrollments.FirstOrDefault(o => o.Student.UserId == "TEST_USER");

        enrollment.Should().NotBeNull();
        enrollment!.Id.Should().Be(new Guid("79a6c1d2-722c-4d06-a623-bbcece1251b9"));
    }
}