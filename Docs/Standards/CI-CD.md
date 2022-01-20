# Continuous Integration / Continuous Deployment

## Continuous Integration

All changes to production (`main` branch) must go through GitHub Pull Request (PR).

Any PR to `main` branch automatically triggers the follow checks:
- [main-pr-open-ci-cd](/.github/workflows/main-pr-open-ci-cd.yml) (GitHub Actions): This includes:
  1. Create Azure resources for frontend
  1. Get created frontend URL to build backend image
  1. Deploy backend image
  1. Get backend URL to build frontend package and deploy the package
- At least one reviewer approval

Once the PR is merged or closed, another workflow [main-pr-close-ci-cd](/.github/workflows/main-pr-close-ci-cd.yml) is triggered to clean up the created Azure and Docker resources.

## Continuous Deployment

Code merged to `main` is automatically built and deployed to production environment by the following workflow in GitHub Actions:
- Front-end [main-ci-cd-frontend](/.github/workflows/main-ci-cd-frontend.yml): This includes infrastructure and code run the React application.
- Back-end [main-ci-cd-backend](/.github/workflows/main-ci-cd-backend.yml): This includes infrastructure and code to run the GraphQL API.