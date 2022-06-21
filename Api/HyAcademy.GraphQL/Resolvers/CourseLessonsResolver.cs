using HotChocolate;
using HyAcademy.Data;

namespace HyAcademy.GraphQL.Resolvers;

public class CourseLessonsResolver
{
    public Task<IEnumerable<Lesson>> LoadAsync(
        [Parent] Course course)
    {
        // Get all lessons
        var lessons = course.Lessons.ToDictionary(o => o.Id);

        // Get from DisplayOrder
        var result = course.DisplayOrders
            .Where(o => o.Type == DisplayOrderType.Lesson)
            .Where(o => lessons.ContainsKey(o.Id))
            .Select(o => lessons[o.Id])
            .ToDictionary(o => o.Id);

        // Add the remaining to the end
        foreach (var (id, lesson) in lessons)
        {
            result.TryAdd(id, lesson);
        }

        return Task.FromResult(result.Values.AsEnumerable());
    }
}