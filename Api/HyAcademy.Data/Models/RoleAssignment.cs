namespace HyAcademy.Data;

public class RoleAssignment : Base
{
    public virtual Profile Profile { get; set; } = null!;
    public virtual Course Course { get; set; } = null!;
    public Role Role { get; set; }
}

public enum Role
{
    Owner,
    Contributor,
}
