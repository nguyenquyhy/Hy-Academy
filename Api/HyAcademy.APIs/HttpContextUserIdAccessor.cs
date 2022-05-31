using HyAcademy.GraphQL;

namespace HyAcademy.APIs;

public class HttpContextUserIdAccessor : IUserIdAccessor
{
    private readonly IHttpContextAccessor httpContextAccessor;

    public HttpContextUserIdAccessor(IHttpContextAccessor httpContextAccessor)
    {
        this.httpContextAccessor = httpContextAccessor;
    }

    public string Get() => httpContextAccessor.HttpContext?.User.GetUserId() ?? throw new InvalidOperationException("Cannot find user ID!");
}