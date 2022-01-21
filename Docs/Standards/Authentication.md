# Authentication

OIDC and Azure AD is used to authenticate user. Implementation-wise, MSAL is used to integrate Azure AD and both React and Graph QL.

## Backend

`AzureAD` section of `appsettings.json` needs to be filled:
- For development environment: use user secrets file
- For deployment: use build arguments of the Dockerfile
- For CI/CD: use secrets of `main-ci-cd-backend.yml` and `main-pr-open-ci-cd.yml`