using HyAcademy.GraphQL;
using Microsoft.Identity.Web;

namespace HyAcademy.APIs;

public class HttpContextUserIdAccessor : IUserIdAccessor
{
    private readonly IHttpContextAccessor httpContextAccessor;

    public HttpContextUserIdAccessor(IHttpContextAccessor httpContextAccessor)
    {
        this.httpContextAccessor = httpContextAccessor;
    }

    public string Get() => httpContextAccessor.HttpContext?.User.GetNameIdentifierId() ?? throw new InvalidOperationException("Cannot find user ID!");
    public string? GetOrDefault() => httpContextAccessor.HttpContext?.User.GetNameIdentifierId();
}