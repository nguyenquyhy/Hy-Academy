namespace HyAcademy.Data;

public static class FakeData
{
    public static List<Profile> Profiles { get; } = new List<Profile>
    {
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
            Lessons = new List<Lesson>(),
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
            Lessons = new List<Lesson>(),
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
            Lessons = new List<Lesson>(),
            Visibility = CourseVisibility.Public
        }
    };

    public static List<Lesson> Lessons {get;} = new List<Lesson>{
        new Lesson
        {
            Id = Guid.Parse("A968F4D9-1199-4789-9F59-7DE8CC4B2AA3"),
            Added = new DateTime(2022,1,1),
            Updated = new DateTime(2022,1,1),
            Name = "Lesson 01",
            Description = "React 01"
        },
        new Lesson
        {
            Id = Guid.Parse("8115995F-5F78-4E17-803A-4BB895C2568D"),
            Added = new DateTime(2022,1,1),
            Updated = new DateTime(2022,1,1),            
            Name = "Lesson 02",
            Description = "React 02"
        }
    };
}