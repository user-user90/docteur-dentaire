import React from 'react'

function loading() {
  return (
    <div className='flex    text-center min-h-[60vh] items-center justify-center gap-10'>
       <p className='font-extrabold  text-6xl animate-ping'>.</p>
       <p className='font-extrabold  text-6xl animate-ping'>.</p>
       <p className='font-extrabold  text-6xl animate-ping'>.</p>
       {/* <h2 className='border-4 border-gray-800 w-20 h-20 border-t-transparent rounded-full animate-spin'></h2> */}
    </div>
  )
}

export default loading