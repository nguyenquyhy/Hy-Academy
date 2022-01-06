FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
RUN apt update
RUN apt install curl -y

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app
COPY HyAcademy.APIs/*.csproj HyAcademy.APIs/
COPY HyAcademy.Data/*.csproj HyAcademy.Data/
COPY HyAcademy.GraphQL/*.csproj HyAcademy.GraphQL/
COPY HyAcademy.GraphQL.Extensions/*.csproj HyAcademy.GraphQL.Extensions/
COPY HyAcademy.GraphQL.Tools/*.csproj HyAcademy.GraphQL.Tools/
COPY React/*.esproj React/
COPY HyAcademy.sln .
RUN dotnet restore HyAcademy.sln

COPY . .
RUN dotnet publish HyAcademy.APIs/HyAcademy.APIs.csproj -c Release -o /app/publish

FROM base
WORKDIR /app
COPY --from=build /app/publish/. .
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --silent --fail http://localhost/health || exit 1
EXPOSE 80
CMD ["dotnet", "HyAcademy.APIs.dll"]