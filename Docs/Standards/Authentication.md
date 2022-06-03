# Authentication

OIDC and Azure AD is used to authenticate user. Implementation-wise, MSAL is used to integrate Azure AD and both React and Graph QL.

## Backend

`AzureAD` section of `appsettings.json` needs to be filled:
- For development environment: use user secrets file
- For deployment: use build arguments of the Dockerfile
- For CI/CD: use secrets of `main-ci-cd-backend.yml` and `main-pr-open-ci-cd.yml`

### Creation of user profile

In order to show the Display Name of other users, we need to store the name in Profile. This leads to the need of Profile creation on first user login (and subsequent updates of the Display Name).

Two approaches are considered:
| Approach | Details | Pros | Cons |
|----------|---------|------|------|
| 1. Token Validated event | On every API request, MSAL validates the Access Token. At that point, we can create a profile on Token Validated event with the embedded claims. | The logic can run on any database that the API points to, which mean it can also works for development environment. | Without locking, this can lead to concurrency issue that Profile is created twice if 2 API calls are triggered at the same time |
| 2. AzureAD B2C API connector https://docs.microsoft.com/en-us/azure/active-directory-b2c/add-api-connector | AzureAD B2C can send a POST request to a HTTP endpoints before issuing new token for logging in users.<br />We can setup a Function App to handle this POST request and create new profile. | There is very little chance that concurrency issue can happen here unless users try to open 2 B2C tabs and login at the same time.<br />Even so, that is not a supported scenario, so we can block that with unique index in the database. | Each B2C instance can trigger only a single HTTP endpoint for each user flow's event.<br />This can be challenging for development environments with local database.<br />To mitigate this, we might allow Approach 1 to run in development. |

Both approaches are used in this project. Approach 1 is used only for development environment, and approach 2 is used for production and PR environment.