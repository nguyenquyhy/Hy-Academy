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
    }
}

public record CoursePermission(
    bool canEdit,
    bool canEnroll
);