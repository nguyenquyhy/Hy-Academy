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
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  UUID: any;
};

export type AddCourseInput = {
  description: Scalars['String'];
  title: Scalars['String'];
  visibility: CourseVisibility;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER'
}

export type AuthorizeDirective = {
  __typename?: 'AuthorizeDirective';
  apply: ApplyPolicy;
  policy?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Scalars['String']>>;
};

export type Course = {
  __typename?: 'Course';
  added: Scalars['DateTime'];
  description: Scalars['String'];
  enrollments: Array<Enrollment>;
  id: Scalars['UUID'];
  permissions: CoursePermission;
  roleAssignments: Array<RoleAssignment>;
  title: Scalars['String'];
  updated: Scalars['DateTime'];
};

export type CoursePermission = {
  __typename?: 'CoursePermission';
  canEdit: Scalars['Boolean'];
  canEnroll: Scalars['Boolean'];
};

export enum CourseVisibility {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
  Unlisted = 'UNLISTED'
}

/** A connection to a list of items. */
export type CoursesConnection = {
  __typename?: 'CoursesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CoursesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Course>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CoursesEdge = {
  __typename?: 'CoursesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Course;
};

export type EditCourseInput = {
  courseId: Scalars['UUID'];
  description: Scalars['String'];
  title: Scalars['String'];
  visibility: CourseVisibility;
};

export type EnrollInput = {
  courseId: Scalars['UUID'];
};

export type EnrollResult = {
  __typename?: 'EnrollResult';
  enrollment: Enrollment;
};

export type Enrollment = {
  __typename?: 'Enrollment';
  added: Scalars['DateTime'];
  course: Course;
  id: Scalars['UUID'];
  student: Profile;
  updated: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCourse: Course;
  editCourse: Course;
  enroll: EnrollResult;
};


export type MutationAddCourseArgs = {
  input: AddCourseInput;
};


export type MutationEditCourseArgs = {
  input: EditCourseInput;
};


export type MutationEnrollArgs = {
  input: EnrollInput;
};

/** A connection to a list of items. */
export type MyCoursesConnection = {
  __typename?: 'MyCoursesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<MyCoursesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Course>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type MyCoursesEdge = {
  __typename?: 'MyCoursesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Course;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  added: Scalars['DateTime'];
  enrollments: Array<Enrollment>;
  id: Scalars['UUID'];
  roleAssignments: Array<RoleAssignment>;
  updated: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  authValue: Scalars['String'];
  course?: Maybe<Course>;
  courses?: Maybe<CoursesConnection>;
  myCourses?: Maybe<MyCoursesConnection>;
  value: Scalars['Int'];
};


export type QueryCourseArgs = {
  id: Scalars['UUID'];
};


export type QueryCoursesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryMyCoursesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export enum Role {
  Contributor = 'CONTRIBUTOR',
  Owner = 'OWNER'
}

export type RoleAssignment = {
  __typename?: 'RoleAssignment';
  added: Scalars['DateTime'];
  course: Course;
  id: Scalars['UUID'];
  profile: Profile;
  role: Role;
  updated: Scalars['DateTime'];
};

export type GetCourseQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetCourseQuery = { __typename?: 'Query', course?: { __typename?: 'Course', id: any, title: string, description: string, permissions: { __typename?: 'CoursePermission', canEdit: boolean, canEnroll: boolean } } | null | undefined };

export type EnrollCourseMutationVariables = Exact<{
  input: EnrollInput;
}>;


export type EnrollCourseMutation = { __typename?: 'Mutation', enroll: { __typename?: 'EnrollResult', enrollment: { __typename?: 'Enrollment', id: any, course: { __typename?: 'Course', id: any, permissions: { __typename?: 'CoursePermission', canEnroll: boolean } } } } };

export type GetCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoursesQuery = { __typename?: 'Query', courses?: { __typename?: 'CoursesConnection', nodes?: Array<{ __typename?: 'Course', id: any, title: string, description: string }> | null | undefined } | null | undefined };

export type GetMyCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyCoursesQuery = { __typename?: 'Query', myCourses?: { __typename?: 'MyCoursesConnection', nodes?: Array<{ __typename?: 'Course', id: any, title: string, description: string }> | null | undefined } | null | undefined };

