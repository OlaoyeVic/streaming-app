import type { GetServerSideProps, NextPage } from "next"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import Navbar from "../../components/Navbar"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { fetchMovies } from "../api/browse"
import Image from "next/image"
import Link from "next/link"
import { Key, useEffect, useState } from "react"


const shimmer = (w: number, h: number) => `
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

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)


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
    const imageUrl = "https://image.tmdb.org/t/p/w500"
    const { data } = useQuery({ queryKey: ['movies'], queryFn: fetchMovies})
    console.log(data)

    
    return (
        <div className="browse">
            <div className="mobile-browse-container">
                    <Navbar />
                <div className="movie-sections">
                    <div className="movie-trailer-section">
                    </div>
                    <div className="movie-categories">
                        <h2>Popular Movies</h2>
                        <div className="popular-movies-section">
                            {data?.results?.map((result: string | any, index: number) => ( 
                                    <Link href='' passHref >
                                        <figure key={index} data-content={result?.original_title}>
                                            <Image 
                                                // loader={() => imageUrl + result?.poster_path}
                                                src={"https://image.tmdb.org/t/p/w500" + result.backdrop_path}
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
                        <h2>Genre</h2>
                        <div className="genre-section"></div>
                    </div>
                </div>
            </div>
            <div className="desktop-browse-container">
                <Navbar />
                <div className="desktop-movie-sections">
                    <div className="desktop-trailer-section"></div>
                    <div className="desktop-popular-movie-category">
                        <p>Popular Movies</p>
                            {data?.results?.map((result: string | any, index: number) => (
                                    <Link href='' passHref>
                                        <figure key={index}>
                                            <Image
                                                src={"https://image.tmdb.org/t/p/w500" + result?.backdrop_path}
                                                alt={result?.title} 
                                                width={237} 
                                                height={134}
                                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                placeholder="blur"
                                                style={{
                                                    borderRadius: '5px'
                                                }}
                                            />
                                            <figcaption>{result?.title}</figcaption>
                                        </figure>
                                    </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withPageAuthRequired(BrowseMovies)