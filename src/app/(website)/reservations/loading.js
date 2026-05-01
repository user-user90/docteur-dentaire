import React from 'react'

function loading() {
  return (
    <div className='flex text-center min-h-[70vh] items-center justify-center gap-10'>
       <p className='font-extrabold text-[#00D3F2] text-7xl animate-bounce'>.</p>
       <p className='font-extrabold text-[#00D3F2] text-7xl animate-bounce'>.</p>
       <p className='font-extrabold text-[#00D3F2] text-7xl animate-bounce'>.</p>
    </div>
  )
}

export default loading