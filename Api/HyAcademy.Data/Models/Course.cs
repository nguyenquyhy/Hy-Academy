namespace HyAcademy.Data;

public class Course : Base
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public CourseVisibility Visibility { get; set; } = CourseVisibility.Private;
    public ICollection<RoleAssignment> RoleAssignments { get; set; } = null!;
}

public enum CourseVisibility
{
    Private,
    Unlisted,
    Public,
}
