namespace HyAcademy.GraphQL;

public interface IUserIdAccessor
{
    string Get();
    string? GetOrDefault();
}