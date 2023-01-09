import Image from "next/image"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { fetchMovies } from "../api/browse"
import { fetchMoviesPage2 } from "../api/browsepagetwo"
import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants"
import { Props } from "framer-motion/types/types"
import { type } from "os"
import api from "../../api"

type IMovie = {
    [key: string]: string | number 
}

interface Query extends ParsedUrlQuery {
    id: string
}

interface Prop {
    movie: IMovie
}

export const getStaticPaths: GetStaticPaths = async() => {
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
          paths: [],
          fallback: 'blocking',
        }
    }

    const query = await fetch('https://api.themoviedb.org/3/movie/popular/?api_key=4b3ee28be647cb8720611823db37c4b2&language=en-US&page=1')
    // console.log(data)
    const data = await query.json()

    // const data = await fetchMovies()

    // const paths = data?.results.length > 0 && data?.results.map((result: IMovie) => ({
    //     params: {
    //         id: result.id.toString()
    //     }
    // }))

    const paths = Object.values(data.results).map(({ id }: any) => {{
        return {
            params: {
                id: id?.toString()
            }
        }
    }})

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async({ params }) => {
    const { id }: any = params
    const query = await fetch('https://api.themoviedb.org/3/movie/popular/?api_key=4b3ee28be647cb8720611823db37c4b2&language=en-US&page=1')
    // console.log(data)
    const data = await query.json()
    // const query = await fetchMovies()
    // const data = await query.json()

    const movies = Object.values(data.results).filter((result: any) => result.id.toString() === id)

    return {
        props: {
            movie: movies[0],
        }
    }
}

const MoviePage = ({ movie }: {movie: any}) => {
    // const { data } = useQuery(['movies'], fetchMovies, { initialData: props.movie})
    console.log(movie)
    return (
        <div>
            <h1>{movie.title}</h1>
            <Image src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path} alt="movie" width={100} height={100} />
        </div>
    )
}
export default MoviePage