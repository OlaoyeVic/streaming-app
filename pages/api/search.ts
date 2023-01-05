import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_KEY
export const searchMovies = async() => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/company?api_key=${API_KEY}&query=`)
    }
    catch(err) {
        //@ts-expect-error
        err.response.data
    }
}
export const getServerSideProps = withApiAuthRequired(searchMovies)