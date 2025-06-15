import React from 'react'

const Modal = ({children,isOpen,onClose, hideHeader, title}) => {
  if(!isOpen) return null;
  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40'>
        <div className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden`}>
        {!hideHeader && (
            <div className='flex items-center justify-between p-4 border-b border-gray-200'>
                <h3 className='md:text-lg font-medium text-gray-900'>{title}</h3>
            </div>
        )}

        <button
        type='button'
        className='text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer'
        onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 1024 1024"><path d="M697.4 759.2l61.8-61.8L573.8 512l185.4-185.4-61.8-61.8L512 450.2 326.6 264.8l-61.8 61.8L450.2 512 264.8 697.4l61.8 61.8L512 573.8z"/></svg>

        </button>

        <div className='flex-1 overflow-y-auto custom-scrollbar'>
            {children}
        </div>
    </div>
    </div>
  )
}

export default Modal