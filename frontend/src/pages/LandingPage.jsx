import React, { useState } from 'react'
import HERO_IMG from '../assets/HERO_IMG.png'
import {APP_FEATURES} from '../utils/data'
import { useNavigate } from 'react-router'
import { FaWandMagicSparkles } from "react-icons/fa6";
import Modal from '../components/Modal';
import Login from './auth/Login';
import Signup from './auth/Signup';
const LandingPage = () => {
  
  const navigate = useNavigate();

  const [openAuth,setOpenAuth] = useState(false);
  const [currPage,setCurrPage] = useState("login");

  const handleCTA = ()=>{}
  return (
    <>
    <div className='w-full min-h-full bg-[#fffcef]'>
      <div className='bg-amber-200/20'>
        <div className='container mx-auto px-4 pt-6 pb-[200px] relative z-10'>
          {/* header */}
          <header className='flex justify-between items-center mb-16'>
            <div className='text-xl text-black font-bold'>
              Let's Intrvw
            </div>
            <button
            className='bg-linear-to-r from-[#ff93240] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer'
            onClick={()=>setOpenAuth(true)}>
              Login / Signup
            </button>
          </header>

          {/* Hero content */}

          <div className='flex flex-col md:flex-row items-center'>
            <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
              <div className='flex items-center justify-left mb-2'>
                <div className='flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300'>
                  <FaWandMagicSparkles /> AI Powered
                </div>
              </div>
              <h1 className='text-5xl text-black font-medium mb-6 leading-tight'> 
                Ace Interviews with <br />
                <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#ff9324_0%,_#fcd760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold'>
                   AI-powered
                </span>{" "}
                Learning
              </h1>
            </div>
            <div className='w-full md:w-1/2'>
              <p className='text-[17px] text-gray-900 md:mr-20 mb-6'>Get role specific questions, expand answers when you need them,
                dive deeper into concepts, and oranize everything your way.
                From preparation to mastery - your ultimate interview toolkit is here.
              </p>
              <button 
              className='bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer'
              onClick={handleCTA}>Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className='w-full min-h-full relative z-10 mb-36'>
      <div>
        <section className='flex items-center justify-center -mt-36'>
          <img src={HERO_IMG} alt="Hero img" className='w-[65vw] rounded-lg'
           />
        </section>
      </div>

      <div className='w-full min-h-full bg-[#fffcef] mt-10'>
        <div className='container mx-auto px-4 pt-10 pb-20'>
          <section className='mt-5'>
            <h2 className='text-2xl font-medium text-center mb-12'>
              Features That Make You Shines
            </h2>

            <div className='flex flex-col items-center gap-8'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
                {APP_FEATURES.slice(0,3).map((feature)=>(
                  <div key={feature.id} className='bg-[#fffef8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100'>  
                      <h3 className='text-base font-semibold mb-3'>
                        {feature.title}
                      </h3>
                      <p className='text-gray-600'>{feature.description}</p>
                  </div>
                ))}
              </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  {APP_FEATURES.slice(3).map((feature)=>(
                     <div key={feature.id} className='bg-[#fffef8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100'>
                      <h3 className='text-base font-semibold mb-3'>
                        {feature.title}
                      </h3>
                      <p className='text-gray-600'>{feature.description}</p>
                  </div>
                  ))}
                </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <Modal isOpen={openAuth}
    onClose={()=>{
      setOpenAuth(false);
      setCurrPage('login');
    }}
    hideHeader
    >
      <div>
        {currPage === 'login' && (
          <Login setCurrPage={setCurrPage} />
        ) }
        {currPage === 'signup' && (
          <Signup setCurrPage={setCurrPage} />
        )}
      </div>
    </Modal>

    </>
  )
}

export default LandingPage