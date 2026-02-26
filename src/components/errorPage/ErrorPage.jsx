import React from 'react'
import { useRouteError, useNavigate } from 'react-router'
import errorImg from '../../assets/errorImg.webp'

export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className='flex flex-col justify-center items-center space-y-3 py-4 px-4'>
            <img src={errorImg} alt='Error' className='rounded-xl h-105 w-112.5' />
            <h1 className='text-3xl font-bold'>Oops, page not found!!</h1>

            <p className="text-muted">
                {error?.statusText || error?.message || "The page you are looking for is not available."}
            </p>

            <button
                onClick={() => navigate(-1)}
                className="btn bg-green-800 hover:bg-green-900 cursor-pointer text-white border-none px-4 py-2 rounded-xl transition"
            >
                Go Back!
            </button>
        </div>
    )
}