using Microsoft.EntityFrameworkCore;

namespace HyAcademy.Data;

[Index(nameof(UserId), IsUnique = true)]
public class Profile : Base
{
    public string UserId { get; set; } = null!;
    public string? DisplayName { get; set; }
    public virtual ICollection<RoleAssignment> RoleAssignments { get; set; } = new List<RoleAssignment>();
    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}
