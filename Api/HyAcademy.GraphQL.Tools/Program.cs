using HotChocolate;
using HyAcademy.GraphQL;
using HyAcademy.GraphQL.Tools;

var schema = SchemaBuilder.New()
    .ConfigureGraphQL()
    .Create();

var newSchema = schema.ToString();
Console.WriteLine(newSchema);

var schemaFile = System.IO.Path.Join(ProjectPathInfo.SolutionPath, "..", "React", "schema.graphql");
var oldSchema = File.ReadAllText(schemaFile);
if (newSchema != oldSchema)
{
    File.WriteAllText(schemaFile, newSchema);
    Console.WriteLine($"Schema is written into ${schemaFile}.");
}
else
{
    Console.WriteLine($"Schema in ${schemaFile} is unchanged.");
}