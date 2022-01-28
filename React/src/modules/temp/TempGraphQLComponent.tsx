import { useGetTestValueQuery } from "types"

const TempGraphQLComponent = () => {
    const { loading, error, data } = useGetTestValueQuery();
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message} {error.graphQLErrors.map(o => o.message).join(', ')}</p>;
    if (!data) return <p>No Data from GraphQL</p>

    return <p>GraphQL Data: {data.value} {data.authValue}</p>;
}

export default TempGraphQLComponent;