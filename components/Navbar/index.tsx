import Image from 'next/image'
import Link from 'next/link'
import hamburger from '../../public/assets/hamburger.gif'
import avatar from '../../public/assets/avatar.png'
import sort from '../../public/assets/sort-down.png'
import Sidebar from '../Sidebar'
import { useUser } from '@auth0/nextjs-auth0'
import { User } from '../../interfaces'


const Navbar = () => {
    const { user } = useUser()
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
            <div className="desktop-container">
                <div className='logo-browse'>
                    <div className='text-logo'>
                        <h2>stream<b style={{color: '#e50914'}}>it</b></h2>
                    </div>
                    <div className='browse-dropdown'>
                        <pre><h4>browse <Image src={sort} alt='sort down arrow' width={12} height={15} style={{marginTop: '3px'}} /></h4></pre>
                        <div className='dropdown-content'>
                            <div className='row'>
                                <div className='column'>
                                    <Link href="" passHref>
                                        <a>Home</a>
                                    </Link>
                                    <Link href="" passHref>
                                        <a>My List</a>
                                    </Link>
                                    <span className="vertical-line"></span>
                                </div>
                                <div className='column'>
                                    <Link href="" passHref>
                                        <a>Thrillers</a>
                                    </Link>
                                    <Link href="" passHref>
                                        <a>Reality TV</a>
                                    </Link>
                                    <Link href="" passHref>
                                        <a>Comedies</a>
                                    </Link>
                                    <Link href="" passHref>
                                        <a>Music and Musicals</a>
                                    </Link>
                                    <Link href="" passHref>
                                        <a>Horror</a>
                                    </Link>
                                </div>
                                <div className='column'>
                                    <Link href="" passHref>
                                        <a>Crime</a>
                                    </Link>
                                    <Link href="" passHref>
                                        <a>Fantasy</a>
                                    </Link>
                                    <Link href="" passHref>
                                        <a>Stand upComedy</a>
                                    </Link>
                                    <Link href="" passHref>
                                        <a>Romance</a>
                                    </Link>
                                    <Link href="" passHref>
                                        <a>Kids and Family</a>
                                    </Link>
                                </div>
                                <div className='column'>
                                    <Link href="" passHref>
                                        <a>Anime</a>
                                    </Link>
                                    <Link href="" passHref>
                                        <a>Sci-Fi</a>
                                    </Link>
                                    <Link href="" passHref>
                                        <a>Documenteries</a>
                                    </Link>
                                    <Link href="" passHref>
                                        <a>Drama</a>
                                    </Link>
                                    <Link href="" passHref>
                                        <a>Action</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='searchbar-profile'>
                    <div className='search-bar'>
                        <input type='text' placeholder='Search' />
                    </div>
                    <div className='profile-details'>
                        <pre>
                            <Image src={user?.picture!} alt="avatar" height={28} width={27} style={{verticalAlign: 'middle'}} />&nbsp;
                            <Image src={sort} alt='sort down arrow' width={12} height={15} style={{marginBottom: '7px'}} />
                        </pre>
                        {/* <b style={{fontSize: '25px', verticalAlign: 'top', cursor: 'pointer'}}>{user?.nickname}</b> */}
                        <div className='profile-details-content'>
                            <Link href="" passHref>
                                <a>Profile</a>
                            </Link><hr />
                            <Link href="" passHref>
                                <a>Account</a>
                            </Link>
                            <Link href="" passHref>
                                <a>Help Center</a>
                            </Link>
                            <Link href="/api/auth/logout" passHref>
                                <a>Sign Out Of Streamit</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar