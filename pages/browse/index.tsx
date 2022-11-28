import { NextPage } from "next"
import Navbar from "../../components/Navbar"

const BrowseMovies: NextPage = () => {
    return (
        <div className="browse">
            <div className="mobile-browse-container">
                <Navbar />
            </div>
            <div className="desktop-browse-container"></div>
        </div>
    )
}
export default BrowseMovies