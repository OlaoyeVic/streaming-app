import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_KEY
export const fetchMoviesPage2 = async() => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular/?api_key=${API_KEY}&language=en-US&page=2`)
        return response.data
    } catch(err) {
        //@ts-expect-error
        return err.response.data
    }
}
export const getServerSideProps = withApiAuthRequired(fetchMoviesPage2)