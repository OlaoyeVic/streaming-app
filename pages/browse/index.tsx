import type { GetServerSideProps, NextPage } from "next"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import Navbar from "../../components/Navbar"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { fetchMovies } from "../api/browse"

// export const getServerSideProps = withPageAuthRequired()

// export async function getServerSideProps() {
//     withPageAuthRequired()
//     const queryClient = new QueryClient()

//     await queryClient.prefetchQuery(['movies'], fetchMovies)

//     return {
//         props: {
//             dehydratedState: dehydrate(queryClient)
//         }
//     }
// }
// export const getServerSideProps = withPageAuthRequired()
export const getServerSideProps: GetServerSideProps = async () => {

    const queryClient = new QueryClient()

    await queryClient.fetchQuery(['movies'], () => fetchMovies())

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

const BrowseMovies: NextPage = () => {
    const { data } = useQuery({ queryKey: ['movies'], queryFn: fetchMovies})
    console.log(data)
    return (
        <div className="browse">
            <div className="mobile-browse-container">
                <Navbar />
                <div className="movie sections"></div>
            </div>
            <div className="desktop-browse-container"></div>
        </div>
    )
}
export default withPageAuthRequired (BrowseMovies)