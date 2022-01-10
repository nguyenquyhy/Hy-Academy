# Continuous Integration / Continuous Deployment

## Continuous Integration

All changes to production (`main` branch) must go through GitHub Pull Request (PR).

Any PR to `main` branch automatically triggers the follow checks:
- [main-pr-open-ci-cd-frontend](/.github/workflows/main-pr-open-ci-cd-frontend.yml) (GitHub Actions): This includes running npm scripts to test and build the front-end package and deploy the package to a temporary site in Azure for reviewing.
- At least one reviewer approval

Once the PR is merged or closed, another workflow is triggered to clean up the created Azure resources.

## Continuous Deployment

Code merged to `main` is automatically built and deployed to production environment by the following workflow in GitHub Actions:
- Front-end [main-ci-cd-frontend](/.github/workflows/main-ci-cd-frontend.yml): This includes infrastructure and code run the React application.
- Back-end [main-ci-cd-backend](/.github/workflows/main-ci-cd-backend.yml): This includes infrastructure and code to run the GraphQL API.