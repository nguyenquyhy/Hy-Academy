using HyAcademy.Data.EF.Policies;

namespace HyAcademy.Data.EF.Tests;

[TestClass]
public class CourseEnrollPolicyTest : BaseTest
{
    [TestMethod]
    public async Task TestAllowEnrollForNonStudentNonOwner()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();
        context.Courses.Add(new Course
        {
            Id = new Guid("005837ce-063f-49a7-92f0-fe7a388c6068")
        });
        context.Profiles.Add(new Profile
        {
            Id = new Guid("8a785779-3ef3-4b24-a39e-41bda7cb3603"),
            UserId = "TEST_USER"
        });
        await context.SaveChangesAsync();

        var policy = new EfCourseEnrollPolicy(context);

        var result = await policy.AllowAsync(new Guid("005837ce-063f-49a7-92f0-fe7a388c6068"), "TEST_USER");

        result.Should().BeTrue();
    }

    [TestMethod]
    public async Task TestNotAllowEnrollForStudentNonOwner()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();
        var course = new Course
        {
            Id = new Guid("005837ce-063f-49a7-92f0-fe7a388c6068")
        };
        context.Courses.Add(course);
        var profile = new Profile
        {
            Id = new Guid("8a785779-3ef3-4b24-a39e-41bda7cb3603"),
            UserId = "TEST_USER"
        };
        context.Profiles.Add(profile);
        var enrollment = new Enrollment
        {
            Id = new Guid("e9da1bed-51e1-472d-86ab-ff012615a0e8"),
            Course = course,
            Student = profile
        };
        context.Add(enrollment);
        await context.SaveChangesAsync();

        var policy = new EfCourseEnrollPolicy(context);

        var result = await policy.AllowAsync(new Guid("005837ce-063f-49a7-92f0-fe7a388c6068"), "TEST_USER");

        result.Should().BeFalse();
    }

    [TestMethod]
    public async Task TestNotAllowEnrollForNonStudentOwner()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();
        var course = new Course
        {
            Id = new Guid("005837ce-063f-49a7-92f0-fe7a388c6068")
        };
        context.Courses.Add(course);
        var profile = new Profile
        {
            Id = new Guid("8a785779-3ef3-4b24-a39e-41bda7cb3603"),
            UserId = "TEST_USER"
        };
        context.Profiles.Add(profile);
        context.Add(new RoleAssignment
        {
            Course = course,
            Profile = profile,
            Role = Role.Owner
        });
        await context.SaveChangesAsync();

        var policy = new EfCourseEnrollPolicy(context);

        var result = await policy.AllowAsync(new Guid("005837ce-063f-49a7-92f0-fe7a388c6068"), "TEST_USER");

        result.Should().BeFalse();
    }

    [TestMethod]
    public async Task TestNotAllowEnrollForNonStudentContributor()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();
        var course = new Course
        {
            Id = new Guid("005837ce-063f-49a7-92f0-fe7a388c6068")
        };
        context.Courses.Add(course);
        var profile = new Profile
        {
            Id = new Guid("8a785779-3ef3-4b24-a39e-41bda7cb3603"),
            UserId = "TEST_USER"
        };
        context.Profiles.Add(profile);
        course.RoleAssignments.Add(new RoleAssignment
        {
            Course = course,
            Profile = profile,
            Role = Role.Contributor
        });
        await context.SaveChangesAsync();

        var policy = new EfCourseEnrollPolicy(context);

        var result = await policy.AllowAsync(new Guid("005837ce-063f-49a7-92f0-fe7a388c6068"), "TEST_USER");

        result.Should().BeFalse();
    }
}