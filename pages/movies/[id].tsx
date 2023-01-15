import Image from "next/image"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { fetchMovies } from "../api/browse"
import { fetchMoviesPage2 } from "../api/browsepagetwo"
import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants"
import { type } from "os"
import Navbar from "../../components/Navbar"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { shimmer, toBase64 } from "../browse"
import Footer from "../../components/Footer"

type IMovie = {
    [key: string]: string | number 
    release_date: string
    vote_average: number
    original_language: string
    title: string
}

interface Query extends ParsedUrlQuery {
    id: string
}

interface Props {
    movie: IMovie
}

const API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_KEY
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
    const imageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
    console.log(movie)
    return (
        <div className="movie">
            <div className="mobile-movie-container">
                <div className="mobile-movie-navbar">
                    <Navbar />
                </div>
                <div 
                    className="mobile-movie-backdrop"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        // backgroundColor: 'linear-gradient(to right, rgba(31.5, 31.5, 52.5, 1) 20%, rgba(31.5, 31.5, 52.5, 0) 50%)',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '185px',
                        width: '100%',
                        filter: 'brightness(50%)',
                    }}
                >
                    <figure style={{
                        position: 'absolute',
                        top: '20px',
                        left: '10px',
                        filter: 'brightness(150%)',
                    }}>
                        <Image 
                            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} 
                            alt={movie.title}
                            width={70} 
                            height={105}
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                            placeholder="blur"
                            style={{
                                borderRadius: '10px',
                            }}
                        />
                    </figure>
                </div>
                <div className="mobile-movie-details">
                    <h3>{movie.title} ({movie.release_date.slice(0, 4)})</h3>
                        <pre style={{fontFamily: 'Netflix Sans'}}>
                            <h4>
                                <b 
                                    className="circle"
                                >
                                    {movie.vote_average * 10}&#65130;
                                </b> User Score      |       &#9654;  Play Trailer
                            </h4>
                        </pre>
                </div>
                <div className="mobile-movie-facts">
                    <p><span>R</span> {movie.release_date} ({movie.original_language.toUpperCase()}) {movie.runtime}</p>
                </div>
                <div className="mobile-movie-overview">
                    <h2>Overview</h2>
                    <p>{movie.overview}</p>
                </div>
            </div>
            <div className="desktop-movie-container">
                <div className="desktop-movie-navbar">
                    <Navbar />
                </div>
                <div className="desktop-movie-backdrop"  style={{backgroundImage: `url(${imageUrl})`}}>
                    <figure className="desktop-backdrop-image">
                        <Image 
                            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} 
                            alt={movie.title} 
                            width={300} 
                            height={450}
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                            placeholder="blur"
                            style={{
                                borderRadius: '10px',
                            }}
                        />
                    </figure>
                    <div className="desktop-overlay-info">
                        <h1>{movie.title} ({movie.release_date.slice(0, 4)})</h1>
                        <p>
                            <span>R</span> {movie.release_date} ({movie.original_language.toUpperCase()}) {movie.runtime}
                        </p>
                        <p style={{padding: '10px 0'}}>
                            <pre>
                                <b className="circle">
                                        {movie.vote_average * 10}&#65130;
                                </b> User Score      |       &#9654;  Play Trailer
                            </pre>
                        </p>
                        <div className="desktop-movie-overview">
                            <h2>Overview</h2>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </div>
            <div className="desktop-movie-details"></div>
            </div>
            <Footer />
        </div>
    )
}
export default withPageAuthRequired(MoviePage)