using System.Text.Json.Serialization;

namespace HyAcademy.Data;

public class Course : Base
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public CourseVisibility Visibility { get; set; } = CourseVisibility.Private;

    public IList<DisplayOrder> DisplayOrders { get; set; } = new List<DisplayOrder>();

    public virtual ICollection<RoleAssignment> RoleAssignments { get; set; } = new List<RoleAssignment>();
    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
}

public enum CourseVisibility
{
    Private,
    Unlisted,
    Public,
}

public readonly struct DisplayOrder
{
    [JsonConstructor]
    public DisplayOrder(DisplayOrderType type, Guid id)
    {
        Type = type;
        Id = id;
    }

    public DisplayOrderType Type { get; }

    public Guid Id { get; }
}

public enum DisplayOrderType
{
    Lesson
}
