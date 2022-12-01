import React, { useEffect, useState } from "react"
import type { NextPage } from "next"
import Image from "next/image"
import video from "../../public/assets/video-streaming.svg"
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useRouter } from "next/router"

export const getServerSideProps = withPageAuthRequired()

const Welcome: NextPage = () => {
    const { user } = useUser()
    const [showComponent, setShowComponent] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if(showComponent){
            setTimeout(() => {
                router.push('/browse')
            }, 3000)
        }
    }, [showComponent, router])


    return (
        <div className="welcome">
            <div className="mobile-welcome">
                <Image src={video} alt="video streaming" quality={100} />
                <h3>Hey {user?.name}!</h3>
                <p>Welcome Back</p>
            </div>
            <div className="desktop-welcome">
                <div className="left-panel">
                    <Image src={video} alt="video streaming" quality={100} />
                </div>
                <div className="right-panel">
                    <h3>Hey {user?.name}!</h3>
                    <p>Welcome Back</p>
                </div>
            </div>
        </div>
    )
}
export default Welcome
