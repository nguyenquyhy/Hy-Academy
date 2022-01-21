using HotChocolate.AspNetCore.Authorization;
using HyAcademy.Data;

namespace HyAcademy.GraphQL;

public class Query
{
    public int GetValue() => 1;

    [Authorize]
    public int GetAuthValue() => 1;

    public IQueryable<Course> GetCourses() => new List<Course>().AsQueryable();
}
