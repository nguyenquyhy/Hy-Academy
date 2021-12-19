# GraphQL

## Client

- Use Apollo hooks to send GraphQL request
  - Do not write the hooks manually in JavaScript. Instead, follow the steps below:
    1. Create a `operations.graphql` file in your module
    1. Write the GraphQL query/mutation/subscription in that file
    1. Run `npm run generate` to trigger code generation for all necessary types and hooks
    1. Commit the updated `src/types.ts` file
- Make sure the following cases from Apollo hook are handled properly
  - `if (loading)`
  - `if (error)`
  - `if (!data)`
- For deployments, set environment variable `REACT_APP_API_URL` to appropriate API URL (e.g. https://graphql-api.com without the trailing slash). **Make sure CORS are setup properly from API server.**

## Server

- When changing GraphQL schema, make sure the following steps are done:
  1. Generate GraphQL schema file by opening the following URL `https://{API_URL}/graphql?sdl`
  1. Save the generated schema file into `React` folder
  1. Run `npm run generate` and `npm run build` in `React` folder to ensure there is no breaking changes
  1. Commit the GraphQL changes along with the updated `schema.graphql` and `src/types.ts`