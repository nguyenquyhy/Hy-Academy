namespace HyAcademy.Data;

public class Profile : Base
{
    public virtual ICollection<RoleAssignment> RoleAssignments { get; set; } = new List<RoleAssignment>();
}
