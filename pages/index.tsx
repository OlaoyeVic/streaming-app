import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import tv from '../public/assets/tv.png'
import mobile from '../public/assets/mobile-0819.jpg'
import kids from '../public/assets/kids.png'
import Faq from '../components/Faq'
import { faqs } from '../data/faqs'
import Footer from '../components/Footer'
import { useUser } from '@auth0/nextjs-auth0'
import Welcome from './welcome'

interface IFaq {
  question: string
  answer: string
}

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser()

  if(isLoading) {
    return <div>loading ...</div>
  }

  if(error) {
    return <div>{error.message}</div>
  }

  if(user) {
    return (
      <Welcome />
    )
  }
  return (
    <div className='home-container'>
      <div className='mobile-home-container'>
        <div className='mobile-first-section'>
          <div className='mobile-header'>
            <div>
              <h2>stream<b style={{color: '#e50914'}}>it</b></h2>
            </div>
            <div>
              <button>
                <a href='/api/auth/login'>Sign In</a>
              </button>
            </div>
          </div>
          <div className='mobile-title-text'>
            <h1>unlimited movies, TV shows, and more.</h1>
            <h2>watch anywhere, cancel anytime.</h2>
            <h3>ready to watch? start here.</h3>
          </div>
          <div className='welcome-button'>
            <button>
              <a href='/api/auth/login'>get started &gt;</a>
            </button>
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
        <div className='mobile-fifth-section'>
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
            <button>
              <a href='/api/auth/login'>get started &gt;</a>
            </button>
          </div>
        </div>
        <div className='mobile-footer'>
          <Footer />
        </div>
      </div>
      <div className='desktop-home-container'>
        <div className='desktop-first-section'>
          <div className='desktop-header'>
            <div>
              <h2>stream<b style={{color: '#e50914'}}>it</b></h2>
            </div>
            <div>
              <button>
                <a href='/api/auth/login'>Sign In</a>
              </button>
            </div>
          </div>
          <div className='desktop-title-text'>
            <h1>unlimited movies, TV shows, and more.</h1>
            <h2>watch anywhere, cancel anytime.</h2>
            <h3>ready to watch? start here.</h3>
          </div>
          <div className='desktop-welcome-button'>
            <button>
              <a href='/api/auth/login'>get started &gt;</a>
            </button>
          </div>
        </div>
        <div className='desktop-second-section'>
          <div>
            <h1>enjoy on your TV.</h1>
            <h2>watch on smart TVs, playstation, chromecast, apple TV, blu-ray players and more.</h2>
          </div>
          <div>
            <Image src={tv} alt="TV" quality={100} />
          </div>
        </div>
        <div className='desktop-third-section'>
          <div>
            <Image src={mobile} alt="mobile phone" quality={100} />
          </div>
          <div>
            <h1>download your shows to watch offline</h1>
            <h2>save your favourites easily and always have something to watch</h2>
          </div>
        </div>
        <div className='desktop-fourth-section'>
          <h1>watch everyone</h1>
          <h2>stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</h2>
        </div>
        <div className='desktop-fifth-section'>
          <div>
            <h1>create profiles for kids</h1>
            <h2>send kids on adventures with their favourite characters in a space made just for them-free with your membership.</h2>
          </div>
          <div>
            <Image src={kids} alt="kids" quality={100} />
          </div>
        </div>
        <div className='desktop-faq'>
          <h1>frequently asked questions</h1>
          {faqs.map(({ question, answer }) => (
            <Faq question={question} answer={answer} />
          ))}
          <div className="faq-text">
            <h3>ready to watch? click the button to start</h3>
            <button>
              <a href='/api/auth/login'>get started &gt;</a>
            </button>
          </div>
        </div>
        <div className='desktop-footer'>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home
