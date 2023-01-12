import type { GetServerSideProps, NextPage } from "next"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import Navbar from "../../components/Navbar"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { fetchMovies } from "../api/browse"
import { fetchMoviesPage2 } from "../api/browsepagetwo"
import Image from "next/image"
import Link from "next/link"
import Footer from "../../components/Footer"

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)


export const getServerSideProps: GetServerSideProps = async () => {

    const queryClient = new QueryClient()

    await queryClient.fetchQuery(['movies'], () => fetchMovies())
    // await queryClient.fetchQuery(['movies-2'], () => fetchMoviesPage2)

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    }
}

const BrowseMovies: NextPage = () => {
    const imageUrl = "https://image.tmdb.org/t/p/w500"
    const { data } = useQuery({ queryKey: ['movies'], queryFn: fetchMovies})
    const { data: otherData } = useQuery({ queryKey: ['movies-2'], queryFn: fetchMoviesPage2})
    console.log(data)

    return (
        <div className="browse">
            <div className="mobile-browse-container">
                    <Navbar />
                <div className="movie-sections">
                    <div className="movie-trailer-section">
                    </div>
                    <div className="movie-categories">
                        {data.results ? <h2>Popular Movies</h2>: null}
                        <div className="popular-movies-section">
                            {data?.results?.map((result: string | any, index: number) => ( 
                                    <Link href={`movies/${result?.id}`} passHref >
                                        <figure key={index} data-content={result?.original_title}>
                                            <Image 
                                                // loader={() => imageUrl + result?.poster_path}
                                                src={"https://image.tmdb.org/t/p/w500" + result.poster_path}
                                                alt={result?.title} 
                                                width={148} 
                                                height={160}
                                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                placeholder="blur"
                                                style={{
                                                    borderRadius: '5px',
                                                }}
                                            />
                                        </figure>
                                    </Link>
                            ))}
                        </div><br/>
                        <div className="popular-movies-section">
                            {otherData?.results?.map((result: string | any, index: number) => ( 
                                    <Link href={`movies/${result?.id}`} passHref >
                                        <figure key={index} data-content={result?.original_title}>
                                            <Image 
                                                // loader={() => imageUrl + result?.poster_path}
                                                src={"https://image.tmdb.org/t/p/w500" + result.poster_path}
                                                alt={result?.title} 
                                                width={148} 
                                                height={160}
                                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                placeholder="blur"
                                                style={{
                                                    borderRadius: '5px',
                                                }}
                                            />
                                        </figure>
                                    </Link>
                            ))}
                        </div>
                        {data.results ? <h2>Action</h2> : null}
                        <div className="action-movies-section">
                            {data?.results?.filter((result: number | any) => result?.genre_ids[0] === 28)
                                            .map((result: string | any, index: number) => (
                                                <Link href={`movies/${result?.id}`} passHref >
                                                    <figure key={index}>
                                                        <Image
                                                            src={"https://image.tmdb.org/t/p/w500" + result?.poster_path}
                                                            alt={result?.title} 
                                                            width={148} 
                                                            height={160}
                                                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                            placeholder="blur"
                                                            style={{
                                                                borderRadius: '5px'
                                                            }}
                                                        />
                                                    </figure>
                                                </Link>
                            ))}
                        </div>
                        {data.results ? <h2>Crime</h2> : null}
                        <div className="crime-movies-section">
                            {data?.results?.filter((result: number | any, index: number) => result?.genre_ids[2] === 80)
                                            .map((result: string | any, index: number) => (
                                                <Link href={`movies/${result?.id}`} passHref >
                                                    <figure key={index}>
                                                        <Image
                                                            src={"https://image.tmdb.org/t/p/w500" + result?.poster_path}
                                                            alt={result?.title} 
                                                            width={148} 
                                                            height={160}
                                                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                            placeholder="blur"
                                                            style={{
                                                                borderRadius: '5px'
                                                            }}
                                                        />
                                                    </figure>
                                                </Link>
                            ))}
                        </div>
                        {data.results ? <h2>Animation</h2> : null}
                        <div className="animation-movies-section">
                            {data?.results?.filter((result: number | any, index: number) => result?.genre_ids[0] === 16)
                                            .map((result: string | any, index: number) => (
                                                <Link href={`movies/${result?.id}`} passHref >
                                                    <figure key={index}>
                                                        <Image
                                                            src={"https://image.tmdb.org/t/p/w500" + result?.poster_path}
                                                            alt={result?.title} 
                                                            width={148} 
                                                            height={160}
                                                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                            placeholder="blur"
                                                            style={{
                                                                borderRadius: '5px'
                                                            }}
                                                        />
                                                    </figure>
                                                </Link>
                            ))}
                        </div>
                        {data.results ? <h2>Adventure</h2> : null}
                        <div className="adventure-movies-section">
                            {data?.results?.filter((result: number | any, index: number) => result?.genre_ids[1] === 12)
                                                .map((result: string | any, index: number) => (
                                                    <Link href={`movies/${result?.id}`} passHref >
                                                        <figure key={index}>
                                                            <Image
                                                                src={"https://image.tmdb.org/t/p/w500" + result?.poster_path}
                                                                alt={result?.title} 
                                                                width={148} 
                                                                height={160}
                                                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                                placeholder="blur"
                                                                style={{
                                                                    borderRadius: '5px'
                                                                }}
                                                            />
                                                        </figure>
                                                    </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="desktop-browse-container">
                <Navbar />
                <div className="desktop-movie-sections">
                    <div className="desktop-trailer-section"></div>
                    <div className="desktop-popular-movie-category">
                        {data.results ? <h2>Popular</h2> : null}
                            {data?.results?.map((result: string | any, index: number) => (
                                    <Link href={`movies/${result?.id}`} passHref >
                                        <figure key={index}>
                                            <Image
                                                src={"https://image.tmdb.org/t/p/w500" + result?.poster_path}
                                                alt={result?.title} 
                                                width={237} 
                                                height={134}
                                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                placeholder="blur"
                                                style={{
                                                    borderRadius: '5px'
                                                }}
                                            />
                                        </figure>
                                    </Link>
                            ))}
                    </div>
                    <div className="desktop-action-movie-category">
                        {data.results ? <h2>Action</h2> : null}
                            {data?.results?.filter((result: number | any) => result?.genre_ids[0] === 28)
                                            .map((result: string | any, index: number) => (
                                    <Link href={`movies/${result?.id}`} passHref >
                                        <figure key={index}>
                                            <Image
                                                src={"https://image.tmdb.org/t/p/w500" + result?.poster_path}
                                                alt={result?.title} 
                                                width={237} 
                                                height={134}
                                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                placeholder="blur"
                                                style={{
                                                    borderRadius: '5px'
                                                }}
                                            />
                                        </figure>
                                    </Link>
                            ))}
                    </div>
                    <div className="desktop-crime-movie-category">
                        {data.results ? <h2>Crime</h2> : null}
                            {data?.results?.filter((result: number | any) => result?.genre_ids[2] === 80)
                                            .map((result: string | any, index: number) => (
                                    <Link href={`movies/${result?.id}`} passHref >
                                        <figure key={index}>
                                            <Image
                                                src={"https://image.tmdb.org/t/p/w500" + result?.poster_path}
                                                alt={result?.title} 
                                                width={237} 
                                                height={134}
                                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                placeholder="blur"
                                                style={{
                                                    borderRadius: '5px'
                                                }}
                                            />
                                        </figure>
                                    </Link>
                            ))}
                    </div>
                    <div className="desktop-animation-movie-category">
                        {data.results ? <h2>Animation</h2> : null}
                            {data?.results?.filter((result: number | any) => result?.genre_ids[0] === 16)
                                            .map((result: string | any, index: number) => (
                                    <Link href={`movies/${result?.id}`} passHref >
                                        <figure key={index}>
                                            <Image
                                                src={"https://image.tmdb.org/t/p/w500" + result?.poster_path}
                                                alt={result?.title} 
                                                width={237} 
                                                height={134}
                                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                placeholder="blur"
                                                style={{
                                                    borderRadius: '5px'
                                                }}
                                            />
                                        </figure>
                                    </Link>
                            ))}
                    </div>
                    <div className="desktop-adventure-movie-category">
                        {data.results ? <h2>Adventure</h2> : null}
                            {data?.results?.filter((result: number | any) => result?.genre_ids[1] === 12)
                                            .map((result: string | any, index: number) => (
                                    <Link href={`movies/${result?.id}`} passHref >
                                        <figure key={index}>
                                            <Image
                                                src={"https://image.tmdb.org/t/p/w500" + result?.poster_path}
                                                alt={result?.title} 
                                                width={237} 
                                                height={134}
                                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                placeholder="blur"
                                                style={{
                                                    borderRadius: '5px'
                                                }}
                                            />
                                        </figure>
                                    </Link>
                            ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default withPageAuthRequired(BrowseMovies)