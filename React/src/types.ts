import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
};

export type AddCourseResult = {
  __typename?: 'AddCourseResult';
  course: Course;
};

export type AddLessonInput = {
  courseId: Scalars['UUID'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type AddLessonResult = {
  __typename?: 'AddLessonResult';
  lesson: Lesson;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER'
}

/** A connection to a list of items. */
export type AttendingCoursesConnection = {
  __typename?: 'AttendingCoursesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<AttendingCoursesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Course>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AttendingCoursesEdge = {
  __typename?: 'AttendingCoursesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Course;
};

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
  lessons: Array<Lesson>;
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
};

export type EditLessonInput = {
  courseId: Scalars['UUID'];
  description: Scalars['String'];
  lessonId: Scalars['UUID'];
  title: Scalars['String'];
};

export type EditLessonResult = {
  __typename?: 'EditLessonResult';
  lesson: Lesson;
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

export type Lesson = {
  __typename?: 'Lesson';
  added: Scalars['DateTime'];
  course: Course;
  description: Scalars['String'];
  id: Scalars['UUID'];
  title: Scalars['String'];
  updated: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCourse: AddCourseResult;
  addLesson: AddLessonResult;
  editCourse: Course;
  editLesson: EditLessonResult;
  enroll: EnrollResult;
};


export type MutationAddCourseArgs = {
  input: AddCourseInput;
};


export type MutationAddLessonArgs = {
  input: AddLessonInput;
};


export type MutationEditCourseArgs = {
  input: EditCourseInput;
};


export type MutationEditLessonArgs = {
  input: EditLessonInput;
};


export type MutationEnrollArgs = {
  input: EnrollInput;
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
  attendingCourses?: Maybe<AttendingCoursesConnection>;
  course?: Maybe<Course>;
  courses?: Maybe<CoursesConnection>;
  lesson?: Maybe<Lesson>;
  teachingCourses?: Maybe<TeachingCoursesConnection>;
};


export type QueryAttendingCoursesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
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


export type QueryLessonArgs = {
  courseId: Scalars['UUID'];
  lessonId: Scalars['UUID'];
};


export type QueryTeachingCoursesArgs = {
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

/** A connection to a list of items. */
export type TeachingCoursesConnection = {
  __typename?: 'TeachingCoursesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<TeachingCoursesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Course>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TeachingCoursesEdge = {
  __typename?: 'TeachingCoursesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Course;
};

export type AddCourseMutationVariables = Exact<{
  input: AddCourseInput;
}>;


export type AddCourseMutation = { __typename?: 'Mutation', addCourse: { __typename?: 'AddCourseResult', course: { __typename?: 'Course', id: any, title: string, description: string } } };

export type GetCourseQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetCourseQuery = { __typename?: 'Query', course?: { __typename?: 'Course', id: any, title: string, description: string, permissions: { __typename?: 'CoursePermission', canEdit: boolean, canEnroll: boolean }, lessons: Array<{ __typename?: 'Lesson', id: any, title: string }> } | null };

export type EnrollCourseMutationVariables = Exact<{
  input: EnrollInput;
}>;


export type EnrollCourseMutation = { __typename?: 'Mutation', enroll: { __typename?: 'EnrollResult', enrollment: { __typename?: 'Enrollment', id: any, course: { __typename?: 'Course', id: any, permissions: { __typename?: 'CoursePermission', canEnroll: boolean } } } } };

export type CourseFieldFragment = { __typename?: 'Course', id: any, title: string, description: string };

export type GetCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoursesQuery = { __typename?: 'Query', courses?: { __typename?: 'CoursesConnection', nodes?: Array<{ __typename?: 'Course', id: any, title: string, description: string }> | null } | null };

export type GetAttendingCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAttendingCoursesQuery = { __typename?: 'Query', attendingCourses?: { __typename?: 'AttendingCoursesConnection', nodes?: Array<{ __typename?: 'Course', id: any, title: string, description: string }> | null } | null };

export type GetTeachingCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeachingCoursesQuery = { __typename?: 'Query', teachingCourses?: { __typename?: 'TeachingCoursesConnection', nodes?: Array<{ __typename?: 'Course', id: any, title: string, description: string }> | null } | null };

export type GetCourseForLessonQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetCourseForLessonQuery = { __typename?: 'Query', course?: { __typename?: 'Course', id: any, title: string } | null };

export type AddLessonMutationVariables = Exact<{
  input: AddLessonInput;
}>;


export type AddLessonMutation = { __typename?: 'Mutation', addLesson: { __typename?: 'AddLessonResult', lesson: { __typename?: 'Lesson', id: any, title: string, description: string } } };

export type GetLessonQueryVariables = Exact<{
  courseId: Scalars['UUID'];
  lessonId: Scalars['UUID'];
}>;


export type GetLessonQuery = { __typename?: 'Query', lesson?: { __typename?: 'Lesson', id: any, title: string, description: string, course: { __typename?: 'Course', id: any, title: string, permissions: { __typename?: 'CoursePermission', canEdit: boolean } } } | null };

export type EditLessonMutationVariables = Exact<{
  input: EditLessonInput;
}>;


export type EditLessonMutation = { __typename?: 'Mutation', editLesson: { __typename?: 'EditLessonResult', lesson: { __typename?: 'Lesson', id: any } } };

export const CourseFieldFragmentDoc = gql`
    fragment CourseField on Course {
  id
  title
  description
}
    `;
export const AddCourseDocument = gql`
    mutation AddCourse($input: AddCourseInput!) {
  addCourse(input: $input) {
    course {
      id
      title
      description
    }
  }
}
    `;
export type AddCourseMutationFn = Apollo.MutationFunction<AddCourseMutation, AddCourseMutationVariables>;

/**
 * __useAddCourseMutation__
 *
 * To run a mutation, you first call `useAddCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCourseMutation, { data, loading, error }] = useAddCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCourseMutation(baseOptions?: Apollo.MutationHookOptions<AddCourseMutation, AddCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCourseMutation, AddCourseMutationVariables>(AddCourseDocument, options);
      }
export type AddCourseMutationHookResult = ReturnType<typeof useAddCourseMutation>;
export type AddCourseMutationResult = Apollo.MutationResult<AddCourseMutation>;
export type AddCourseMutationOptions = Apollo.BaseMutationOptions<AddCourseMutation, AddCourseMutationVariables>;
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
    lessons {
      id
      title
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
      ...CourseField
    }
  }
}
    ${CourseFieldFragmentDoc}`;

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
export const GetAttendingCoursesDocument = gql`
    query GetAttendingCourses {
  attendingCourses {
    nodes {
      ...CourseField
    }
  }
}
    ${CourseFieldFragmentDoc}`;

/**
 * __useGetAttendingCoursesQuery__
 *
 * To run a query within a React component, call `useGetAttendingCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendingCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendingCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAttendingCoursesQuery(baseOptions?: Apollo.QueryHookOptions<GetAttendingCoursesQuery, GetAttendingCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAttendingCoursesQuery, GetAttendingCoursesQueryVariables>(GetAttendingCoursesDocument, options);
      }
export function useGetAttendingCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAttendingCoursesQuery, GetAttendingCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAttendingCoursesQuery, GetAttendingCoursesQueryVariables>(GetAttendingCoursesDocument, options);
        }
export type GetAttendingCoursesQueryHookResult = ReturnType<typeof useGetAttendingCoursesQuery>;
export type GetAttendingCoursesLazyQueryHookResult = ReturnType<typeof useGetAttendingCoursesLazyQuery>;
export type GetAttendingCoursesQueryResult = Apollo.QueryResult<GetAttendingCoursesQuery, GetAttendingCoursesQueryVariables>;
export function refetchGetAttendingCoursesQuery(variables?: GetAttendingCoursesQueryVariables) {
      return { query: GetAttendingCoursesDocument, variables: variables }
    }
export const GetTeachingCoursesDocument = gql`
    query GetTeachingCourses {
  teachingCourses {
    nodes {
      ...CourseField
    }
  }
}
    ${CourseFieldFragmentDoc}`;

/**
 * __useGetTeachingCoursesQuery__
 *
 * To run a query within a React component, call `useGetTeachingCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeachingCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeachingCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeachingCoursesQuery(baseOptions?: Apollo.QueryHookOptions<GetTeachingCoursesQuery, GetTeachingCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeachingCoursesQuery, GetTeachingCoursesQueryVariables>(GetTeachingCoursesDocument, options);
      }
export function useGetTeachingCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeachingCoursesQuery, GetTeachingCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeachingCoursesQuery, GetTeachingCoursesQueryVariables>(GetTeachingCoursesDocument, options);
        }
export type GetTeachingCoursesQueryHookResult = ReturnType<typeof useGetTeachingCoursesQuery>;
export type GetTeachingCoursesLazyQueryHookResult = ReturnType<typeof useGetTeachingCoursesLazyQuery>;
export type GetTeachingCoursesQueryResult = Apollo.QueryResult<GetTeachingCoursesQuery, GetTeachingCoursesQueryVariables>;
export function refetchGetTeachingCoursesQuery(variables?: GetTeachingCoursesQueryVariables) {
      return { query: GetTeachingCoursesDocument, variables: variables }
    }
export const GetCourseForLessonDocument = gql`
    query GetCourseForLesson($id: UUID!) {
  course(id: $id) {
    id
    title
  }
}
    `;

/**
 * __useGetCourseForLessonQuery__
 *
 * To run a query within a React component, call `useGetCourseForLessonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseForLessonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseForLessonQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCourseForLessonQuery(baseOptions: Apollo.QueryHookOptions<GetCourseForLessonQuery, GetCourseForLessonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCourseForLessonQuery, GetCourseForLessonQueryVariables>(GetCourseForLessonDocument, options);
      }
export function useGetCourseForLessonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCourseForLessonQuery, GetCourseForLessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCourseForLessonQuery, GetCourseForLessonQueryVariables>(GetCourseForLessonDocument, options);
        }
export type GetCourseForLessonQueryHookResult = ReturnType<typeof useGetCourseForLessonQuery>;
export type GetCourseForLessonLazyQueryHookResult = ReturnType<typeof useGetCourseForLessonLazyQuery>;
export type GetCourseForLessonQueryResult = Apollo.QueryResult<GetCourseForLessonQuery, GetCourseForLessonQueryVariables>;
export function refetchGetCourseForLessonQuery(variables: GetCourseForLessonQueryVariables) {
      return { query: GetCourseForLessonDocument, variables: variables }
    }
export const AddLessonDocument = gql`
    mutation AddLesson($input: AddLessonInput!) {
  addLesson(input: $input) {
    lesson {
      id
      title
      description
    }
  }
}
    `;
export type AddLessonMutationFn = Apollo.MutationFunction<AddLessonMutation, AddLessonMutationVariables>;

/**
 * __useAddLessonMutation__
 *
 * To run a mutation, you first call `useAddLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLessonMutation, { data, loading, error }] = useAddLessonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddLessonMutation(baseOptions?: Apollo.MutationHookOptions<AddLessonMutation, AddLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddLessonMutation, AddLessonMutationVariables>(AddLessonDocument, options);
      }
export type AddLessonMutationHookResult = ReturnType<typeof useAddLessonMutation>;
export type AddLessonMutationResult = Apollo.MutationResult<AddLessonMutation>;
export type AddLessonMutationOptions = Apollo.BaseMutationOptions<AddLessonMutation, AddLessonMutationVariables>;
export const GetLessonDocument = gql`
    query GetLesson($courseId: UUID!, $lessonId: UUID!) {
  lesson(courseId: $courseId, lessonId: $lessonId) {
    id
    title
    description
    course {
      id
      title
      permissions {
        canEdit
      }
    }
  }
}
    `;

/**
 * __useGetLessonQuery__
 *
 * To run a query within a React component, call `useGetLessonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLessonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLessonQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      lessonId: // value for 'lessonId'
 *   },
 * });
 */
export function useGetLessonQuery(baseOptions: Apollo.QueryHookOptions<GetLessonQuery, GetLessonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLessonQuery, GetLessonQueryVariables>(GetLessonDocument, options);
      }
export function useGetLessonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLessonQuery, GetLessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLessonQuery, GetLessonQueryVariables>(GetLessonDocument, options);
        }
export type GetLessonQueryHookResult = ReturnType<typeof useGetLessonQuery>;
export type GetLessonLazyQueryHookResult = ReturnType<typeof useGetLessonLazyQuery>;
export type GetLessonQueryResult = Apollo.QueryResult<GetLessonQuery, GetLessonQueryVariables>;
export function refetchGetLessonQuery(variables: GetLessonQueryVariables) {
      return { query: GetLessonDocument, variables: variables }
    }
export const EditLessonDocument = gql`
    mutation EditLesson($input: EditLessonInput!) {
  editLesson(input: $input) {
    lesson {
      id
    }
  }
}
    `;
export type EditLessonMutationFn = Apollo.MutationFunction<EditLessonMutation, EditLessonMutationVariables>;

/**
 * __useEditLessonMutation__
 *
 * To run a mutation, you first call `useEditLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editLessonMutation, { data, loading, error }] = useEditLessonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditLessonMutation(baseOptions?: Apollo.MutationHookOptions<EditLessonMutation, EditLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditLessonMutation, EditLessonMutationVariables>(EditLessonDocument, options);
      }
export type EditLessonMutationHookResult = ReturnType<typeof useEditLessonMutation>;
export type EditLessonMutationResult = Apollo.MutationResult<EditLessonMutation>;
export type EditLessonMutationOptions = Apollo.BaseMutationOptions<EditLessonMutation, EditLessonMutationVariables>;