using HyAcademy.Data;

namespace HyAcademy.GraphQL;

public class Query
{
    public int GetValue() => 1;

    public IQueryable<Course> GetCourses() => new List<Course>().AsQueryable();
}
