using HyAcademy.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;

namespace HyAcademy.APIs;

public static class MsalExtensions
{
    private static SemaphoreSlim sm = new SemaphoreSlim(1);

    public static void AddCustomMicrosoftIdentityWebApi(this IServiceCollection services, IConfigurationSection configurationSection, bool isDevelopment)
        => services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddMicrosoftIdentityWebApi(
            options => 
            {
                configurationSection.Bind(options);
                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = async (context) =>
                    {
                        if (isDevelopment)
                        {
                            // NOTE: we don't do this in production to avoid the lock (not scalable)
                            await sm.WaitAsync();
                            try
                            {
                                // Automatically create a profile on logged in
                                var userId = context.Principal?.GetNameIdentifierId();
                                var displayName = context.Principal?.GetDisplayName() ?? "Unknown";
                                var profileService = context.HttpContext.RequestServices.GetRequiredService<IProfileService>();
                                if (userId != null)
                                {
                                    await profileService.LoginAsync(userId, displayName);
                                }
                            }
                            finally
                            {
                                sm.Release();
                            }
                        }
                    }
                };
            }, 
            options => configurationSection.Bind(options)
        );
}