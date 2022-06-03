using HyAcademy.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Threading.Tasks;

namespace HyAcademy.Functions.SignIn;


public class Input
{
    /// <summary>
    /// E.g. PreTokenIssuance
    /// </summary>
    public string step { get; set; }
    public string client_id { get; set; }
    public string ui_locales { get; set; }
    public string email { get; set; }
    public string objectId { get; set; }
    public string displayName { get; set; }
}


public class FunctionIssueToken
{
    private readonly IProfileService profileService;

    public FunctionIssueToken(IProfileService profileService)
    {
        this.profileService = profileService;
    }

    [FunctionName("IssueToken")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        var input = await JsonSerializer.DeserializeAsync<Input>(req.Body);

        log.LogInformation("Issuing token for {userId} {displayName} {email}", input.objectId, input.displayName, input.email);

        var (isNew, profile) = await profileService.LoginAsync(input.objectId, input.displayName);

        if (isNew)
        {
            log.LogInformation("Created new profile {id}", profile.Id);
        }
        else
        {
            log.LogInformation("Updated existing profile {id}", profile.Id);
        }

        return new OkObjectResult(new
        {
            version = "1.0.0",
            action = "Continue"
        });
    }
}
