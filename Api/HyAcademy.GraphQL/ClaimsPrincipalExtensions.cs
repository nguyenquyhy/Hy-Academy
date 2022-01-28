using System.Security.Claims;

namespace HyAcademy.GraphQL;

public static class ClaimsPrincipalExtensions
{
    public static string? GetUserId(this ClaimsPrincipal claimsPrincipal)
        => claimsPrincipal.Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;
}