import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import tv from '../public/assets/tv.png'
import mobile from '../public/assets/mobile-0819.jpg'
import kids from '../public/assets/kids.png'
import Faq from '../components/Faq'
import { faqs } from '../data/faqs'
import { ReactNode } from 'react'
import Footer from '../components/Footer'

interface IFaq {
  question: string
  answer: string
}

const Home: NextPage = () => {
  return (
    <div className='home-container'>
      <div className='mobile-home-container'>
        <div className='mobile-first-section'>
          <div className='mobile-header'>
            <div>
              <h2>stream<b style={{color: '#e50914'}}>it</b></h2>
            </div>
            <div>
              <button>Sign in</button>
            </div>
          </div>
          <div className='mobile-title-text'>
            <h1>unlimited movies, TV shows, and more.</h1>
            <h2>watch anywhere, cancel anytime.</h2>
            <h3>ready to watch? start here.</h3>
          </div>
          <div className='welcome-button'>
            <button>get started &gt;</button>
          </div>
        </div>
        <div className='mobile-second-section'>
          <h1>enjoy on your TV.</h1>
          <h2>watch on smart TVs, playstation, chromecast, apple TV, blu-ray players and more.</h2>
          <Image src={tv} alt="TV" quality={100} />
        </div>
        <div className='mobile-third-section'>
          <h1>download your shows to watch offline</h1>
          <h2>save your favourites easily and always have something to watch</h2>
          <Image src={mobile} alt="mobile phone" quality={100} />
        </div>
        <div className='mobile-fourth-section'>
          <h1>watch everyone</h1>
          <h2>stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</h2>
        </div>
        <div className='mobile-fourth-section'>
          <h1>create profiles for kids</h1>
          <h2>send kids on adventures with their favourite characters in a space made just for them-free with your membership.</h2>
          <Image src={kids} alt="kids" quality={100} />
        </div>
        <div className='mobile-faq'>
          <h1>frequently asked questions</h1>
          {faqs.map(({ question, answer }) => (
            <Faq question={question} answer={answer} />
          ))}
          <div className="faq-text">
            <h3>ready to watch? click the button to start</h3>
            <button>get started &gt;</button>
          </div>
        </div>
        <div className='mobile-footer'>
          <Footer />
        </div>
      </div>
      <div className='desktop-home-container'></div>
    </div>
  )
}

export default Home
