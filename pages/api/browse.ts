import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";

export const getServerSideProps = withApiAuthRequired()
const API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_KEY
export const fetchMovies = async() => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`)
        return response.data
    } catch(err) {
        //@ts-expect-error
        return err.response.data
    }
}

// console.log(fetchMovies())