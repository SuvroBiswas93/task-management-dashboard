import React from 'react'
import { Link, useRouteError } from 'react-router'
import errorImg from '../../assets/errorImg.webp'

export default function ErrorPage() {
    const error = useRouteError();
    return (
        <div className=' h-screen flex flex-col justify-center items-center space-y-3  px-4'>
            <img src={errorImg} alt='Error Image' className='rounded-xl' />
            <h1 className='text-3xl font-bold'>Oops, page not found!!</h1>
            <p className="text-muted ">
                {error?.statusText || error?.message || "The page you are looking for is not available."}
            </p>
            <Link to='/'

                className="btn bg-green-500 hover:bg-green-700 text-white border-none"
            >
                Go Back !

            </Link>

        </div>
    )
}
