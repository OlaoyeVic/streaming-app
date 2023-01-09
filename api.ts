import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { promises as fs } from 'fs'
import path from 'path'

const API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_KEY
export async function fetchMovies () {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular/?api_key=${API_KEY}&language=en-US&page=1`)
        return response.data
    } catch(err) {
        //@ts-expect-error
        return err.response.data
    }
}
export const getServerSideProps = withApiAuthRequired(fetchMovies)

// const response = await axios.get(`https://api.themoviedb.org/3/movie/popular/?api_key=${API_KEY}&language=en-US&page=1`)
        

type IPattern = {
    [key: string]: string | number 
}

const api = {
    // axios.get(`https://api.themoviedb.org/3/movie/popular/?api_key=${API_KEY}&language=en-US&page=1`)
    list: async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular/?api_key=${API_KEY}&language=en-US&page=1`)
        return response.data
    //   return await fetchMovies()
    },
    fetch: async (id: IPattern['id']) => {
    //   return PRODUCTS.find((product) => product.id === id)
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular/?api_key=${API_KEY}&language=en-US&page=1`)
        const data = response.data
        return data.results.find((result: IPattern) => result.id === id)
    },
    cache: {
      get: async (id: string): Promise<IPattern | null | undefined> => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular/?api_key=${API_KEY}&language=en-US&page=1`)
        const data = response.data
        const otherData = await fs.readFile(path.join(process.cwd(), 'data.db'))
        const movies: IPattern[] = JSON.parse(otherData as unknown as string)
  
        return data.results.find((result: IPattern) => result.id === id)
      },
      set: async (products: IPattern[]) => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular/?api_key=${API_KEY}&language=en-US&page=1`)
        const data = response.data
        return await fs.writeFile(
          path.join(process.cwd(), 'data.db'),
          JSON.stringify(data)
        )
      },
    },
  }
  
  export default api
// console.log(fetchMovies())