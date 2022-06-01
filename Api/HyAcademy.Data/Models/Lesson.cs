namespace HyAcademy.Data;

public class Lesson : Base
{
    public virtual Course Course { get; set; } = null!;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}