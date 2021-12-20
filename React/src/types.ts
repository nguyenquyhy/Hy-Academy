import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  value: Scalars['Int'];
};

export type GetTestValueQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTestValueQuery = { __typename?: 'Query', value: number };


export const GetTestValueDocument = gql`
    query GetTestValue {
  value
}
    `;

/**
 * __useGetTestValueQuery__
 *
 * To run a query within a React component, call `useGetTestValueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTestValueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTestValueQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTestValueQuery(baseOptions?: Apollo.QueryHookOptions<GetTestValueQuery, GetTestValueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTestValueQuery, GetTestValueQueryVariables>(GetTestValueDocument, options);
      }
export function useGetTestValueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTestValueQuery, GetTestValueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTestValueQuery, GetTestValueQueryVariables>(GetTestValueDocument, options);
        }
export type GetTestValueQueryHookResult = ReturnType<typeof useGetTestValueQuery>;
export type GetTestValueLazyQueryHookResult = ReturnType<typeof useGetTestValueLazyQuery>;
export type GetTestValueQueryResult = Apollo.QueryResult<GetTestValueQuery, GetTestValueQueryVariables>;
export function refetchGetTestValueQuery(variables?: GetTestValueQueryVariables) {
      return { query: GetTestValueDocument, variables: variables }
    }