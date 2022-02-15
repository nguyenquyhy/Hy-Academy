namespace HyAcademy.Data;

public static class FakeData
{
    public static List<Profile> Profiles { get; } = new List<Profile>
    {
        new Profile
        {
            Id = Guid.Parse("894b3b64-5854-4e9f-b975-96864b5fc922"),
            Added = new DateTime(2021,1,1),
            Updated = new DateTime(2021,1,1),
            UserId = "cff10329-3ce4-4021-acc9-d078fe076eb4"
        }
    };

    public static List<Course> Courses { get; } = new List<Course>
    {
        new Course
        {
            Id = Guid.Parse("c899700b-48cf-409b-a0a2-b36ecf78696c"),
            Added = new DateTime(2022,1,1),
            Updated = new DateTime(2022,1,1),
            Title = "React course reboot",
            Description = "This is a new course on React.",
            RoleAssignments = new List<RoleAssignment>(),
            Visibility = CourseVisibility.Public
        },
        new Course
        {
            Id = Guid.Parse("6420d772-6268-457d-897e-9728a41d9195"),
            Added = new DateTime(2021,1,1),
            Updated = new DateTime(2021,1,1),
            Title = "React course",
            Description = "This is a course on React.",
            RoleAssignments = new List<RoleAssignment>(),
            Visibility = CourseVisibility.Public
        },
        new Course
        {
            Id = Guid.Parse("5bd8b068-d581-472c-be38-cb577796e036"),
            Added = new DateTime(2021,6,1),
            Updated = new DateTime(2021,6,1),
            Title = "Random course",
            Description = "This is a random course.",
            RoleAssignments = new List<RoleAssignment>(),
            Visibility = CourseVisibility.Public
        }
    };

    public static List<Enrollment> Enrollments { get; } = new List<Enrollment>
    {
    };
}