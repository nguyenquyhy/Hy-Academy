using HotChocolate.Types;
using HyAcademy.Data;
using HyAcademy.GraphQL.Resolvers;

namespace HyAcademy.GraphQL.GraphTypes;

public class CourseType : ObjectType<Course>
{
    protected override void Configure(IObjectTypeDescriptor<Course> descriptor)
    {
        descriptor
            .Field("permissions")
            .Type<NonNullType<ObjectType<CoursePermission>>>()
            .ResolveWith<CoursePermissionResolver>(r => r.LoadAsync(default!, default!, default!, default!));
        descriptor
            .Field(o => o.DisplayOrders)
            .Ignore();
        descriptor
            .Field(o => o.Lessons)
            .ResolveWith<CourseLessonsResolver>(r => r.LoadAsync(default!));
    }
}

public record CoursePermission(
    bool canEdit,
    bool canEnroll
);