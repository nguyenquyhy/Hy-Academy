namespace HyAcademy.Data;

public class Profile : Base
{
    public ICollection<RoleAssignment> RoleAssignments { get; set; } = null!;
}
