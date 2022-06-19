namespace HyAcademy.Data.EF.Mutations;

public class EfEditLessonOrderMutation : IEditLessonOrderMutation
{
    private readonly AppDbContext context;
    private readonly ICourseEditPolicy editPolicy;

    public EfEditLessonOrderMutation(AppDbContext context, ICourseEditPolicy editPolicy)
    {
        this.context = context;
        this.editPolicy = editPolicy;
    }

    public async Task<Course> ExecuteAsync(string userId, Guid courseId, Guid lessonId, Guid? lessonIdAfter)
    {
        if (!await editPolicy.AllowAsync(courseId, userId)) throw new InvalidOperationException($"User ID {userId} is not allowed to edit this course!");

        using var transaction = context.Database.BeginTransaction();

        var course = await context.Courses.FindAsync(courseId);
        if (course == null) throw new ArgumentOutOfRangeException(nameof(courseId), courseId, $"Cannot find course with ID {courseId}!");

        var lessons = course.Lessons.ToDictionary(o => o.Id);
        var lessonDisplayOrders = course.DisplayOrders.Where(o => o.Type == DisplayOrderType.Lesson).ToDictionary(o => o.Id);
        
        RemoveExtraOrders(course.DisplayOrders, lessons, lessonDisplayOrders);
        AddMissingOrders(course.DisplayOrders, lessons, lessonDisplayOrders);

        lessonDisplayOrders = course.DisplayOrders.Where(o => o.Type == DisplayOrderType.Lesson).ToDictionary(o => o.Id);
        MoveOrder(course.DisplayOrders, lessonId, lessonIdAfter, lessonDisplayOrders);

        await context.SaveChangesAsync();

        await transaction.CommitAsync();

        return course;
    }

    private static void RemoveExtraOrders(IList<DisplayOrder> displayOrders, Dictionary<Guid, Lesson> lessons, Dictionary<Guid, DisplayOrder> lessonDisplayOrders)
    {
        foreach (var (id, lessonOrder) in lessonDisplayOrders)
        {
            if (!lessons.ContainsKey(id))
            {
                displayOrders.Remove(lessonOrder);
            }
        }
    }

    private static void AddMissingOrders(IList<DisplayOrder> displayOrders, Dictionary<Guid, Lesson> lessons, Dictionary<Guid, DisplayOrder> lessonDisplayOrders)
    {
        foreach (var (id, lesson) in lessons)
        {
            if (!lessonDisplayOrders.ContainsKey(id))
            {
                displayOrders.Add(new DisplayOrder(DisplayOrderType.Lesson, id));
            }
        }
    }

    private static void MoveOrder(IList<DisplayOrder> displayOrders, Guid lessonId, Guid? lessonIdAfter, Dictionary<Guid, DisplayOrder> lessonDisplayOrders)
    {
        if (lessonDisplayOrders.TryGetValue(lessonId, out var order))
        {
            displayOrders.Remove(order);
            if (lessonIdAfter == null)
            {
                displayOrders.Add(order);
            }
            else if (lessonDisplayOrders.TryGetValue(lessonIdAfter.Value, out var orderAfter))
            {
                displayOrders.Insert(displayOrders.IndexOf(orderAfter), order);
            }
            else
            {
                displayOrders.Add(order);
            }
        }
    }
}