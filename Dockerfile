FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
RUN apt update
RUN apt install curl -y

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app
COPY Api/HyAcademy.APIs/*.csproj Api/HyAcademy.APIs/
COPY Api/HyAcademy.Data/*.csproj Api/HyAcademy.Data/
COPY Api/HyAcademy.GraphQL/*.csproj Api/HyAcademy.GraphQL/
COPY Api/HyAcademy.GraphQL.Extensions/*.csproj Api/HyAcademy.GraphQL.Extensions/
COPY Api/HyAcademy.GraphQL.Tools/*.csproj Api/HyAcademy.GraphQL.Tools/
COPY Api/HyAcademy.sln Api/
COPY React/*.esproj react/
COPY React/schema.graphql react/
RUN dotnet restore Api/HyAcademy.sln

COPY . .
RUN dotnet build Api/HyAcademy.GraphQL.Tools/HyAcademy.GraphQL.Tools.csproj -c Debug
RUN dotnet publish Api/HyAcademy.APIs/HyAcademy.APIs.csproj -c Release -o /app/publish

FROM base
WORKDIR /app
COPY --from=build /app/publish/. .
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --silent --fail http://localhost/health || exit 1
EXPOSE 80
CMD ["dotnet", "HyAcademy.APIs.dll"]