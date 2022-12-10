import type { GetServerSideProps, NextPage } from "next"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import Navbar from "../../components/Navbar"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { fetchMovies } from "../api/browse"
import Image from "next/image"
import Link from "next/link"
import { Key, useState } from "react"

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
    // const [fetchedResults, setFetchedResults] = useState([])
    const { data } = useQuery({ queryKey: ['movies'], queryFn: fetchMovies})
    console.log(data)
    return data

    
    return (
        <div className="browse">
            <div className="mobile-browse-container">
                <Navbar />
                <div className="movie sections">
                    <div className="movie-trailer-section"></div>
                    <div className="movie-categories">
                        <p>Popular Movies</p>
                        <div className="popular-movies-section">
                            {data?.results.map((movies: string | any, index: number)=> (
                                <>
                                    <Link href='' passHref>
                                        <a key={index}>
                                            <Image 
                                             src={movies?.poster_path} 
                                             alt={movies?.title} 
                                             width={30} 
                                             height={30}
                                            />
                                        </a>
                                    </Link>
                                    <p>{movies.title}</p>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="desktop-browse-container">
                <Navbar />
            </div>
        </div>
    )
}
export default withPageAuthRequired(BrowseMovies)