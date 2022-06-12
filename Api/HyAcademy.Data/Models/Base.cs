using System.ComponentModel.DataAnnotations.Schema;

namespace HyAcademy.Data;

public class Base
{
    public Guid Id { get; set; }
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime Added { get; set; }
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime Updated { get; set; }
}
