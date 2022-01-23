namespace HyAcademy.Data;

public class Enrollment : Base
{
    public virtual Profile Student { get; set; } = null!;
    public virtual Course Course { get; set; } = null!;
}
