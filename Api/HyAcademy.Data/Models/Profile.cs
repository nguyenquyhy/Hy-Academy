namespace HyAcademy.Data;

public class Profile : Base
{
    public string UserId { get; set; } = null!;
    public virtual ICollection<RoleAssignment> RoleAssignments { get; set; } = new List<RoleAssignment>();
}
