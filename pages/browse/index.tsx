import type { NextPage } from "next"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import Navbar from "../../components/Navbar"

export const getServerSideProps = withPageAuthRequired()

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