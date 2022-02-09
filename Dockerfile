FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
RUN apt update
RUN apt install curl -y

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app
COPY Api/HyAcademy.APIs/*.csproj Api/HyAcademy.APIs/
COPY Api/HyAcademy.Data/*.csproj Api/HyAcademy.Data/
COPY Api/HyAcademy.Data.EF/*.csproj Api/HyAcademy.Data.EF/
COPY Api/HyAcademy.Data.EF.MySql/*.csproj Api/HyAcademy.Data.EF.MySql/
COPY Api/HyAcademy.Data.EF.Tests/*.csproj Api/HyAcademy.Data.EF.Tests/
COPY Api/HyAcademy.GraphQL/*.csproj Api/HyAcademy.GraphQL/
COPY Api/HyAcademy.GraphQL.Extensions/*.csproj Api/HyAcademy.GraphQL.Extensions/
COPY Api/HyAcademy.GraphQL.Tools/*.csproj Api/HyAcademy.GraphQL.Tools/
COPY Api/HyAcademy.sln Api/
COPY React/*.esproj React/
RUN dotnet restore Api/HyAcademy.sln

COPY . .
RUN dotnet test Api/HyAcademy.sln
RUN dotnet publish Api/HyAcademy.APIs/HyAcademy.APIs.csproj -c Release -o /app/publish

FROM base
WORKDIR /app
COPY --from=build /app/publish/. .
ARG FRONTEND_URL
ARG AZUREAD_DOMAIN
ARG AZUREAD_INSTANCE
ARG AZUREAD_TENANTID
ARG AZUREAD_CLIENTID
ARG AZUREAD_SIGNUPSIGNIN_POLICYID
ENV FrontEndUrl=${FRONTEND_URL}
ENV AzureAd__Domain=${AZUREAD_DOMAIN}
ENV AzureAd__Instance=${AZUREAD_INSTANCE}
ENV AzureAd__TenantId=${AZUREAD_TENANTID}
ENV AzureAd__ClientId=${AZUREAD_CLIENTID}
ENV AzureAd__SignUpSignInPolicyId=${AZUREAD_SIGNUPSIGNIN_POLICYID}
EXPOSE 80
CMD ["dotnet", "HyAcademy.APIs.dll"]