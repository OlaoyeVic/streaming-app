import Image from 'next/image'
import hamburger from '../../public/assets/hamburger.gif'
import Sidebar from '../Sidebar'
const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="mobile-container">
                    <div className="hamburger-button-logo">
                        <div className='hamburger-image'>
                            {/* <Image src={hamburger} alt="hamburger button" width={24} height={24} /> */}
                            <><Sidebar /></>
                        </div>
                        <div className='text-logo'>
                            stream<b style={{color: '#e50914'}}>it</b>
                        </div>
                    </div>
                    <div className='search-bar'>
                        <input type="text" placeholder="Search" />
                    </div>
            </div>
            <div className="desktop-container"></div>
        </div>
    )
}
export default Navbar