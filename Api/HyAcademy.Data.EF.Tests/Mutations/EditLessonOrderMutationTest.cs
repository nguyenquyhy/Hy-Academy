using System.Collections.Generic;
using HyAcademy.Data.EF.Mutations;
using HyAcademy.Data.EF.Policies;

namespace HyAcademy.Data.EF.Tests;

[TestClass]
public class EditLessonOrderMutationTest : BaseTest
{
    [TestMethod]
    public async Task Test_Disallow_NonContributor_SetLessonOrder()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();

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
        context.Add(new Lesson
        {
            Id = new Guid("6a88ca87-2b52-4474-b42d-37ed111053a5"),
            Course = course
        });
        context.Add(new RoleAssignment
        {
            Id = new Guid("3c1735e8-66fb-429b-b797-5654c8d114f6"),
            Course = course,
            Profile = profile,
            Role = Role.Owner
        });
        await context.SaveChangesAsync();

        var mutation = new EfEditLessonOrderMutation(context, new EfCourseEditPolicy(context));

        // ACT
        await this.Awaiting(_ => mutation.ExecuteAsync(
            "TEST_USER_2",
            new Guid("b967053e-244b-4676-a057-7e4415855660"),
            new Guid("6a88ca87-2b52-4474-b42d-37ed111053a5"),
            null
        )).Should().ThrowAsync<Exception>();
    }

    [TestMethod]
    public async Task Test_Allow_Owner_SetLessonOrder_FirstLesson()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();

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
        context.Add(new Lesson
        {
            Id = new Guid("6a88ca87-2b52-4474-b42d-37ed111053a5"),
            Course = course
        });
        context.Add(new RoleAssignment
        {
            Id = new Guid("3c1735e8-66fb-429b-b797-5654c8d114f6"),
            Course = course,
            Profile = profile,
            Role = Role.Owner
        });
        await context.SaveChangesAsync();

        var mutation = new EfEditLessonOrderMutation(context, new EfCourseEditPolicy(context));

        // ACT
        await mutation.ExecuteAsync(
            "TEST_USER",
            new Guid("b967053e-244b-4676-a057-7e4415855660"),
            new Guid("6a88ca87-2b52-4474-b42d-37ed111053a5"),
            null
        );

        course = await context.Courses
            .FirstAsync(o => o.Id == new Guid("b967053e-244b-4676-a057-7e4415855660"));

        course.DisplayOrders.Should().NotBeNull();
        course.DisplayOrders.Count.Should().Be(1);
        course.DisplayOrders[0].Id.Should().Be(new Guid("6a88ca87-2b52-4474-b42d-37ed111053a5"));
    }

    [TestMethod]
    public async Task Test_Allow_Owner_SetLessonOrder_FirstLesson_ExistingOrders()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();

        var course = new Course
        {
            Id = new Guid("b967053e-244b-4676-a057-7e4415855660"),
            DisplayOrders = new List<DisplayOrder>
            {
                new DisplayOrder(
                    DisplayOrderType.Lesson,
                    new Guid("563639c9-0ed6-416a-80ca-8c91e1087f39")
                )
            }
        };
        context.Courses.Add(course);
        var profile = new Profile
        {
            Id = new Guid("46bc8abb-2a5d-4176-91fe-c5b97e7e5c2b"),
            UserId = "TEST_USER"
        };
        context.Profiles.Add(profile);
        context.Add(new Lesson
        {
            Id = new Guid("6a88ca87-2b52-4474-b42d-37ed111053a5"),
            Course = course
        });
        context.Add(new RoleAssignment
        {
            Id = new Guid("3c1735e8-66fb-429b-b797-5654c8d114f6"),
            Course = course,
            Profile = profile,
            Role = Role.Owner
        });
        await context.SaveChangesAsync();

        var mutation = new EfEditLessonOrderMutation(context, new EfCourseEditPolicy(context));

        // ACT
        await mutation.ExecuteAsync(
            "TEST_USER",
            new Guid("b967053e-244b-4676-a057-7e4415855660"),
            new Guid("6a88ca87-2b52-4474-b42d-37ed111053a5"),
            null
        );

        course = await context.Courses
            .FirstAsync(o => o.Id == new Guid("b967053e-244b-4676-a057-7e4415855660"));

        course.DisplayOrders.Should().NotBeNull();
        course.DisplayOrders.Count.Should().Be(1);
        course.DisplayOrders[0].Id.Should().Be(new Guid("6a88ca87-2b52-4474-b42d-37ed111053a5"));
    }

    [TestMethod]
    public async Task Test_Allow_Owner_SetLessonOrder_ExistingLesson()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();

        var course = new Course
        {
            Id = new Guid("b967053e-244b-4676-a057-7e4415855660"),
            DisplayOrders = new List<DisplayOrder>
            {
                new DisplayOrder
                (
                    DisplayOrderType.Lesson,
                    new Guid("6a88ca87-2b52-4474-b42d-37ed111053a5")
                )
            }
        };
        context.Courses.Add(course);
        var profile = new Profile
        {
            Id = new Guid("46bc8abb-2a5d-4176-91fe-c5b97e7e5c2b"),
            UserId = "TEST_USER"
        };
        context.Profiles.Add(profile);
        context.Add(new Lesson
        {
            Id = new Guid("6a88ca87-2b52-4474-b42d-37ed111053a5"),
            Course = course
        });
        context.Add(new Lesson
        {
            Id = new Guid("40cddaab-aee8-4458-93ac-947ef7cf5986"),
            Course = course
        });
        context.Add(new RoleAssignment
        {
            Id = new Guid("3c1735e8-66fb-429b-b797-5654c8d114f6"),
            Course = course,
            Profile = profile,
            Role = Role.Owner
        });
        await context.SaveChangesAsync();

        var mutation = new EfEditLessonOrderMutation(context, new EfCourseEditPolicy(context));

        // ACT
        await mutation.ExecuteAsync(
            "TEST_USER",
            new Guid("b967053e-244b-4676-a057-7e4415855660"),
            new Guid("40cddaab-aee8-4458-93ac-947ef7cf5986"),
            new Guid("6a88ca87-2b52-4474-b42d-37ed111053a5")
        );

        course = await context.Courses
            .FirstAsync(o => o.Id == new Guid("b967053e-244b-4676-a057-7e4415855660"));

        course.DisplayOrders.Should().NotBeNull();
        course.DisplayOrders.Count.Should().Be(2);
        course.DisplayOrders[0].Id.Should().Be(new Guid("40cddaab-aee8-4458-93ac-947ef7cf5986"));
        course.DisplayOrders[1].Id.Should().Be(new Guid("6a88ca87-2b52-4474-b42d-37ed111053a5"));
    }

    [TestMethod]
    public async Task Test_Allow_Owner_SetLessonOrder_InvalidLessonAfter()
    {
        var contextFactory = CreateContextFactory();
        using var context = contextFactory.CreateDbContext();

        var course = new Course
        {
            Id = new Guid("b967053e-244b-4676-a057-7e4415855660"),
            DisplayOrders = new List<DisplayOrder>
            {
                new DisplayOrder
                (
                    DisplayOrderType.Lesson,
                    new Guid("6a88ca87-2b52-4474-b42d-37ed111053a5")
                )
            }
        };
        context.Courses.Add(course);
        var profile = new Profile
        {
            Id = new Guid("46bc8abb-2a5d-4176-91fe-c5b97e7e5c2b"),
            UserId = "TEST_USER"
        };
        context.Profiles.Add(profile);
        context.Add(new Lesson
        {
            Id = new Guid("6a88ca87-2b52-4474-b42d-37ed111053a5"),
            Course = course
        });
        context.Add(new Lesson
        {
            Id = new Guid("40cddaab-aee8-4458-93ac-947ef7cf5986"),
            Course = course
        });
        context.Add(new RoleAssignment
        {
            Id = new Guid("3c1735e8-66fb-429b-b797-5654c8d114f6"),
            Course = course,
            Profile = profile,
            Role = Role.Owner
        });
        await context.SaveChangesAsync();

        var mutation = new EfEditLessonOrderMutation(context, new EfCourseEditPolicy(context));

        // ACT
        await mutation.ExecuteAsync(
            "TEST_USER",
            new Guid("b967053e-244b-4676-a057-7e4415855660"),
            new Guid("40cddaab-aee8-4458-93ac-947ef7cf5986"),
            new Guid("a2fb3d13-2450-48fd-9538-83915cf8441c")
        );

        course = await context.Courses
            .FirstAsync(o => o.Id == new Guid("b967053e-244b-4676-a057-7e4415855660"));

        course.DisplayOrders.Should().NotBeNull();
        course.DisplayOrders.Count.Should().Be(2);
        course.DisplayOrders[0].Id.Should().Be(new Guid("6a88ca87-2b52-4474-b42d-37ed111053a5"));
        course.DisplayOrders[1].Id.Should().Be(new Guid("40cddaab-aee8-4458-93ac-947ef7cf5986"));
    }
}