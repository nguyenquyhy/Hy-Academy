namespace HyAcademy.Data;

public class Lesson : Base
{
    public virtual Course Course { get; set; } = null!;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

}
