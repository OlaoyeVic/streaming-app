import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_KEY
export const fetchByGenre = async() => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    }
    catch(err) {
        //@ts-expect-error
        return err.response.data
    }
}