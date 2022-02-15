using HotChocolate;
using HotChocolate.Execution;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HyAcademy.GraphQL;

public static class GraphQLExtensions
{
    public static IRequestExecutorBuilder ConfigureGraphQL(this IRequestExecutorBuilder builder)
        => builder
            .ConfigureSchema(schemaBuilder => schemaBuilder.ConfigureGraphQL())
            .ModifyOptions(options =>
            {
                // This is needed for now to ensure AppDbContext is a scoped dependency (single instance for each GraphQL request)
                // to ensure lazy loading proxies work properly (e.g. no ObjectDisposedException).
                // This however disables parallel loading capability of HotChocolate and can create performance degradation.
                // https://chillicream.com/docs/hotchocolate/integrations/entity-framework
                // TODO: review this in HotChocolate 13
                options.DefaultResolverStrategy = ExecutionStrategy.Serial;
            });

    public static ISchemaBuilder ConfigureGraphQL(this ISchemaBuilder builder) 
        => builder
            .AddQueryType<Query>()
            .AddMutationType<Mutation>();
}