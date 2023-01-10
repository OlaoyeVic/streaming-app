import Image from "next/image"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { fetchMovies } from "../api/browse"
import { fetchMoviesPage2 } from "../api/browsepagetwo"
import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants"
import { type } from "os"

const API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_KEY

type IMovie = {
    [key: string]: string | number 
}

interface Query extends ParsedUrlQuery {
    id: string
}

interface Props {
    movie: IMovie
}

export const getStaticPaths: GetStaticPaths<Query> = async() => {
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
          paths: [],
          fallback: 'blocking',
        }
    }

    const query = await fetch(`https://api.themoviedb.org/3/movie/popular/?api_key=${API_KEY}&language=en-US&page=1`)
    const data = await query.json()

    const paths = data && Object.values(data.results).map(({ id }: any) => {{
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

export const getStaticProps: GetStaticProps<Props, Query> = async({ params }) => {
    const { id }: any = params
    const query = await fetch(`https://api.themoviedb.org/3/movie/popular/?api_key=${API_KEY}&language=en-US&page=1`)
    const data = await query.json()

    const movies = data && Object.values(data.results).filter((result: any) => result.id.toString() === id)

    return {
        props: {
            movie: movies[0],
        }
    }
}

const MoviePage = ({ movie }: {movie: IMovie}) => {
    console.log(movie)
    return (
        <div>
            <h1>{movie.title}</h1>
            <Image src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path} alt="movie" width={100} height={100} />
        </div>
    )
}
export default MoviePage