using HotChocolate;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HyAcademy.GraphQL;

public static class GraphQLExtensions
{
    public static IRequestExecutorBuilder ConfigureGraphQL(this IRequestExecutorBuilder builder)
        => builder.ConfigureSchema(schemaBuilder => schemaBuilder.ConfigureGraphQL());

    public static ISchemaBuilder ConfigureGraphQL(this ISchemaBuilder builder) 
        => builder
            .AddQueryType<Query>()
            .AddMutationType<Mutation>();
}