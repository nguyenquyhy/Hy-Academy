import { useGetTestValueQuery } from "types"

const TempGraphQLComponent = () => {
    const { loading, error, data } = useGetTestValueQuery();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return <p>No Data from GraphQL</p>

    return <p>GraphQL Data: {data.value}</p>;
}

export default TempGraphQLComponent;