export type GetTestValueQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTestValueQuery = { __typename?: 'Query', value: number, authValue: string };


export const GetCourseDocument = gql`
    query GetCourse($id: UUID!) {
  course(id: $id) {
    id
    title
    description
    permissions {
      canEdit
      canEnroll
    }
  }
}
    `;

/**
 * __useGetCourseQuery__
 *
 * To run a query within a React component, call `useGetCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCourseQuery(baseOptions: Apollo.QueryHookOptions<GetCourseQuery, GetCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
      }
export function useGetCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCourseQuery, GetCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
        }
export type GetCourseQueryHookResult = ReturnType<typeof useGetCourseQuery>;
export type GetCourseLazyQueryHookResult = ReturnType<typeof useGetCourseLazyQuery>;
export type GetCourseQueryResult = Apollo.QueryResult<GetCourseQuery, GetCourseQueryVariables>;
export function refetchGetCourseQuery(variables: GetCourseQueryVariables) {
      return { query: GetCourseDocument, variables: variables }
    }
export const EnrollCourseDocument = gql`
    mutation EnrollCourse($input: EnrollInput!) {
  enroll(input: $input) {
    enrollment {
      id
      course {
        id
        permissions {
          canEnroll
        }
      }
    }
  }
}
    `;
export type EnrollCourseMutationFn = Apollo.MutationFunction<EnrollCourseMutation, EnrollCourseMutationVariables>;

/**
 * __useEnrollCourseMutation__
 *
 * To run a mutation, you first call `useEnrollCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrollCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrollCourseMutation, { data, loading, error }] = useEnrollCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEnrollCourseMutation(baseOptions?: Apollo.MutationHookOptions<EnrollCourseMutation, EnrollCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnrollCourseMutation, EnrollCourseMutationVariables>(EnrollCourseDocument, options);
      }
export type EnrollCourseMutationHookResult = ReturnType<typeof useEnrollCourseMutation>;
export type EnrollCourseMutationResult = Apollo.MutationResult<EnrollCourseMutation>;
export type EnrollCourseMutationOptions = Apollo.BaseMutationOptions<EnrollCourseMutation, EnrollCourseMutationVariables>;
export const GetCoursesDocument = gql`
    query GetCourses {
  courses {
    nodes {
      id
      title
      description
    }
  }
}
    `;

/**
 * __useGetCoursesQuery__
 *
 * To run a query within a React component, call `useGetCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCoursesQuery(baseOptions?: Apollo.QueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
      }
export function useGetCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
        }
export type GetCoursesQueryHookResult = ReturnType<typeof useGetCoursesQuery>;
export type GetCoursesLazyQueryHookResult = ReturnType<typeof useGetCoursesLazyQuery>;
export type GetCoursesQueryResult = Apollo.QueryResult<GetCoursesQuery, GetCoursesQueryVariables>;
export function refetchGetCoursesQuery(variables?: GetCoursesQueryVariables) {
      return { query: GetCoursesDocument, variables: variables }
    }
export const GetMyCoursesDocument = gql`
    query GetMyCourses {
  myCourses {
    nodes {
      id
      title
      description
    }
  }
}
    `;

/**
 * __useGetMyCoursesQuery__
 *
 * To run a query within a React component, call `useGetMyCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyCoursesQuery(baseOptions?: Apollo.QueryHookOptions<GetMyCoursesQuery, GetMyCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyCoursesQuery, GetMyCoursesQueryVariables>(GetMyCoursesDocument, options);
      }
export function useGetMyCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyCoursesQuery, GetMyCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyCoursesQuery, GetMyCoursesQueryVariables>(GetMyCoursesDocument, options);
        }
export type GetMyCoursesQueryHookResult = ReturnType<typeof useGetMyCoursesQuery>;
export type GetMyCoursesLazyQueryHookResult = ReturnType<typeof useGetMyCoursesLazyQuery>;
export type GetMyCoursesQueryResult = Apollo.QueryResult<GetMyCoursesQuery, GetMyCoursesQueryVariables>;
export function refetchGetMyCoursesQuery(variables?: GetMyCoursesQueryVariables) {
      return { query: GetMyCoursesDocument, variables: variables }
    }
export const GetTestValueDocument = gql`
    query GetTestValue {
  value
  authValue
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