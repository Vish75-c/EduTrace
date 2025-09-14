import React from 'react'
import { useForm } from 'react-hook-form';
const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors,isSubmitting } } = useForm();
  return (
    <>
    <section className='h-screen  bg-violet-100 bg-cover bg-no-repeat bg-center' style={{backgroundImage:"url(/SignUp.png)"}}>
            <div className='absolute w-130 text-gray-600 bg-violet-200 ml-243 mt-20 flex flex-col items-center p-4 rounded-lg shadow-lg'>
                <img src="/logo.png" alt="logo.alt" className='h-18 w-18'/>
                <h1 className='text-2xl font-extrabold text-blue-600'>Registration Form</h1>

                <form  className='flex flex-col w-full items-center mt-8'>
                    <input className="hover:shadow-lg transition duration-200 outline-none rounded-lg cursor-pointer p-2 py-3 bg-violet-100  w-[80%] mb-4" type="text" placeholder='Username*'/>
                    <input className="hover:shadow-lg transition duration-200 outline-none rounded-lg cursor-pointer p-2 py-3 bg-violet-100 w-[80%] mb-3" type="text" placeholder='Email*'/>
                    <input className="hover:shadow-lg transition duration-200 outline-none rounded-lg cursor-pointer p-2 py-3 bg-violet-100 w-[80%] mb-3" type="text" placeholder='College ID*' />
                    <input className="hover:shadow-lg transition duration-200 outline-none rounded-lg cursor-pointer p-2 py-3 bg-violet-100 w-[80%] mb-3" type="text" placeholder='Phone Number*'/>
                    <input className="hover:shadow-lg transition duration-200 outline-none rounded-lg cursor-pointer p-2 py-3 bg-violet-100 w-[80%] mb-4" type="text" placeholder='Password*' />
                    <input className=" px-5 py-2 bg-blue-600 text-white rounded-4xl shadow hover:bg-blue-700 hover:scale-105 transition-transform duration-300" type="Submit" />
                </form>
            </div>
    </section>
    </>
  )
}

export default SignUp
