import { slide as Menu } from 'react-burger-menu'
import avatar from '../../public/assets/avatar.png'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0'

const Sidebar = () => {
    const { user } = useUser()
    // console.log(user)
    return (
        <>
            <Menu>
                <a className='menu-item' href='/'>
                    <Image src={avatar} alt="avatar" /> <b style={{fontSize: '25px', verticalAlign: 'top'}}>{user?.nickname}</b>
                </a>
                <a className='menu-item' href='/'>
                    Account
                </a>
                <a className='menu-item' href='/'>
                    Help Center
                </a>
                <a className='menu-item' href='/api/auth/logout'>
                    Sign Out of Streamit
                </a>
                <hr />
                <a className='menu-item' href='/'>
                    Home
                </a>
                <a className='menu-item' href='/'>
                    My List
                </a>
                <a className='menu-item' href='/'>
                    Thrillers
                </a>
                <a className='menu-item' href='/'>
                    Crime
                </a>
                <a className='menu-item' href='/'>
                    Kids & Family
                </a>
                <a className='menu-item' href='/'>
                    Reality TV
                </a>
                <a className='menu-item' href='/'>
                    Action
                </a>
                <a className='menu-item' href='/'>
                    Anime
                </a>
                <a className='menu-item' href='/'>
                    Comedies
                </a>
                <a className='menu-item' href='/'>
                    Fantasy
                </a>
                <a className='menu-item' href='/'>
                    Sci-Fi
                </a>
                <a className='menu-item' href='/'>
                    Stand-Up Comedy
                </a>
                <a className='menu-item' href='/'>
                    Documentaries
                </a>
                <a className='menu-item' href='/'>
                    Music & Materials
                </a>
            </Menu>
        </>
    )
}
export default Sidebar