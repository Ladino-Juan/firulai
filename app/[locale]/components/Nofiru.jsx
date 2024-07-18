"use client"

import React from 'react'
import Link from "next/link";

const Nofiru = () => {
  return (
    <div className='flex flex-col w-[90vw] h-[90vh] items-center justify-center space-y-5'>
        <h1 className='font-bold text-6xl text-center text-gray-700'>APADRINA UN <span className='text-green-500'>FIRU</span></h1>
        <Link
            href={`/api/pets`}
            className="bg-darkGreen text-center hover:bg-darkestGreen transition-all duration-300 text-white text-lg px-4 py-2 rounded-lg hover:scale-105 shadow-xl"
          >
            CONÓCELOS
          </Link>
    </div>
  )
}

export default Nofiru