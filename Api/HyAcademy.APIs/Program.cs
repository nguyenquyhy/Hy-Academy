using HyAcademy.GraphQL;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddMicrosoftIdentityWebApiAuthentication(builder.Configuration);

builder.Services.AddCors();
builder.Services.AddAuthorization();
builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .ConfigureGraphQL();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors(policy => 
{
    var frontEndUrl = builder.Configuration["FrontEndUrl"];
    if (!string.IsNullOrEmpty(frontEndUrl))
    {
        policy.WithOrigins(frontEndUrl.Trim('/'));
    }
    policy.AllowAnyHeader().AllowAnyMethod();
});

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL();
app.MapGraphQLVoyager();

app.Run();
