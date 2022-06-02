using HyAcademy.Data;
using HyAcademy.GraphQL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;

namespace HyAcademy.APIs;

public static class MsalExtensions
{
    public static void AddCustomMicrosoftIdentityWebApi(this IServiceCollection services, IConfigurationSection configurationSection)
        => services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddMicrosoftIdentityWebApi(
            options => 
            {
                configurationSection.Bind(options);
                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = async (context) =>
                    {
                        // Automatically create a profile on logged in
                        var userId = context.Principal?.GetNameIdentifierId();
                        var displayName = context.Principal?.GetDisplayName();
                        var profileService = context.HttpContext.RequestServices.GetRequiredService<IProfileService>();
                        if (userId != null)
                        {
                            var profile = await profileService.LoginAsync(userId, displayName);
                        }
                    }
                };
            }, 
            options => configurationSection.Bind(options)
        );
}