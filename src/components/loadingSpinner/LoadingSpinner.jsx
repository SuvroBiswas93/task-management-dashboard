import React from 'react'
import { ScaleLoader } from 'react-spinners'

export default function LoadingSpinner({smallHeight}) {
  return (
    <div
      className={` ${smallHeight ? 'h-62.5' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <ScaleLoader size={100} color = 'green' />
    </div>
  )
}
